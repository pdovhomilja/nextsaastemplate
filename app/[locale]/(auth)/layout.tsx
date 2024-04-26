import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import React from "react";

const AuthLayout = ({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex justify-between p-5">
        <Button asChild>
          <Link href={"/"}>Home</Link>
        </Button>
        <div>
          <ThemeToggle />
        </div>
      </div>
      <div className="flex grow justify-center items-center">{children}</div>
      <div className="flex text-xs justify-end pr-5 text-muted-foreground"></div>
    </div>
  );
};

export default AuthLayout;
