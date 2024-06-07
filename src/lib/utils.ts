import { type ClassValue, clsx } from "clsx";
import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";

// export async function hashPassword(plainPassword: string): Promise<string> {
//   const saltRounds = 10; // Number of salt rounds
//   const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
//   return hashedPassword;
// }

// export async function checkPassword(
//   plainPassword: string,
//   hashedPassword: string,
// ): Promise<boolean> {
//   const match = await bcrypt.compare(plainPassword, hashedPassword);
//   return match;
// }

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(amount: number): string {
  return amount.toFixed(2);
}

export function formatCurrency(currency: string, amount: number): string {
  // Create a map for currency symbols
  const currencySymbols: Record<string, string> = {
    USD: "$",
    CAD: "C$",
    GBP: "£",
    EUR: "€",
    GHS: "₵",
    TZS: "TSh",
    KHS: "KSh",
    NGN: "₦",
    // Add more currencies as needed
  };

  // Default to empty string if the currency is not found
  const symbol = currencySymbols[currency] ?? "";

  // Format the amount to two decimal places
  const formattedAmount = amount.toFixed(2);

  return `${symbol}${formattedAmount}`;
}

export function constructMetadata({
  title = "Cendmate Inc.",
  description = "Cendmate - Send Money To Friends And Family Instantly",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@cendmate",
    },
    icons,
    metadataBase: new URL("https://cendmate.com"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
