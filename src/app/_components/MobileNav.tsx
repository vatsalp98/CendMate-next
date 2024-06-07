import { Menu } from "lucide-react";
import Link from "next/link";
import { Icons } from "./Icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { buttonVariants } from "~/components/ui/button";

const MobileNav = () => {
  return (
    <div className="flex md:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu className="text-black" />
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
            
            <li>
              <Link
                href={"/login"}
                className={buttonVariants({ variant: "link" })}
              >
                Sign In &rarr;
              </Link>
            </li>
            <li>
              <Link
                href={"/sign-up"}
                className={buttonVariants({ variant: "link" })}
              >
                Sign Up &rarr;
              </Link>
            </li>
            {/* {user ? (
              <li>
                <Link
                  href={"/profile"}
                  className={buttonVariants({ variant: "link" })}
                >
                  Profile &rarr;
                </Link>
              </li>
            ) : (
              <>
               
              </>
            )} */}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
