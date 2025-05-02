import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { auth } from "@/lib/auth/auth";
import { redirect } from "@/i18n/navigation";

import { getUserByEmail } from "@/actions/user";

import { UserStatus } from "@/prisma-client/app/generated/prisma/client";

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

  if (!user) {
    redirect({ href: "/login", locale: locale });
  }

  if (user?.status === UserStatus.PENDING) {
    redirect({ href: "/pending", locale: locale });
  }

  if (user?.status === UserStatus.BLOCKED) {
    redirect({ href: "/blocked", locale: locale });
  }

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
