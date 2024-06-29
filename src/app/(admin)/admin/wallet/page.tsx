"use client";

import { Loader2 } from "lucide-react";
import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";
import { WalletDataTable } from "~/components/ui/wallet-data-table";
import { wallet_columns } from "~/config/columns";
import { api } from "~/trpc/react";

export default function AdminWalletPage() {
  const { data: wallets, isLoading } = api.wallet.getAllWallets.useQuery();

  return (
    <>
      <MaxWidthWrapper>
        <div className="my-6">
          <div>
            <h2 className="text-2xl font-semibold">All Wallets</h2>
            <span className="text-lg text-muted-foreground">
              List of all the wallets created by users on the website.
            </span>
          </div>

          <div className="mt-4">
            {isLoading && (
              <div className="flex h-screen w-full flex-col items-center justify-center">
                <Loader2 className="animate-spin" />
              </div>
            )}
            {wallets && (
              <WalletDataTable columns={wallet_columns} data={wallets} />
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
