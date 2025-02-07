import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/GameStore";
import { useLanguageStore } from "../store/LanguageStore";
import { gameIsFinished } from "../game/game";
import Footer from "../components/Footer";
import { useState } from "react";
import { Score } from "../api/highscoreAPI";
import { sendToast } from "../utils/utils";
import { useDiceStore } from "../store/Dicestore";

export default function End() {
  const { lang } = useLanguageStore();
  const {
    setNumberOfRound,
    setPlayerOnTurn,
    setScoreBoardPlayer1,
    setScoreBoardPlayer2,
    setScoreBoardPlayer3,
    setScoreBoardPlayer4,
    endScores,
    highscoreList,
    sethighScoreList,
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

  const navigate = useNavigate();

  const [isSend, setIsSend] = useState(false);

  const saveHighScore = (player: string, score: number) => {
    if (!isSend) {
      const tempScore: Score = {
        name: player,
        points: score,
        isSend: false,
      };
      const tempScoreList = [...highscoreList, tempScore];
      const sortedScoreList = tempScoreList.sort((a, b) => b.points - a.points);
      sethighScoreList(sortedScoreList);
      localStorage.setItem("highscoreList", JSON.stringify(sortedScoreList));
      sendToast(lang.redirectToHighscores, 3000);
      resetRound();
      setTimeout(() => {
        navigate("/highscores");
      }, 2000);
      setIsSend(true);
    }
  };
  const prepareEndscores = () => {
    const endscoresSorted = gameIsFinished(endScores);
    return endscoresSorted.map(([player, score], index) => (
      <li
        key={index}
        className={
          index % 2 == 0
            ? "flex justify-between bg-blue-300 pl-1"
            : "flex justify-between bg-blue-400 pl-1"
        }
      >
        <div>
          {index + 1}. {`${player} => ${score} ${lang.points}`}
        </div>{" "}
        {index === 0 ? (
          !isSend ? (
            <button
              className="bg-green-400 p-2 text-xs hover:bg-green-500"
              onClick={() => saveHighScore(player, score)}
            >
              {lang.save}
            </button>
          ) : (
            <p className="p-2 text-xs">{lang.saved}</p>
          )
        ) : null}
      </li>
    ));
  };

  const handleRevenge = () => {
    resetRound();
    navigate("/game");
  };

  const handleBackToMainMenu = () => {
    resetRound();
    navigate("/");
  };

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

  return (
    <div>
      <div className="m-auto mb-4 mt-8 w-full rounded bg-blue-200 p-4 md:w-1/2">
        <h2 className="text-center">{lang.endscore}</h2>
        <ol className="list-decimal p-2">{prepareEndscores()}</ol>
      </div>
      <div className="m-auto mb-2 w-5/6 bg-slate-300 p-2 text-center text-sm md:w-2/3">
        <p>
          {lang.endgameText}
          <span className="bg-green-400"> {lang.save}</span>
        </p>
      </div>
      <div className="flex flex-col justify-center gap-8">
        <button
          onClick={handleRevenge}
          className="m-auto w-32 cursor-pointer rounded bg-blue-400 p-2 text-center shadow-xl hover:bg-blue-500"
        >
          {lang.revenge}
        </button>
        <button
          onClick={handleBackToMainMenu}
          className="m-auto w-32 cursor-pointer rounded bg-blue-400 p-2 text-center shadow-xl hover:bg-blue-500"
        >
          {lang.mainMenu}
        </button>
      </div>
      <Footer></Footer>
    </div>
  );
}
