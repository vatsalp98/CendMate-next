"use client";

import { registerSchema } from "~/schemas";
import CardWrapper from "./card-wrapper";
import type { z } from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  FormDescription,
} from "~/components/ui/form";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  CalendarIcon,
  CheckCircle,
  MapPin,
  MapPinIcon,
  User2,
} from "lucide-react";
import { Calendar } from "~/components/ui/calendar";
import { register } from "~/actions/register";
import { searchAddress } from "~/actions/address";
import type { Suggestion } from "~/config/models";
import { Separator } from "~/components/ui/separator";
import { Card } from "~/components/ui/card";

export default function RegisterForm() {
  type TRegisterValues = z.infer<typeof registerSchema>;
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);

  const [currentStep, setCurrentStep] = useState(0);
  const registerForm = useForm<TRegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address1: "",
      address2: "",
      city: "",
      country: "",
      state: "",
      postal_code: "",
      password: "",
      confirm_password: "",
    },
  });

  const handleRegister = (values: TRegisterValues) => {
    if (values.password === values.confirm_password) {
      if (currentStep === 0) {
        setCurrentStep(1);
      } else if (currentStep === 1) {
        startTransition(() => {
          register(values)
            .then((data) => {
              if (data.success) setSuccess(data.success);
              if (data.error) setError(data.error);
            })
            .catch(() => {
              setError("Something went wrong!");
            });
        });
      }
    } else {
      registerForm.setError("confirm_password", {
        message: "Passwords dont match",
      });
    }
  };

  const today = new Date();
  const seventeenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  );

  const handleSelect = (value: Suggestion) => {
    registerForm.setValue("address1", value.address);
    registerForm.setValue("city", value.context.place.name);
    registerForm.setValue("state", value.context.region.region_code);
    registerForm.setValue("country", value.context.country.country_code);
    registerForm.setValue("postal_code", value.context.postcode.name);

    setSearchOpen(false);
    setSuggestions([]);
  };

  return (
    <CardWrapper
      headerLabel={"Create an Account"}
      backButtonLabel={"Back to Login"}
      backButtonHref={"/auth/login"}
    >
      <div className="mb-5 flex w-full flex-row items-center justify-center gap-2">
        {currentStep === 0 && (
          <div className="flex w-full flex-row items-center justify-center gap-2 font-semibold">
            <User2 /> Personal Information
          </div>
        )}
        {currentStep === 1 && !success && (
          <div className="flex w-full flex-row items-center justify-center gap-2 font-semibold">
            <MapPin /> Address Information
          </div>
        )}
        {currentStep === 1 && success && (
          <div className="flex flex-col items-center justify-center rounded-lg border px-2 py-4 text-center shadow-md dark:shadow-gray-800">
            <CheckCircle className="h-10 w-10 text-green-600" />
            <span className="mt-2 text-sm text-muted-foreground">
              Your account has been created, please proceed to sign in after
              verifying your email.
            </span>
          </div>
        )}
      </div>
      <Form {...registerForm}>
        <form
          onSubmit={registerForm.handleSubmit(handleRegister)}
          className="space-y-6"
        >
          {currentStep === 1 && !success && (
            <>
              <FormField
                name="address1"
                control={registerForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address 1</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Address Line 1"
                        value={field.value}
                        onChange={async (e) => {
                          field.onChange(e.target.value);
                          if (e.target.value.length > 2) {
                            const results = await searchAddress(e.target.value);
                            setSuggestions(results);
                            setSearchOpen(true);
                          } else {
                            setSearchOpen(false);
                            setSuggestions([]);
                          }
                        }}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormDescription>
                      Start typing to search for your address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {searchOpen && suggestions.length > 0 && (
                <Card className="absolute z-10 block w-[350px] p-2">
                  <div>
                    <h2 className="py-1 font-semibold text-muted-foreground">
                      Search Results
                    </h2>
                  </div>
                  <Separator />
                  {suggestions.map((item) => (
                    <>
                      <div
                        key={item.mapbox_id}
                        className="my-1 flex cursor-pointer flex-row items-center gap-x-2 rounded px-4 text-sm hover:bg-gray-600"
                        onClick={() => handleSelect(item)}
                      >
                        <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                        {item.full_address ?? item.place_formatted}
                      </div>
                      <Separator />
                    </>
                  ))}
                </Card>
              )}

              <FormField
                name="address2"
                control={registerForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address 2</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Address Line 2"
                        {...field}
                        disabled={isPending}
                        autoComplete="address-line2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex w-full flex-row gap-x-4">
                <FormField
                  name="city"
                  control={registerForm.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="City"
                          {...field}
                          disabled={isPending}
                          autoComplete="address-level2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="state"
                  control={registerForm.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="State"
                          {...field}
                          disabled={isPending}
                          autoComplete="address-level1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex w-full flex-row gap-x-4">
                <FormField
                  name="country"
                  control={registerForm.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Country"
                          {...field}
                          disabled={isPending}
                          autoComplete="country"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="postal_code"
                  control={registerForm.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Postal"
                          {...field}
                          disabled={isPending}
                          autoComplete="postal-code"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
          {currentStep === 0 && (
            <div className="space-y-4">
              <div className="flex w-full flex-row gap-x-2">
                <FormField
                  name="firstName"
                  control={registerForm.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="lastName"
                  control={registerForm.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Doe"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="email"
                control={registerForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john.doe@email.com"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="phone"
                control={registerForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+1XXXXXXXXXX"
                        {...field}
                        type="tel"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="dob"
                control={registerForm.control}
                render={({ field }) => (
                  <FormItem {...field} className="my-2 flex w-full flex-col">
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              field.value.toLocaleDateString()
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          toYear={seventeenYearsAgo.getFullYear()}
                          disabled={(date) =>
                            date > seventeenYearsAgo ||
                            date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={registerForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        {...field}
                        type="password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirm_password"
                control={registerForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        {...field}
                        type="password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {!success && <FormError message={error} />}
          <FormSuccess message={success} />
          {!success && (
            <>
              <Button type="submit" className="w-full" disabled={isPending}>
                Create account
              </Button>
            </>
          )}
        </form>
      </Form>
    </CardWrapper>
  );
}
