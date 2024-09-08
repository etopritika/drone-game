import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { usePlayerStore } from "@/store/player-store";

export const PrivateRoute: FC = () => {
  const playerId = usePlayerStore((state) => state.playerId);
  const chunks = usePlayerStore((state) => state.chunks);
  const token = chunks;

  return playerId && token ? <Outlet /> : <Navigate to="/start-game" />;
};
