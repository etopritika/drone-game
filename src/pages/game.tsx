import CaveLoadingProgress from "@/components/app/cave-loading-progress/cave-loading-progress";
import Cave from "@/components/app/cave/cave";
import GameDrawer from "@/components/app/game-drawer/game-drawer";
import { useWebSocket } from "@/hooks/use-web-socket";
import { usePlayerStore } from "@/store/player-store";
import { useCallback, useEffect, useState } from "react";

const GamePage = () => {
  const playerId = usePlayerStore((state) => state.playerId);
  const complexity = usePlayerStore((state) => state.complexity);
  const chunks = usePlayerStore((state) => state.chunks);
  const token = chunks;

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const [caveSegments, setCaveSegments] = useState<
    { leftWall: number; rightWall: number }[]
  >([]);
  const [allCoordinatesReceived, setAllCoordinatesReceived] = useState(false);

  const handleReceiveCoordinates = useCallback((data: string) => {
    if (data === "finished") {
      setAllCoordinatesReceived(true);
      return;
    }

    const [leftWall, rightWall] = data.split(",").map(Number);
    setCaveSegments((prev) => [...prev, { leftWall, rightWall }]);
  }, []);

  useWebSocket(playerId, token, handleReceiveCoordinates);

  const handleShowDrawer = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsDrawerOpen((prev) => !prev);
    }

    if (event.code === "Space") {
      setIsDrawerOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleShowDrawer);

    return () => {
      window.removeEventListener("keydown", handleShowDrawer);
    };
  }, [handleShowDrawer]);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

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
          <GameDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
          <Cave
            segments={caveSegments}
            allCoordinatesReceived={allCoordinatesReceived}
            isDrawerOpen={isDrawerOpen}
            complexity={complexity}
          />
        </div>
      )}
    </div>
  );
};

export default GamePage;
