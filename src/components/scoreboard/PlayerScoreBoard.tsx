import { useGameStore } from "../../store/GameStore";
import { useLanguageStore } from "../../store/LanguageStore";
import { setDicesToPoints } from "../../game/calculatePoints";
import { useDiceStore } from "../../store/Dicestore";
import { sendToast } from "../../utils/utils";
import { checkIfFinished } from "../../game/game";
import { useNavigate } from "react-router-dom";

interface playerScoreBoardProps {
  player: number;
  currentBoard: Map<string, number>;

  setCurrentBoard: (newBoard: Map<string, number>) => void;
}

export default function PlayerScoreBoard(props: playerScoreBoardProps) {
  const { lang } = useLanguageStore();
  const { dice1, dice2, dice3, dice4, dice5, unkeepAllDices } = useDiceStore();
  const {
    numberOfPlayers,
    numberOfRound,
    setNumberOfRound,
    scoreBoardPlayer1,
    scoreBoardPlayer2,
    scoreBoardPlayer3,
    scoreBoardPlayer4,
    playerOnTurn,
    setPlayerOnTurn,
    playernames,
    setEndScores,
  } = useGameStore();

  const navigate = useNavigate();

  const onClickHandler = (choice: number) => {
    if (numberOfRound === 0) {
      sendToast(lang.niceTry, 2000);
      return;
    }
    setDicesToPoints(
      choice,
      [dice1, dice2, dice3, dice4, dice5],
      props.currentBoard,
      props.setCurrentBoard,
    );
    changePlayer();
  };

  const changePlayer = () => {
    if (
      !checkIfFinished(
        scoreBoardPlayer1,
        scoreBoardPlayer2,
        scoreBoardPlayer3,
        scoreBoardPlayer4,
        numberOfPlayers,
        playernames,

        setEndScores,
      )
    ) {
      if (playerOnTurn < numberOfPlayers) {
        setPlayerOnTurn(playerOnTurn + 1);
      } else {
        setPlayerOnTurn(1);
      }
      if (numberOfPlayers > 1) {
        sendToast(lang.nextPlayer, 1000);
      } else {
        sendToast(lang.nextRound, 1000);
      }
      setNumberOfRound(0);
      unkeepAllDices();
    } else {
      navigate("/end");
    }
  };

  const checkPossibleChoices = (scoreKey: string) => {
    if (playerOnTurn === props.player) {
      for (const [key] of props.currentBoard.entries()) {
        if (key === scoreKey) {
          return " h-14 col-start-1 col-span-2 p-1 border border-gray flex justify-center items-center";
        }
      }
      return "h-14 col-start-1 col-span-2 p-1 border border-gray flex justify-center items-center h-14 bg-green-400 hover:bg-green-500 cursor-pointer";
    }
    return "h-14  col-start-1 col-span-2 p-1 border border-gray flex justify-center items-center";
  };

  const fillInPoints = (pointsFor: string) => {
    let pointsUpper = 0;
    let pointsLower = 0;

    for (const [key, value] of props.currentBoard.entries()) {
      if (Number(key) <= 6) {
        pointsUpper += value;
      }
      if (Number(key) > 6) {
        pointsLower += value;
      }
      if (key === pointsFor) {
        return value;
      }
    }

    switch (pointsFor) {
      case "pointsUpper":
        return pointsUpper >= 63 ? pointsUpper + 35 : pointsUpper;
      case "pointsLower":
        return pointsLower;
      case "bonus":
        return pointsUpper >= 63 ? 35 : null;
      case "total":
        return pointsUpper >= 63
          ? pointsUpper + pointsLower + 35
          : pointsUpper + pointsLower;
      default:
        return null;
    }
  };

  return (
    <div className="m-2 grid grid-cols-2 rounded bg-slate-300 p-2 text-center text-sm">
      <h5
        className={
          playerOnTurn === props.player
            ? "col-span-2 mb-2 bg-green-400 text-center text-xl"
            : "col-span-2 mb-2 bg-slate-400 text-center"
        }
      >
        {playernames[props.player - 1]}
      </h5>

      <div className="col-start-1">
        <table className="border-gray h-full w-full border-collapse rounded">
          <tbody className="grid grid-cols-2">
            <tr
              onClick={() => onClickHandler(1)}
              className="border-gray col-span-2 grid h-14 grid-cols-3 border"
            >
              <td className={checkPossibleChoices("1")}>
                <img className="h-6" src="/fiveOfAKindReact/dice-1.png" alt="" />
              </td>
              <td className="border-gray col-start-3 flex items-center justify-center border p-1 text-center">
                {fillInPoints("1")}
              </td>
            </tr>
            <tr
              onClick={() => onClickHandler(2)}
              className="border-gray col-span-2 grid h-14 grid-cols-3 border"
            >
              <td className={checkPossibleChoices("2")}>
                <img className="h-6" src="/fiveOfAKindReact/dice-2.png" alt="" />
              </td>
              <td className="border-gray col-start-3 flex items-center justify-center border p-1 text-center">
                {fillInPoints("2")}
              </td>
            </tr>
            <tr
              onClick={() => onClickHandler(3)}
              className="border-gray col-span-2 grid h-14 grid-cols-3 border"
            >
              <td className={checkPossibleChoices("3")}>
                <img className="h-6" src="/fiveOfAKindReact/dice-3.png" alt="" />
              </td>
              <td className="border-gray col-start-3 flex items-center justify-center border p-1 text-center">
                {fillInPoints("3")}
              </td>
            </tr>
            <tr
              onClick={() => onClickHandler(4)}
              className="border-gray col-span-2 grid h-14 grid-cols-3 border"
            >
              <td className={checkPossibleChoices("4")}>
                <img className="h-6" src="/fiveOfAKindReact/dice-4.png" alt="" />
              </td>
              <td className="border-gray col-start-3 flex items-center justify-center border p-1 text-center">
                {fillInPoints("4")}
              </td>
            </tr>
            <tr
              onClick={() => onClickHandler(5)}
              className="border-gray col-span-2 grid h-14 grid-cols-3 border"
            >
              <td className={checkPossibleChoices("5")}>
                <img className="h-6" src="/fiveOfAKindReact/dice-5.png" alt="" />
              </td>
              <td className="border-gray col-start-3 flex items-center justify-center border p-1 text-center">
                {fillInPoints("5")}
              </td>
            </tr>
            <tr
              onClick={() => onClickHandler(6)}
              className="border-gray col-span-2 grid h-14 grid-cols-3 border"
            >
              <td className={checkPossibleChoices("6")}>
                <img className="h-6" src="/fiveOfAKindReact/dice-6.png" alt="" />
              </td>
              <td className="border-gray col-start-3 flex items-center justify-center border p-1 text-center">
                {fillInPoints("6")}
              </td>
            </tr>
            <tr className="border-gray col-span-2 grid h-14 grid-cols-3 border">
              <td className="border-gray col-span-2 col-start-1 flex items-center justify-center border p-1">
                Bonus({">"}63P)
              </td>
              <td className="border-gray col-start-2border flex items-center justify-center p-1 text-center">
                {fillInPoints("bonus")}
              </td>
            </tr>
            <tr className="border-gray col-span-2 grid h-14 grid-cols-3 border">
              <td className="border-gray col-span-2 col-start-1 flex items-center justify-center border p-1">
                {lang.points}
              </td>
              <td className="border-gray col-start-3 flex items-center justify-center border p-1 text-center">
                {" "}
                {fillInPoints("pointsUpper")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* lower Points */}
      <div className="col-start-2">
        <table className="border-gray h-full w-full border-collapse text-nowrap rounded">
          <tbody className="grid grid-cols-2">
            <tr
              onClick={() => onClickHandler(7)}
              className="border-gray col-span-2 grid h-14 grid-cols-3 border"
            >
              <td className={checkPossibleChoices("7")}>{lang[7]}</td>
              <td className="border-gray col-start-3 flex items-center justify-center border p-1 text-center">
                {fillInPoints("7")}
              </td>
            </tr>
            <tr
              onClick={() => onClickHandler(8)}
              className="border-gray col-span-2 grid h-14 grid-cols-3 border"
            >
              <td className={checkPossibleChoices("8")}>{lang[8]}</td>
              <td className="border-gray col-start-3 flex items-center justify-center border p-1 text-center">
                {fillInPoints("8")}
              </td>
            </tr>
            <tr
              onClick={() => onClickHandler(9)}
              className="border-gray col-span-2 grid h-14 grid-cols-3 border"
            >
              <td className={checkPossibleChoices("9")}>{lang[9]}</td>
              <td className="border-gray col-start-3 flex items-center justify-center border p-1 text-center">
                {fillInPoints("9")}
              </td>
            </tr>
            <tr
              onClick={() => onClickHandler(10)}
              className="border-gray col-span-2 grid h-14 grid-cols-3 border"
            >
              <td className={checkPossibleChoices("10")}>{lang[10]}</td>
              <td className="border-gray col-start-3 flex items-center justify-center border p-1 text-center">
                {fillInPoints("10")}
              </td>
            </tr>
            <tr
              onClick={() => onClickHandler(11)}
              className="border-gray col-span-2 grid h-14 grid-cols-3 border"
            >
              <td className={checkPossibleChoices("11")}>{lang[11]}</td>
              <td className="border-gray col-start-3 flex items-center justify-center border p-1 text-center">
                {fillInPoints("11")}
              </td>
            </tr>
            <tr
              onClick={() => onClickHandler(12)}
              className="border-gray col-span-2 grid h-14 grid-cols-3 border"
            >
              <td className={checkPossibleChoices("12")}>{lang[12]}</td>
              <td className="border-gray col-start-3 flex items-center justify-center border p-1 text-center">
                {fillInPoints("12")}
              </td>
            </tr>
            <tr
              onClick={() => onClickHandler(13)}
              className="border-gray col-span-2 grid h-14 grid-cols-3 border"
            >
              <td className={checkPossibleChoices("13")}>{lang[13]}</td>
              <td className="border-gray col-start-3 flex items-center justify-center border p-1 text-center">
                {fillInPoints("13")}
              </td>
            </tr>
            <tr className="border-gray col-span-2 grid h-14 grid-cols-3 border">
              <td className="border-gray col-span-2 col-start-1 flex items-center justify-center border p-1">
                {lang.grandTotal}
              </td>
              <td className="border-gray col-start-3 flex items-center justify-center border p-1 text-center">
                {fillInPoints("total")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
