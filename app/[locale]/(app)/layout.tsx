import Footer from "@/components/footer";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import { unstable_setRequestLocale } from "next-intl/server";

const AppLayout = ({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);
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
