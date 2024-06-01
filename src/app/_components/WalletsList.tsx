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

export default function WalletList() {
  const wallets = api.wallet.getWallets.useQuery();

  if (wallets.isLoading) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <>
      <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {wallets.data?.map((item) => (
          <Card
            key={item._id}
            className="max-w-[200px] cursor-pointer shadow-md hover:shadow-lg"
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
        ))}
      </div>
    </>
  );
}
