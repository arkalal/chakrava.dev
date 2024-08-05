import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY);

export async function GET() {
  try {
    console.log("Fetching Stripe prices...");
    console.log("Stripe API Key:", process.env.STRIPE_API_KEY);

    const prices = await stripe.prices.list({
      limit: 10,
      expand: ["data.product"], // Include the product data in the response
    });

    const filteredPrices = prices.data.filter(
      (price) => price.nickname === "chakrava.dev - Premium India"
    );

    console.log("Prices fetched and filtered successfully:", filteredPrices);

    return NextResponse.json(filteredPrices);
  } catch (error) {
    console.error("Error fetching prices:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
