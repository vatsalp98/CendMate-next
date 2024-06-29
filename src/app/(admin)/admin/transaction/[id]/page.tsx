"use client";

import {
  ArrowUpDown,
  ChevronLeft,
  Loader2,
  ReceiptText,
  User,
  Wallet,
} from "lucide-react";
import { useRouter } from "next/navigation";
import CopyButton from "~/app/_components/CopyButton";
import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";
import AccordionDetailsItem from "~/app/_components/accordion-item";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { formatCurrency, formatMoney, isFincraCurrency } from "~/lib/utils";
import { api } from "~/trpc/react";

interface AdminTransactionDetailsProps {
  params: {
    id: string;
  };
}

export default function AdminTransactionDetails({
  params: { id },
}: AdminTransactionDetailsProps) {
  const router = useRouter();
  const { data: transaction, isLoading } =
    api.transactions.getTransactionById.useQuery({
      id,
    });

  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (transaction)
    return (
      <>
        <div>
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => {
              router.back();
            }}
          >
            <ChevronLeft />
          </Button>
        </div>
        <MaxWidthWrapper>
          <div className="my-6">
            <div>
              <div className="flex flex-row items-center gap-2">
                <h2 className="text-2xl font-semibold">
                  Transaction #{transaction.id}
                </h2>
                <CopyButton text={transaction.id} textTitle="Transaction ID" />
              </div>
            </div>

            <div className="mt-4">
              <Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex flex-row gap-2">
                      <ReceiptText />
                      Transaction Details
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      <AccordionDetailsItem
                        title="Amount"
                        value={formatCurrency(
                          transaction.currency,
                          formatMoney(transaction.amount),
                        )}
                      />
                      <AccordionDetailsItem
                        title="Currency"
                        value={transaction.currency}
                      />
                      <AccordionDetailsItem
                        title="Customer Reference"
                        value={transaction.referenceId}
                      />
                      <AccordionDetailsItem
                        title="Transaction Type"
                        value={transaction.type.toUpperCase()}
                      />
                      <AccordionDetailsItem
                        title="Transaction Status"
                        value={transaction.status}
                        isBadge={true}
                        className={
                          transaction.status === "SUCCESS"
                            ? "bg-green-700"
                            : "bg-yellow-500"
                        }
                      />
                      <AccordionDetailsItem
                        title="Comment"
                        value={transaction.comment}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <div className="flex flex-row gap-2">
                      <User />
                      User Details
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      <AccordionDetailsItem
                        title="ID"
                        value={transaction.senderId}
                      />
                      <AccordionDetailsItem
                        title="Full Name"
                        value={
                          transaction.sender.firstName +
                          " " +
                          transaction.sender.lastName
                        }
                      />
                      <AccordionDetailsItem
                        title="Email"
                        value={transaction.sender.email}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <div className="flex flex-row gap-2">
                      <Wallet />
                      Wallet Details
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      <AccordionDetailsItem
                        title="ID"
                        value={transaction.walletId}
                      />
                      <AccordionDetailsItem
                        title="Currency"
                        value={transaction.wallet.currency}
                      />
                      <AccordionDetailsItem
                        title="Balance"
                        value={formatCurrency(
                          transaction.currency,
                          formatMoney(transaction.wallet.amount),
                        )}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                {transaction.status === "SUCCESS" &&
                  isFincraCurrency(transaction.currency) && (
                    <AccordionItem value="item-4">
                      <AccordionTrigger>
                        <div className="flex flex-row gap-2">
                          <ArrowUpDown />
                          Charge Details
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                          <AccordionDetailsItem
                            title="Charge Reference"
                            value={transaction.fincraChargeReference!}
                          />
                          <AccordionDetailsItem
                            title="Mobile Wallet Phone"
                            value={"+" + transaction.fincraPhone}
                          />
                          <AccordionDetailsItem
                            title="Mobile Wallet Operator"
                            value={transaction.fincraPhoneOperator!}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}
              </Accordion>
            </div>
          </div>
        </MaxWidthWrapper>
      </>
    );
}
