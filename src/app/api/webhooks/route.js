import { buffer } from "micro";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import connectMongoDB from "../../../../utils/mongoDB";
import User from "../../../../models/User";

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2022-08-01",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  await connectMongoDB();

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
      const subscription = event.data.object;
      await User.findOneAndUpdate(
        { stripeCustomerId: subscription.customer },
        { subscriptionStatus: subscription.status }
      );
      break;

    case "customer.subscription.deleted":
      const deletedSubscription = event.data.object;
      await User.findOneAndUpdate(
        { stripeCustomerId: deletedSubscription.customer },
        { subscriptionStatus: "canceled" }
      );
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
