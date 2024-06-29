"use client";

import {
  LayoutDashboardIcon,
  Wallet,
  ArrowUpDownIcon,
  BadgeDollarSign,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

export default function AdminNavItems() {
  const pathName = usePathname();

  return (
    <>
      <div className="grid gap-2">
        <Link
          href="/admin/home"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-3 font-semibold",
            pathName.startsWith("/admin/home")
              ? "bg-blue-100 text-primary transition-all hover:text-primary"
              : "text-muted-foreground transition-all hover:bg-gray-100 hover:text-primary",
          )}
        >
          <LayoutDashboardIcon className="h-5 w-5" />
          Dashboard
        </Link>
        <Link
          href="/admin/user"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-3 font-semibold",
            pathName.startsWith("/admin/user")
              ? "bg-blue-100 text-primary transition-all hover:text-primary"
              : "text-muted-foreground transition-all hover:bg-gray-100 hover:text-primary",
          )}
        >
          <Users2 className="h-5 w-5" />
          Customers
        </Link>
        <Link
          href="/admin/wallet"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-3 font-semibold",
            pathName.startsWith("/admin/wallet")
              ? "bg-blue-100 text-primary transition-all hover:text-primary"
              : "text-muted-foreground transition-all hover:bg-gray-100 hover:text-primary",
          )}
        >
          <Wallet className="h-5 w-5" />
          Wallets
        </Link>
        <Link
          href="/admin/transaction"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-3 font-semibold",
            pathName.startsWith("/admin/transaction")
              ? "bg-blue-100 text-primary transition-all hover:text-primary"
              : "text-muted-foreground transition-all hover:bg-gray-100 hover:text-primary",
          )}
        >
          <ArrowUpDownIcon className="h-5 w-5" />
          Transactions
        </Link>
        <Link
          href="/admin/exchange"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-3 font-semibold",
            pathName.startsWith("/admin/exchange")
              ? "bg-blue-100 text-primary transition-all hover:text-primary"
              : "text-muted-foreground transition-all hover:bg-gray-100 hover:text-primary",
          )}
        >
          <BadgeDollarSign className="h-5 w-5" />
          Exchange Rate
        </Link>
        <Separator className="my-2" />
      </div>
    </>
  );
}
