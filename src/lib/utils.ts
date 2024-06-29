import type { Transaction, Wallet } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
import { ComplyCubeDate } from "~/config/models";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(value: number) {
  return value.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}

function filterTransactions(
  transactions: Transaction[],
  startDate: Date,
  endDate: Date,
  type: string,
): Transaction[] {
  const successTransactions = transactions
    .filter((item) => item.status === "SUCCESS")
    .filter((item) => item.type === type);
  return successTransactions.filter(
    (transaction) =>
      transaction.updatedAt >= startDate && transaction.updatedAt <= endDate,
  );
}

export function getTotalTransactions(
  transactions: Transaction[],
  rangeType: "daily" | "weekly" | "monthly",
  type: string,
): number {
  const now = new Date();
  let startDate: Date;
  const endDate: Date = now;

  switch (rangeType) {
    case "daily":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "weekly":
      const firstDayOfWeek = now.getDate() - now.getDay();
      startDate = new Date(now.getFullYear(), now.getMonth(), firstDayOfWeek);
      break;
    case "monthly":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    default:
      throw new Error("Range type must be 'daily', 'weekly', or 'monthly'");
  }

  const filteredTransactions = filterTransactions(
    transactions,
    startDate,
    endDate,
    type,
  );
  const totalAmount = filteredTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  );

  return totalAmount;
}

export function formatCurrency(currency: string, amount: string): string {
  // Create a map for currency symbols
  const currencySymbols: Record<string, string> = {
    USD: "$",
    CAD: "C$",
    GBP: "£",
    EUR: "€",
    GHS: "₵",
    TZS: "TSh",
    KES: "KSh",
    NGN: "₦",
    // Add more currencies as needed
  };

  // Default to empty string if the currency is not found
  const symbol = currencySymbols[currency] ?? "";

  return `${symbol} ${amount}`;
}

export function getCurrencySymbol(currency: string): string {
  const currencySymbols: Record<string, string> = {
    USD: "$",
    CAD: "C$",
    GBP: "£",
    EUR: "€",
    GHS: "₵",
    TZS: "TSh",
    KES: "KSh",
    NGN: "₦",
  };

  return currencySymbols[currency] ?? "";
}

export const numberRegex = /^\d+(\.\d{1,2})?$/;

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

export function isFincraCurrency(currency: string) {
  return ["GHS", "KES"].includes(currency);
}

export function isNiumCurrency(currency: string) {
  return ["USD", "CAD", "GBP"].includes(currency);
}

export function getCallingCodeByCurrency(
  currency: string,
  defaultCallingCode = "+1",
): string {
  // Added defaultCallingCode
  const currencyToCallingCode: Record<string, string> = {
    USD: "+1", // United States
    CAD: "+1", // Canada
    EUR: "+44", // Euro (using UK as example)
    GHS: "+233",
    KES: "+254", // Kenya
  };

  return currencyToCallingCode[currency] ?? defaultCallingCode; // Use the nullish coalescing operator (??)
}

const currencyMap: Record<string, string> = {
  USD: "United States Dollar",
  CAD: "Canadian Dollar",
  EUR: "Euro",
  GBP: "British Pound Sterling",
  NGN: "Nigerian Naira",
  KES: "Kenyan Shilling",
  GHS: "Ghanaian Cedi",
};

export function getCurrencyFullName(currencyCode: string): string {
  return currencyMap[currencyCode] ?? "Unknown Currency Code";
}

export const allCurrencies = ["USD", "CAD", "EUR", "GBP", "NGN", "KES", "GHS"];

export function conversionCurrencies(currency: string, wallets: Wallet[]) {
  const westernCurrencies = ["CAD", "EUR", "USD", "GBP"];

  const supportedConversions: Record<string, string[]> = {
    USD: allCurrencies.filter((item) => item != "USD"),
    CAD: allCurrencies.filter((item) => item != "CAD"),
    EUR: allCurrencies.filter((item) => item != "EUR"),
    GBP: allCurrencies.filter((item) => item != "GBP"),
    GHS: westernCurrencies,
    NGN: westernCurrencies,
    KES: westernCurrencies,
    TZS: westernCurrencies,
  };

  const availableCurrencies = supportedConversions[currency];
  if (!availableCurrencies) {
    return [];
  }

  return wallets.filter((wallet) =>
    availableCurrencies.includes(wallet.currency),
  );
}

export function validateDecimal(input: string) {
  // This regex allows numbers with up to 2 decimal places
  const regex = /^\d+(\.\d{0,2})?$/;
  return regex.test(input);
}

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatComplyCubeDate(date: ComplyCubeDate) {
  return `${date.day}/${date.month}/${date.year}`;
}

export function MapleRadFormatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
}

