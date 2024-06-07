import type { ReactNode } from "react";
import SideBarNav from "../_components/SideBarNav";
import Link from "next/link";
import {ArrowUpDownIcon, Home, Menu, User2Icon, Wallet2Icon} from "lucide-react";
import UserDropdown from "../_components/UserDropdown";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { ModeToggle } from "../_components/ThemeToggle";
import { createClient } from "~/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <>
      <section className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href={"/"} className="flex flex-row items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary">
                  <div className="h-6 w-6 bg-[url('/logo192.png')] bg-contain bg-center" />
                </div>
                <h3 className="text-2xl font-bold text-primary">CendMate</h3>
              </Link>
            </div>
            <div className="flex-1">
              <SideBarNav />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center justify-end gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-10">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
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
                    <h3 className="text-2xl font-bold text-primary">
                      CendMate
                    </h3>
                  </Link>
                  <Separator className="my-2" />
                  <Link
                    href="/dashboard"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    href="/wallets"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Wallet2Icon className="h-5 w-5" />
                    Wallets
                  </Link>
                  <Link
                      href="/recipients"
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <User2Icon className="h-5 w-5" />
                    Recipients
                  </Link>
                  <Link
                    href="/transactions"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <ArrowUpDownIcon className="h-5 w-5" />
                    Transactions
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="w-full flex-1"></div>
            <UserDropdown user={user} />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
          <div className="flex w-full flex-row items-center justify-between border-t px-6 py-4 text-sm font-semibold text-muted-foreground">
            <div>
              &copy; CendMate {new Date().getFullYear()}. All Rights Reserved.
            </div>
            <ModeToggle />
          </div>
        </div>
      </section>
    </>
  );
}
