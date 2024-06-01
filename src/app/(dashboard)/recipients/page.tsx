import { PlusIcon } from "lucide-react";
import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";
import { Button } from "~/components/ui/button";

export default function RecipientsPage() {
  return (
    <>
      <section>
        <MaxWidthWrapper>
          <div className="">
            <div className="mt-6 flex w-full flex-row items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Your Recipients</h2>
                <span className="text-muted-foreground">
                  List of all your recipients
                </span>
              </div>
              <Button>
                <PlusIcon />
                Add Recipient
              </Button>
            </div>
            <div></div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
