import { ToastContainer } from "react-toastify";
import DiceMachine from "./components/dicemachine/Dicemachine";
import ScoreBoard from "./components/scoreboard/scoreBoard";

export function App() {


   


  return (
    <>
  <DiceMachine></DiceMachine>
  <ScoreBoard></ScoreBoard>
  <ToastContainer></ToastContainer>
    </>
  );
}

