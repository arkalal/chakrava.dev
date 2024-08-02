import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectMongoDB from "../../../../utils/mongoDB";
import User from "../../../../models/User";
import { baseUrlTest } from "../../../../axios/baseUrl";

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2022-08-01",
});

export async function POST(req) {
  try {
    const { userId, priceId, referralId } = await req.json();
    await connectMongoDB();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (referralId) {
      const referrer = await User.findOne({ referralId });
      if (referrer) {
        user.referredBy = referrer._id;
        await user.save();
      } else {
        return NextResponse.json(
          { error: "Invalid referral ID" },
          { status: 400 }
        );
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: user.email,
      success_url: `${baseUrlTest}`,
      cancel_url: `${baseUrlTest}`,
    });

    return NextResponse.json(session.url);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