const countryCodes: Record<string, string> = {
  Afghanistan: "AF",
  Albania: "AL",
  Algeria: "DZ",
  Andorra: "AD",
  Angola: "AO",
  Argentina: "AR",
  Armenia: "AM",
  Australia: "AU",
  Austria: "AT",
  Azerbaijan: "AZ",
  Bahamas: "BS",
  Bahrain: "BH",
  Bangladesh: "BD",
  Barbados: "BB",
  Belarus: "BY",
  Belgium: "BE",
  Belize: "BZ",
  Benin: "BJ",
  Bhutan: "BT",
  Bolivia: "BO",
  "Bosnia and Herzegovina": "BA",
  Botswana: "BW",
  Brazil: "BR",
  Brunei: "BN",
  Bulgaria: "BG",
  "Burkina Faso": "BF",
  Burundi: "BI",
  Cambodia: "KH",
  Cameroon: "CM",
  Canada: "CA",
  "Cape Verde": "CV",
  "Central African Republic": "CF",
  Chad: "TD",
  Chile: "CL",
  China: "CN",
  Colombia: "CO",
  Comoros: "KM",
  Congo: "CG",
  "Costa Rica": "CR",
  Croatia: "HR",
  Cuba: "CU",
  Cyprus: "CY",
  "Czech Republic": "CZ",
  Denmark: "DK",
  Djibouti: "DJ",
  Dominica: "DM",
  "Dominican Republic": "DO",
  Ecuador: "EC",
  Egypt: "EG",
  "El Salvador": "SV",
  "Equatorial Guinea": "GQ",
  Eritrea: "ER",
  Estonia: "EE",
  Eswatini: "SZ",
  Ethiopia: "ET",
  Fiji: "FJ",
  Finland: "FI",
  France: "FR",
  Gabon: "GA",
  Gambia: "GM",
  Georgia: "GE",
  Germany: "DE",
  Ghana: "GH",
  Greece: "GR",
  Grenada: "GD",
  Guatemala: "GT",
  Guinea: "GN",
  "Guinea-Bissau": "GW",
  Guyana: "GY",
  Haiti: "HT",
  Honduras: "HN",
  Hungary: "HU",
  Iceland: "IS",
  India: "IN",
  Indonesia: "ID",
  Iran: "IR",
  Iraq: "IQ",
  Ireland: "IE",
  Israel: "IL",
  Italy: "IT",
  Jamaica: "JM",
  Japan: "JP",
  Jordan: "JO",
  Kazakhstan: "KZ",
  Kenya: "KE",
  Kiribati: "KI",
  Kuwait: "KW",
  Kyrgyzstan: "KG",
  Laos: "LA",
  Latvia: "LV",
  Lebanon: "LB",
  Lesotho: "LS",
  Liberia: "LR",
  Libya: "LY",
  Liechtenstein: "LI",
  Lithuania: "LT",
  Luxembourg: "LU",
  Madagascar: "MG",
  Malawi: "MW",
  Malaysia: "MY",
  Maldives: "MV",
  Mali: "ML",
  Malta: "MT",
  "Marshall Islands": "MH",
  Mauritania: "MR",
  Mauritius: "MU",
  Mexico: "MX",
  Micronesia: "FM",
  Moldova: "MD",
  Monaco: "MC",
  Mongolia: "MN",
  Montenegro: "ME",
  Morocco: "MA",
  Mozambique: "MZ",
  Myanmar: "MM",
  Namibia: "NA",
  Nauru: "NR",
  Nepal: "NP",
  Netherlands: "NL",
  "New Zealand": "NZ",
  Nicaragua: "NI",
  Niger: "NE",
  Nigeria: "NG",
  "North Macedonia": "MK",
  Norway: "NO",
  Oman: "OM",
  Pakistan: "PK",
  Palau: "PW",
  Panama: "PA",
  "Papua New Guinea": "PG",
  Paraguay: "PY",
  Peru: "PE",
  Philippines: "PH",
  Poland: "PL",
  Portugal: "PT",
  Qatar: "QA",
  Romania: "RO",
  Russia: "RU",
  Rwanda: "RW",
  "Saint Kitts and Nevis": "KN",
  "Saint Lucia": "LC",
  "Saint Vincent and the Grenadines": "VC",
  Samoa: "WS",
  "San Marino": "SM",
  "Sao Tome and Principe": "ST",
  "Saudi Arabia": "SA",
  Senegal: "SN",
  Serbia: "RS",
  Seychelles: "SC",
  "Sierra Leone": "SL",
  Singapore: "SG",
  Slovakia: "SK",
  Slovenia: "SI",
  "Solomon Islands": "SB",
  Somalia: "SO",
  "South Africa": "ZA",
  "South Korea": "KR",
  "South Sudan": "SS",
  Spain: "ES",
  "Sri Lanka": "LK",
  Sudan: "SD",
  Suriname: "SR",
  Sweden: "SE",
  Switzerland: "CH",
  Syria: "SY",
  Taiwan: "TW",
  Tajikistan: "TJ",
  Tanzania: "TZ",
  Thailand: "TH",
  Togo: "TG",
  Tonga: "TO",
  "Trinidad and Tobago": "TT",
  Tunisia: "TN",
  Turkey: "TR",
  Turkmenistan: "TM",
  Tuvalu: "TV",
  Uganda: "UG",
  Ukraine: "UA",
  "United Arab Emirates": "AE",
  "United Kingdom": "GB",
  "United States": "US",
  Uruguay: "UY",
  Uzbekistan: "UZ",
  Vanuatu: "VU",
  "Vatican City": "VA",
  Venezuela: "VE",
  Vietnam: "VN",
  Yemen: "YE",
  Zambia: "ZM",
  Zimbabwe: "ZW",
};

export function getCountryCode(countryName: string): string {
  return countryCodes[countryName] ?? " ";
}

export function generateUniqueId() {
  // Generate a unique MID (Merchant ID) using UUID version 4
  return uuidv4().replace(/-/g, "").substring(0, 9); // Remove hyphens and take the first 9 characters
}
