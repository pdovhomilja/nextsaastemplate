import React from "react";
import { SignupFormDemo } from "../_components/sign-up-form";
import { unstable_setRequestLocale } from "next-intl/server";

const SignUpForm = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  return <SignupFormDemo />;
};

export default SignUpForm;
