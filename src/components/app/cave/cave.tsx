import { useEffect, useRef } from "react";

interface CaveProps {
  segments: { leftWall: number; rightWall: number }[];
}

const Cave: React.FC<CaveProps> = ({ segments }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  const canvasHeight = segments.length * 20 - 20;

  return (
    <div className="min-h-screen">
      <canvas ref={canvasRef} width="500" height={canvasHeight} />
    </div>
  );
};

export default Cave;
