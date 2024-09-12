import { create } from "zustand";

interface PlayerState {
  playerId: string | null;
  name: string | null;
  complexity: number;
  chunks: string;
  score: number;
  isGameOver: boolean;
  setPlayerId: (id: string) => void;
  setName: (name: string) => void;
  setComplexity: (complexity: number) => void;
  addChunk: (chunk: string) => void;
  setScore: (score: number) => void;
  setGameOver: (isGameOver: boolean) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  playerId: null,
  name: null,
  complexity: 1,
  chunks: "",
  score: 0,
  isGameOver: false,
  setPlayerId: (id: string) => set({ playerId: id }),
  setName: (name: string) => set({ name }),
  setComplexity: (complexity: number) => set({ complexity }),
  addChunk: (chunks: string) => set({ chunks }),
  setScore: (score: number) => set({ score }),
  setGameOver: (isGameOver: boolean) => set({ isGameOver }),
}));
