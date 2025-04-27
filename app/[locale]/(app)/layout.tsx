import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { auth } from "@/lib/auth/auth";
import { redirect } from "@/i18n/navigation";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/actions/user";

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

  const user = await getUserByEmail(session?.user?.email!);

  console.log("AccountId", user?.companyId);

  return (
    <SidebarProvider>
      <AppSidebar user={user!} />
      <main>
        <SidebarTrigger />
        <div className="flex flex-col w-full p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default AppLayout;
