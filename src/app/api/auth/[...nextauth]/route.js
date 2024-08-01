import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectMongoDB from "../../../../../utils/mongoDB";
import User from "../../../../../models/User";
import Stripe from "stripe";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2022-08-01",
});

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
    async signIn({ user, account, profile }) {
      await connectMongoDB();

      // Check if the user already exists
      const existingUser = await User.findOne({ email: user.email });

      if (existingUser) {
        // Update user details if changed
        existingUser.name = user.name;
        existingUser.image = user.image;
        await existingUser.save();
      } else {
        // Create a new Stripe customer
        const stripeCustomer = await stripe.customers.create({
          email: user.email,
          name: user.name,
        });

        // Create a new user
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          stripeCustomerId: stripeCustomer.id, // Save the Stripe customer ID
        });
      }

      return true;
    },
    async session({ session, token, user }) {
      await connectMongoDB();

      const existingUser = await User.findOne({ email: session.user.email });

      if (existingUser) {
        session.user.id = existingUser._id;
        session.user.name = existingUser.name;
        session.user.image = existingUser.image;
        session.user.stripeCustomerId = existingUser.stripeCustomerId; // Include stripeCustomerId in the session
        session.user.subscriptionStatus = existingUser.subscriptionStatus; // Include subscriptionStatus in the session
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
