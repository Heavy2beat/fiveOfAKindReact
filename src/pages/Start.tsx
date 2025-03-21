import { useEffect, useState } from "react";
import { useGameStore } from "../store/GameStore";
import { useLanguageStore } from "../store/LanguageStore";
import { sendToast } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Start() {
  const { lang } = useLanguageStore();

  const {
    setNumberOfPlayers,
    numberOfPlayers,
    playernames,
    setplayerNames,
    sethighScoreList,
  } = useGameStore();
  const navigate = useNavigate();
  const [isNumberOfPlayerChosen, setIsNumberOfPlayerChosen] = useState(false);

  useEffect(() => {
    const storedHighScores = localStorage.getItem("highscoreList");
    if (storedHighScores) {
      sethighScoreList(JSON.parse(storedHighScores));
    }
  }, [sethighScoreList]);

  const handleNumberOfPlayer = (numberToSet: number) => {
    setNumberOfPlayers(numberToSet);
    setplayerNames([lang.player1, lang.player2, lang.player3, lang.player4]);
  };

  const handleBeginGameButton = () => {
    if (numberOfPlayers === 0) {
      sendToast(lang.chooseNumberOfPlayers, 3000);
      return;
    }
    if (!isNumberOfPlayerChosen) {
      setIsNumberOfPlayerChosen(true);
      return;
    }
    navigate("/game");
  };

  const showNumberOfPlayersOnButton = (buttonNumber: number) => {
    return buttonNumber === numberOfPlayers
      ? "m-2 cursor-pointer rounded bg-green-400 p-4 shadow-xl hover:bg-green-500"
      : "m-2 cursor-pointer rounded bg-blue-400 p-4 shadow-xl hover:bg-blue-500";
  };

  const handleInputChange = (index: number, value: string) => {
    const newPlayerNames = [...playernames];
    newPlayerNames[index] = value;
    setplayerNames(newPlayerNames);
  };

  const createInputs = () => {
    return (
      <div className="m-auto mt-4 flex w-80 max-w-fit flex-col justify-center gap-2 rounded bg-blue-400 p-2 shadow-xl">
        <h3>{lang.fillInNames}:</h3>
        {Array.from({ length: numberOfPlayers }, (_, index) => (
          <input
            key={index}
            onChange={(e) => handleInputChange(index, e.target.value)}
            value={playernames[index]}
            className="rounded bg-gray-200 text-center"
            placeholder={`${lang.player} ${index + 1}`}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="m-auto mt-8 w-fit rounded bg-slate-300 pb-4 text-xl md:w-5/6">
        <h2 className="p-4 text-center text-2xl">{lang.numberOfPlayers}</h2>
        <div className="flex justify-center">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberOfPlayer(num)}
              className={showNumberOfPlayersOnButton(num)}
            >
              {num}
            </button>
          ))}
        </div>
        <div>{isNumberOfPlayerChosen ? createInputs() : null}</div>
        <div className="flex justify-center p-4">
          <button
            onClick={handleBeginGameButton}
            className="m-2 cursor-pointer rounded bg-blue-400 p-4 shadow-2xl hover:bg-blue-500"
          >
            {isNumberOfPlayerChosen ? lang.beginnGame : lang.choose}
          </button>
        </div>
        <div className="flex h-full justify-center">
          <button
            onClick={() => navigate("/highscores")}
            className="m-2 w-44 cursor-pointer rounded bg-blue-400 p-4 shadow-2xl hover:bg-blue-500"
          >
            {lang.highscores}
          </button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
