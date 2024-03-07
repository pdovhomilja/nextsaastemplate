import bcrypt from "bcryptjs";

import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "@/schemas";

import { prisma } from "@/lib/db/prisma";

import type { NextAuthConfig } from "next-auth";

import { getUserByEmail } from "@/actions/user";

import { PrismaAdapter } from "@auth/prisma-adapter";

export default {
  providers: [
    GitHub,
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      //console.log("SignIn callback");
      return true;
    },
    session: async ({ session, token }) => {
      //console.log("Session callback");
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt({ token, user }) {
      //console.log("Token callback");
      return token;
    },
    authorized({ request, auth }) {
      //console.log("Authorized callback");
      return true;
    },
    async redirect({ url, baseUrl }) {
      //console.log("Redirect callback");
      //console.log(baseUrl, url, "redirect");
      return url;
    },
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;
