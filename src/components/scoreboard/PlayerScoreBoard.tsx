import { useGameStore } from "../../store/GameStore";
import { useLanguageStore } from "../../store/LanguageStore";
import { setDicesToPoints } from "../../game/calculatePoints";
import { useDiceStore } from "../../store/Dicestore";
import { sendToast } from "../../utils/utils";
import { checkIfFinished } from "../../game/game";
import { useNavigate } from "react-router-dom";
import Tooltip from "../Tooltip";
import Dice from "../dicemachine/Dice";
import { Language } from "../../lang/lang";

interface playerScoreBoardProps {
  player: number;
  handleRageReset: () => void;
  tntSharp: boolean;
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
    isHelpModeOn,
    setHelpMode,
  } = useGameStore();

  const navigate = useNavigate();

  const onClickHandler = (choice: number) => {
    if (numberOfRound === 0) {
      sendToast(lang.niceTry, 2000);
      return;
    }
    if (playerOnTurn === props.player) {
      for (const [key] of props.currentBoard.entries()) {
        if (key === choice.toString()) {
          sendToast(lang.alreadyFilled, 2000);
          return;
        }
      }
    } else if (playerOnTurn !== props.player) {
      sendToast(lang.chooseOnYourBoard, 2000);
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
        sendToast(lang.nextPlayer, 800);
      } else {
        sendToast(lang.nextRound, 800);
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
    return "h-14  col-start-1 col-span-2 p-1 border border-gray flex justify-center items-center ";
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

  const toggleHelpMode = () => {
    setHelpMode(!isHelpModeOn);
    const message = !isHelpModeOn ? lang.helpmodeOn : lang.helpmodeOff;
    sendToast(message, 500);
  };

  function getLangValue(key: number): string {
    const keyForReturn = key.toString();
    return lang[keyForReturn as keyof Language] || keyForReturn;
  }

  const writeDiceScoreRows = (start: number, end: number) => {
    const diceScoreRows = [];
    if (start == 1) {
      for (let i = start; i <= end; i++) {
        diceScoreRows.push(
          <tr
            onClick={() => onClickHandler(1)}
            className="border-gray col-span-2 grid h-14 grid-cols-3 border"
          >
            <td className={checkPossibleChoices(`${i}`)}>
              <Tooltip message={lang.tooltipRuleSameDices}>
                {" "}
                <Dice
                  diceNumber={i}
                  iskept={false}
                  roll={false}
                  opacity="opacity-1"
                  height="h-6"
                />
              </Tooltip>
            </td>
            <td className="border-gray col-start-3 flex items-center justify-center border p-1 text-center">
              {fillInPoints(`${i}`)}
            </td>
          </tr>,
        );
      }
    } else {
      for (let i = start; i <= end; i++) {
        diceScoreRows.push(
          <tr
            onClick={() => onClickHandler(7)}
            className="border-gray col-span-2 grid h-14 grid-cols-3 border"
          >
            <td className={checkPossibleChoices(`${i}`)}>
              {" "}
              <Tooltip message={lang.tooltipRuleThreeOf}>
                {getLangValue(i)}{" "}
              </Tooltip>
            </td>
            <td className="border-gray col-start-3 flex items-center justify-center border p-1 text-center">
              {fillInPoints(`${i}`)}
            </td>
          </tr>,
        );
      }
    }
    return diceScoreRows;
  };

  return (
    <div className="m-2 grid grid-cols-2 rounded bg-slate-300 p-1 text-center text-sm">
      <div
        className={
          playerOnTurn === props.player
            ? "col-span-2 grid grid-cols-5 bg-green-400"
            : "col-span-2 grid grid-cols-5 bg-slate-400"
        }
      >
        <div className="col-start-1 m-auto flex">
          {playerOnTurn === props.player ? (
            <img
              onClick={() => toggleHelpMode()}
              className={
                isHelpModeOn
                  ? "h-7 cursor-pointer"
                  : "h-7 cursor-pointer opacity-20"
              }
              src="/fiveOfAKindReact/help.svg"
              alt=""
            />
          ) : null}
        </div>
        <h5 className="mb-2text-center col-span-3 m-auto text-xl">
          {playernames[props.player - 1]}
        </h5>
        <div className="m-auto flex p-1 text-sm">
          {numberOfPlayers == 1 ? (
            <Tooltip message="Rage Reset!" sendTip>
              <img
                onClick={() => props.handleRageReset()}
                className={
                  props.tntSharp
                    ? "h-7 cursor-pointer rounded bg-red-500"
                    : "h-7 cursor-pointer"
                }
                src="/fiveOfAKindReact/tnt.png"
              ></img>
            </Tooltip>
          ) : null}
        </div>
      </div>

      <div className="col-start-1">
        <table className="border-gray h-full w-full border-collapse rounded">
          <tbody className="grid grid-cols-2">
            {writeDiceScoreRows(1, 6)}
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
            {writeDiceScoreRows(7, 13)}
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
