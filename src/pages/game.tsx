import CaveLoadingProgress from "@/components/app/cave-loading-progress/cave-loading-progress";
import Cave from "@/components/app/cave/cave";
import GameDrawer from "@/components/app/game-drawer/game-drawer";
import { useToast } from "@/hooks/use-toast";
import { useWebSocket } from "@/hooks/use-web-socket";
import { useCaveStore } from "@/store/cave-store";
import { usePlayerStore } from "@/store/player-store";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GamePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const playerId = usePlayerStore((state) => state.playerId);
  const complexity = usePlayerStore((state) => state.complexity);
  const chunks = usePlayerStore((state) => state.chunks);
  const token = chunks;
  const cave = useCaveStore((state) => state.cave);
  const addSegment = useCaveStore((state) => state.addSegment);
  const finalizeCave = useCaveStore((state) => state.finalizeCave);
  const hasCave = cave.length > 0;
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const [allCoordinatesReceived, setAllCoordinatesReceived] = useState(hasCave);
  const [error, setError] = useState<string | null>(null);

  const handleReceiveCoordinates = useCallback(
    (data: string) => {
      if (data === "finished") {
        setAllCoordinatesReceived(true);
        finalizeCave();
        return;
      }

      const [leftWall, rightWall] = data.split(",").map(Number);
      addSegment({ leftWall, rightWall });
    },
    [addSegment, finalizeCave]
  );

  const handleError = useCallback(() => {
    setError("WebSocket connection error.");
  }, []);

  useWebSocket(
    !hasCave,
    playerId,
    token,
    handleReceiveCoordinates,
    handleError
  );

  const handleShowDrawer = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsDrawerOpen((prev) => !prev);
    }

    if (event.code === "Space") {
      setIsDrawerOpen(false);
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      navigate("/start-game");
    }
  }, [error, navigate, toast]);

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
            segments={cave}
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
