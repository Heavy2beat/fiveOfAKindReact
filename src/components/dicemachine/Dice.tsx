import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useGameStore } from "../../store/GameStore";

interface DiceProps {
  diceNumber: number;
  iskept: boolean;
}
export default function Dice(props: DiceProps) {
  const { numberOfRound } = useGameStore();
  
  
  const [rotation, setRotation] = useState(0);


  //todo useeffect ersetzen und auf den onclick bei roll dice legen
  useEffect(() => {
    if (!props.iskept) {
      rotateDice();
    }
  }, [props.iskept]);

  const rotateDice = () => {

    if (numberOfRound !== 0) setRotation(rotation === 0 ? 360 : 0);
  };

  const dicePath = `/fiveOfAKindReact/dice-${props.diceNumber}.png`;

  const diceClassVisible = "m-auto h-10 md:h-12";
  const diceClassInvisible = "m-auto h-10 md:h-12 opacity-30";

  return (
    <motion.img
      animate={{ rotate: rotation }}
      transition={{ duration: 0.5 }}
      className={numberOfRound !== 0 ? diceClassVisible : diceClassInvisible}
      src={dicePath}
      alt={`${props.diceNumber}`}
    />
  );
}
