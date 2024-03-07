import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex h-10 items-center justify-between text-xs text-muted-foreground">
      <div></div>
      <div>
        {new Date().getFullYear()} &copy;
        <Link href={"https://softbase.dev"}>Softbase</Link>
      </div>
    </footer>
  );
};

export default Footer;
