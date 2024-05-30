import Link from "next/link";
import MaxWidthWrapper from "../_components/MaxWitdhWrapper";
import { Button, buttonVariants } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import Image from "next/image";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import RandomDots from "../_components/ColoredPoint";
import FlagDiv from "../_components/FlagDiv";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import FeatureCard from "../_components/FeatureCard";
import { CheckCircle, QuoteIcon } from "lucide-react";
import TestimonialCard from "../_components/TestimonialCard";

export default function HomePage() {
  return (
    <>
      <section className="bg-primary text-white">
        <MaxWidthWrapper>
          <div className="mx-auto flex max-w-3xl flex-col items-center pb-5 pt-20 text-center">
            <h1 className="text-4xl font-bold tracking-tight  sm:text-6xl">
              Send <span className="text-black">Money</span> to Friends and
              Family <span className="text-black">Instantly</span>.
            </h1>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="mb-10 bg-primary">
        <MaxWidthWrapper>
          <RandomDots
            containerHeight={400}
            containerWidth={1200}
            numDots={10}
          />
          <div className="relative flex flex-col items-center">
            <FlagDiv
              className="absolute bg-[url('/flags/CAD.png')]"
              top={15}
              left={250}
              right={0}
              duration={3}
            />
            <FlagDiv
              className="absolute bg-[url('/flags/GHS.png')]"
              top={55}
              duration={5}
              right={250}
            />
            <FlagDiv
              className="absolute bg-[url('/flags/KES.png')]"
              top={255}
              left={250}
              duration={3}
            />
            <FlagDiv
              className="absolute bg-[url('/flags/NGN.png')]"
              top={255}
              duration={2}
              right={250}
            />
            <FlagDiv
              className="absolute z-0 bg-[url('/flags/GBP.png')]"
              top={155}
              right={350}
              duration={6}
            />
            <FlagDiv
              className="absolute z-0 bg-[url('/flags/USD.png')]"
              top={155}
              left={350}
              duration={7}
            />
            <FlagDiv
              className="absolute z-0 bg-[url('/flags/TZS.png')]"
              top={55}
              duration={8}
              right={450}
            />

            <Image
              src="/guy-phone.png"
              alt="banner"
              width={300}
              height={200}
              className="z-10"
            />
            <div className="mx-auto flex w-full max-w-3xl flex-row gap-6 rounded-lg border bg-gradient-to-r from-white to-primary px-6 py-4 shadow-md">
              <div className="flex flex-1 flex-row gap-1">
                <div className="flex w-full flex-col items-start gap-2">
                  <Label>You Send</Label>
                  <Input
                    placeholder="0.00"
                    type="number"
                    className="shadow-md"
                    title="You Send"
                  />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Label>Currency</Label>
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="USD" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="CAD">CAD</SelectItem>
                      <SelectItem value="NGN">NGN</SelectItem>
                      <SelectItem value="KES">KES</SelectItem>
                      <SelectItem value="GHS">GHS</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="TZS">TZS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-1 flex-row gap-1">
                <div className="flex w-full flex-col items-start gap-2">
                  <Label>You Receive</Label>
                  <Input
                    placeholder="0.00"
                    className="shadow-md"
                    type="number"
                    title="You Send"
                  />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Label>Currency</Label>
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="USD" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="CAD">CAD</SelectItem>
                      <SelectItem value="NGN">NGN</SelectItem>
                      <SelectItem value="KES">KES</SelectItem>
                      <SelectItem value="GHS">GHS</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="TZS">TZS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="mb-20">
        <MaxWidthWrapper>
          <div className="">
            <div className="my-10 flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold">Move Funds</h3>
              <span className="mx-auto mt-4 flex w-[520px] items-center text-center text-muted-foreground">
                Transfer money across borders without traditional banking
                intermediaries or restriction on currencies.
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FeatureCard
                title="Send"
                image="/features/icon-3.svg"
                description="Send money to loved ones abroad in 3 easy steps."
              />
              <FeatureCard
                title="Transfers"
                image="/features/icon-1.svg"
                description="No hidden fees and affordable rates."
              />
              <FeatureCard
                title="Receive"
                image="/features/icon-2.svg"
                description="Receive money instantly from friends and family abroad."
              />
              <FeatureCard
                title="Pay"
                image="/features/icon-4.svg"
                description="Pay school fees, bills and more at affordable rates."
              />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="pb-10">
        <MaxWidthWrapper>
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-x-10 gap-y-10 bg-[url('/features/shape-bg.png')] bg-center bg-no-repeat px-7 py-10 dark:bg-gray-800 lg:flex-row lg:px-10 lg:py-14">
            <div className="hero-image relative isolate z-10 w-full rounded-3xl md:px-5 md:pt-2 lg:w-1/2 lg:px-0 lg:pt-0">
              <Image
                className="w-full rounded-3xl"
                width={1080}
                height={1080}
                src="/features/friends.jpg"
                alt=""
              />
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-y-5 lg:w-[650px] lg:px-5">
              <div className="flex w-full flex-col items-start justify-start">
                <h1 className="mb-2 text-4xl font-semibold leading-[1.2] dark:text-white md:mx-auto md:max-w-xl md:text-center md:text-5xl lg:mx-0 lg:max-w-full lg:text-left xl:text-[50px]">
                  Transfers
                </h1>
                <div className="text-sm dark:text-gray-300 md:mx-auto md:max-w-xl md:text-center lg:mx-0 lg:max-w-full lg:text-left">
                  <ul className="flex flex-col gap-2">
                    <li className="flex flex-row gap-2">
                      <CheckCircle /> Live exchange rate
                    </li>
                    <li className="flex flex-row gap-2">
                      <CheckCircle /> No extra fees
                    </li>
                    <li className="flex flex-row gap-2">
                      <CheckCircle /> Fast Transfers
                    </li>
                    <li className="flex flex-row gap-2">
                      <CheckCircle /> Use your money instantly
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-x-5 gap-y-2.5 md:items-center lg:flex-row">
                <Button>Sign up Now</Button>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="bg-gray-100 py-10 sm:py-16 lg:py-24">
        <MaxWidthWrapper>
          <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="mx-auto text-4xl font-extrabold text-black md:text-6xl lg:text-5xl">
                  Funds transfered in 3 Simple Steps
                </h2>
              </div>
              <div className="relative mt-12 lg:mt-20">
                <div className="absolute inset-x-0 top-2 hidden md:block md:px-20 lg:px-28 xl:px-44">
                  <Image
                    alt="DOTTED LINES"
                    loading="lazy"
                    width="1000"
                    height="500"
                    className="w-full"
                    src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
                  />
                </div>
                <div className="relative grid grid-cols-1 gap-x-12 gap-y-12 text-center md:grid-cols-3">
                  <div>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-200 bg-white shadow">
                      <span className="text-xl font-semibold text-gray-700">
                        1
                      </span>
                    </div>
                    <h3 className="mt-6 text-xl  font-semibold leading-tight md:mt-10">
                      Sign Up
                    </h3>
                    <p className="mt-4 text-base text-gray-400 md:text-lg">
                      Create a free cendmate account.
                    </p>
                  </div>
                  <div>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-200 bg-white shadow">
                      <span className="text-xl font-semibold text-gray-700">
                        2
                      </span>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold leading-tight md:mt-10">
                      Get Verified
                    </h3>
                    <p className="mt-4 text-base text-gray-400 md:text-lg">
                      Upload and verify your identity.
                    </p>
                  </div>
                  <div>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-200 bg-white shadow">
                      <span className="text-xl font-semibold text-gray-700">
                        3
                      </span>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold leading-tight md:mt-10">
                      Transfer
                    </h3>
                    <p className="mt-4 text-base text-gray-400 md:text-lg">
                      Fund your wallet via interac and transfer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="py-10">
        <MaxWidthWrapper>
          <div>
            <div className="mb-8 flex flex-col items-center justify-center">
              <h2 className="text-4xl font-bold">What Out Clients Say</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <TestimonialCard
                description="CendMate is very reliable, fast and highly recommended"
                name="Robert Nosa"
                location="Winnipeg, MB"
              />
              <TestimonialCard
                description="I sent money using CendMate, it was incredibly fast and convenient."
                name="Iyobosa Idehen"
                location="Burnaby, BC"
              />
              <TestimonialCard
                description="CendMate is efficient and easy to use, I referred some friends."
                name="Uzoma Azikiwe"
                location="Vancouver, BC"
              />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="bg-primary py-10">
        <MaxWidthWrapper>
          <div className="container mx-auto flex flex-col justify-around p-4 text-center md:p-10 lg:flex-row">
            <div className="flex flex-col justify-center lg:text-left">
              <h1 className="py-2 text-3xl font-bold leading-tight text-white">
                Download Our Free Mobile App
              </h1>
            </div>
            <div className="mt-6 flex flex-shrink-0 flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 lg:ml-4 lg:mt-0 lg:justify-end">
              <button className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-8 w-8 fill-current text-black"
                >
                  <path d="M 5.4160156 2.328125 L 12.935547 10.158203 C 13.132547 10.363203 13.45925 10.363203 13.65625 10.158203 L 15.179688 8.5742188 C 15.405688 8.3392188 15.354312 7.956875 15.070312 7.796875 C 11.137313 5.571875 6.2620156 2.811125 5.4160156 2.328125 z M 3.140625 2.8476562 C 3.055625 3.0456562 3 3.2629063 3 3.5039062 L 3 20.591797 C 3 20.788797 3.044375 20.970625 3.109375 21.140625 L 11.576172 12.324219 C 11.762172 12.131219 11.762172 11.826813 11.576172 11.632812 L 3.140625 2.8476562 z M 17.443359 9.2578125 C 17.335484 9.2729375 17.233297 9.32375 17.154297 9.40625 L 15.015625 11.632812 C 14.829625 11.825812 14.829625 12.130219 15.015625 12.324219 L 17.134766 14.529297 C 17.292766 14.694297 17.546141 14.729188 17.744141 14.617188 C 19.227141 13.777188 20.226563 13.212891 20.226562 13.212891 C 20.725562 12.909891 21.007 12.443547 21 11.935547 C 20.992 11.439547 20.702609 10.981938 20.224609 10.710938 C 20.163609 10.676937 19.187672 10.124359 17.763672 9.3183594 C 17.664172 9.2623594 17.551234 9.2426875 17.443359 9.2578125 z M 13.296875 13.644531 C 13.165875 13.644531 13.034047 13.696328 12.935547 13.798828 L 5.4746094 21.566406 C 6.7566094 20.837406 11.328781 18.249578 15.050781 16.142578 C 15.334781 15.981578 15.386156 15.599281 15.160156 15.363281 L 13.65625 13.798828 C 13.55775 13.696328 13.427875 13.644531 13.296875 13.644531 z"></path>
                </svg>
                <span className="ml-4 flex flex-col items-start leading-none">
                  <span className="mb-1 text-xs">GET IT ON</span>
                  <span className="title-font font-semibold">Google Play</span>
                </span>
              </button>
              <button className="inline-flex items-center rounded-lg bg-white px-5 py-3 text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  className="h-8 w-8 fill-current text-black"
                >
                  <path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"></path>
                </svg>
                <span className="ml-4 flex flex-col items-start leading-none">
                  <span className="mb-1 text-xs">Download on the</span>
                  <span className="title-font font-semibold">App Store</span>
                </span>
              </button>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
