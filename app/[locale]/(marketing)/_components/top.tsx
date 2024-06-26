import { getUserByEmail } from "@/actions/user";
import { SignOut } from "@/components/auth-components";
import ShinyButton from "@/components/buttons/shiny-button";
import LocaleSwitcher from "@/components/locale-switcher";
import { LoginButton } from "@/components/login-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { Link } from "@/navigation";

import React from "react";

const Top = async () => {
  const session = await auth();

  if (!session) {
    return (
      <div className="flex justify-between items-center p-5">
        <div>
          <Link href={"/"}>Logo</Link>
        </div>
        <div className="flex gap-3 items-center">
          <LocaleSwitcher />
          <LoginButton
            asChild
            borderRadius="0.55rem"
            className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-black"
          >
            <Link
              href={{
                pathname: "/login",
              }}
            >
              Sign In
            </Link>
          </LoginButton>
          {/*           <ShinyButton title="Sign in" pathname="/login" /> */}
          <ThemeToggle />
        </div>
      </div>
    );
  }

  const user = await getUserByEmail(session.user?.email!);

  return (
    <div className="flex justify-between items-center p-5">
      <div>
        <Link href={"/"}>Logo</Link>
      </div>
      <div className="flex gap-3 items-center">
        <LocaleSwitcher />
        <Button asChild>
          <Link
            href={{
              pathname: `/[sessionId]/dashboard`,
              params: { sessionId: user?.companyId! },
            }}
          >
            Dashboard
          </Link>
        </Button>
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative w-8 h-8 rounded-full">
              <Avatar className="w-8 h-8">
                {session?.user?.image && (
                  <AvatarImage
                    src={session.user.image}
                    alt={session.user.name ?? ""}
                  />
                )}
                <AvatarFallback>{session?.user?.email}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session.user?.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session.user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <SignOut />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Top;
