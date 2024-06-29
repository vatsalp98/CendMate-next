"use client";

import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";
import { buttonVariants } from "~/components/ui/button";
import TransactionsList from "~/app/_components/TransactionsList";
import WalletList from "~/app/_components/WalletsList";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import Link from "next/link";
import { useCurrentUser } from "~/hooks/use-current-user";
import KYCCard from "~/app/_components/KYCCard";
import ForexCard from "~/app/_components/forex-card";

export default function DashboardPage() {
  const params = useSearchParams();
  const newUser = params.get("new");
  const user = useCurrentUser();

  if (newUser) {
    void confetti();
  }

  return (
    <>
      <section className="">
        <MaxWidthWrapper>
          <div className="my-6">
            <div>
              <h2 className="text-2xl font-semibold">Welcome,</h2>
              <span className="text-lg">
                Ready to build your own portfolio today!
              </span>
            </div>

            {user?.isVerified ? (
              <>
                <div className="mt-10">
                  <WalletList />
                </div>
              </>
            ) : (
              <div className="mt-5">
                <KYCCard />
              </div>
            )}
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="mb-10">
        <MaxWidthWrapper>
          <div className="border-t border-gray-200">
            {user?.isVerified ? (
              <>
                <div className="mt-6 flex w-full flex-row items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Your Transactions</h2>
                    <span className="text-muted-foreground">
                      List of all your transactions.
                    </span>
                  </div>
                  <Link
                    href="/transactions"
                    className={buttonVariants({
                      variant: "link",
                      className: "gap-2",
                    })}
                  >
                    View more &rarr;
                  </Link>
                </div>
                <div className="mt-6">
                  <TransactionsList limit={3} />
                </div>
              </>
            ) : (
              <div className="mt-10">
                <ForexCard />
              </div>
            )}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
