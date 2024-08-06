import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import connectMongoDB from "../../../../utils/mongoDB";
import User from "../../../../models/User";
import {
  baseUrlNG,
  baseUrlProd,
  baseUrlStaging,
  baseUrlTest,
} from "../../../../axios/baseUrl";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  const { userId } = await req.json();

  await connectMongoDB();

  const user = await User.findById(userId);

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Adding a 1-minute buffer to the current time
  const currentTime = Math.floor(Date.now() / 1000);
  const startAtTime = currentTime + 60; // 60 seconds buffer

  try {
    const subscription = await razorpay.subscriptions.create({
      plan_id: "plan_OhXzBI9NrMCSMu", // Use your actual plan ID
      customer_notify: 1,
      total_count: 12, // Number of billing cycles
      start_at: startAtTime, // Subscription start time
      notes: {
        userId: user._id.toString(),
      },
    });

    user.razorpaySubscriptionId = subscription.id;
    await user.save();

    console.log("Subscription created:", subscription);

    // Generate the checkout link
    const checkoutLink = await razorpay.invoices.create({
      type: "link",
      amount: 85000, // Amount in paise
      currency: "INR",
      description: "Subscription payment for chakrava.dev Premium",
      subscription_id: subscription.id,
      customer: {
        email: user.email,
        name: user.name,
      },
      notes: {
        userId: user._id.toString(),
      },
      reminder_enable: true,
      callback_url: `${baseUrlProd}`, // Your callback URL
      callback_method: "get",
    });

    return NextResponse.json(
      { short_url: checkoutLink.short_url },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating subscription:", error);
    return NextResponse.json(
      { message: "Failed to create subscription", error: error.message },
      { status: 500 }
    );
  }
}
