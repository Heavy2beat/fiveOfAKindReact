import DiceMachine from "../components/dicemachine/Dicemachine";
import ScoreBoard from "../components/scoreboard/ScoreBoard";

export default function Game() {
  return (
    <>
      <>
        <DiceMachine playerOnTurn={true}></DiceMachine>
      </>
      <ScoreBoard></ScoreBoard>
    </>
  );
}
