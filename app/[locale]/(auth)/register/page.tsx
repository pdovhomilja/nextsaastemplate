import React, { use } from "react";
import { SignupFormDemo } from "../_components/register";

import { useTranslations } from "next-intl";

const SignUpForm = (props: { params: Promise<{ locale: string }> }) => {
  const params = use(props.params);

  const { locale } = params;

  const t = useTranslations("Index");
  return <SignupFormDemo />;
};

export default SignUpForm;
