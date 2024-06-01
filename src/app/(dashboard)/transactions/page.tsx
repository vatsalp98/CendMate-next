import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";
import TransactionsList from "~/app/_components/TransactionsList";

export default function TransactionsPage() {
  return (
    <>
      <section className="mb-10 mt-4">
        <MaxWidthWrapper>
          <div className="">
            <div className="mt-6 flex w-full flex-col">
              <h2 className="text-2xl font-bold">Transactions</h2>
              <span className="text-muted-foreground">
                List of all your transactions
              </span>
            </div>
            <div className="mt-6">
              <TransactionsList />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
