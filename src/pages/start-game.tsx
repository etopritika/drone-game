import StartGameForm from "@/components/app/start-game-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const StartGame = () => {
  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle>Drone Game</CardTitle>
        <CardDescription>
          To start the game, enter your name and choose a complexity level.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <StartGameForm />
      </CardContent>
    </Card>
  );
};

export default StartGame;
