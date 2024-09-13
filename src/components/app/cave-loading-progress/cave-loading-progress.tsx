import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { loadingMessages } from "./loading-messages";

interface CaveLoadingProgressProps {
  allCoordinatesReceived: boolean;
}

const CaveLoadingProgress: React.FC<CaveLoadingProgressProps> = ({
  allCoordinatesReceived,
}) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

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

  useEffect(() => {
    if (progress === 100) {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }
  }, [progress]);

  return (
    <div className="w-full sm:w-96 max-w-md my-4">
      <Progress value={progress} className="w-full h-4 bg-white" />
      <p className="text-center mt-2">
        {loadingMessages[messageIndex]}: {Math.round(progress)}%
      </p>
    </div>
  );
};

export default CaveLoadingProgress;
