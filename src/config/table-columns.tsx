import type { Transaction } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

export const transaction_columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];
