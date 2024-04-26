import { SignInButton } from "@/components/auth-components";

import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import RegisterFrom from "./register-form";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";

export function SignupFormDemo() {
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Vítejte na portálu - {process.env.NEXT_PUBLIC_APP_NAME}
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Vyplněním tohoto formuláře vytvoříte nový účet. Pokud již máte účet,
        přihlaste se. Po registraci Vám bude zaslán email s potvrzením
        registrace.
      </p>

      <RegisterFrom />
      {/*       <div className="flex flex-col space-y-3">
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
      </div> */}
      <div className="flex items-center justify-center">
        <div className="flex gap-5 justify-center items-center py-3">
          <Button
            size={"sm"}
            variant={"link"}
            asChild
            className="px-0 font-normal text-neutral-600"
          >
            <Link
              href={{ pathname: "/auth/reset" }}
              className="text-sm text-neutral-600"
            >
              Zapoměli jste heslo?
            </Link>
          </Button>
          <span className="text-sm">nebo</span>
          <Button
            size={"sm"}
            variant={"link"}
            asChild
            className="px-0 font-normal text-neutral-600"
          >
            <Link
              href={{ pathname: "/login" }}
              className="text-sm text-neutral-600"
            >
              Přihlaste se
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
