import { useCallback, useEffect, useRef, useState } from "react";
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
  const [verticalSpeed, setVerticalSpeed] = useState(10);
  const segmentHeight = 20;
  const canvasHeight = segments.length * segmentHeight;

  const handleSpeedUp = useCallback(() => {
    setVerticalSpeed((prev) => Math.min(prev + 2, 50));
  }, []);

  const handleSpeedDown = useCallback(() => {
    setVerticalSpeed((prev) => Math.max(prev - 2, 1));
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setCaveOffsetY((prevOffsetY) => prevOffsetY + verticalSpeed);
      animationFrameId = requestAnimationFrame(animate);
    };

    if (allCoordinatesReceived && !isDrawerOpen) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [allCoordinatesReceived, isDrawerOpen, verticalSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastLeftX = 250 + (segments[0]?.leftWall ?? -71);
    let lastRightX = 250 + (segments[0]?.rightWall ?? 71);
    let lastY = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#242424";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    segments.forEach(({ leftWall, rightWall }) => {
      const currentY = lastY + segmentHeight;

      ctx.beginPath();
      ctx.moveTo(lastLeftX, lastY);
      ctx.lineTo(250 + leftWall, currentY);
      ctx.lineTo(250 + rightWall, currentY);
      ctx.lineTo(lastRightX, lastY);
      ctx.closePath();

      ctx.fillStyle = "#FFFFFF";
      ctx.fill();

      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 2;
      ctx.stroke();

      lastLeftX = 250 + leftWall;
      lastRightX = 250 + rightWall;
      lastY = currentY;
    });
  }, [segments]);

  return (
    <div className="relative overflow-hidden h-screen w-full">
      <Drone
        segments={segments}
        caveOffsetY={caveOffsetY}
        handleSpeedUp={handleSpeedUp}
        handleSpeedDown={handleSpeedDown}
      />
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
