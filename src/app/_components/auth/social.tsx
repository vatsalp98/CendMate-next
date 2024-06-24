import { FacebookIcon } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function SocialAuth() {
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button size={"lg"} variant={"outline"}>
        <FacebookIcon />
      </Button>
    </div>
  );
}
