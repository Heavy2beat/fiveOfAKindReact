import { getRandomNumber } from "../../utils/utils";
import { Language } from "../../lang/lang";
import { useDiceStore } from "../../store/Dicestore";
import { useLanguageStore } from "../../store/LanguageStore";
import Dice from "./Dice";
import { useGameStore } from "../../store/GameStore";
import { useState } from "react";

export default function DiceMachine() {
  const lang: Language = useLanguageStore().lang;
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

  const { playerOnTurn, numberOfRound, setNumberOfRound } = useGameStore();
  const [roll, setRoll] = useState(false);

  const rollDices = async () => {
    if (numberOfRound === 3) return;
    setRoll(true);

    const updateDice = async (
      diceKeep: boolean,
      setDice: (toSet: number) => void,
    ) => {
      if (!diceKeep) {
        try {
          const newValue: number = await getRandomNumber();
          if (newValue < 1 || newValue > 6) {
            throw new Error("Invalid dice value");
          }
          setDice(newValue);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    await updateDice(dice1keep, setDice1);
    await updateDice(dice2keep, setDice2);
    await updateDice(dice3keep, setDice3);
    await updateDice(dice4keep, setDice4);
    await updateDice(dice5keep, setDice5);

    if (numberOfRound <= 2) {
      setNumberOfRound(numberOfRound + 1);
    } else {
      setNumberOfRound(0);
    }

    setTimeout(() => setRoll(false), 300);
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
      " cursor-pointer mt-2 rounded  min-w-fit bg-green-400 p-2 shadow-xl text-center hover:bg-green-500";
    const diceIsNotVisible =
      " cursor-pointer mt-2 rounded  min-w-fit bg-slate-400 p-2 shadow-xl text-center  opacity-30";
    const diceIsNotKeptAndVisible =
      " cursor-pointer  mt-2 rounded  min-w-fit bg-blue-400 p-2 shadow-xl text-center hover:bg-blue-500";
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

  return (
    <>
      <div className="flex justify-center">
        <div className="m-2 grid grid-cols-5 gap-1 rounded bg-slate-300 p-4 text-xs md:w-1/2 md:max-w-fit md:text-base">
          <div onClick={() => toggleDice(1)} className="grid grid-cols-1">
            <Dice
              roll={roll}
              key={`dice1-${dice1}-${dice1keep}-${numberOfRound}`}
              iskept={dice1keep}
              diceNumber={dice1}
            ></Dice>
            <button className={manageDiceClass(dice1keep)}>{lang.keep}</button>
          </div>
          <div onClick={() => toggleDice(2)} className="grid grid-cols-1">
            <Dice
              roll={roll}
              key={`dice2-${dice2}-${dice2keep}-${numberOfRound}`}
              iskept={dice2keep}
              diceNumber={dice2}
            ></Dice>
            <button className={manageDiceClass(dice2keep)}>{lang.keep}</button>
          </div>
          <div onClick={() => toggleDice(3)} className="grid grid-cols-1">
            <Dice
              roll={roll}
              key={`dice3-${dice3}-${dice3keep}-${numberOfRound}`}
              iskept={dice3keep}
              diceNumber={dice3}
            ></Dice>
            <button className={manageDiceClass(dice3keep)}>{lang.keep}</button>
          </div>
          <div onClick={() => toggleDice(4)} className="grid grid-cols-1">
            <Dice
              roll={roll}
              key={`dice4-${dice4}-${dice4keep}-${numberOfRound}`}
              iskept={dice4keep}
              diceNumber={dice4}
            ></Dice>
            <button className={manageDiceClass(dice4keep)}>{lang.keep}</button>
          </div>
          <div onClick={() => toggleDice(5)} className="grid grid-cols-1">
            <Dice
              roll={roll}
              key={`dice5-${dice5}-${dice5keep}-${numberOfRound}`}
              iskept={dice5keep}
              diceNumber={dice5}
            ></Dice>
            <button className={manageDiceClass(dice5keep)}>{lang.keep}</button>
          </div>
          <div className="col-span-1 col-start-1 flex items-center justify-center">
            <h5 className="text-center">
              {lang.player} {playerOnTurn}
            </h5>
          </div>
          <div className="col-span-3 col-start-2 flex justify-center">
            <button
              onClick={() => rollDices()}
              className="m-2 w-5/6 cursor-pointer rounded bg-blue-400 p-2 text-center shadow-xl hover:bg-blue-500"
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
