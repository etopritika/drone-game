import { useEffect, useRef, useState } from "react";
import Drone from "../drone/drone";

interface CaveProps {
  segments: { leftWall: number; rightWall: number }[];
  allCoordinatesReceived: boolean;
  isDrawerOpen: boolean;
}

const Cave: React.FC<CaveProps> = ({
  segments,
  allCoordinatesReceived,
  isDrawerOpen,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [caveOffsetY, setCaveOffsetY] = useState(0);
  const verticalSpeed = 20;

  useEffect(() => {
    if (allCoordinatesReceived && !isDrawerOpen) {
      const interval = setInterval(() => {
        setCaveOffsetY((prevOffsetY) => prevOffsetY + verticalSpeed);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [allCoordinatesReceived, isDrawerOpen]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastLeftX = 250;
    let lastRightX = 250;
    let lastY = -21;
    const segmentHeight = 20;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#242424"; // Фон печери
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    segments.forEach(({ leftWall, rightWall }) => {
      const currentY = lastY + segmentHeight;

      ctx.beginPath();
      ctx.moveTo(lastLeftX, lastY);
      ctx.lineTo(250 + leftWall, currentY);
      ctx.lineTo(250 + rightWall, currentY);
      ctx.lineTo(lastRightX, lastY);
      ctx.closePath();

      ctx.fillStyle = "#FFFFFF"; // Колір стін
      ctx.fill();

      ctx.strokeStyle = "#FFFFFF"; // Колір контуру стін
      ctx.lineWidth = 2;
      ctx.stroke();

      lastLeftX = 250 + leftWall;
      lastRightX = 250 + rightWall;
      lastY = currentY;
    });
  }, [segments]);

  const canvasHeight = segments.length * 20 - 20;

  return (
    <div className="relative overflow-hidden h-screen w-full">
      <Drone />
      <canvas
        ref={canvasRef}
        width="500"
        height={canvasHeight}
        style={{ transform: `translateY(${-caveOffsetY}px)` }}
      />
    </div>
  );
};

export default Cave;
