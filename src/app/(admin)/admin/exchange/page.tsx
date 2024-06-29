import ExchangeRateTable from "~/app/_components/ExchangeRateTable";
import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";

export default async function ExchangeRatePage() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="mt-4">
          <div className="mb-6 flex w-full flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl font-semibold">Exchange Rates</h3>
              <span className="text-muted-foreground">
                Review all of the exchange Rates.
              </span>
            </div>
          </div>
          <ExchangeRateTable />
        </div>
      </MaxWidthWrapper>
    </>
  );
}
