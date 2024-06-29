import Image from "next/image";

interface CustomHeaderProps {
  label: string;
}

export default function CustomHeader({ label }: CustomHeaderProps) {
  return (
    <div className="flex w-full flex-col items-center justify-between gap-y-4">
      <Image src="/logo512.png" alt="Logo" width={80} height={80} />
      <p className="text-md font-semibold text-muted-foreground">{label}</p>
    </div>
  );
}
