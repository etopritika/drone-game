import { create } from "zustand";

interface GameState {
  score: number;
  isGameOver: boolean;
  setScore: (score: number) => void;
  setGameOver: (isGameOver: boolean) => void;
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  isGameOver: false,
  setScore: (score: number) => set({ score }),
  setGameOver: (isGameOver: boolean) => set({ isGameOver }),
}));
