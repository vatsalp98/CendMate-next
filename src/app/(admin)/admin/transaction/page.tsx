"use client";
import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";
import { TransactionDataTable } from "~/components/ui/transaction-data-table";
import { transaction_columns } from "~/config/columns";
import { api } from "~/trpc/react";

export default function AdminTransactionPage() {
  const { data: transactions } = api.transactions.getAllTransactions.useQuery();

  return (
    <>
      <MaxWidthWrapper>
        <div className="my-6">
          <div>
            <h2 className="text-2xl font-semibold">All Transactions</h2>
            <span className="text-lg text-muted-foreground">
              List of all the transactions made on the website.
            </span>
          </div>

          <div className="mt-4">
            {transactions && (
              <TransactionDataTable
                columns={transaction_columns}
                data={transactions}
              />
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
