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

export const redDice: DiceLinks = {
  dice1: "/fiveOfAKindReact/dicer-1.png",
  dice2: "/fiveOfAKindReact/dicer-2.png",
  dice3: "/fiveOfAKindReact/dicer-3.png",
  dice4: "/fiveOfAKindReact/dicer-4.png",
  dice5: "/fiveOfAKindReact/dicer-5.png",
  dice6: "/fiveOfAKindReact/dicer-6.png",
};
import { create } from "zustand";

interface DiceColorStore {
  diceLink: DiceLinks;

  setDiceLink: (linksToSet: DiceLinks) => void;
}

export const useDiceColorStore = create<DiceColorStore>()((set) => ({
  diceLink: blueDice,

  setDiceLink: (diceLinkToSet: DiceLinks) =>
    set(() => ({ diceLink: diceLinkToSet })),
}));
