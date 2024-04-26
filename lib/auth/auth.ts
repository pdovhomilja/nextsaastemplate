import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";

import authConfig from "@/lib/auth/auth.config";

import { getUserById } from "@/actions/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "credentials") return true;

      //TODO: Check why user can be undefined
      const existingUser = await getUserById(user.id!);

      if (!existingUser?.emailVerified) return false;

      //TODO: Add 2FA check
      //console.log("SignIn callback");
      return true;
    },
    async session({ session, token }) {
      //console.log("Session:", session);
      return session;
    },
    async jwt({ token, user }) {
      //console.log("Token callback");
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      //console.log("Token:", token);
      return token;
    },
    async authorized({ request, auth }) {
      //console.log("Authorized callback");
      return true;
    },
    async redirect({ url, baseUrl }) {
      //console.log("Redirect callback");
      //console.log(baseUrl, url, "redirect");
      return url;
    },
  },

  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
