import { motion } from "framer-motion";
import useGame from "../hooks/useGame";
import useInterval from "../hooks/useInterval";
import { useState, useEffect } from 'react';
import BirdTail from './BirdTail';

export function Bird() {
  const {
    bird: {
      size: { height, width },
      frame,
      isFlying,
      flap: { delay },
    },
    getNextFrame,
  } = useGame();
  useInterval(() => getNextFrame(), isFlying ? delay : null);
  return (
    <div
      style={{
        backgroundImage: "url(bird.png)",
        height,
        width,
        backgroundPosition: frame,
        backgroundSize: "auto 100%",
        zIndex: 100,
      }}
    />
  );
}
export default function FlappyBird() {
  const {
    isStarted,
    bird: {
      fall: { delay },
      position,
      animate,
      size,
    },
    fall,
    window,
  } = useGame();

  const [tailPositions, setTailPositions] = useState<{ x: number; y: number }[]>([]);

  useInterval(() => fall(), isStarted ? delay : null);

  useEffect(() => {
    if (isStarted) {
      setTailPositions(prevPositions => {
        const newPosition = { 
          x: position.x + size.width / 2, 
          y: position.y + size.height / 2 
        };
        const newPositions = [newPosition, ...prevPositions].slice(0, 20);
        return newPositions;
      });
    } else {
      setTailPositions([]);
    }
  }, [position, isStarted, size]);

  return (
    <>
      <BirdTail positions={tailPositions} />
      <motion.div
        className={`m-auto absolute z-40 ${
          !isStarted && "animate-pulse"
        } w-20 h-10`}
        style={{
          ...position,
        }}
        animate={{
          ...position,
          ...animate,
        }}
        transition={{
          ease: "linear",
          duration: 0.25,
        }}
      >
        <Bird />
      </motion.div>
    </>
  );
}