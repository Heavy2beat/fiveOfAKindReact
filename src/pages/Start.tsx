import { useState } from "react";
import { useGameStore } from "../store/GameStore";
import { useLanguageStore } from "../store/LanguageStore";
import { sendToast } from "../utils/utils";
import { useNavigate } from "react-router-dom";

export default function Start() {
  const { lang } = useLanguageStore();

  const { setNumberOfPlayers, numberOfPlayers, playernames, setplayerNames } =
    useGameStore();
  const navigate = useNavigate();
  const [isNumberOfPlayerChosen, setIsNumberOfPlayerChosen] = useState(false);

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
      ? "m-2 cursor-pointer rounded bg-green-400 p-4 shadow-xl"
      : "m-2 cursor-pointer rounded bg-blue-400 p-4 shadow-xl";
  };

  const handleInputChange = (index: number, value: string) => {
    const newPlayerNames = [...playernames];
    newPlayerNames[index] = value;
    setplayerNames(newPlayerNames);
  };

  const createInputs = () => {
    return (
      <div className="m-auto flex w-80 flex-col justify-center gap-2 rounded bg-blue-400 p-2">
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
      <div className="text-xl">
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
            className="m-2 cursor-pointer rounded bg-blue-400 p-4 shadow-2xl"
          >
            {isNumberOfPlayerChosen ? lang.beginnGame : lang.choose}
          </button>
        </div>
      </div>
    </div>
  );
}
