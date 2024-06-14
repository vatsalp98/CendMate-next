import type { Transaction, User } from "@prisma/client";
import { ArrowDownCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn, formatMoney } from "~/lib/utils";

interface TransactionCardProps {
  item: Transaction;
  sender: User;
}

export default function TransactionCard({
  item,
  sender,
}: TransactionCardProps) {
  return (
    <>
      <Link href={`/transactions/${item.id}`}>
        <Card
          key={item.id}
          className="flex cursor-pointer flex-row items-center justify-between pr-10 shadow-md transition-all duration-75 hover:shadow-lg dark:shadow-gray-800"
        >
          <div className="flex flex-row items-center pl-4">
            <div>
              <ArrowDownCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <CardHeader>
                <CardTitle>
                  {sender.firstName} {sender.lastName}
                </CardTitle>
                <CardDescription>
                  Created On {new Date(item.createdAt).toLocaleString()}
                </CardDescription>
                <div>
                  Transaction Id: <strong>{item.fincraPayCode}</strong>
                </div>
                <div>
                  <Badge
                    className={cn(
                      "rounded-sm uppercase text-black",
                      item.status === "SUCCESS"
                        ? "bg-green-500"
                        : "bg-yellow-500",
                    )}
                  >
                    {item.status}
                  </Badge>
                </div>
              </CardHeader>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Badge className={cn("rounded-sm text-lg")} variant={"outline"}>
              {item.currency}
            </Badge>
            <p className="text-lg font-bold">{formatMoney(item.amount)}</p>
          </div>
        </Card>
      </Link>
    </>
  );
}
