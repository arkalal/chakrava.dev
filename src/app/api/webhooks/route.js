import Stripe from "stripe";
import { NextResponse } from "next/server";
import connectMongoDB from "../../../../utils/mongoDB";
import User from "../../../../models/User";
import { Readable } from "stream";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2022-08-01",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

function buffer(readable) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readable.on("data", (chunk) => {
      chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    });
    readable.on("end", () => resolve(Buffer.concat(chunks)));
    readable.on("error", reject);
  });
}

export async function POST(req) {
  let event;

  try {
    const rawBody = await buffer(Readable.from(req.body));
    const sig = headers().get("Stripe-Signature");

    event = stripe.webhooks.constructEvent(
      rawBody.toString(),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return new NextResponse(JSON.stringify({ error: "Webhook Error" }), {
      status: 400,
    });
  }

  await connectMongoDB();

  const handleSubscription = async (subscription) => {
    await User.findOneAndUpdate(
      { stripeCustomerId: subscription.customer },
      {
        subscriptionStatus: subscription.status,
        $set: {
          "subscriptions.$[element].status": subscription.status,
        },
      },
      {
        arrayFilters: [{ "element.priceId": subscription.plan.id }],
      }
    );
  };

  const handleInvoice = async (invoice, status) => {
    await User.findOneAndUpdate(
      { stripeCustomerId: invoice.customer },
      { subscriptionStatus: status }
    );
  };

  const eventMap = new Map([
    ["customer.subscription.created", handleSubscription],
    ["customer.subscription.updated", handleSubscription],
    [
      "customer.subscription.deleted",
      async (subscription) => {
        await User.findOneAndUpdate(
          { stripeCustomerId: subscription.customer },
          { subscriptionStatus: "canceled" }
        );
      },
    ],
    [
      "invoice.payment_succeeded",
      async (invoice) => handleInvoice(invoice, "active"),
    ],
    [
      "invoice.payment_failed",
      async (invoice) => handleInvoice(invoice, "past_due"),
    ],
  ]);

  if (eventMap.has(event.type)) {
    await eventMap.get(event.type)(event.data.object);
  } else {
    console.log(`Unhandled event type ${event.type}`);
  }

  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
