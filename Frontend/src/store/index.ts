import { create } from 'zustand';

// import { createUiSlice, UiInterface } from './UI/UiState';
import { AuthInterface, createAuthSlice } from './auth/auth-state';

/* interface FishSlice {
  fishes: number;
  addFish: () => void;
}
const createFishSlice: StateCreator<FishSlice, [], [], FishSlice> = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
}); */

export const useStore = create<AuthInterface /* & UiInterface */>()(
  (...all) => ({
    ...createAuthSlice(...all),
    // ...createUiSlice(...all),
  })
);
