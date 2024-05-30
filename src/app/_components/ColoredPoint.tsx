"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Dot {
  position: { x: number; y: number };
  color: string;
}

interface RandomDotsProps {
  numDots?: number;
  containerWidth?: number;
  containerHeight?: number;
}

const getRandomPosition = (maxWidth: number, maxHeight: number) => {
  const x = Math.floor(Math.random() * maxWidth);
  const y = Math.floor(Math.random() * maxHeight);
  return { x, y };
};

const getRandomColor = () => {
  const colors = [
    "bg-red-500 opacity-75",
    "bg-green-500 opacity-75",
    "bg-blue-500 opacity-75",
    "bg-yellow-500 opacity-75",
    "bg-purple-500 opacity-75",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const RandomDots: React.FC<RandomDotsProps> = ({
  numDots = 10,
  containerWidth = 800,
  containerHeight = 600,
}) => {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    const newDots: Dot[] = [];
    for (let i = 0; i < numDots; i++) {
      newDots.push({
        position: getRandomPosition(containerWidth, containerHeight),
        color: getRandomColor()!,
      });
    }
    setDots(newDots);
  }, [numDots, containerWidth, containerHeight]);

  return (
    <div className={`relative w-full h-[${containerHeight}px]`}>
      {dots.map((dot, index) => (
        <motion.div
          key={index}
          className={`absolute h-4 w-4 rounded-full ${dot.color}`}
          style={{ top: dot.position.y, left: dot.position.x }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      ))}
    </div>
  );
};

export default RandomDots;
