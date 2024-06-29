import type { ReactNode } from "react";
import Link from "next/link";
import { ModeToggle } from "~/app/_components/ThemeToggle";
import UserDropdown from "~/app/_components/UserDropdown";
import { currentUser } from "~/lib/auth";
import AdminNavItems from "~/app/_components/admin-nav-items";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Menu } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentUser();

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
            <div className="flex-1 px-2">
              <h2 className="mb-3 pl-1 font-bold text-muted-foreground">
                Admin
              </h2>
              <AdminNavItems />
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
                  <h2 className="mb-2 text-muted-foreground">Admin</h2>
                  <AdminNavItems />
                </nav>
              </SheetContent>
            </Sheet>
            <div className="flex w-full flex-1 flex-row items-end justify-end"></div>
            {user && <UserDropdown user={user} />}

            {/* <UserButton /> */}
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
