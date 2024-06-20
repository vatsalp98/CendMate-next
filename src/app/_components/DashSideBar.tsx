"use client";

import {
  Menu,
  Home,
  Wallet2Icon,
  User2Icon,
  ArrowUpDownIcon,
  BadgeDollarSign,
  UserCog2,
  RefreshCcw,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { cn } from "~/lib/utils";

export default function DashSideBar() {
  const pathName = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary">
              <div className="h-6 w-6 bg-[url('/logo192.png')] bg-contain bg-center" />
            </div>
            <h3 className="text-2xl font-bold text-primary">CendMate</h3>
          </Link>
          <Separator className="my-2" />
          <Link
            href="/dashboard"
            className={cn(
              "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2",
              pathName.startsWith("/dashboard")
                ? "bg-gray-100 text-primary transition-all hover:bg-gray-400 hover:text-white"
                : " text-muted-foreground hover:text-foreground",
            )}
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/wallets"
            className={cn(
              "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2",
              pathName.startsWith("/wallets")
                ? "bg-gray-100 text-primary transition-all hover:bg-gray-400 hover:text-white"
                : " text-muted-foreground hover:text-foreground",
            )}
          >
            <Wallet2Icon className="h-5 w-5" />
            Wallets
          </Link>
          <Link
            href="/convert"
            className={cn(
              "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2",
              pathName.startsWith("/convert")
                ? "bg-gray-100 text-primary transition-all hover:bg-gray-400 hover:text-white"
                : " text-muted-foreground hover:text-foreground",
            )}
          >
            <RefreshCcw className="h-5 w-5" />
            Convert
          </Link>
          <Link
            href="/recipients"
            className={cn(
              "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2",
              pathName.startsWith("/recipients")
                ? "bg-gray-100 text-primary transition-all hover:bg-gray-400 hover:text-white"
                : " text-muted-foreground hover:text-foreground",
            )}
          >
            <User2Icon className="h-5 w-5" />
            Recipients
          </Link>

          <Link
            href="/transactions"
            className={cn(
              "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2",
              pathName.startsWith("/transactions")
                ? "bg-gray-100 text-primary transition-all hover:bg-gray-400 hover:text-white"
                : " text-muted-foreground hover:text-foreground",
            )}
          >
            <ArrowUpDownIcon className="h-5 w-5" />
            Transactions
          </Link>
          <Separator className="my-2" />
          <Link
            href="/exchange"
            className={cn(
              "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2",
              pathName.startsWith("/exchange")
                ? "bg-gray-100 text-primary transition-all hover:bg-gray-400 hover:text-white"
                : " text-muted-foreground hover:text-foreground",
            )}
          >
            <BadgeDollarSign className="h-5 w-5" />
            Exchange Rate
          </Link>
          <Link
            href="/profile"
            className={cn(
              "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2",
              pathName.startsWith("/profile")
                ? "bg-gray-100 text-primary transition-all hover:bg-gray-400 hover:text-white"
                : " text-muted-foreground hover:text-foreground",
            )}
          >
            <UserCog2 className="h-5 w-5" />
            Profile
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
