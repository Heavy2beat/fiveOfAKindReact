import { useResetRound } from "../../hooks/useResetRound";
import { useDiceStore } from "../../store/Dicestore";
import { useGameStore } from "../../store/GameStore";
import { useLanguageStore } from "../../store/LanguageStore";
import { sendToast } from "../../utils/utils";
import PlayerScoreBoard from "./PlayerScoreBoard";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScoreBoard() {
  const {
    numberOfPlayers,

    playerOnTurn,
    scoreBoardPlayer1,
    scoreBoardPlayer2,
    scoreBoardPlayer3,
    scoreBoardPlayer4,
    setScoreBoardPlayer1,
    setScoreBoardPlayer2,
    setScoreBoardPlayer3,
    setScoreBoardPlayer4,
  } = useGameStore();
  const { lang } = useLanguageStore();
  const { unkeepAllDices } = useDiceStore();

  const handOverCorrectBoard = (
    numberOfPlayer: number,
  ): Map<string, number> => {
    switch (numberOfPlayer) {
      case 1:
        return scoreBoardPlayer1;
      case 2:
        return scoreBoardPlayer2;
      case 3:
        return scoreBoardPlayer3;
      case 4:
        return scoreBoardPlayer4;
      default:
        return new Map<string, number>();
    }
  };

  const handOverCorrectBoardSetter = (numberOfPlayer: number) => {
    switch (numberOfPlayer) {
      case 1:
        return setScoreBoardPlayer1;
      case 2:
        return setScoreBoardPlayer2;
      case 3:
        return setScoreBoardPlayer3;
      case 4:
        return setScoreBoardPlayer4;
      default:
        return setScoreBoardPlayer1;
    }
  };
  const [reset, setReset] = useState(0);
  const resetRound = useResetRound();

  const handleRageReset = () => {
    if (reset == 0) {
      sendToast(`${lang.rageResetWarning}`, 2000);
      setReset(Math.random());
    } else {
      resetRound();
      unkeepAllDices();
      setReset(0);
    }
  };

  const PlayerBoards = () => {
    const playerBoards = [];

    for (let i = 1; i <= numberOfPlayers; i++) {
      if (playerOnTurn === i)
        playerBoards.push(
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 1 }}
          >
            <PlayerScoreBoard
              tntSharp={reset != 0}
              handleRageReset={handleRageReset}
              setCurrentBoard={handOverCorrectBoardSetter(i)}
              currentBoard={handOverCorrectBoard(i)}
              player={i}
            />
          </motion.div>,
        );
    }

    for (let i = 1; i <= numberOfPlayers; i++) {
      if (playerOnTurn !== i)
        playerBoards.push(
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            <PlayerScoreBoard
              tntSharp={reset != 0}
              handleRageReset={handleRageReset}
              setCurrentBoard={handOverCorrectBoardSetter(i)}
              currentBoard={handOverCorrectBoard(i)}
              player={i}
            />
          </motion.div>,
        );
    }

    if (numberOfPlayers > 1) {
      return (
        <div className="md:grid md:grid-cols-2 xl:flex xl:justify-center">
          {playerBoards}
        </div>
      );
    } else {
      return <div className="flex justify-center">{playerBoards}</div>;
    }
  };

  const getPlayerBoards = () => {
    return <PlayerBoards></PlayerBoards>;
  };
  const [playerBoards, setPlayerBoards] = useState(getPlayerBoards());

  useEffect(() => {
    setPlayerBoards(() => getPlayerBoards());
  }, [playerOnTurn, numberOfPlayers, reset]);

  return (
    <>
      <div id="test" className="flex-row justify-center md:flex md:w-full">
        {playerBoards}
      </div>
    </>
  );
}
