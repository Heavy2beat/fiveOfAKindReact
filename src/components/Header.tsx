import { useState } from "react";
import { blueDice, redDice, useDiceColorStore } from "../store/DiceColorStore";

export default function Header() {
  const { setDiceLink } = useDiceColorStore();
  const [isBlue, setIsBlue] = useState(true);

  return (
    <>
      <img
        onClick={
          isBlue
            ? () => {
                setDiceLink(redDice);
                setIsBlue(false);
              }
            : () => {
                setDiceLink(blueDice);
                setIsBlue(true);
              }
        }
        className="m-auto mt-2 w-5/6 rounded-xl object-scale-down p-2 md:flex md:h-48"
        src="/fiveOfAKindReact/longbanner.png"
        alt=""
      />
    </>
  );
}
