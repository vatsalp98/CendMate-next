"use client";

import { ArrowUpDownIcon, Home, User2Icon, Wallet2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

export default function SideBarNav() {
  const pathName = usePathname();
  console.log(pathName);

  return (
    <>
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        <Link
          href="/dashboard"
          className={cn(
            "my-2 flex items-center gap-3 rounded-lg px-3 py-3 font-semibold",
            pathName === "/dashboard"
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
            pathName === "/wallets"
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
            pathName === "/recipients"
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
            pathName === "/transactions"
              ? "bg-blue-100 text-primary transition-all hover:text-primary"
              : "text-muted-foreground transition-all hover:bg-gray-100 hover:text-primary",
          )}
        >
          <ArrowUpDownIcon className="h-4 w-4" />
          Transactions
        </Link>
        <Separator className="my-4" />
      </nav>
    </>
  );
}
