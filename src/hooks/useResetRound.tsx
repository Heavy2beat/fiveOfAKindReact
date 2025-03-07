import { useDiceStore } from "../store/Dicestore";
import { useGameStore } from "../store/GameStore";

export const useResetRound = () => {
  const {
    setScoreBoardPlayer1,
    setScoreBoardPlayer2,
    setScoreBoardPlayer3,
    setScoreBoardPlayer4,
    setNumberOfRound,
    setPlayerOnTurn,
  } = useGameStore();
  const {
    dice1keep,
    dice2keep,
    dice3keep,
    dice4keep,
    dice5keep,
    toggleDice1Keep,
    toggleDice2Keep,
    toggleDice3Keep,
    toggleDice4Keep,
    toggleDice5Keep,
  } = useDiceStore();

  const resetRound = () => {
    setScoreBoardPlayer1(new Map<string, number>());
    setScoreBoardPlayer2(new Map<string, number>());
    setScoreBoardPlayer3(new Map<string, number>());
    setScoreBoardPlayer4(new Map<string, number>());
    setNumberOfRound(0);
    setPlayerOnTurn(1);
    if (dice1keep) {
      toggleDice1Keep();
    }
    if (dice2keep) {
      toggleDice2Keep();
    }
    if (dice3keep) {
      toggleDice3Keep();
    }
    if (dice4keep) {
      toggleDice4Keep();
    }
    if (dice5keep) {
      toggleDice5Keep();
    }
  };

  return resetRound;
};
