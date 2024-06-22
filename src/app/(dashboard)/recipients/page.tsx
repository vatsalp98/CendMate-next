import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";
import { buttonVariants } from "~/components/ui/button";

import Link from "next/link";

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
              <Link href={"/recipients/new"} className={buttonVariants()}>
                Add Recipient
              </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
