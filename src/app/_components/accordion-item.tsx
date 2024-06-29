import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

interface AccordionDetailsItemProps {
  title: string;
  value: string;
  className?: string;
  isBadge?: boolean;
}

export default function AccordionDetailsItem({
  title,
  value,
  className,
  isBadge,
}: AccordionDetailsItemProps) {
  return (
    <>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-muted-foreground">
          {title}
        </span>
        <div>
          {isBadge ? (
            <Badge className={cn(className, "rounded-sm")}>{value}</Badge>
          ) : (
            <strong>{value}</strong>
          )}
        </div>
      </div>
    </>
  );
}
