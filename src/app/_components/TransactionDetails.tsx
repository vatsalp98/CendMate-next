"use client";

import { BanknoteIcon, Loader2Icon, ReceiptText, UserIcon } from "lucide-react";
import { api } from "~/trpc/react";
import { cn, formatCurrency } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import Link from "next/link";

interface TransactionDetailsProps {
  id: string;
}

export default function TransactionDetailsComponents({
  id,
}: TransactionDetailsProps) {
  const { data: transaction, isLoading: transactionLoading } =
    api.transactions.getTransactionById.useQuery({
      id,
    });

  if (transactionLoading) {
    return (
      <>
        <div className="flex min-h-screen w-full flex-col items-center justify-center">
          <Loader2Icon className="animate-spin" />
        </div>
      </>
    );
  }

  if (transaction)
    return (
      <>
        <div>
          <div className="mt-6">
            <div>
              <h2 className="text-2xl font-bold">
                Transaction #{transaction.referenceId}
              </h2>
            </div>
            <div className="my-5">
              <Accordion type="multiple" defaultValue={["item-1"]}>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex flex-row gap-2">
                      <ReceiptText />
                      Transaction Details
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-muted-foreground">
                          Amount
                        </span>
                        <strong>
                          {formatCurrency(
                            transaction.currency,
                            transaction.amount,
                          )}
                        </strong>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-muted-foreground">
                          Currency
                        </span>
                        <strong>{transaction.currency}</strong>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-muted-foreground">
                          Reference ID
                        </span>
                        <strong>{transaction.referenceId}</strong>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-muted-foreground">
                          Type
                        </span>
                        <strong className="uppercase">
                          {transaction.type}
                        </strong>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-muted-foreground">
                          Status
                        </span>
                        <div>
                          <Badge
                            className={cn(
                              "rounded-sm font-semibold",
                              transaction.status === "SUCCESS"
                                ? "bg-green-700"
                                : "bg-yellow-700",
                            )}
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-muted-foreground">
                          Created At
                        </span>
                        <strong className="uppercase">
                          {new Date(transaction.createdAt).toLocaleString()}
                        </strong>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-muted-foreground">
                          Updated At
                        </span>
                        <strong className="uppercase">
                          {new Date(transaction.updatedAt).toLocaleString()}
                        </strong>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-muted-foreground">
                          Description
                        </span>
                        <strong className="">{transaction.comment}</strong>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <div className="flex flex-row gap-2">
                      <UserIcon />
                      User Details
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-muted-foreground">
                          Sender Name
                        </span>
                        <strong>
                          {transaction.sender.firstName}{" "}
                          {transaction.sender.lastName}
                        </strong>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-muted-foreground">
                          Sender Email
                        </span>
                        <strong className="">{transaction.sender.email}</strong>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                {transaction.status === "SUBMITTED" && (
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Payment Details</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-muted-foreground">
                            Pay Code
                          </span>
                          <strong className="">
                            {transaction.fincraPayCode}
                          </strong>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-muted-foreground">
                            Payment Link
                          </span>
                          <Link
                            href={transaction.fincraLink!}
                            target="_blank"
                            className={
                              "font-semibold hover:text-primary hover:underline"
                            }
                          >
                            Link &rarr;
                          </Link>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}
                {transaction.status === "SUCCESS" && (
                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      <div className="flex flex-row gap-24">
                        <BanknoteIcon />
                        Charge Details
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-muted-foreground">
                            Fincra Pay Code
                          </span>
                          <strong className="">
                            {transaction.fincraPayCode}
                          </strong>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-muted-foreground">
                            Sender Phone
                          </span>
                          <strong className="">
                            {transaction.fincraPhone}
                          </strong>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-muted-foreground">
                            Sender Operator
                          </span>
                          <strong className="">
                            {transaction.fincraPhoneOperator}
                          </strong>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-muted-foreground">
                            Charge Reference
                          </span>
                          <strong>{transaction.fincraChargeReference}</strong>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </div>
          </div>
        </div>
      </>
    );
}
