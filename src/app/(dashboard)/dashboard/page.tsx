"use client";

import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";
import { Button } from "~/components/ui/button";
import TransactionsList from "~/app/_components/TransactionsList";
import WalletList from "~/app/_components/WalletsList";
import DailyLimitTable from "~/app/_components/DailyLimitTable";
import { ArrowUpRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";

export default function DashboardPage() {
  const params = useSearchParams();
  const newUser = params.get("new");

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

            <div className="mt-10">
              <WalletList />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="mb-10">
        <MaxWidthWrapper>
          <div className="border-t border-gray-200">
            <div className="mt-6 flex w-full flex-row justify-between">
              <h2 className="text-2xl font-bold">Transactions</h2>
              <Button variant={"outline"} className="gap-2">
                View more
                <ArrowUpRight />
              </Button>
            </div>
            <div className="mt-4">
              <TransactionsList limit={3} />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="mb-10">
        <MaxWidthWrapper>
          <div className="border-t border-gray-200">
            <div className="mt-6 flex w-full flex-row justify-between">
              <h2 className="text-2xl font-bold">Daily Limits</h2>
            </div>
            <div className="mt-4 rounded-lg border">
              <DailyLimitTable />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
