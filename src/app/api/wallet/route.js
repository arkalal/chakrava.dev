import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectMongoDB from "../../../../utils/mongoDB";
import User from "../../../../models/User";

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2022-08-01",
});

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is missing" }, { status: 400 });
  }

  await connectMongoDB();
  const user = await User.findById(userId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ wallet: user.wallet });
}

export async function POST(req) {
  try {
    const { userId, amount } = await req.json();

    if (!userId || !amount) {
      return NextResponse.json(
        { error: "Missing userId or amount" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.wallet < amount) {
      return NextResponse.json(
        { error: "Insufficient funds" },
        { status: 400 }
      );
    }

    const transfer = await stripe.transfers.create({
      amount: amount * 100,
      currency: "usd",
      destination: user.stripeAccountId,
    });

    user.wallet -= amount;
    await user.save();

    return NextResponse.json({ message: "Payout successful", transfer });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
