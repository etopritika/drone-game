import { useState, useEffect, useRef } from "react";

const Drone: React.FC = () => {
  const [droneX, setDroneX] = useState(250);
  const canvasWidth = 500;
  const moveStep = 5;
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      keysPressed.current[event.key] = true;
    }
  };

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
  }, []);

  return (
    <div
      className="fixed top-0 bg-green-500 w-6 h-6 z-50"
      style={{ transform: `translateX(${droneX}px)` }}
    />
  );
};

export default Drone;
