import copy from "copy-to-clipboard";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

interface CopyButtonProps {
  text: string;
  textTitle: string;
}

export default function CopyButton({ text, textTitle }: CopyButtonProps) {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => {
                if (copy(text)) {
                  toast.success(`${textTitle} copied to clipboard`);
                }
              }}
            >
              <Copy />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Click to Copy</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
