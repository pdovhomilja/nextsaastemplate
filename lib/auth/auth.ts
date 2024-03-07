import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";

import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../db/prisma";

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  pages: {
    signIn: "/sign-in",
  },
  adapter: PrismaAdapter(prisma),
  ...authConfig,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
