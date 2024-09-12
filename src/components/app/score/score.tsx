import { usePlayerStore } from "@/store/player-store";
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

  const isGameOver = usePlayerStore((state) => state.isGameOver);
  const saveScore = usePlayerStore((state) => state.setScore);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (!isDrawerOpen && !isGameOver) {
      intervalId = setInterval(() => {
        setScore(
          (prevScore) => prevScore + Math.floor(complexity * verticalSpeed)
        );
      }, 100);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [complexity, verticalSpeed, isDrawerOpen, isGameOver]);

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
