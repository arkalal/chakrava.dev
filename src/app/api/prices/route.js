import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2022-08-01",
});

export async function GET() {
  try {
    const prices = await stripe.prices.list({
      limit: 10, // Adjust the limit based on your needs
    });
    return NextResponse.json(prices.data);
  } catch (error) {
    console.error("Error fetching prices:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
