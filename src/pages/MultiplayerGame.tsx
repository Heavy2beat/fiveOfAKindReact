import DiceMachine from "../components/dicemachine/Dicemachine";
import MultiPlayerScoreBoard from "../components/scoreboard/MultiPlayerScoreBoard";
import { useMultiplayerStore } from "../store/MultiplayerStore";

export default function MultiplayerGame() {
  const { currentLobby, currentPLayer } = useMultiplayerStore();

  return (
    <>
      <DiceMachine
        playerOnTurn={currentPLayer === currentLobby?.playerList[0]}
      ></DiceMachine>
      <>
        <MultiPlayerScoreBoard></MultiPlayerScoreBoard>
      </>
    </>
  );
}
