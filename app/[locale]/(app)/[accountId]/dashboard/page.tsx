import { getUserByEmail, getUserById } from "@/actions/user";
import { redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth/auth";

import { getTranslations } from "next-intl/server";

const DashboardPage = async (props: {
  params: Promise<{ accountId: string; locale: string }>;
}) => {
  const params = await props.params;

  const { accountId } = params;

  const t = await getTranslations("Dashboard");

  const session = await auth();

  if (!session) {
    redirect({ href: "/login", locale: params.locale });
  }

  const user = await getUserByEmail(session?.user?.email!);

  if (accountId !== user?.companyId) {
    return <div>You are trying to reach others workspace!</div>;
  }

  return (
    <div>
      <h1> {t("title")}</h1>
      <h2>{t("description")}</h2>
      Iam dashboard of user: {session?.user?.name}, userId: {session?.user?.id},
      params accountId: {accountId}
      <div>
        User role: <pre>{JSON.stringify(user?.role, null, 2)}</pre>
      </div>
    </div>
  );
};

export default DashboardPage;
