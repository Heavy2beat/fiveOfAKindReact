import DiceMachine from "../components/dicemachine/Dicemachine";
import Footer from "../components/Footer";
import ScoreBoard from "../components/scoreboard/ScoreBoard";

export default function Game() {
  return (
    <>
      <>
        <DiceMachine></DiceMachine>
      </>
      <ScoreBoard></ScoreBoard>
      <Footer></Footer>
    </>
  );
}
