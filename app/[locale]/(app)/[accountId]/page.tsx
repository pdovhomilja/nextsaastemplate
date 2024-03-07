import { redirect } from "next/navigation";
import React from "react";

const RedirectDashboardPage = () => {
  redirect("/en");
};

export default RedirectDashboardPage;
