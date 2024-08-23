import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectMongoDB from "../../../../../utils/mongoDB";
import User from "../../../../../models/User";

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
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          razorpaySubscriptionId: "",
          subscriptionStatus: "canceled",
          subscriptions: [],
        });
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
        session.user.razorpaySubscriptionId =
          existingUser.razorpaySubscriptionId;
        session.user.subscriptionStatus = existingUser.subscriptionStatus;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
