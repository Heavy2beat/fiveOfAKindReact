import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useGameStore } from "../../store/GameStore";
import { useDiceColorStore } from "../../store/DiceColorStore";

interface DiceProps {
  diceNumber: number;
  iskept: boolean;
  roll: boolean;

  height?: string;

  opacity?: string;
}
export default function Dice(props: DiceProps) {
  const { numberOfRound } = useGameStore();
  const { diceLink, diceColor, isChampion } = useDiceColorStore();

  const [rotation, setRotation] = useState(0);
  const [image, setImage] = useState<string | null>(null); // Typ explizit als string | null

  useEffect(() => {
    if (props.roll && !props.iskept) {
      rotateDice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.iskept, props.roll]);

  const dicepathTemp = diceLink.dice1;
  const dicePath = dicepathTemp.replace("1", `${props.diceNumber}`);

  useEffect(() => {
    if (!isChampion) {
      const img = new Image();
      img.src = dicePath;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          ctx.globalCompositeOperation = "source-in";
          ctx.fillStyle = diceColor; // Hex-Farbwert direkt verwenden
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          setImage(canvas.toDataURL());
        } else {
          console.error("Canvas context konnte nicht erstellt werden.");
        }
      };
    }
  }, [diceColor, dicePath, isChampion]);

  const rotateDice = () => {
    if (numberOfRound !== 0 && !props.iskept)
      setRotation(rotation === 0 ? 360 : 0);
  };

  const diceClassVisible = `m-auto ${props.height ? props.height : " h-10 md:h-12"} ${props.opacity ? props.opacity : ""}`;
  const diceClassInvisible = `m-auto ${props.height ? props.height : " h-10 md:h-12"} ${props.opacity ? props.opacity : "opacity-30"}`;

  return (
    <motion.img
      animate={{ rotate: rotation }}
      transition={{ duration: 0.5 }}
      className={numberOfRound !== 0 ? diceClassVisible : diceClassInvisible}
      src={image || dicePath}
      alt={`${props.diceNumber}`}
    />
  );
}
