import { getUserById } from "@/actions/user";
import { auth } from "@/lib/auth/auth";
import { redirect } from "@/navigation";

import { getTranslations } from "next-intl/server";

const DashboardPage = async ({
  params: { accountId },
}: {
  params: { accountId: string };
}) => {
  const t = await getTranslations("Dashboard");

  const session = await auth();
  if (!session) {
    return redirect("/sign-in");
  }

  const user = await getUserById(session.user?.id!);

  if (accountId !== user?.companyId) {
    return <div>You are trying to reach others workspace!</div>;
  }

  return (
    <div>
      <h1> {t("title")}</h1>
      <h2>{t("description")}</h2>
      Iam dashboard of user: {session?.user?.name}, userId: {session.user?.id},
      params accountId: {accountId}
      <div>
        User role: <pre>{JSON.stringify(user?.roles[0], null, 2)}</pre>
      </div>
    </div>
  );
};

export default DashboardPage;
