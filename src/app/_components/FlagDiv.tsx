"use client";

import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

export default function FlagDiv({
  className,
  top,
  right,
  left,
  duration,
}: {
  className: string;
  top: number;
  right?: number;
  left?: number;
  duration: number;
}) {
  return (
    <>
      <motion.div
        className={cn(
          "absolute top-1 -z-0 h-20 w-20 rounded-full bg-contain",
          className,
        )}
        animate={{ scale: [1, 1.25, 1] }}
        transition={{
          duration: duration,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        style={{ top: top, left: left, right: right }}
      />
    </>
  );
}
