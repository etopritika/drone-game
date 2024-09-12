import { usePlayerStore } from "@/store/player-store";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface DroneProps {
  segments: { leftWall: number; rightWall: number }[];
  caveOffsetY: number;
  handleSpeedUp: () => void;
  handleSpeedDown: () => void;
}

const Drone: React.FC<DroneProps> = ({
  segments,
  caveOffsetY,
  handleSpeedUp,
  handleSpeedDown,
}) => {
  const navigate = useNavigate();
  const [droneX, setDroneX] = useState(250);
  const canvasWidth = 500;
  const moveStep = 5;
  const segmentHeight = 20;
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  const setGameOver = usePlayerStore((state) => state.setGameOver);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        keysPressed.current[event.key] = true;
      }

      if (event.key === "ArrowDown") {
        handleSpeedUp();
      }

      if (event.key === "ArrowUp") {
        handleSpeedDown();
      }
    },
    [handleSpeedUp, handleSpeedDown]
  );

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      keysPressed.current[event.key] = false;
    }
  };

  useEffect(() => {
    const moveDrone = () => {
      setDroneX((prevX) => {
        let newX = prevX;

        if (keysPressed.current["ArrowLeft"]) {
          newX = Math.max(0, prevX - moveStep);
        }
        if (keysPressed.current["ArrowRight"]) {
          newX = Math.min(canvasWidth - 20, prevX + moveStep);
        }

        return newX;
      });

      requestAnimationFrame(moveDrone);
    };

    requestAnimationFrame(moveDrone);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    const currentSegmentIndex = Math.floor(caveOffsetY / segmentHeight);

    if (currentSegmentIndex >= segments.length) {
      console.log("Вітаємо! Ви завершили гру.");
      setGameOver(true);
      navigate("/finish-game");
      return;
    }

    if (segments[currentSegmentIndex]) {
      const { leftWall, rightWall } = segments[currentSegmentIndex];
      const leftWallX = 250 + leftWall;
      const rightWallX = 250 + rightWall;

      if (droneX >= leftWallX && droneX <= rightWallX) {
        console.log("Дрон знаходиться в безпечній зоні.");
      } else {
        console.log("Дрон врізався у стіну або вийшов за межі печери!");
        setGameOver(true);
        navigate("/finish-game");
      }
    }
  }, [droneX, caveOffsetY, segments, setGameOver, navigate]);

  return (
    <div
      className="fixed top-0 bg-green-500 w-6 h-6 z-50"
      style={{ transform: `translateX(${droneX}px)` }}
    />
  );
};

export default Drone;