import type { ReactNode } from "react";
import { Badge } from "~/components/ui/badge";

interface ProfileInfoItemProps {
  icon: ReactNode;
  title: string;
  value: string | undefined;
}

export default function ProfileInfoItem({
  icon,
  title,
  value,
}: ProfileInfoItemProps) {
  return (
    <>
      <div className="mt-2 flex w-full flex-row items-center justify-between gap-2 rounded-lg border p-2">
        <span className="flex flex-row items-center gap-2 text-sm font-semibold text-muted-foreground">
          {icon}
          {title}
        </span>

        <Badge className="rounded-sm" variant={"secondary"}>
          {value}
        </Badge>
      </div>
    </>
  );
}
