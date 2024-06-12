"use client";

import { Loader2 } from "lucide-react";
import { api } from "~/trpc/react";
import TransactionCard from "./TransactionCard";

interface TransactionListProps {
  limit?: number;
}

export default function TransactionsList({ limit }: TransactionListProps) {
  const transactions = api.transactions.getTransactions.useQuery();

  if (transactions.isLoading) {
    return (
      <div className="flex h-[100px] w-full flex-col items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (transactions.data)
    return (
      <>
        {transactions.data?.length === 0 && (
          <div className="flex w-full flex-col items-center justify-center rounded-lg border border-dashed py-10">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-lg font-semibold">No transactions found.</h2>
              <span className="text-sm text-muted-foreground">
                Once you make a transactions you see more details here.
              </span>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-4">
          {transactions.data
            ?.slice(0, limit)
            .map((item) => (
              <TransactionCard item={item} key={item.id} sender={item.sender} />
            ))}
        </div>
      </>
    );
}
