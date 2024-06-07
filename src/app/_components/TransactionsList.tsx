"use client";

import { ArrowDownCircle, Loader2 } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { formatMoney } from "~/lib/utils";
import { api } from "~/trpc/react";

interface TransactionListProps {
  limit?: number;
}

export default function TransactionsList({ limit }: TransactionListProps) {
  const transactions = api.transactions.getTransactions.useQuery();

  if (transactions.isLoading) {
    return <Loader2 className="animate-spin" />;
  }

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
        {transactions.data?.slice(0, limit).map((item) => (
          <Card
            key={item.id}
            className="flex cursor-pointer flex-row items-center justify-between pr-10 shadow-md transition-all duration-75 hover:shadow-lg"
          >
            <div className="flex flex-row items-center pl-4">
              <div>
                <ArrowDownCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <CardHeader>
                  <CardTitle>
                    {item.sender.firstName} {item.sender.lastName}
                  </CardTitle>
                  <CardDescription>
                    Created On {new Date(item.createdAt).toLocaleString()}
                  </CardDescription>
                  <div>
                    Transaction Id: <strong>{item.fincraPayCode}</strong>
                  </div>
                  <div>
                    <Badge className="rounded-sm bg-[#FFFF00] uppercase text-black">
                      {item.status}
                    </Badge>
                  </div>
                </CardHeader>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Badge className="rounded-sm text-lg" variant={"outline"}>
                {item.currency}
              </Badge>
              <p className="text-lg font-bold">{formatMoney(item.amount)}</p>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
