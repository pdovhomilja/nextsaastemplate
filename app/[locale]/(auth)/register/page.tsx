import React from "react";
import { SignupFormDemo } from "../_components/register";
import { unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

const SignUpForm = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations("Index");
  return <SignupFormDemo />;
};

export default SignUpForm;
