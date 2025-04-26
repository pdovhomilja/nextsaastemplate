import { PHProvider } from "@/providers/posthog";
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PHProvider>{children}</PHProvider>;
}
