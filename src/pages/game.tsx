import CaveLoadingProgress from "@/components/app/cave-loading-progress/cave-loading-progress";
import Cave from "@/components/app/cave/cave";
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
    <div>
      {!allCoordinatesReceived && (
        <CaveLoadingProgress allCoordinatesReceived={allCoordinatesReceived} />
      )}
      {allCoordinatesReceived && <Cave segments={caveSegments} />}
    </div>
  );
};

export default GamePage;
