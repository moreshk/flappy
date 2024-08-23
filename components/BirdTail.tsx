import React from 'react';
import { motion } from 'framer-motion';

interface BirdTailProps {
  positions: { x: number; y: number }[];
}

const BirdTail: React.FC<BirdTailProps> = ({ positions }) => {
  if (positions.length < 2) return null;

  const tailLength = 200; // Adjust this value to change the tail length
  const tailSegments = 20; // Increased number of segments for smoother tail

  const generateTailPath = () => {
    const path = [];
    for (let i = 0; i < tailSegments; i++) {
      const t = i / (tailSegments - 1);
      const index = Math.floor(t * (positions.length - 1));
      const pos = positions[index];
      path.push(`${pos.x - tailLength * t} ${pos.y}`);
    }
    return `M ${path.join(' L ')}`;
  };

  return (
    <svg className="absolute top-0 left-0 w-full h-full z-30 pointer-events-none">
      <motion.path
        d={generateTailPath()}
        fill="none"
        stroke="rgba(255, 255, 255, 0.5)"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "linear" }}
      />
    </svg>
  );
};

export default BirdTail;