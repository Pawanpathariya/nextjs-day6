import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import User from "@/app/model/User";
import bcrypt from 'bcrypt';
import dbConnect from "@/app/lib/connection";
const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),

    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        let user;
        try {
          dbConnect();
          user = await User.findOne({ email });
        } catch (error) {
          console.error("Database query failed", error);
          throw new Error("Internal server error.");
        }

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          throw new Error("Invalid credentials.");
        }

        return Promise.resolve(user);
      },
    }),

  ],
  secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };


