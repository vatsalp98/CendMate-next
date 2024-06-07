"use client";

import { Loader2 } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import Image from "next/image";
import { formatMoney } from "~/lib/utils";
import CreateWalletForm from "~/app/_components/CreateWalletForm";
import Link from "next/link";

export default function WalletList() {
  const wallets = api.wallet.getWallets.useQuery();

  if (wallets.isLoading) {
    return (
      <div className="flex h-[100px] w-full flex-col items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="mt-10">
        <div className="mb-6 flex w-full flex-row justify-between">
          <div>
            <h3 className="text-2xl font-semibold">Your Wallets</h3>
            <span className="text-muted-foreground">
              List of all your wallets.
            </span>
          </div>
          <CreateWalletForm refetch={wallets.refetch} />
        </div>
        {wallets.data?.length === 0 && (
          <div className="flex w-full flex-col items-center justify-center rounded-lg border border-dashed py-10">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-lg font-semibold">No wallets found.</h2>
              <span className="text-sm text-muted-foreground">
                Create a new wallet to get started.
              </span>
            </div>
          </div>
        )}
        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {wallets.data?.map((item) => (
            <Link href={`/wallets/${item.id}`} key={item.id}>
              <Card
                key={item.id}
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
                  <CardTitle>{formatMoney(item.amount)}</CardTitle>
                  <CardDescription>{item.currency}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
