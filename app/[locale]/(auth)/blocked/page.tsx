import { Button } from "@/components/ui/button";
import { SignOut } from "@/components/auth-components";

const BlockedPage = async () => {
  return (
    <div className="flex flex-col space-y-5 justify-center items-center ">
      <p> Váš účet byl zablokován. </p>

      <Button asChild className="w-full">
        <SignOut />
      </Button>
    </div>
  );
};

export default BlockedPage;
