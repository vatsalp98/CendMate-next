"use client";

import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { formatMoney, getCurrencySymbol } from "~/lib/utils";
import { api } from "~/trpc/react";
import Image from "next/image";
import { AnimatedNumbers } from "~/app/_components/animated-numbers";

export default function AdminHome() {
  const { data: balances } = api.admin.getWalletBalances.useQuery();

  return (
    <>
      <MaxWidthWrapper>
        <div className="my-6">
          <div>
            <h2 className="text-2xl font-semibold">Dashboard</h2>
            <span className="text-lg text-muted-foreground">
              Overview of all the users, wallets, transactions on the website.
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {balances?.map((item, index) => (
              <Card
                key={index}
                className="max-w-[200px] cursor-pointer shadow-md hover:shadow-lg dark:shadow-gray-800"
              >
                <CardHeader>
                  <Image
                    src={`/flags/${item.currency}.png`}
                    alt="Flag logo"
                    width={50}
                    height={50}
                    className="mb-4"
                  />
                  <CardTitle className="">
                    <span className="mr-2 text-muted-foreground">
                      {getCurrencySymbol(item.currency)}
                    </span>
                    {item.total === 0 ? (
                      <span>{formatMoney(item.total)}</span>
                    ) : (
                      <AnimatedNumbers value={item.total} />
                    )}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
