import type { Transaction } from "@prisma/client";
import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { formatCurrency, formatMoney, getTotalTransactions } from "~/lib/utils";

interface LimitCardProps {
  title: string;
  transactions: Transaction[];
  type: string;
  daily_limit: number;
  weekly_limit: number;
  monthly_limit: number;
  currency: string;
  icon: ReactNode;
}

export default function LimitCard({
  title,
  transactions,
  type,
  daily_limit,
  weekly_limit,
  monthly_limit,
  icon,
  currency,
}: LimitCardProps) {
  const dailyTotal = getTotalTransactions(transactions, "daily", type);
  const weeklyTotal = getTotalTransactions(transactions, "weekly", type);
  const monthlyTotal = getTotalTransactions(transactions, "monthly", type);

  return (
    <Card className="flex-1 shadow-sm hover:shadow-lg dark:shadow-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Limits</CardDescription>
        </div>
        <div>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div>
            <div className="flex w-full flex-row justify-between">
              <span className="text-sm font-semibold text-muted-foreground">
                Daily
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                {formatCurrency(currency, formatMoney(daily_limit))}
              </span>
            </div>
            <Progress value={(dailyTotal / daily_limit) * 100} />
          </div>
          <div>
            <div className="flex w-full flex-row justify-between">
              <span className="text-sm font-semibold text-muted-foreground">
                Weekly
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                {formatCurrency(currency, formatMoney(weekly_limit))}
              </span>
            </div>
            <Progress value={(weeklyTotal / weekly_limit) * 100} />
          </div>
          <div>
            <div className="flex w-full flex-row justify-between">
              <span className="text-sm font-semibold text-muted-foreground">
                Monthly
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                {formatCurrency(currency, formatMoney(monthly_limit))}
              </span>
            </div>
            <Progress value={(monthlyTotal / monthly_limit) * 100} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
