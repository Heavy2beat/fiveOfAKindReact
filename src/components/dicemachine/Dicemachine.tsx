import { getRandomNumber } from "../../utils/utils";
import { language } from "../../lang/lang";
import { useDiceStore } from "../../store/Dicestore";
import { useLanguageStore } from "../../store/LanguageStore";
import Dice from "./Dice";
import { useGameStore } from "../../store/GameStore";


export default function DiceMachine() {
  const lang: language = useLanguageStore().lang;
  const {
    dice1,
    dice2,
    dice3,
    dice4,
    dice5,
    dice1keep,
    dice2keep,
    dice3keep,
    dice4keep,
    dice5keep,
    toggleDice1Keep,
    toggleDice2Keep,
    toggleDice3Keep,
    toggleDice4Keep,
    toggleDice5Keep,
    setDice1,
    setDice2,
    setDice3,
    setDice4,
    setDice5,
  } = useDiceStore();



 
  const { playerOnTurn, numberOfRound, setNumberOfRound,firstStart } = useGameStore();

  const rollDices = () => {
    if (numberOfRound===3) return
    if (!dice1keep) {
      setDice1(getRandomNumber());
    }
    if (!dice2keep) {
      setDice2(getRandomNumber());
    }
    if (!dice3keep) {
      setDice3(getRandomNumber());
    }
    if (!dice4keep) {
      setDice4(getRandomNumber());
    }
    if (!dice5keep) {
      setDice5(getRandomNumber());
    }
    if (numberOfRound <= 2) {
      setNumberOfRound(numberOfRound + 1);
    } else {
      setNumberOfRound(0);
    }
  };

  const toggleDice = (numberOfDice: number) => {
    if (numberOfRound != 0) {
      switch (numberOfDice) {
        case 1:
          toggleDice1Keep();
          break;
        case 2:
          toggleDice2Keep();
          break;
        case 3:
          toggleDice3Keep();
          break;
        case 4:
          toggleDice4Keep();
          break;
        case 5:
          toggleDice5Keep();
          break;
      }
    }
  };

  if (firstStart){
  
return <img className="w-full h-fit m-auto p-2 rounded-xl" src="banner.jpg" alt="" />
  }else{
  return (
    <>
      <div className="m-2 grid grid-cols-5 rounded bg-slate-300 pt-2">
        <div onClick={() => toggleDice(1)} className="grid grid-cols-1">
          <Dice diceNumber={dice1}></Dice>
          <button
            className={
              dice1keep
                ? "m-2 cursor-pointer rounded bg-green-400 p-2 shadow-xl text-center"
                : "m-2 cursor-pointer rounded bg-slate-400 p-2 shadow-xl text-center"
            }
          >
            {lang.keep}
          </button>
        </div>
        <div onClick={() => toggleDice(2)} className="grid grid-cols-1">
          <Dice diceNumber={dice2}></Dice>
          <button
            className={
              dice2keep
                ? "m-2 cursor-pointer rounded bg-green-400 p-2 shadow-xl text-center"
                : "m-2 cursor-pointer rounded bg-slate-400 p-2 shadow-xl text-center"
            }
          >
            {lang.keep}
          </button>
        </div>
        <div onClick={() => toggleDice(3)} className="grid grid-cols-1">
          <Dice diceNumber={dice3}></Dice>
          <button
            className={
              dice3keep
                ? "m-2 cursor-pointer rounded bg-green-400 p-2 shadow-xl text-center"
                : "m-2 cursor-pointer rounded bg-slate-400 p-2 shadow-xl text-center"
            }
          >
            {lang.keep}
          </button>
        </div>
        <div onClick={() => toggleDice(4)} className="grid grid-cols-1">
          <Dice diceNumber={dice4}></Dice>
          <button
            className={
              dice4keep
                ? "m-2 cursor-pointer rounded bg-green-400 p-2 shadow-xl text-center"
                : "m-2 cursor-pointer rounded bg-slate-400 p-2 shadow-xl text-center"
            }
          >
            {lang.keep}
          </button>
        </div>
        <div onClick={() => toggleDice(5)} className="grid grid-cols-1">
          <Dice diceNumber={dice5}></Dice>
          <button
            className={
              dice5keep
                ? "m-2 cursor-pointer rounded bg-green-400 p-2 shadow-xl text-center"
                : "m-2 cursor-pointer rounded bg-slate-400 p-2 shadow-xl text-center"
            }
          >
            {lang.keep}
          </button>
        </div>
        <div className="col-span-1 col-start-1 flex justify-center items-center">
          <h5 className="text-center">
            {lang.player} {playerOnTurn}
          </h5>
        
        </div>
        <div className="col-start-2 col-span-3 flex justify-center">
          <button
            onClick={() => rollDices()}
            className="m-2 cursor-pointer rounded text-center bg-slate-400 p-2 shadow-xl w-5/6"
          >
           {numberOfRound!==3?lang.roll : lang.setPoints}
          </button>
        </div>
          <div className="col-span-1 col-start-5">
            <h5 className="text-center">{lang.Try}</h5>
          <h5 className="text-center">{numberOfRound}/3</h5>
          </div>
      </div>
    </>
  );
}}
