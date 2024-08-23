import useGame from "../hooks/useGame";
import useInterval from "../hooks/useInterval";
import { useState, useEffect } from 'react';
import BirdTail from './BirdTail';

export default function FlappyBird() {
  const {
    isStarted,
    bird: {
      fall: { delay },
      position,
      size,
    },
    fall,
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

  return <BirdTail positions={tailPositions} />;
}