import Footer from "@/components/footer";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

import { auth } from "@/lib/auth/auth";
import { redirect } from "@/i18n/navigation";

const AppLayout = async (props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const params = await props.params;

  const { locale } = params;

  const { children } = props;

  const session = await auth();

  if (!session) {
    redirect({ href: "/login", locale: params.locale });
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar />

      <div className="flex  h-full">
        <div className="flex border-r h-full justify-center px-5">
          <Sidebar />
        </div>
        <div className="flex h-full w-full px-5 flex-col">
          <div className="grow"> {children} </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
