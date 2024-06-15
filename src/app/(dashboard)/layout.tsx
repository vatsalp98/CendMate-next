import type { ReactNode } from "react";
import SideBarNav from "../_components/SideBarNav";
import Link from "next/link";
import { ModeToggle } from "../_components/ThemeToggle";
import { UserButton } from "@clerk/nextjs";
import DashSideBar from "../_components/DashSideBar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (!auth().sessionClaims?.metadata.kycComplete) {
    redirect("/kyc");
  }

  if (!auth().sessionClaims?.metadata.onboardingComplete) {
    redirect("/welcome");
  }

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
            <DashSideBar />
            <div className="w-full flex-1"></div>
            <UserButton />
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
