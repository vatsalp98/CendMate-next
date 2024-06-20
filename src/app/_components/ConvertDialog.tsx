import { Loader2, RefreshCw } from "lucide-react";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { api } from "~/trpc/react";
import ConvertForm from "./ConvertForm";
import type { ExchangeRate } from "@prisma/client";
import { useState } from "react";
import { formatCurrency } from "~/lib/utils";

interface ConvertDialogProps {
  currency: string;
  exchangeRates: ExchangeRate[];
  fromRate: ExchangeRate;
}

export default function ConvertDialog({
  currency,
  exchangeRates,
  fromRate,
}: ConvertDialogProps) {
  const [finalStep, setFinalStep] = useState("initial");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [toRate, setToRate] = useState(0.0);
  const { data: wallets } = api.wallet.getWallets.useQuery();

  const exchangeMutation =
    api.transactions.createTransferTransaction.useMutation();

  if (wallets)
    return (
      <>
        <Dialog>
          <DialogTrigger
            className={buttonVariants({
              variant: "outline",
              className: "flex-1 gap-1",
            })}
          >
            <RefreshCw />
            Convert
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Convert Funds</DialogTitle>
              <DialogDescription>
                Convert your funds into the desired currency here.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {finalStep === "initial" && (
                <ConvertForm
                  exchangeRates={exchangeRates}
                  fromRate={fromRate}
                  currency={currency}
                  setFromAmount={setFromAmount}
                  setToCurrency={setToCurrency}
                  setToAmount={setToAmount}
                  wallets={wallets}
                  toCurrency={toCurrency}
                  setStep={setFinalStep}
                  setToRate={setToRate}
                />
              )}
              {finalStep === "final" && (
                <>
                  <div>
                    <span className="font-semibold text-muted-foreground">
                      Transfer Rate:{" "}
                    </span>
                    <strong>
                      {formatCurrency(toCurrency, "1")} ={" "}
                      {formatCurrency(fromRate.currency, toRate.toString())}
                    </strong>
                  </div>
                  <div>
                    <span className="font-semibold text-muted-foreground">
                      Conversion Fee:{" "}
                    </span>
                    <strong>2%</strong>
                  </div>
                  <div>
                    Are you sure you want to transfer{" "}
                    <strong>
                      {fromAmount} {currency}{" "}
                    </strong>{" "}
                    to{" "}
                    <strong>
                      {toAmount} {toCurrency}
                    </strong>{" "}
                    ?
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              {finalStep === "initial" && (
                <DialogClose
                  className={buttonVariants({
                    variant: "secondary",
                  })}
                >
                  Cancel
                </DialogClose>
              )}
              {finalStep === "final" && (
                <Button
                  variant={"secondary"}
                  onClick={() => setFinalStep("initial")}
                >
                  Back
                </Button>
              )}
              {finalStep === "initial" && (
                <Button type="submit" form="exchange-form">
                  Next
                </Button>
              )}
              {finalStep === "final" && (
                <Button
                  onClick={() => {
                    exchangeMutation.mutate({
                      from_amount: parseFloat(fromAmount),
                      to_amount: parseFloat(toAmount),
                      to_currency: toCurrency,
                      from_currency: currency,
                    });
                  }}
                  disabled={exchangeMutation.isPending}
                >
                  {exchangeMutation.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Convert"
                  )}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
}
