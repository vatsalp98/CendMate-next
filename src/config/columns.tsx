"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Transaction, User, Wallet } from "@prisma/client";
import { CheckIcon, MoreHorizontalIcon, XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { cn, formatMoney, getCurrencySymbol } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { toast } from "sonner";
import copy from "copy-to-clipboard";

type WalletExt = {
  owner: User;
} & Wallet;

type TransactionExt = {
  sender: User;
  wallet: Wallet;
} & Transaction;

export const transaction_columns: ColumnDef<TransactionExt>[] = [
  {
    header: "User",
    id: "id",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span>
          {row.original.sender.firstName} {row.original.sender.lastName}
        </span>
        <span className="text-sm text-muted-foreground">
          {row.original.senderId}
        </span>
      </div>
    ),
  },
  {
    cell: ({ row }) => (
      <div>
        {getCurrencySymbol(row.original.currency)}{" "}
        {formatMoney(row.original.amount)}
      </div>
    ),
    header: "Amount",
  },
  {
    cell: ({ row }) => (
      <div className="">
        <Badge className="rounded-sm" variant={"secondary"}>
          {row.original.currency}
        </Badge>
      </div>
    ),
    header: "Currency",
  },
  {
    cell: ({ row }) => (
      <div className="uppercase">
        <Badge
          variant={"outline"}
          className={cn(
            "rounded-sm",
            row.original.type !== "pay-in" ? "bg-red-700" : "bg-green-700",
          )}
        >
          {row.original.type}
        </Badge>
      </div>
    ),
    header: "Type",
  },
  {
    cell: ({ row }) => (
      <div className="uppercase">
        <Badge
          variant={"secondary"}
          className={cn(
            "rounded-sm",
            row.original.status !== "SUCCESS"
              ? "bg-yellow-700"
              : "bg-green-700",
          )}
        >
          {row.original.status}
        </Badge>
      </div>
    ),
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="h-8 w-8 p-0">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                if (copy(transaction.id)) {
                  toast.success(`Wallet Id copied to clipboard`);
                }
              }}
            >
              Copy Transaction ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/admin/transaction/${transaction.id}`}>
                View Transaction
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const wallet_columns: ColumnDef<WalletExt>[] = [
  {
    header: "Owner",
    id: "owner",
    accessorKey: "ownerId",
    // cell: ({ row }) => (
    //   <div className="flex flex-col">
    //     <span className="text-sm text-muted-foreground">
    //       {row.original.owner.email}
    //     </span>
    //   </div>
    // ),
  },
  {
    cell: ({ row }) => (
      <div>
        {getCurrencySymbol(row.original.currency)}{" "}
        {formatMoney(row.original.amount)}
      </div>
    ),
    header: "Amount",
  },
  {
    cell: ({ row }) => (
      <div className="">
        <Badge className="rounded-sm" variant={"secondary"}>
          {row.original.currency}
        </Badge>
      </div>
    ),
    header: "Currency",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const wallet = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="h-8 w-8 p-0">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                if (copy(wallet.id)) {
                  toast.success(`Wallet Id copied to clipboard`);
                }
              }}
            >
              Copy Wallet ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/admin/wallet/${wallet.id}`}>View Wallet</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const user_columns: ColumnDef<User>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Full Name",
    cell: ({ row }) => (
      <div>
        {row.original.firstName} {row.original.lastName}
      </div>
    ),
  },
  {
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-1">
        {row.original.email}
        {row.original.emailVerified ? (
          <CheckIcon className="h-5 w-5 text-green-500" />
        ) : (
          <XCircle />
        )}
      </div>
    ),
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="h-8 w-8 p-0">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                if (copy(user.id)) {
                  toast.success(`User Id copied to clipboard`);
                }
              }}
            >
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/admin/user/${user.id}`}>View customer</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
