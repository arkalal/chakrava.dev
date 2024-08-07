import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import connectMongoDB from "../../../../utils/mongoDB";
import User from "../../../../models/User";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  console.log("Webhook received");

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  // Parse raw body for signature verification
  const chunks = [];
  for await (const chunk of req.body) {
    chunks.push(chunk);
  }
  const rawBody = Buffer.concat(chunks).toString("utf8");

  console.log("Raw Body:", rawBody);

  const headerSignature = req.headers["x-razorpay-signature"];
  console.log("Header Signature:", headerSignature);

  if (!headerSignature) {
    console.log("Missing header signature");
    return NextResponse.json(
      { error: "Missing header signature" },
      { status: 400 }
    );
  }

  // Verify signature using Razorpay's built-in method
  try {
    razorpay.webhooks.verifySignature({ rawBody, secret }, headerSignature);
  } catch (error) {
    console.log("Invalid signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Parse the JSON body
  let parsedBody;
  try {
    parsedBody = JSON.parse(rawBody);
  } catch (error) {
    console.log("Error parsing JSON:", error);
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const event = parsedBody.event;
  const payload = parsedBody.payload;

  console.log("Event:", event);
  console.log("Payload:", JSON.stringify(payload, null, 2));

  await connectMongoDB();

  if (event === "subscription.charged") {
    console.log("Handling subscription.charged event");
    const subscription = payload.subscription.entity;
    console.log("Subscription:", subscription);

    const user = await User.findOne({
      razorpaySubscriptionId: subscription.id,
    });

    if (user) {
      console.log("User found:", user);
      user.subscriptionStatus = "active";
      await user.save();
      console.log("User updated");
    } else {
      console.log("User not found");
    }
  } else if (event === "payment.authorized") {
    console.log("Handling payment.authorized event");
    // Add your logic for payment authorized event
  } else if (event === "payment.failed") {
    console.log("Handling payment.failed event");
    // Add your logic for payment failed event
  } else {
    console.log("Unhandled event type:", event);
  }

  return NextResponse.json({ status: "ok" });
}
