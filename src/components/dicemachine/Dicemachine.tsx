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

  const { playerOnTurn, numberOfRound, setNumberOfRound, firstStart } =
    useGameStore();

  const rollDices = () => {
    if (numberOfRound === 3) return;
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

  const manageDiceClass = (iskept: boolean) => {
    const diceIsKeptAndVisible =
      "m-2 cursor-pointer rounded bg-green-400 p-2 shadow-xl text-center";
    const diceIsNotVisible =
      "m-2 cursor-pointer rounded bg-slate-400 p-2 shadow-xl text-center  opacity-30";
    const diceIsNotKeptAndVisible =
      "m-2 cursor-pointer rounded bg-slate-400 p-2 shadow-xl text-center";
    if (numberOfRound !== 0) {
      if (iskept) {
        return diceIsKeptAndVisible;
      } else {
        return diceIsNotKeptAndVisible;
      }
    } else if (numberOfRound === 0) {
      return diceIsNotVisible;
    }
  };

  if (firstStart) {
    return (
      <img
        className="m-auto w-full rounded-xl p-2 md:mt-4 md:h-1/4md:w-1/2"
        src="banner.jpg"
        alt=""
      />
    );
  } else {
    return (
      <>
        <div className="flex h-10 items-center justify-center bg-slate-400 md:hidden">
          <h1>5 OF A KIND</h1>
        </div>
        <img
          className="m-auto hidden w-full rounded-xl p-2 md:flex md:max-h-80 md:w-1/2 md:object-cover"
          src="banner.jpg"
          alt=""
        />
        <div className="flex justify-center">
          <div className="m-2 grid grid-cols-5 rounded bg-slate-300 pt-2 md:w-1/2">
            <div onClick={() => toggleDice(1)} className="grid grid-cols-1">
              <Dice
                key={`dice1-${dice1}-${dice1keep}-${numberOfRound}`}
                iskept={dice1keep}
                diceNumber={dice1}
              ></Dice>
              <button
                className={manageDiceClass(dice1keep)
                }
              >
                {lang.keep}
              </button>
            </div>
            <div onClick={() => toggleDice(2)} className="grid grid-cols-1">
              <Dice
                key={`dice2-${dice2}-${dice2keep}-${numberOfRound}`}
                iskept={dice2keep}
                diceNumber={dice2}
              ></Dice>
              <button
                className={manageDiceClass(dice2keep)
                }
              >
                {lang.keep}
              </button>
            </div>
            <div onClick={() => toggleDice(3)} className="grid grid-cols-1">
              <Dice
                key={`dice3-${dice3}-${dice3keep}-${numberOfRound}`}
                iskept={dice3keep}
                diceNumber={dice3}
              ></Dice>
              <button
                className={manageDiceClass(dice3keep)
                }
              >
                {lang.keep}
              </button>
            </div>
            <div onClick={() => toggleDice(4)} className="grid grid-cols-1">
              <Dice
                key={`dice4-${dice4}-${dice4keep}-${numberOfRound}`}
                iskept={dice4keep}
                diceNumber={dice4}
              ></Dice>
              <button
                className={manageDiceClass(dice4keep)
                }
              >
                {lang.keep}
              </button>
            </div>
            <div onClick={() => toggleDice(5)} className="grid grid-cols-1">
              <Dice
                key={`dice5-${dice5}-${dice5keep}-${numberOfRound}`}
                iskept={dice5keep}
                diceNumber={dice5}
              ></Dice>
              <button
                className={manageDiceClass(dice5keep)
                }
              >
                {lang.keep}
              </button>
            </div>
            <div className="col-span-1 col-start-1 flex items-center justify-center">
              <h5 className="text-center">
                {lang.player} {playerOnTurn}
              </h5>
            </div>
            <div className="col-span-3 col-start-2 flex justify-center">
              <button
                onClick={() => rollDices()}
                className="m-2 w-5/6 cursor-pointer rounded bg-slate-400 p-2 text-center shadow-xl"
              >
                {numberOfRound !== 3 ? lang.roll : lang.setPoints}
              </button>
            </div>
            <div className="col-span-1 col-start-5">
              <h5 className="text-center">{lang.Try}</h5>
              <h5 className="text-center">{numberOfRound}/3</h5>
            </div>
          </div>
        </div>
      </>
    );
  }
}
