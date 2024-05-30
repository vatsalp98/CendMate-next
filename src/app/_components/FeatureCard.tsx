import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Image from "next/image";

export default function FeatureCard({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) {
  return (
    <>
      <Card className="text-center shadow-sm transition-all duration-100 hover:shadow-lg">
        <CardHeader className="items-center gap-2">
          <Image src={image} alt="send" width={50} height={50} />
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}
