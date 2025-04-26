import { auth } from "@/lib/auth/auth";

import { SignInForm } from "../_components/login";
import { redirect } from "@/i18n/navigation";

const SignInPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const session = await auth();
  const { locale } = await params;

  if (session) {
    redirect({ href: "/", locale: locale });
  }

  return (
    <div className="flex h-screen w-full justify-center items-center">
      <SignInForm />
    </div>
  );
};

export default SignInPage;
