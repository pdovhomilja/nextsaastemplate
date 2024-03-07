import React from "react";
import Top from "./_components/top";
import { unstable_setRequestLocale } from "next-intl/server";

const MarketingLayout = ({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);
  return (
    <div className="flex flex-col w-full h-full">
      <Top />
      <div className="flex justify-center items-center mx-auto  w-[80vw]">
        {children}
      </div>
    </div>
  );
};

export default MarketingLayout;
