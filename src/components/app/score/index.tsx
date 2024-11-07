import { useGameStore } from "@/store/game-store";
import React, { useEffect, useState } from "react";

interface ScoreProps {
  complexity: number;
  verticalSpeed: number;
  isDrawerOpen: boolean;
}

const Score: React.FC<ScoreProps> = ({
  complexity,
  verticalSpeed,
  isDrawerOpen,
}) => {
  const [score, setScore] = useState(0);

  const isGameOver = useGameStore((state) => state.isGameOver);
  const saveScore = useGameStore((state) => state.setScore);

  const scoreIncrement = Math.floor(complexity * verticalSpeed);

  useEffect(() => {
    if (isDrawerOpen || isGameOver) return;

    const intervalId = setInterval(() => {
      setScore((prevScore) => prevScore + scoreIncrement);
    }, 100);

    return () => clearInterval(intervalId);
  }, [scoreIncrement, isDrawerOpen, isGameOver]);

  useEffect(() => {
    if (isGameOver) {
      saveScore(score);
    }
  }, [isGameOver, saveScore, score]);

  return (
    <div className="fixed top-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
      <div>
        <strong>Score:</strong> {score}
      </div>
      <div>
        <strong>Speed:</strong> {verticalSpeed}
      </div>
    </div>
  );
};

export default Score;
