import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectMongoDB from "../../../../../utils/mongoDB";
import User from "../../../../../models/User";
import Stripe from "stripe";
import { nanoid } from "nanoid";

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2022-08-01",
});

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({ user }) {
      await connectMongoDB();

      const existingUser = await User.findOne({ email: user.email });

      if (existingUser) {
        existingUser.name = user.name;
        existingUser.image = user.image;
        await existingUser.save();
      } else {
        try {
          const account = await stripe.accounts.create({
            type: "standard",
            email: user.email,
          });

          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            stripeCustomerId: "",
            stripeAccountId: account.id,
            referralId: nanoid(10),
          });
        } catch (error) {
          console.error("Error creating Stripe account:", error);
          throw new Error("Stripe account creation failed");
        }
      }

      return true;
    },
    async session({ session }) {
      await connectMongoDB();

      const existingUser = await User.findOne({ email: session.user.email });

      if (existingUser) {
        session.user.id = existingUser._id;
        session.user.name = existingUser.name;
        session.user.image = existingUser.image;
        session.user.stripeCustomerId = existingUser.stripeCustomerId;
        session.user.stripeAccountId = existingUser.stripeAccountId;
        session.user.subscriptionStatus = existingUser.subscriptionStatus;
        session.user.wallet = existingUser.wallet;
        session.user.referralId = existingUser.referralId;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
