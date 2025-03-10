import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useGameStore } from "../../store/GameStore";
import { useDiceColorStore } from "../../store/DiceColorStore";

interface DiceProps {
  diceNumber: number;
  iskept: boolean;
  roll: boolean;
}
export default function Dice(props: DiceProps) {
  const { numberOfRound } = useGameStore();
  const { diceLink } = useDiceColorStore();

  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (props.roll && !props.iskept) {
      rotateDice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.iskept, props.roll]);

  const rotateDice = () => {
    if (numberOfRound !== 0 && !props.iskept)
      setRotation(rotation === 0 ? 360 : 0);
  };
  const dicepathTemp = diceLink.dice1;
  const dicePath = dicepathTemp.replace("1", `${props.diceNumber}`);
  // const dicePath = `/fiveOfAKindReact/dice-${props.diceNumber}.png`;

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
