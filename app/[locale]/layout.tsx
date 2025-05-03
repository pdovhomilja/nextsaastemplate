import { Inter } from "next/font/google";
import "../globals.css";

//Theme provider
import { ThemeProvider } from "@/providers/theme-provider";

//PostHog provider
import { PHProvider } from "@/providers/posthog";

//i18n - via next-intl
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

//Toast notification
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className + "w-full h-screen"}>
        <PHProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </ThemeProvider>
        </PHProvider>
        <Toaster />
      </body>
    </html>
  );
}
