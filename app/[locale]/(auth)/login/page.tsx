import { auth } from "@/lib/auth/auth";

import { SignInForm } from "../_components/login";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await auth();
  if (session) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex h-screen w-full justify-center items-center">
      <SignInForm />
    </div>
  );
};

export default SignInPage;
