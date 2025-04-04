import { create } from "zustand";
export type DiceLinks = {
  dice1: string;
  dice2: string;
  dice3: string;
  dice4: string;
  dice5: string;
  dice6: string;
};

export const blueDice: DiceLinks = {
  dice1: "/fiveOfAKindReact/dice-1.png",
  dice2: "/fiveOfAKindReact/dice-2.png",
  dice3: "/fiveOfAKindReact/dice-3.png",
  dice4: "/fiveOfAKindReact/dice-4.png",
  dice5: "/fiveOfAKindReact/dice-5.png",
  dice6: "/fiveOfAKindReact/dice-6.png",
};

export const goldenDice: DiceLinks = {
  dice1: "/fiveOfAKindReact/dicec-1.png",
  dice2: "/fiveOfAKindReact/dicec-2.png",
  dice3: "/fiveOfAKindReact/dicec-3.png",
  dice4: "/fiveOfAKindReact/dicec-4.png",
  dice5: "/fiveOfAKindReact/dicec-5.png",
  dice6: "/fiveOfAKindReact/dicec-6.png",
};

interface DiceColorStore {
  isChampion: boolean;
  setIsChampion: (toSet: boolean) => void;
  diceColor: string;
  setDiceColor: (toSet: string) => void;

  diceLink: DiceLinks;

  setDiceLink: (linksToSet: DiceLinks) => void;
}

export const useDiceColorStore = create<DiceColorStore>()((set) => ({
  isChampion: false,
  setIsChampion: (toSet: boolean) => set(() => ({ isChampion: toSet })),
  diceColor: "#0000ff",
  setDiceColor: (toSet: string) => set(() => ({ diceColor: toSet })),
  diceLink: blueDice,
  setDiceLink: (diceLinkToSet: DiceLinks) =>
    set(() => ({ diceLink: diceLinkToSet })),
}));
