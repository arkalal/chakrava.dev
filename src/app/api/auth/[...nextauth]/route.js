import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

export const authOptions = {
  providers: [
    // Credentials({
    //   name: "credentials",
    //   credentials: {},

    //   async authorize(credentials) {
    //     const { email, password } = credentials;

    //     try {
    //       await connectMongoDB();
    //       const user = await NewUserAuth.findOne({ email });

    //       if (!user) {
    //         return null;
    //       }

    //       const passwordMatch = await bcrypt.compare(password, user.password);

    //       if (!passwordMatch) {
    //         return null;
    //       }

    //       return user;
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   },
    // }),

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
    signIn: "/login",
  },
  callbacks: {
    async signIn(user, account, profile) {
      if (!profile.email) {
        throw new Error("No profile found");
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
