import { useState, useEffect } from "react";

const Drone: React.FC = () => {
  const [droneX, setDroneX] = useState(250);
  const canvasWidth = 500;

  const handleKeyPress = (event: KeyboardEvent) => {
    const moveStep = 10;

    if (event.key === "ArrowLeft") {
      setDroneX((prevX) => Math.max(0, prevX - moveStep));
    }
    if (event.key === "ArrowRight") {
      setDroneX((prevX) => Math.min(canvasWidth - 20, prevX + moveStep));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div
      className="fixed top-0 bg-green-500 w-6 h-6"
      style={{ transform: `translateX(${droneX}px)` }}
    />
  );
};

export default Drone;
