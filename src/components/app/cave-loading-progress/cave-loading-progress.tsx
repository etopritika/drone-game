import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface CaveLoadingProgressProps {
  allCoordinatesReceived: boolean;
}

const CaveLoadingProgress: React.FC<CaveLoadingProgressProps> = ({
  allCoordinatesReceived,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (allCoordinatesReceived) {
      setProgress(100);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 1
      );
    }, 40);

    return () => clearInterval(interval);
  }, [allCoordinatesReceived]);

  return (
    <div className="w-full sm:w-96 max-w-md my-4">
      <Progress value={progress} className="w-full h-4 bg-white" />
      <p className="text-center mt-2">Loading cave: {Math.round(progress)}%</p>
    </div>
  );
};

export default CaveLoadingProgress;
