"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";

import { getUserByEmail } from "@/actions/user";
import { sendNewUserNotification, sendVerificationEmail } from "@/actions/mail";

import { db } from "@/lib/db/";
import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const newUser = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  // Send notification to all admins about new user
  const admins = await db.user.findMany({
    where: {
      role: "ADMIN",
    },
  });

  if (admins && newUser) {
    for (const admin of admins) {
      await sendNewUserNotification(
        admin?.email!,
        newUser.email!,
        newUser.name!
      );
    }
  }

  return {
    success:
      "Na Váš email byl odeslán verifikační token, potvrzením získáte přístup do aplikace!",
  };
};
