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
} from "@/components/ui/card"; // Імпортуємо компоненти Card

const FinishGame = () => {
  const name = usePlayerStore((state) => state.name);
  const complexity = usePlayerStore((state) => state.complexity);
  const score = usePlayerStore((state) => state.score);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPlayers = localStorage.getItem("players");
    const players = storedPlayers ? JSON.parse(storedPlayers) : [];

    const playerIndex = players.findIndex(
      (player: { name: string; complexity: number; score: number }) =>
        player.name === name
    );

    if (playerIndex !== -1) {
      players[playerIndex].score = score;
      localStorage.setItem("players", JSON.stringify(players));
    }
  }, [name, score]);

  const handleRetry = () => {
    navigate("/game");
  };

  const handleExit = () => {
    navigate("/start-game");
  };

  return (
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
  );
};

export default FinishGame;
