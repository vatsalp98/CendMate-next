import Link from "next/link";
import MaxWidthWrapper from "./MaxWitdhWrapper";
import Image from "next/image";
import { Facebook, InstagramIcon, Twitter } from "lucide-react";
import { ModeToggle } from "./ThemeToggle";

export default function Footer() {
  return (
    <>
      <div className="border-t border-gray-200 pb-10 pt-8">
        <MaxWidthWrapper>
          <div className="mb-6 flex w-full flex-col md:flex-row md:justify-evenly md:gap-8">
            <div className="flex w-full flex-col items-center justify-center md:w-[250px]">
              <Image src="/logo512.png" alt="Logo" width={100} height={100} />
              <div>
                <h3>Follow us on social media</h3>
                <ul className="mt-2 flex flex-row items-center justify-center gap-2">
                  <li>
                    <Facebook className="text-muted-foreground" />
                  </li>
                  <li>
                    <Twitter className="text-muted-foreground" />
                  </li>
                  <li>
                    <InstagramIcon className="text-muted-foreground" />
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 flex w-full flex-row justify-evenly">
              <div>
                <h2 className="text-xl font-semibold">General Links</h2>
                <ul>
                  <li>
                    <Link
                      href="/about"
                      className="hover:text-primary hover:underline"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="hover:text-primary hover:underline"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="hover:text-primary hover:underline"
                    >
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="hover:text-primary hover:underline"
                    >
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Legal Documents</h2>
                <ul>
                  <li>
                    <Link
                      href={"/terms-and-conditions"}
                      className="hover:text-primary hover:underline"
                    >
                      Terms and Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/privacy-policy"}
                      className="hover:text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/aml-policy"}
                      className="hover:text-primary hover:underline"
                    >
                      AML Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-between border-t border-gray-200 pb-2 pt-4 text-sm text-muted-foreground">
            <div>© 2024 Cendmate. All rights reserved.</div>
            <ModeToggle />
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}
