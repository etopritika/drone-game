import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TopScoreProps {
  topPlayer: {
    name: string;
    topScore: number;
    complexity: number;
  } | null;
}

const TopScore: React.FC<TopScoreProps> = ({ topPlayer }) => {
  if (!topPlayer) {
    return null;
  }

  return (
    <Card className="max-w-[300px] w-full">
      <CardHeader>
        <CardTitle>Top Score</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <p className="text-xl mb-2">
          <strong>Complexity:</strong> {topPlayer.complexity}
        </p>
        <p className="text-xl">
          <strong>Score:</strong> {topPlayer.topScore}
        </p>
      </CardContent>
    </Card>
  );
};

export default TopScore;
