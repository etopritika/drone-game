import { DRONE_HORIZONTAL_SPEED, SEGMENT_HEIGHT } from "@/lib/game-settings";
import { useGameStore } from "@/store/game-store";
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
  const [droneOpacity, setDroneOpacity] = useState(1);
  const canvasWidth = 500;
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const isGameOver = useGameStore((state) => state.isGameOver);
  const setGameOver = useGameStore((state) => state.setGameOver);

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      const isKeyDown = event.type === "keydown";
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        keysPressed.current[event.key] = isKeyDown;
      }

      if (event.key === "ArrowDown" && isKeyDown) {
        handleSpeedUp();
      }

      if (event.key === "ArrowUp" && isKeyDown) {
        handleSpeedDown();
      }
    },
    [handleSpeedUp, handleSpeedDown]
  );

  useEffect(() => {
    const moveDrone = () => {
      if (isGameOver) return;

      setDroneX((prevX) => {
        let newX = prevX;
        if (keysPressed.current["ArrowLeft"]) {
          newX = Math.max(0, prevX - DRONE_HORIZONTAL_SPEED);
        }
        if (keysPressed.current["ArrowRight"]) {
          newX = Math.min(canvasWidth - 20, prevX + DRONE_HORIZONTAL_SPEED);
        }
        return newX;
      });

      requestAnimationFrame(moveDrone);
    };

    requestAnimationFrame(moveDrone);

    window.addEventListener("keydown", handleKey);
    window.addEventListener("keyup", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("keyup", handleKey);
    };
  }, [handleKey, isGameOver]);

  useEffect(() => {
    const currentSegmentIndex = Math.floor(caveOffsetY / SEGMENT_HEIGHT);

    if (currentSegmentIndex >= segments.length) {
      setGameOver(true);
      setDroneOpacity(0);
      setTimeout(() => {
        navigate("/finish-game");
      }, 1000);
      return;
    }

    const { leftWall, rightWall } = segments[currentSegmentIndex] || {};
    const leftWallX = 250 + (leftWall ?? -71);
    const rightWallX = 250 + (rightWall ?? 71);

    if (droneX < leftWallX || droneX > rightWallX) {
      setGameOver(true);
      setDroneOpacity(0);
      setTimeout(() => {
        navigate("/finish-game");
      }, 1000);
    }
  }, [droneX, caveOffsetY, segments, setGameOver, navigate]);

  return (
    <div
      className="fixed top-0 z-50"
      style={{
        width: 0,
        height: 0,
        borderLeft: "10px solid transparent",
        borderRight: "10px solid transparent",
        borderTop: "20px solid green",
        transform: `translateX(${droneX}px)`,
        opacity: droneOpacity,
        transition: "opacity 1s ease",
      }}
    />
  );
};

export default Drone;
