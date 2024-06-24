import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { cn, constructMetadata } from "~/lib/utils";
import type { Metadata } from "next";
import { ThemeProvider } from "./_components/ThemeProviders";
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "~/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "auth";

export const metadata: Metadata = constructMetadata();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" className={`h-full`}>
        <body
          className={cn(
            "relative h-full font-sans antialiased",
            GeistSans.className,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
