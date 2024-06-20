"use client";

import { Loader2 } from "lucide-react";
import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/react";
import ExchangeForm from "./ExchangeForm";

export default function ExchangeRateTable() {
  const { data: user, isLoading: userLoading } = api.user.getUserDb.useQuery();

  const { data: exchangeRates, isLoading: exchangeLoading } =
    api.exchange.getExchangeRates.useQuery();

  if (userLoading || exchangeLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (exchangeRates)
    return (
      <div className="mt-5">
        <div className="flex w-full flex-row justify-between">
          <h2 className="font-bold">Currency</h2>
          <div className="mb-2 flex w-1/4 flex-row items-center justify-center">
            <h2 className="flex flex-1 flex-row items-center justify-center font-bold">
              Rate
            </h2>
          </div>
        </div>
        <Separator className="mb-3 mt-1" />

        {user?.role === "ADMIN" && (
          <ExchangeForm exchangeRates={exchangeRates} />
        )}
      </div>
    );
}
