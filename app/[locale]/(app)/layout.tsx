import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { auth } from "@/lib/auth/auth";
import { redirect } from "@/i18n/navigation";

const AppLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const session = await auth();

  if (!session) {
    redirect({ href: "/login", locale: locale });
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <div className="flex flex-col w-full p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default AppLayout;
