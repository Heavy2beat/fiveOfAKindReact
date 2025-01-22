import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/GameStore";
import { useLanguageStore } from "../store/LanguageStore";
import { gameIsFinished } from "../game/game";

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
  } = useGameStore();

  const navigate = useNavigate();

  const prepareEndscores = () => {
    const endscoresSorted = gameIsFinished(endScores);
    return endscoresSorted.map(([player, score], index) => (
      <li
        key={index}
        className={index % 2 == 0 ? "bg-blue-300 pl-1" : "bg-blue-400 pl-1"}
      >{`${player} => ${score} ${lang.points}`}</li>
    ));
  };

  const handleRevenge = () => {
    setScoreBoardPlayer1(new Map<string, number>());
    setScoreBoardPlayer2(new Map<string, number>());
    setScoreBoardPlayer3(new Map<string, number>());
    setScoreBoardPlayer4(new Map<string, number>());
    setNumberOfRound(0);
    setPlayerOnTurn(1);
    navigate("/game");
  };

  const handleBackToMainMenu = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="m-auto mb-4 mt-8 w-1/2 rounded bg-blue-200 p-4">
        <ol className="list-decimal p-2">{prepareEndscores()}</ol>
      </div>
      <div className="flex flex-col justify-center gap-8">
        <button
          onClick={handleRevenge}
          className="m-auto w-32 cursor-pointer rounded bg-blue-500 p-2 text-center shadow-xl hover:bg-blue-600"
        >
          {lang.revenge}
        </button>
        <button
          onClick={handleBackToMainMenu}
          className="m-auto w-32 cursor-pointer rounded bg-blue-500 p-2 text-center shadow-xl hover:bg-blue-600"
        >
          {lang.mainMenu}
        </button>
      </div>
    </div>
  );
}
