import { useGameStore } from "../../store/GameStore";
import { useLanguageStore } from "../../store/LanguageStore";
import { setDicesToPoints } from "../../game/calculatePoints";
import { useDiceStore } from "../../store/Dicestore";
import { sendToast } from "../../utils/utils";
import { checkIfFinished } from "../../game/game";
import { useNavigate } from "react-router-dom";
import Tooltip from "../Tooltip";

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

  return (
    <div className="m-2 grid grid-cols-2 rounded bg-slate-300 p-1 text-center text-sm">
      <div
        className={
          playerOnTurn === props.player
            ? "col-span-2 grid grid-cols-5 bg-green-400"
            : "col-span-2 grid grid-cols-5 bg-slate-400"
        }
      >
        <h5 className="mb-2text-center col-span-4 m-auto text-xl">
          {playernames[props.player - 1]}
        </h5>
        <div className="m-auto flex p-1 text-sm">
          {playerOnTurn === props.player ? (
            <img
              onClick={() => toggleHelpMode()}
              className={isHelpModeOn ? "h-7" : "h-7 opacity-20"}
              src="/fiveOfAKindReact/help.svg"
              alt=""
            />
          ) : null}
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
            <tr
              onClick={() => onClickHandler(1)}
              className="border-gray col-span-2 grid h-14 grid-cols-3 border"
            >
              <td className={checkPossibleChoices("1")}>
                <Tooltip message={lang.tooltipRuleSameDices}>
                  {" "}
                  <img
                    className="h-6"
                    src="/fiveOfAKindReact/dice-1.png"
                    alt=""
                  />
                </Tooltip>
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
                <Tooltip message={lang.tooltipRuleSameDices}>
                  <img
                    className="h-6"
                    src="/fiveOfAKindReact/dice-2.png"
                    alt=""
                  />
                </Tooltip>
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
                <Tooltip message={lang.tooltipRuleSameDices}>
                  <img
                    className="h-6"
                    src="/fiveOfAKindReact/dice-3.png"
                    alt=""
                  />
                </Tooltip>
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
                <Tooltip message={lang.tooltipRuleSameDices}>
                  <img
                    className="h-6"
                    src="/fiveOfAKindReact/dice-4.png"
                    alt=""
                  />
                </Tooltip>
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
                <Tooltip message={lang.tooltipRuleSameDices}>
                  <img
                    className="h-6"
                    src="/fiveOfAKindReact/dice-5.png"
                    alt=""
                  />
                </Tooltip>
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
                <Tooltip message={lang.tooltipRuleSameDices}>
                  <img
                    className="h-6"
                    src="/fiveOfAKindReact/dice-6.png"
                    alt=""
                  />
                </Tooltip>
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
              <td className={checkPossibleChoices("7")}>
                {" "}
                <Tooltip message={lang.tooltipRuleThreeOf}>{lang[7]} </Tooltip>
              </td>
              <td className="border-gray col-start-3 flex items-center justify-center border p-1 text-center">
                {fillInPoints("7")}
              </td>
            </tr>
            <tr
              onClick={() => onClickHandler(8)}
              className="border-gray col-span-2 grid h-14 grid-cols-3 border"
            >
              <td className={checkPossibleChoices("8")}>
                <Tooltip message={lang.tooltipRuleFourOf}>{lang[8]}</Tooltip>
              </td>
              <td className="border-gray col-start-3 flex items-center justify-center border p-1 text-center">
                {fillInPoints("8")}
              </td>
            </tr>
            <tr
              onClick={() => onClickHandler(9)}
              className="border-gray col-span-2 grid h-14 grid-cols-3 border"
            >
              <td className={checkPossibleChoices("9")}>
                <Tooltip message={lang.tooltipRuleFullHouse}>{lang[9]}</Tooltip>
              </td>
              <td className="border-gray col-start-3 flex items-center justify-center border p-1 text-center">
                {fillInPoints("9")}
              </td>
            </tr>
            <tr
              onClick={() => onClickHandler(10)}
              className="border-gray col-span-2 grid h-14 grid-cols-3 border"
            >
              <td className={checkPossibleChoices("10")}>
                <Tooltip message={lang.tooltipRuleSmallStreet}>
                  {lang[10]}
                </Tooltip>
              </td>
              <td className="border-gray col-start-3 flex items-center justify-center border p-1 text-center">
                {fillInPoints("10")}
              </td>
            </tr>
            <tr
              onClick={() => onClickHandler(11)}
              className="border-gray col-span-2 grid h-14 grid-cols-3 border"
            >
              <td className={checkPossibleChoices("11")}>
                <Tooltip message={lang.tooltipRuleLargeStreet}>
                  {lang[11]}
                </Tooltip>
              </td>
              <td className="border-gray col-start-3 flex items-center justify-center border p-1 text-center">
                {fillInPoints("11")}
              </td>
            </tr>
            <tr
              onClick={() => onClickHandler(12)}
              className="border-gray col-span-2 grid h-14 grid-cols-3 border"
            >
              <td className={checkPossibleChoices("12")}>
                <Tooltip message={lang.tooltipRuleFiveOf}>{lang[12]}</Tooltip>
              </td>
              <td className="border-gray col-start-3 flex items-center justify-center border p-1 text-center">
                {fillInPoints("12")}
              </td>
            </tr>
            <tr
              onClick={() => onClickHandler(13)}
              className="border-gray col-span-2 grid h-14 grid-cols-3 border"
            >
              <td className={checkPossibleChoices("13")}>
                <Tooltip message={lang.tooletipRuleChance}>{lang[13]}</Tooltip>
              </td>
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
