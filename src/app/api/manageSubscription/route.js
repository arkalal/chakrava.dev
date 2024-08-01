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
    const { userId } = await req.json();
    await connectMongoDB();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${baseUrlTest}`,
    });

    return NextResponse.json(session.url);
  } catch (error) {
    console.error("Error creating billing portal session:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
