import { useGameStore } from "../../store/GameStore";
import { useLanguageStore } from "../../store/LanguageStore";
import { setDicesToPoints } from "../../game/calculatePoints";
import { useDiceStore } from "../../store/Dicestore";
import { sendToast } from "../../utils/utils";
import Tooltip from "../Tooltip";
import { changePlayer, Player, sendLobbyUpdate } from "../../api/multiplayerAPI";
import { useMultiplayerStore } from "../../store/MultiplayerStore";
import { useEffect, useState } from "react";

interface PlayerScoreBoardProps {
  player: Player;
 

}

export default function PlayerScoreBoardMP(props: PlayerScoreBoardProps) {
  const { lang } = useLanguageStore();
  const { dice1, dice2, dice3, dice4, dice5, unkeepAllDices } = useDiceStore();
  const { numberOfRound, setNumberOfRound, isHelpModeOn, setHelpMode } =
    useGameStore();

  const { currentLobby, currentPLayer,setCurrentLobby,lobbyList} = useMultiplayerStore();


  const [thisLobby, setThisLobby]  = useState(currentLobby);

  useEffect(()=>{
    const tempLobby = lobbyList.find((lobby)=>lobby.id===currentLobby!.id);
    setThisLobby(tempLobby);
    setCurrentLobby(tempLobby);
    return;
  },[currentLobby, lobbyList, setCurrentLobby])

  const onClickHandler = (choice: number) => {
    if (numberOfRound === 0) {
      sendToast(lang.niceTry, 2000);
      return;
    }
    if (
      props.player.id ===
      currentLobby!.playerList[currentLobby!.playerOnTurn].id
    ) {
      for (const [key] of props.player.scoreBoard.entries()) {
        if (key === choice.toString()) {
          sendToast(lang.alreadyFilled, 2000);
          return;
        }
      }
    } else if (currentPLayer !== props.player) {
      sendToast(lang.chooseOnYourBoard, 2000);
      return;
    }

    setDicesToPoints(
      choice,
      [dice1, dice2, dice3, dice4, dice5],
      props.player.scoreBoard,
      setScoreBoard,
    );

    nextPlayer();
  };

  const setScoreBoard = (newBoard: Map<string, number>) => {
    const tempLobby = currentLobby!;
    for (const player of tempLobby!.playerList) {
      if (player.id === tempLobby!.playerList[tempLobby!.playerOnTurn].id) {
        player.scoreBoard = newBoard;
        console.log('Updated player scoreBoard:', player.scoreBoard);
      }
    }

    tempLobby.playerList.forEach((player) => {console.log(" player "+player.name+" scoreboard values "+player.scoreBoard.size)
      
    });
    sendLobbyUpdate(tempLobby);
    nextPlayer();
  };

  const nextPlayer = () => {
    changePlayer(currentLobby!.id)

    setNumberOfRound(0);
    unkeepAllDices();
 
  };

  const checkPossibleChoices = (scoreKey: string) => {
    if (
      currentLobby!.playerList[currentLobby!.playerOnTurn].id ===
      currentPLayer!.id
    ) {
      if (
        currentLobby!.playerList[currentLobby!.playerOnTurn].id ===
        props.player.id
      ) {
        for (const [key] of props.player.scoreBoard.entries()) {
          if (key === scoreKey) {
            return " h-14 col-start-1 col-span-2 p-1 border border-gray flex justify-center items-center";
          }
        }

        return "h-14 col-start-1 col-span-2 p-1 border border-gray flex justify-center items-center h-14 bg-green-400 hover:bg-green-500 cursor-pointer";
      }
    }
    return "h-14  col-start-1 col-span-2 p-1 border border-gray flex justify-center items-center ";
  };

  const fillInPoints = (pointsFor: string) => {
    let pointsUpper = 0;
    let pointsLower = 0;

    for (const [key, value] of props.player.scoreBoard.entries()) {
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
          thisLobby!.playerList[thisLobby!.playerOnTurn].id === currentPLayer!.id &&thisLobby!.playerList[thisLobby!.playerOnTurn].id === props.player!.id 
            ? "col-span-2 grid grid-cols-5 bg-green-400"
            : "col-span-2 grid grid-cols-5 bg-slate-400"
        }
      >
        <h5 className="mb-2text-center col-span-4 m-auto text-xl">
          {props.player.name}
        </h5>
        <div className="m-auto p-1 text-sm">
          {currentLobby!.playerList[currentLobby!.playerOnTurn] ===
          props.player ? (
            <img
              onClick={() => toggleHelpMode()}
              className={isHelpModeOn ? "h-7" : "h-7 opacity-20"}
              src="/fiveOfAKindReact/help.svg"
              alt=""
            />
          ) : (
            <div></div>
          )}
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
