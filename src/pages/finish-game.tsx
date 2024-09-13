import { usePlayerStore } from "@/store/player-store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import TopScore from "@/components/app/top-score/top-score";
import { useGameStore } from "@/store/game-store";
import { useCaveStore } from "@/store/cave-store";

const FinishGame = () => {
  const name = usePlayerStore((state) => state.name);
  const complexity = usePlayerStore((state) => state.complexity);
  const score = useGameStore((state) => state.score);
  const setGameOver = useGameStore((state) => state.setGameOver);
  const clearSegments = useCaveStore((state) => state.clearSegments);
  const clearCave = useCaveStore((state) => state.clearCave);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPlayers = localStorage.getItem("players");
    const players = storedPlayers ? JSON.parse(storedPlayers) : [];

    const playerIndex = players.findIndex(
      (player: { name: string; complexity: number; topScore: number }) =>
        player.name === name
    );

    if (playerIndex !== -1) {
      const currentTopScore = players[playerIndex].topScore;

      if (score > currentTopScore) {
        players[playerIndex].topScore = score;
        players[playerIndex].complexity = complexity;
        localStorage.setItem("players", JSON.stringify(players));
      }
    }
  }, [name, score, complexity]);

  const handleRetry = () => {
    setGameOver(false);
    navigate("/game");
  };

  const handleExit = () => {
    setGameOver(false);
    clearSegments();
    clearCave();
    navigate("/start-game");
  };

  return (
    <div className="flex flex-col gap-12">
      <TopScore />
      <Card className="min-w-[300px]">
        <CardHeader>
          <CardTitle>Game Over!</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <p className="text-xl mb-2">
            <strong>Complexity:</strong> {complexity}
          </p>
          <p className="text-xl mb-4">
            <strong>Your score:</strong> {score}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between space-x-4 mt-6">
          <Button variant="default" onClick={handleRetry}>
            Retry
          </Button>
          <Button variant="destructive" onClick={handleExit}>
            Exit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FinishGame;
