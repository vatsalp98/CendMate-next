import { QuoteIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "~/components/ui/card";

export default function TestimonialCard({
  description,
  name,
  location,
}: {
  description: string;
  name: string;
  location: string;
}) {
  return (
    <>
      <Card className="shadow-sm transition-all duration-75 hover:shadow-lg">
        <CardHeader>
          <div className="h-20 w-20 rounded-full bg-[url('/avatars/1.jpg')] bg-contain bg-center bg-no-repeat" />
        </CardHeader>
        <CardContent className="flex flex-row items-end">
          <div className="text-sm italic">{description}</div>
          <QuoteIcon className="h-8 w-8 text-primary" />
        </CardContent>

        <CardFooter className="flex flex-col items-start">
          <h2 className="text-xl font-semibold">{name}</h2>
          <span className="text-sm text-muted-foreground">{location}</span>
        </CardFooter>
      </Card>
    </>
  );
}
