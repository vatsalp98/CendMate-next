"use client";

import { LogOutIcon, Menu } from "lucide-react";
import Link from "next/link";
import { Icons } from "./Icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Button, buttonVariants } from "~/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "~/lib/utils";
import { useCurrentUser } from "~/hooks/use-current-user";
import { logout } from "~/actions/logout";
import { useRouter } from "next/navigation";

const MobileNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const user = useCurrentUser();
  const router = useRouter();

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
    <div className="flex md:hidden">
      <Sheet>
        <SheetTrigger
          className={buttonVariants({
            variant: "outline",
            size: "icon",
            className: cn(
              scrolled
                ? "text-black dark:text-primary"
                : "bg-primary text-white hover:bg-gray-400 hover:text-black dark:bg-slate-900 dark:text-white",
            ),
          })}
        >
          <Menu
            className={cn(
              scrolled
                ? "text-black dark:text-primary"
                : " text-white dark:text-white",
            )}
          />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>
              <Link href={"/"} className="flex flex-row items-center gap-2">
                <Icons.logo />
                <h2 className="text-2xl font-bold">CendMate</h2>
              </Link>
            </SheetTitle>
            <SheetDescription>
              Send Money to your friends and family instantly.
            </SheetDescription>
          </SheetHeader>
          <ul className="mt-10">
            <li>
              <Link href={"/"} className={buttonVariants({ variant: "link" })}>
                Home &rarr;
              </Link>
            </li>
            <li>
              <Link
                href={"/about"}
                className={buttonVariants({ variant: "link" })}
              >
                About Us &rarr;
              </Link>
            </li>
            <li>
              <Link
                href={"/contact"}
                className={buttonVariants({ variant: "link" })}
              >
                Contact Us &rarr;
              </Link>
            </li>

            {user ? (
              <>
                <li>
                  <Link
                    href={"/dashboard"}
                    className={buttonVariants({ variant: "link" })}
                  >
                    Dashboard &rarr;
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/profile"}
                    className={buttonVariants({ variant: "link" })}
                  >
                    Profile &rarr;
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href={"/auth/login"}
                    className={buttonVariants({ variant: "link" })}
                  >
                    Sign In &rarr;
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/auth/register"}
                    className={buttonVariants({ variant: "link" })}
                  >
                    Sign Up &rarr;
                  </Link>
                </li>
              </>
            )}
          </ul>
          {user && (
            <SheetFooter className="mt-20 w-full">
              <SheetClose>
                <Button
                  variant={"destructive"}
                  className="flex-1 gap-2"
                  onClick={async () => {
                    await logout();
                    router.refresh();
                  }}
                >
                  <LogOutIcon />
                  Logout
                </Button>
              </SheetClose>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
