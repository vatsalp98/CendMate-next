import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { getCurrencySymbol } from "~/lib/utils";

export default function ConvertComponent() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 py-4 sm:flex-row sm:justify-evenly">
        <div className="flex flex-1 flex-row gap-2">
          <div>
            <Select defaultValue="USD">
              <SelectTrigger>
                <SelectValue placeholder="Select a currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key={"USD"} value={"USD"}>
                  USD
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-muted-foreground sm:text-sm">
                  {getCurrencySymbol("KES")}
                </span>
              </div>
              <Input className="pl-10" placeholder="00.00" />
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-row justify-end gap-2">
          <div>
            <Select defaultValue="USD">
              <SelectTrigger>
                <SelectValue placeholder="Select a currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key={"USD"} value={"USD"}>
                  USD
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-muted-foreground sm:text-sm">
                  {getCurrencySymbol("USD")}
                </span>
              </div>
              <Input className="pl-10" placeholder="00.00" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
