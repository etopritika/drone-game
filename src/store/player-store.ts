import { create } from "zustand";

interface PlayerState {
  playerId: string | null;
  name: string | null;
  complexity: number;
  chunks: string;
  setPlayerId: (id: string) => void;
  setName: (name: string) => void;
  setComplexity: (complexity: number) => void;
  addChunk: (chunk: string) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  playerId: null,
  name: null,
  complexity: 1,
  chunks: "",
  setPlayerId: (id: string) => set({ playerId: id }),
  setName: (name: string) => set({ name }),
  setComplexity: (complexity: number) => set({ complexity }),
  addChunk: (chunks: string) => set({ chunks }),
}));
