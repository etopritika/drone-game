import { usePlayerStore } from "@/store/player-store";

const FinishGame = () => {
  const score = usePlayerStore((state) => state.score);
  return <>Finish Game: {score}</>;
};

export default FinishGame;
