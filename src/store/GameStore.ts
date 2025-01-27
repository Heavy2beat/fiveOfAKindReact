import { create } from "zustand";
import { Score } from "../api/highscoreAPI";

interface GameStore {
  highscoreList: Score[];
  sethighScoreList: (toSet: Score[]) => void;
  firstStart: boolean;
  setFirstStart: (toSet: boolean) => void;
  numberOfRound: number;
  setNumberOfRound: (toSet: number) => void;

  numberOfPlayers: number;
  setNumberOfPlayers: (toSet: number) => void;

  playerOnTurn: number;
  setPlayerOnTurn: (toSet: number) => void;

  scoreBoardPlayer1: Map<string, number>;
  setScoreBoardPlayer1: (newBoard: Map<string, number>) => void;
  scoreBoardPlayer2: Map<string, number>;
  setScoreBoardPlayer2: (newBoard: Map<string, number>) => void;
  scoreBoardPlayer3: Map<string, number>;
  setScoreBoardPlayer3: (newBoard: Map<string, number>) => void;
  scoreBoardPlayer4: Map<string, number>;
  setScoreBoardPlayer4: (newBoard: Map<string, number>) => void;

  playernames: string[];
  setplayerNames: (newNames: string[]) => void;

  endScores: Map<string, number>;
  setEndScores: (newEndScores: Map<string, number>) => void;
}

export const useGameStore = create<GameStore>()((set) => ({
  highscoreList: new Array<Score>(),
  sethighScoreList: (newScoreList: Score[]) =>
    set(() => ({ highscoreList: newScoreList })),
  firstStart: true,
  setFirstStart: (setTo: boolean) => set(() => ({ firstStart: setTo })),
  numberOfRound: 0,
  setNumberOfRound: (toSet: number) => set(() => ({ numberOfRound: toSet })),

  numberOfPlayers: 0,
  setNumberOfPlayers: (toSet: number) => {
    set(() => ({ numberOfPlayers: toSet }));
  },

  playerOnTurn: 1,
  setPlayerOnTurn: (toSet: number) => set(() => ({ playerOnTurn: toSet })),

  scoreBoardPlayer1: new Map<string, number>(),
  setScoreBoardPlayer1: (newBoard: Map<string, number>) =>
    set(() => ({ scoreBoardPlayer1: newBoard })),
  scoreBoardPlayer2: new Map<string, number>(),
  setScoreBoardPlayer2: (newBoard: Map<string, number>) =>
    set(() => ({ scoreBoardPlayer2: newBoard })),
  scoreBoardPlayer3: new Map<string, number>(),
  setScoreBoardPlayer3: (newBoard: Map<string, number>) =>
    set(() => ({ scoreBoardPlayer3: newBoard })),
  scoreBoardPlayer4: new Map<string, number>(),
  setScoreBoardPlayer4: (newBoard: Map<string, number>) =>
    set(() => ({ scoreBoardPlayer4: newBoard })),
  scoreBoardPlayer5: new Map<string, number>(),
  setScoreBoardPlayer5: (newBoard: Map<string, number>) =>
    set(() => ({ scoreBoardPlayer4: newBoard })),
  playernames: [],
  setplayerNames: (newNames: string[]) =>
    set(() => ({ playernames: newNames })),
  endScores: new Map<string, number>(),
  setEndScores: (newEndScores: Map<string, number>) =>
    set(() => ({ endScores: newEndScores })),
  
}));
