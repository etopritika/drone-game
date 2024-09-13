import { create } from "zustand";

interface CaveState {
  cave: { leftWall: number; rightWall: number }[];
  segments: { leftWall: number; rightWall: number }[];
  setCave: (
    cave:
      | { leftWall: number; rightWall: number }[]
      | { leftWall: number; rightWall: number }
  ) => void;
  addSegment: (segment: { leftWall: number; rightWall: number }) => void;
  finalizeCave: () => void;
  clearSegments: () => void;
  clearCave: () => void;
}

export const useCaveStore = create<CaveState>((set) => ({
  cave: [],
  segments: [],
  setCave: (cave) =>
    set((state) => ({
      cave: Array.isArray(cave) ? cave : [...state.cave, cave],
    })),
  addSegment: (segment) =>
    set((state) => ({
      segments: [...state.segments, segment],
    })),
  finalizeCave: () =>
    set((state) => ({
      cave: state.segments,
      segments: [],
    })),
  clearSegments: () => set({ segments: [] }),
  clearCave: () => set({ cave: [] }),
}));
