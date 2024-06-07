type Limits = {
  dailyDeposit: number;
  weeklyDeposit: number;
  monthlyDeposit: number;
  dailyWithdrawal: number;
  weeklyWithdrawal: number;
  monthlyWithdrawal: number;
};

const defaultLimits: Record<string, Limits> = {
  USD: {
    dailyDeposit: 1000,
    weeklyDeposit: 5000,
    monthlyDeposit: 20000,
    dailyWithdrawal: 800,
    weeklyWithdrawal: 4000,
    monthlyWithdrawal: 16000,
  },
  CAD: {
    dailyDeposit: 1500,
    weeklyDeposit: 6000,
    monthlyDeposit: 25000,
    dailyWithdrawal: 2500,
    weeklyWithdrawal: 12000,
    monthlyWithdrawal: 60000,
  },
  GBP: {
    dailyDeposit: 800,
    weeklyDeposit: 4000,
    monthlyDeposit: 16000,
    dailyWithdrawal: 700,
    weeklyWithdrawal: 3500,
    monthlyWithdrawal: 14000,
  },
  EUR: {
    dailyDeposit: 1100,
    weeklyDeposit: 5500,
    monthlyDeposit: 22000,
    dailyWithdrawal: 850,
    weeklyWithdrawal: 4250,
    monthlyWithdrawal: 17000,
  },
  GHS: {
    dailyDeposit: 1200,
    weeklyDeposit: 5500,
    monthlyDeposit: 22000,
    dailyWithdrawal: 2200,
    weeklyWithdrawal: 10500,
    monthlyWithdrawal: 55000,
  },
  TZS: {
    dailyDeposit: 2300000,
    weeklyDeposit: 11500000,
    monthlyDeposit: 46000000,
    dailyWithdrawal: 2000000,
    weeklyWithdrawal: 10000000,
    monthlyWithdrawal: 40000000,
  },
  KES: {
    dailyDeposit: 1300,
    weeklyDeposit: 6500,
    monthlyDeposit: 26000,
    dailyWithdrawal: 2300,
    weeklyWithdrawal: 11000,
    monthlyWithdrawal: 58000,
  },
  NGN: {
    dailyDeposit: 1000,
    weeklyDeposit: 5000,
    monthlyDeposit: 20000,
    dailyWithdrawal: 2000,
    weeklyWithdrawal: 10000,
    monthlyWithdrawal: 50000,
  },
};

const defaultLimit: Limits = {
  dailyDeposit: 0,
  weeklyDeposit: 0,
  monthlyDeposit: 0,
  dailyWithdrawal: 0,
  weeklyWithdrawal: 0,
  monthlyWithdrawal: 0,
};

export function getCurrencyLimits(currency: string): Limits {
  // Return the limits for the specified currency or null if not found
  return defaultLimits[currency] ?? defaultLimit;
}
