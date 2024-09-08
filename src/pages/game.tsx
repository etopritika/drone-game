import CaveLoadingProgress from "@/components/app/cave-loading-progress/cave-loading-progress";
import Cave from "@/components/app/cave/cave";
import Drone from "@/components/app/drone/drone";
import { useWebSocket } from "@/hooks/use-web-socket";
import { usePlayerStore } from "@/store/player-store";
import { useCallback, useState } from "react";

const GamePage = () => {
  const playerId = usePlayerStore((state) => state.playerId);
  const chunks = usePlayerStore((state) => state.chunks);
  const token = chunks;

  const [caveSegments, setCaveSegments] = useState<
    { leftWall: number; rightWall: number }[]
  >([]);
  const [allCoordinatesReceived, setAllCoordinatesReceived] = useState(false);

  const handleMessage = useCallback((data: string) => {
    if (data === "finished") {
      setAllCoordinatesReceived(true);
      return;
    }

    const [leftWall, rightWall] = data.split(",").map(Number);
    setCaveSegments((prev) => [...prev, { leftWall, rightWall }]);
  }, []);

  useWebSocket(playerId, token, handleMessage);

  return (
    <div className="relative min-h-screen">
      {!allCoordinatesReceived && (
        <div className="h-screen flex items-center">
          <CaveLoadingProgress
            allCoordinatesReceived={allCoordinatesReceived}
          />
        </div>
      )}

      {allCoordinatesReceived && (
        <div>
          <Drone />
          <Cave segments={caveSegments} />
        </div>
      )}
    </div>
  );
};

export default GamePage;
