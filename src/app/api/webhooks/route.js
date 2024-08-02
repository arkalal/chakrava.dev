import Stripe from "stripe";
import { NextResponse } from "next/server";
import { Readable } from "stream";
import { headers } from "next/headers";
import connectMongoDB from "../../../../utils/mongoDB";
import User from "../../../../models/User";

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2022-08-01",
});

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
    console.log("Handling subscription:", subscription);

    const customer = await stripe.customers.retrieve(subscription.customer);
    const customerEmail = customer.email;

    const user = await User.findOne({ email: customerEmail });

    if (!user) {
      console.error(`User not found for customer email: ${customerEmail}`);
      return;
    }

    if (!user.stripeCustomerId) {
      user.stripeCustomerId = subscription.customer;
    }

    const subscriptionsArray = user.subscriptions || [];
    const subscriptionIndex = subscriptionsArray.findIndex(
      (sub) => sub.priceId === subscription.plan.id
    );

    if (subscriptionIndex === -1) {
      subscriptionsArray.push({
        priceId: subscription.plan.id,
        status: subscription.status,
      });
    } else {
      subscriptionsArray[subscriptionIndex].status = subscription.status;
    }

    user.subscriptionStatus = subscription.status;
    user.subscriptions = subscriptionsArray;

    if (user.referredBy) {
      const referrer = await User.findById(user.referredBy);
      if (referrer) {
        referrer.wallet += 10;
        await referrer.save();
      }
    }

    console.log(`Updating user with ID: ${user._id}`);
    try {
      const result = await user.save();
      console.log("Database update result for subscription:", result);
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  const handleInvoice = async (invoice, status) => {
    console.log("Handling invoice:", invoice);

    const customer = await stripe.customers.retrieve(invoice.customer);
    const customerEmail = customer.email;

    const user = await User.findOne({ email: customerEmail });

    if (!user) {
      console.error(`User not found for customer email: ${customerEmail}`);
      return;
    }

    user.subscriptionStatus = status;
    console.log(`Updating user with ID: ${user._id}`);
    try {
      const result = await user.save();
      console.log("Database update result for invoice:", result);
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  const handleCheckoutSessionCompleted = async (session) => {
    console.log("Handling checkout.session.completed:", session);
    if (session.subscription) {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription
      );
      await handleSubscription(subscription);
    }
  };

  const eventMap = new Map([
    ["customer.subscription.created", handleSubscription],
    ["customer.subscription.updated", handleSubscription],
    [
      "customer.subscription.deleted",
      async (subscription) => {
        const customer = await stripe.customers.retrieve(subscription.customer);
        const customerEmail = customer.email;

        const user = await User.findOne({
          email: customerEmail,
        });

        if (!user) {
          console.error(`User not found for customer email: ${customerEmail}`);
          return;
        }

        user.subscriptionStatus = "canceled";
        const subscriptionIndex = user.subscriptions.findIndex(
          (sub) => sub.priceId === subscription.plan.id
        );
        if (subscriptionIndex !== -1) {
          user.subscriptions[subscriptionIndex].status = "canceled";
        }

        console.log(`Updating user with ID: ${user._id}`);
        const result = await user.save();
        console.log(
          "Database update result for subscription deletion:",
          result
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
    ["checkout.session.completed", handleCheckoutSessionCompleted],
    ["customer.updated", () => {}],
    ["payment_intent.requires_action", () => {}],
    ["payment_intent.created", () => {}],
    ["customer.created", () => {}],
    ["invoice.finalized", () => {}],
    ["invoice.payment_action_required", () => {}],
    ["invoice.updated", () => {}],
    ["invoice.created", () => {}],
    ["charge.succeeded", () => {}],
    ["payment_method.attached", () => {}],
    ["invoice.paid", () => {}],
  ]);

  if (eventMap.has(event.type)) {
    await eventMap.get(event.type)(event.data.object);
  } else {
    console.log(`Unhandled event type ${event.type}`);
  }

  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
