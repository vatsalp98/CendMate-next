import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";

interface LimitCardProps {
  title: string;
  used: number;
  daily_limit: string;
  weekly_limit: string;
  monthly_limit: string;
  icon: ReactNode;
}

export default function LimitCard({
  title,
  used,
  daily_limit,
  weekly_limit,
  monthly_limit,
  icon,
}: LimitCardProps) {
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
                {daily_limit}
              </span>
            </div>
            <Progress value={used + 1} />
          </div>
          <div>
            <div className="flex w-full flex-row justify-between">
              <span className="text-sm font-semibold text-muted-foreground">
                Weekly
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                {weekly_limit}
              </span>
            </div>
            <Progress value={used + 1} />
          </div>
          <div>
            <div className="flex w-full flex-row justify-between">
              <span className="text-sm font-semibold text-muted-foreground">
                Monthly
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                {monthly_limit}
              </span>
            </div>
            <Progress value={used + 1} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
