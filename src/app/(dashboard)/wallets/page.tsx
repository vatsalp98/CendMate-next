import { PlusIcon } from "lucide-react";
import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";
import WalletList from "~/app/_components/WalletsList";
import { Button } from "~/components/ui/button";

export default function WalletsPage() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="mt-10">
          <div className="mb-6 flex w-full flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl font-semibold">Your Wallets</h3>
              <span className="text-muted-foreground">
                List of all your wallets.
              </span>
            </div>
            <Button variant={"default"} className="flex flex-row gap-2">
              <PlusIcon />
              Create Wallet
            </Button>
          </div>
          <div className="">
            <WalletList />
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
