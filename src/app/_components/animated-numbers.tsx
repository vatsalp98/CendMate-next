import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { formatMoney } from "~/lib/utils";

type AnimatedNumbersProps = {
  value: number;
};

export const AnimatedNumbers = ({ value }: AnimatedNumbersProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref);
  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest: number) => {
      if (ref.current && latest <= value) {
        ref.current.textContent = formatMoney(latest);
      }
    });
  }, [springValue, value]);

  return <span ref={ref} className="text-dark dark:text-light"></span>;
};
