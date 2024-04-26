"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/lib/auth/auth";
import { generateVerificationToken } from "@/lib/tokens";

import { getUserByEmail } from "@/actions/user";
import { sendVerificationEmail } from "@/actions/mail";

import { LoginSchema } from "@/schemas";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }
  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      error: "User not found",
    };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return {
      success: "Confirmation email sent!",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return {
      success: "Logged in",
    };
  } catch (error) {
    //TODO: Handle error
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials",
          };
        default: {
          return {
            error: "An error occurred",
          };
        }
      }
    }
    throw error;
  }
};
