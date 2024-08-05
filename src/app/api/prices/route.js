import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51PidbBSFWUyFMrsbtKbxsmr1QOF0QE8xUJmTmwwZcUXRsQ1vDnxJGM4a4RzBHsS9JP23n4DFUMM7S1XAT5kXJCYt00o9OYLxcA"
);

export async function GET(req) {
  try {
    console.log("Fetching Stripe prices...");
    console.log("Stripe API Key:", process.env.STRIPE_API_KEY);

    const prices = await stripe.prices.list({
      limit: 2, // Adjust the limit based on your needs
    });

    console.log("Prices fetched successfully:", prices);

    return NextResponse.json(prices.data);
  } catch (error) {
    console.error("Error fetching prices:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
