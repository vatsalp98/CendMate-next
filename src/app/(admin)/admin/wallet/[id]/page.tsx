"use client";

import {
  ArrowUpDown,
  ChevronLeft,
  CircleAlert,
  Diff,
  Loader2,
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
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { cn, formatCurrency, formatMoney } from "~/lib/utils";
import { api } from "~/trpc/react";

interface AdminWalletPageProps {
  params: {
    id: string;
  };
}

export default function AdminWalletPage({
  params: { id },
}: AdminWalletPageProps) {
  const { data: wallet, isLoading } = api.wallet.getWalletById.useQuery({ id });
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (wallet) {
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
                <h2 className="text-2xl font-semibold">Wallet #{id}</h2>
                <CopyButton text={id} textTitle="Wallet ID" />
              </div>
              <span className="text-lg text-muted-foreground">
                {wallet.wallet.currency}
              </span>
            </div>

            <div className="mt-4 flex w-full flex-row gap-4">
              <Button className="flex-1 gap-2" variant={"default"}>
                <Diff className="h-4 w-4" />
                Adjust Amount
              </Button>
              <Button className="flex-1 gap-2" variant={"destructive"}>
                <CircleAlert className="h-4 w-4" />
                Disable Deposits
              </Button>
              <Button className="flex-1 gap-2" variant={"destructive"}>
                <CircleAlert className="h-4 w-4" />
                Disable Withdrawals
              </Button>
            </div>

            <div className="mt-4">
              <Accordion type="multiple" defaultValue={["item-1"]}>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex flex-row gap-2">
                      <Wallet />
                      Wallet Details
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      <AccordionDetailsItem
                        title="Currency"
                        value={wallet.wallet.currency}
                      />
                      <AccordionDetailsItem
                        title="Amount"
                        value={formatCurrency(
                          wallet.wallet.currency,
                          formatMoney(wallet.wallet.amount),
                        )}
                      />
                      <AccordionDetailsItem
                        title="Created At"
                        value={new Date(
                          wallet.wallet.createdAt,
                        ).toLocaleDateString()}
                      />
                      <AccordionDetailsItem
                        title="Updated At"
                        value={new Date(
                          wallet.wallet.updatedAt,
                        ).toLocaleDateString()}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <div className="flex flex-row gap-2">
                      <User />
                      Owner Details
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      <AccordionDetailsItem
                        title="Full Name"
                        value={
                          wallet.wallet.owner.firstName +
                          " " +
                          wallet.wallet.owner.lastName
                        }
                      />
                      <AccordionDetailsItem
                        title="Phone"
                        value={wallet.wallet.owner.phone}
                      />
                      <AccordionDetailsItem
                        title="Email"
                        value={wallet.wallet.owner.email}
                      />
                      <AccordionDetailsItem
                        title="Role"
                        value={wallet.wallet.owner.role}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <div className="flex flex-row gap-2">
                      <ArrowUpDown />
                      Transaction Details
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex w-full flex-col gap-2">
                      {wallet.wallet.transactions.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-row justify-between rounded-lg border px-4 py-2"
                        >
                          <div className="flex flex-row gap-3">
                            <Badge variant={"secondary"} className="rounded-sm">
                              {item.id}
                            </Badge>
                            <span>{item.currency}</span>
                          </div>
                          <div className="flex flex-row gap-4">
                            <Badge
                              className={cn(
                                "rounded-sm",
                                item.type === "pay-in"
                                  ? "bg-green-700"
                                  : "bg-red-700",
                              )}
                            >
                              {item.type.toUpperCase()}
                            </Badge>
                            <Badge
                              className={cn(
                                "rounded-sm",
                                item.status === "SUCCESS"
                                  ? "bg-green-700"
                                  : "bg-yellow-700",
                              )}
                            >
                              {item.status}
                            </Badge>
                          </div>
                          <div>
                            {formatCurrency(
                              item.currency,
                              formatMoney(item.amount),
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </MaxWidthWrapper>
      </>
    );
  }
}
