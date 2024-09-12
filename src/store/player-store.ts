import { create } from "zustand";

interface PlayerState {
  playerId: string | null;
  name: string | null;
  complexity: number;
  chunks: string;
  caveSegments: { leftWall: number; rightWall: number }[];
  score: number;
  isGameOver: boolean;
  setPlayerId: (id: string) => void;
  setName: (name: string) => void;
  setComplexity: (complexity: number) => void;
  addChunk: (chunk: string) => void;
  setScore: (score: number) => void;
  setGameOver: (isGameOver: boolean) => void;
  setCaveSegments: (
    segments: { leftWall: number; rightWall: number }[]
  ) => void;
  clearCaveSegments: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  playerId: null,
  name: null,
  complexity: 1,
  chunks: "",
  caveSegments: [],
  score: 0,
  isGameOver: false,
  setPlayerId: (id: string) => set({ playerId: id }),
  setName: (name: string) => set({ name }),
  setComplexity: (complexity: number) => set({ complexity }),
  addChunk: (chunks: string) => set({ chunks }),
  setScore: (score: number) => set({ score }),
  setGameOver: (isGameOver: boolean) => set({ isGameOver }),
  setCaveSegments: (segments) => set({ caveSegments: segments }),
  clearCaveSegments: () => set({ caveSegments: [] }),
}));
