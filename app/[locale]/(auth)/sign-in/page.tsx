import { auth } from "@/lib/auth/auth";
import { redirect } from "@/navigation";

import { SignInForm } from "../_components/sign-in-form";
import { unstable_setRequestLocale } from "next-intl/server";

const SignInPage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);
  const session = await auth();
  if (session) {
    return redirect("/");
  }
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <SignInForm />
    </div>
  );
};

export default SignInPage;
