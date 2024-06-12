"use client";

import {
  ArrowDown,
  ArrowDownCircle,
  ArrowUpCircle,
  ArrowUpRight,
  Loader2Icon,
} from "lucide-react";
import { api } from "~/trpc/react";
import Image from "next/image";
import { formatCurrency } from "~/lib/utils";
import LimitCard from "./WithdrawalCard";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import TransactionCard from "./TransactionCard";
import DepositDialog from "./DepositDialog";
import ConvertDialog from "./ConvertDialog";

interface WalletDetailsProps {
  id: string;
}

export default function WalletDetails({ id }: WalletDetailsProps) {
  const { data: walletData, isLoading: walletLoading } =
    api.wallet.getWalletById.useQuery({ id });

  const { data: transactionsData, refetch: refetchTransactions } =
    api.transactions.getTransactionsByWallet.useQuery({ id });

  if (walletLoading) {
    return (
      <>
        <div className="flex min-h-screen w-full flex-col items-center justify-center">
          <Loader2Icon className="animate-spin" />
        </div>
      </>
    );
  }

  if (walletData)
    return (
      <>
        <div>
          <div className="mt-6">
            <div className="flex flex-row items-center justify-between gap-4">
              <div className="flex flex-row items-center gap-2">
                <Image
                  src={`/flags/${walletData.wallet.currency}.png`}
                  alt="Currency flag"
                  width={100}
                  height={100}
                />
                <h2 className="text-2xl font-semibold">
                  {walletData.wallet.currency} Wallet
                </h2>
              </div>
              <div className="text-2xl font-bold">
                {formatCurrency(
                  walletData.wallet.currency,
                  walletData.wallet.amount,
                )}
              </div>
            </div>
          </div>
          <div className="my-4 flex w-full flex-row gap-4">
            <DepositDialog
              wallet_id={id}
              refetchTransactions={refetchTransactions}
              currency={walletData.wallet.currency}
              mapleRadAccountNumber={walletData.wallet.mapleRadAccountNumber!}
            />
            <ConvertDialog currency={walletData.wallet.currency} />

            {/* <Button className="flex-1 gap-1" variant={"outline"}>
              <ArrowUp />
              Send
            </Button> */}
            <Button className="flex-1 gap-1" variant={"outline"}>
              <ArrowDown />
              Withdraw
            </Button>
          </div>

          <div className="mt-3 flex w-full flex-row gap-4">
            <LimitCard
              icon={<ArrowDownCircle className="text-primary" />}
              title="Deposit"
              used={0}
              daily_limit={formatCurrency(
                walletData.wallet.currency,
                walletData.limit?.deposit_daily ?? 0,
              )}
              weekly_limit={formatCurrency(
                walletData.wallet.currency,
                walletData.limit?.deposit_weekly ?? 0,
              )}
              monthly_limit={formatCurrency(
                walletData.wallet.currency,
                walletData.limit?.deposit_monthly ?? 0,
              )}
            />
            <LimitCard
              title="Withdrawal"
              icon={<ArrowUpCircle className="text-primary" />}
              used={0}
              daily_limit={formatCurrency(
                walletData.wallet.currency,
                walletData.limit?.withdraw_daily ?? 0,
              )}
              weekly_limit={formatCurrency(
                walletData.wallet.currency,
                walletData.limit?.withdraw_weekly ?? 0,
              )}
              monthly_limit={formatCurrency(
                walletData.wallet.currency,
                walletData.limit?.withdraw_monthly ?? 0,
              )}
            />
          </div>
          <Separator className="my-5" />
          <div className="flex flex-col gap-2">
            <div className="flex w-full flex-row items-center justify-between">
              <div className="flex w-full flex-col">
                <h2 className="text-2xl font-bold">Transactions</h2>
                <span className="text-muted-foreground">
                  List of transactions for this wallet.
                </span>
              </div>
              <div>
                <Button variant={"outline"} className="gap-1">
                  View All
                  <ArrowUpRight />
                </Button>
              </div>
            </div>
            <div className="mt-5">
              {transactionsData?.length === 0 && (
                <div className="flex w-full flex-col items-center justify-center rounded-lg border border-dashed py-10">
                  <div className="flex flex-col items-center justify-center">
                    <h2 className="text-lg font-semibold">
                      No transactions found.
                    </h2>
                    <span className="text-sm text-muted-foreground">
                      Once you make a transactions you see more details here.
                    </span>
                  </div>
                </div>
              )}
              {transactionsData
                ?.slice(0, 3)
                .map((item) => (
                  <TransactionCard
                    key={item.id}
                    item={item}
                    sender={item.sender}
                  />
                ))}
            </div>
          </div>
        </div>
      </>
    );
}
