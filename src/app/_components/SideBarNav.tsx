"use client";

import {
  ArrowUpDownIcon,
  BadgeDollarSignIcon,
  Home,
  User2Icon,
  UserCog2,
  Wallet2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

export default function SideBarNav() {
  const pathName = usePathname();

  return (
    <>
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        <Link
          href="/dashboard"
          className={cn(
            "my-2 flex items-center gap-3 rounded-lg px-3 py-3 font-semibold",
            pathName.startsWith("/dashboard")
              ? "bg-gray-100 text-primary transition-all hover:text-primary"
              : "hover:bg-primary-100 text-muted-foreground transition-all hover:text-primary",
          )}
        >
          <Home className="h-4 w-4" />
          Dashboard
        </Link>
        <Link
          href="/wallets"
          className={cn(
            "my-2 flex items-center gap-3 rounded-lg px-3 py-3 font-semibold",
            pathName.startsWith("/wallets")
              ? "bg-blue-100 text-primary transition-all hover:text-primary"
              : "text-muted-foreground transition-all hover:bg-gray-100 hover:text-primary",
          )}
        >
          <Wallet2 className="h-4 w-4" />
          Wallets
        </Link>
        <Link
          href="/recipients"
          className={cn(
            "my-2 flex items-center gap-3 rounded-lg px-3 py-3 font-semibold",
            pathName.startsWith("/recipients")
              ? "bg-blue-100 text-primary transition-all hover:text-primary"
              : "text-muted-foreground transition-all hover:bg-gray-100 hover:text-primary",
          )}
        >
          <User2Icon className="h-4 w-4" />
          Recipients
        </Link>
        <Link
          href="/transactions"
          className={cn(
            "my-2 flex items-center gap-3 rounded-lg px-3 py-3 font-semibold",
            pathName.startsWith("/transactions")
              ? "bg-blue-100 text-primary transition-all hover:text-primary"
              : "text-muted-foreground transition-all hover:bg-gray-100 hover:text-primary",
          )}
        >
          <ArrowUpDownIcon className="h-4 w-4" />
          Transactions
        </Link>
        <Separator className="my-4" />
        <Link
          href="/profile"
          className={cn(
            "my-2 flex items-center gap-3 rounded-lg px-3 py-3 font-semibold",
            pathName.startsWith("/profile")
              ? "bg-blue-100 text-primary transition-all hover:text-primary"
              : "text-muted-foreground transition-all hover:bg-gray-100 hover:text-primary",
          )}
        >
          <UserCog2 className="h-4 w-4" />
          Profile
        </Link>
        <Link
          href="/exchange"
          className={cn(
            "my-2 flex items-center gap-3 rounded-lg px-3 py-3 font-semibold",
            pathName.startsWith("/exchange")
              ? "bg-blue-100 text-primary transition-all hover:text-primary"
              : "text-muted-foreground transition-all hover:bg-gray-100 hover:text-primary",
          )}
        >
          <BadgeDollarSignIcon className="h-4 w-4" />
          Exchange Rate
        </Link>
      </nav>
    </>
  );
}
