import Footer from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { unstable_setRequestLocale } from "next-intl/server";
import Link from "next/link";
import React from "react";

const AuthLayout = ({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex justify-between p-5">
        <div>
          <Link href={"/"}>Logo</Link>
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>
      <div className="flex grow justify-center items-center">{children}</div>
      <div className="flex text-xs justify-end pr-5 text-muted-foreground">
        <Footer />
      </div>
    </div>
  );
};

export default AuthLayout;
