import type { ReactNode } from "react";
import Navbar from "../_components/NavBar";
import Footer from "../_components/Footer";
import { createClient } from "~/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function LandingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <section className="relative flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1 flex-grow">{children}</div>
        <Footer />
      </section>
    </>
  );
}
