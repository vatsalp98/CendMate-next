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
      <div className="flex flex-col gap-4">
        {transactions.data?.slice(0, limit).map((item) => (
          <Card
            key={item._id}
            className="flex cursor-pointer flex-row items-center justify-between pr-10 shadow-md transition-all duration-75 hover:shadow-lg"
          >
            <div className="flex flex-row items-center pl-4">
              <div>
                <ArrowDownCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <CardHeader>
                  <CardTitle>
                    {item.user.fName} {item.user.lName}
                  </CardTitle>
                  <CardDescription>
                    Created On {new Date(item.createdAt).toLocaleString()}
                  </CardDescription>
                  <div>
                    Transaction Id: <strong>{item.fincra.payCode}</strong>
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
