import React from "react";

import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { SignInButton } from "@/components/auth-components";
import { Link } from "@/navigation";
import LoginForm from "./login-form";

export function SignInForm() {
  const onClick = async (provider: "Google" | "Github") => {
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to {process.env.APP_NAME}
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to aceternity if you can because we don&apos;t have a login flow
        yet
      </p>

      <LoginForm />
      <div className="flex flex-col space-y-3">
        <SignInButton
          provider={"google"}
          providerName={"Sign in with Google"}
          icon={IconBrandGoogle}
          className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
        />
        <SignInButton
          provider={"github"}
          providerName={"Sign in with Github"}
          icon={IconBrandGithub}
          className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
        />
      </div>
      <div className="flex gap-5 justify-center py-3">
        <Link href="/" className="text-sm text-neutral-600">
          Forgot password?
        </Link>
        <span>or</span>
        <Link href="/sign-up" className="text-sm text-neutral-600">
          Create an account
        </Link>
      </div>
    </div>
  );
}
