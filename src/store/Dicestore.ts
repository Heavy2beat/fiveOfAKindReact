import { create } from "zustand";

interface DiceStore {
  dice1: number;
  setDice1: (numberToSet: number) => void;
  dice1keep: boolean;
  toggleDice1Keep: () => void;
  dice2: number;
  setDice2: (numberToSet: number) => void;
  dice2keep: boolean;
  toggleDice2Keep: () => void;
  dice3: number;
  setDice3: (numberToSet: number) => void;
  dice3keep: boolean;
  toggleDice3Keep: () => void;
  dice4: number;
  setDice4: (numberToSet: number) => void;
  dice4keep: boolean;
  toggleDice4Keep: () => void;
  dice5: number;
  setDice5: (numberToSet: number) => void;
  dice5keep: boolean;
  toggleDice5Keep: () => void;

  unkeepAllDices: () => void;
}

export const useDiceStore = create<DiceStore>()((set) => ({
  dice1: 1,
  setDice1: (numberToSet: number) => set(() => ({ dice1: numberToSet })),
  dice1keep: false,
  toggleDice1Keep: () => set((state) => ({ dice1keep: !state.dice1keep })),

  dice2: 1,
  setDice2: (numberToSet: number) => set(() => ({ dice2: numberToSet })),
  dice2keep: false,
  toggleDice2Keep: () => set((state) => ({ dice2keep: !state.dice2keep })),

  dice3: 1,
  setDice3: (numberToSet: number) => set(() => ({ dice3: numberToSet })),
  dice3keep: false,
  toggleDice3Keep: () => set((state) => ({ dice3keep: !state.dice3keep })),

  dice4: 1,
  setDice4: (numberToSet: number) => set(() => ({ dice4: numberToSet })),
  dice4keep: false,
  toggleDice4Keep: () => set((state) => ({ dice4keep: !state.dice4keep })),

  dice5: 1,
  setDice5: (numberToSet: number) => set(() => ({ dice5: numberToSet })),
  dice5keep: false,
  toggleDice5Keep: () => set((state) => ({ dice5keep: !state.dice5keep })),
  unkeepAllDices: () =>
    set(() => ({
      dice1keep: false,
      dice2keep: false,
      dice3keep: false,
      dice4keep: false,
      dice5keep: false,
    })),
}));
