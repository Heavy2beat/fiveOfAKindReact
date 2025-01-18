import { useGameStore } from "../../store/GameStore";
import PlayerScoreBoard from "./PlayerScoreBoard";
import { useLanguageStore } from "../../store/LanguageStore";
import { ger } from "../../lang/ger";
import { eng } from "../../lang/eng";

export default function ScoreBoard() {
  const { setLang, lang } = useLanguageStore();

  const {
    firstStart,
    setFirstStart,
    numberOfPlayers,
    setNumberOfPlayers,
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

  const PlayerBoards = () => {
    const playerBoards = [];

    for (let i = 1; i <= numberOfPlayers; i++) {
      if (playerOnTurn === i)
        playerBoards.push(
          <PlayerScoreBoard
            setCurrentBoard={handOverCorrectBoardSetter(i)}
            currentBoard={handOverCorrectBoard(i)}
            key={i}
            player={i}
          />,
        );
    }

    for (let i = 1; i <= numberOfPlayers; i++) {
      if (playerOnTurn !== i)
        playerBoards.push(
          <PlayerScoreBoard
            setCurrentBoard={handOverCorrectBoardSetter(i)}
            currentBoard={handOverCorrectBoard(i)}
            key={i}
            player={i}
          />,
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

  function handleNumberOfPlayer(numberToSet: number) {
    setNumberOfPlayers(numberToSet);
    setFirstStart(false);
  }

  if (firstStart) {
    return (
      <>
        <div>
          <h2 className="p-10 text-center">{lang.numberOfPlayers}</h2>
          <div className="flex justify-center">
            <button
              onClick={() => handleNumberOfPlayer(1)}
              className="m-2 cursor-pointer rounded bg-slate-400 p-2 shadow-xl"
            >
              1
            </button>
            <button
              onClick={() => handleNumberOfPlayer(2)}
              className="m-2 cursor-pointer rounded bg-slate-400 p-2 shadow-xl"
            >
              2
            </button>
            <button
              onClick={() => handleNumberOfPlayer(3)}
              className="m-2 cursor-pointer rounded bg-slate-400 p-2 shadow-xl"
            >
              3
            </button>
            <button
              onClick={() => handleNumberOfPlayer(4)}
              className="m-2 cursor-pointer rounded bg-slate-400 p-2 shadow-xl"
            >
              4
            </button>
          </div>
          <div className="flex h-6 items-center justify-center gap-4 p-10">
            <img
              onClick={() => setLang(ger)}
              className="h-6"
              src="german.png"
              alt=""
            />
            <img
              onClick={() => setLang(eng)}
              className="h-6"
              src="english.png"
              alt=""
            />
          </div>
          <div className="flex items-center justify-center text-xs">
            <p>designed by Fabian Fischer</p>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div id="test" className="flex-row justify-center md:flex md:w-full">
          <PlayerBoards />
        </div>
      </>
    );
  }
}
