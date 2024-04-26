import { Button } from "@/components/ui/button";
import { SignOut } from "@/components/auth-components";

const PendingPage = async () => {
  return (
    <div className="flex flex-col space-y-5 justify-center items-center ">
      <p> Váš účet ještě nebyl schválen. Počkejte prosím na schválení.</p>

      <Button asChild className="w-full">
        <SignOut />
      </Button>
    </div>
  );
};

export default PendingPage;
