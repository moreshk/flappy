import { motion } from "framer-motion";
import useGame from "../hooks/useGame";
import useInterval from "../hooks/useInterval";
import React from 'react';

export default function Pipes() {
  const {
    isStarted,
    pipe: { delay },
    pipes: pipesArray,
    movePipes,
  } = useGame();

  useInterval(() => movePipes(), isStarted ? delay : null);

  return (
    <>
      {pipesArray.map((pipes, index) => (
        <React.Fragment key={index}>
          <motion.div
            key={pipes.top.key}
            initial={pipes.top.initial}
            animate={pipes.top.position}
            style={{
              ...pipes.top.size,
              originY: 1,
            }}
            className="absolute"
            transition={{
              ease: "linear",
            }}
          >
            <Pipe position="top" />
          </motion.div>
          <motion.div
            key={pipes.bottom.key}
            initial={pipes.bottom.initial}
            animate={pipes.bottom.position}
            style={pipes.bottom.size}
            className="absolute"
            transition={{
              ease: "linear",
            }}
          >
            <Pipe position="bottom" />
          </motion.div>
        </React.Fragment>
      ))}
    </>
  );
}

interface PipeProps {
  position: 'top' | 'bottom';
}

export function Pipe({ position }: PipeProps) {
  const color = position === 'top' ? 'red' : 'green';
  const borderColor = position === 'top' ? 'darkred' : 'darkgreen';

  return (
    <div 
      className={`h-full w-full border-4 rounded-sm`}
      style={{
        backgroundColor: color,
        borderColor: borderColor,
      }}
    />
  );
}