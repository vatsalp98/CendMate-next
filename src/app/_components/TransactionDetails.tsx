"use client";

import {
  ArrowUpRightFromSquare,
  Calendar,
  Loader2Icon,
  NotebookPen,
} from "lucide-react";
import { api } from "~/trpc/react";
import Image from "next/image";
import { formatCurrency } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";

interface TransactionDetailsProps {
  id: string;
}

export default function TransactionDetailsComponents({
  id,
}: TransactionDetailsProps) {
  const { data: transactionData, isLoading: transactionLoading } =
    api.transactions.getTransactionById.useQuery({ id });

  if (transactionLoading) {
    return (
      <>
        <div className="flex min-h-screen w-full flex-col items-center justify-center">
          <Loader2Icon className="animate-spin" />
        </div>
      </>
    );
  }

  if (transactionData)
    return (
      <>
        <div>
          <div className="mt-6">
            <div className="flex flex-row items-center justify-between gap-4">
              <div className="flex flex-row items-center gap-2">
                <Image
                  src={`${transactionData.sender.avatar}`}
                  alt="Currency flag"
                  className="rounded-full bg-slate-800 p-1 dark:bg-white"
                  width={100}
                  height={100}
                />
                <div className="ml-1">
                  <h2 className="text-2xl font-semibold">
                    {transactionData.sender.firstName}{" "}
                    {transactionData.sender.lastName}
                  </h2>
                  <div className="flex flex-col items-start gap-1">
                    <span className="ml-1 text-muted-foreground">
                      Reference Id:{" "}
                      <strong>{transactionData.referenceId}</strong>
                    </span>
                    <Badge
                      className="rounded-sm font-semibold"
                      variant={"default"}
                    >
                      {transactionData.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center text-2xl font-bold">
                <div>
                  <Image
                    src={`/flags/${transactionData.currency}.png`}
                    width={50}
                    height={50}
                    alt="Currency flag"
                  />
                </div>
                {formatCurrency(
                  transactionData.wallet.currency,
                  transactionData.amount,
                )}
              </div>
            </div>
            <Separator className="mb-2 mt-4" />
            <div className="flex flex-col gap-2">
              <div className="flex w-full flex-row items-center justify-between">
                <span className="text-sm font-semibold text-muted-foreground">
                  {transactionData.comment}
                </span>
                <NotebookPen className="text-muted-foreground" />
              </div>
              {transactionData.fincraLink && (
                <div className="flex w-full flex-row items-center justify-between">
                  <Link
                    href={transactionData.fincraLink}
                    target="_blank"
                    className={buttonVariants({
                      variant: "link",
                      className: "mt-0 pl-0 text-sm text-muted-foreground",
                    })}
                  >
                    {transactionData.fincraLink}
                  </Link>
                  <ArrowUpRightFromSquare className="text-muted-foreground" />
                </div>
              )}
              <div className="flex w-full flex-row items-center justify-between">
                <span className="text-sm font-semibold text-muted-foreground">
                  Created At:{" "}
                  {new Date(transactionData.createdAt).toLocaleString()}
                </span>
                <Calendar className="text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
