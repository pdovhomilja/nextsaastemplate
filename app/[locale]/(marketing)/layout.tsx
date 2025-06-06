import React from "react";
import Top from "./_components/top";
import Footer from "./_components/footer";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full h-full">
      <Top />
      <div className="flex justify-center items-center mx-auto  w-[80vw]">
        {children}
      </div>
      <Footer />
    </div>
  );
}
