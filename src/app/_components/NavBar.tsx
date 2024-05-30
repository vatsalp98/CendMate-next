"use client";

import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import MaxWidthWrapper from "./MaxWitdhWrapper";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50); // Change 50 to whatever offset you prefer
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "h-18 sticky inset-x-0 top-0 z-50 transition-colors duration-100 dark:bg-background",
        scrolled ? "bg-white text-primary shadow-lg" : "bg-primary text-white",
      )}
    >
      <MaxWidthWrapper>
        <header className="relative ">
          <div className="px-10">
            <div className="flex h-16 items-center">
              {/* <MobileNav /> */}

              <div className="ml-8 flex lg:ml-0">
                <Link href="/" className="flex flex-row items-center gap-2">
                  <div
                    className={cn(
                      "h-14 w-14 bg-contain bg-no-repeat",
                      scrolled
                        ? "bg-[url('/logo192.png')] "
                        : "bg-[url('/logo-white.png')]",
                    )}
                  />
                </Link>
              </div>

              <div className="z-50 hidden md:ml-10 md:flex"></div>

              <div className="ml-auto flex items-center">
                <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-6">
                  <ul className="flex flex-row gap-6">
                    <li>
                      <Link
                        href={"/"}
                        className={buttonVariants({ variant: "ghost" })}
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={"/about"}
                        className={buttonVariants({ variant: "ghost" })}
                      >
                        About
                      </Link>
                    </li>
                  </ul>

                  <Link
                    href="/login"
                    className={buttonVariants({ variant: "ghost" })}
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/sign-up"
                    className={buttonVariants({
                      variant: "ghost",
                    })}
                  >
                    Sign Up
                  </Link>
                  {/* {user ? null : (
                  <Link href="/sign-in" className={buttonVariants()}>
                    Sign in
                  </Link>
                )}

                {user ? null : (
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                )} */}

                  {/* {user ? (
                  <UserAccountNav user={user} />
                ) : (
                  <Link
                    href="/sign-up"
                    className={buttonVariants({
                      variant: "ghost",
                    })}
                  >
                    Create account
                  </Link>
                )} */}

                  {/* {user ? (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  ) : null} */}

                  {/* {user ? null : (
                  <div className="flex lg:ml-6">
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  </div>
                )} */}
                </div>
              </div>
            </div>
          </div>
        </header>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
