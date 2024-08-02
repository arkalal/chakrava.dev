"use server";

import Stripe from "stripe";
import connectMongoDB from "./mongoDB";
import User from "../models/User";
import { baseUrlTest } from "../axios/baseUrl";
import { redirect } from "next/navigation";

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2022-08-01",
});

export async function createStripeAccountLink(formData) {
  const userId = formData.get("userId");

  console.log("Started");

  await connectMongoDB();
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (!user.stripeAccountId) {
    const account = await stripe.accounts.create({
      type: "standard",
      email: user.email,
      country: "US",
    });
    user.stripeAccountId = account.id;
    await user.save();

    console.log("Account created");
  }

  const accountLink = await stripe.accountLinks.create({
    account: user.stripeAccountId,
    refresh_url: `${baseUrlTest}`,
    return_url: `${baseUrlTest}`,
    type: "account_onboarding",
  });

  console.log("Account link created", accountLink.url);

  return redirect(accountLink.url);
}
