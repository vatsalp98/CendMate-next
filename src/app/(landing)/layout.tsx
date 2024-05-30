import type { ReactNode } from "react";
import Navbar from "../_components/NavBar";
import Footer from "../_components/Footer";

export default function LandingLayout({ children }: { children: ReactNode }) {
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
