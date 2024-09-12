import { useEffect, useState } from "react";
import { usePlayerStore } from "@/store/player-store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const TopScore = () => {
  const name = usePlayerStore((state) => state.name);
  const [topPlayer, setTopPlayer] = useState<{
    name: string;
    topScore: number;
    complexity: number;
  } | null>(null);

  useEffect(() => {
    const storedPlayers = localStorage.getItem("players");
    const players = storedPlayers ? JSON.parse(storedPlayers) : [];

    const player = players.find(
      (player: { name: string; topScore: number; complexity: number }) =>
        player.name === name
    );

    if (player) {
      setTopPlayer(player);
    } else {
      setTopPlayer(null);
    }
  }, [name]);

  return (
    <Card className="max-w-[300px] w-full">
      <CardHeader>
        <CardTitle>Top Score</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <p className="text-xl mb-2">
          <strong>Complexity:</strong> {topPlayer?.complexity || "No data"}
        </p>
        <p className="text-xl">
          <strong>Score:</strong>{" "}
          {topPlayer?.topScore !== null ? topPlayer?.topScore : "No data"}
        </p>
      </CardContent>
    </Card>
  );
};

export default TopScore;
