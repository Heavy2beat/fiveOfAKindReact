import { useEffect, useState } from "react";
import { eng } from "../lang/eng";
import { ger } from "../lang/ger";
import { useLanguageStore } from "../store/LanguageStore";
import { blueDice, redDice, useDiceColorStore } from "../store/DiceColorStore";

export default function Footer() {
  const { setLang, lang } = useLanguageStore();
  const [isVisible, setIsVisible] = useState(true);
  const { setDiceLink } = useDiceColorStore();
  const [langMenuVisible, setLangMenuVisible] = useState(false);
  const [diceColorMenuVisible, setDiceColorMenuVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const contentHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;
      setIsVisible(contentHeight <= windowHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 mt-auto h-12 w-full bg-blue-200 p-2 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="grid grid-cols-3">
        {langMenuVisible ? (
          <div className="m-auto flex h-4 items-center justify-center gap-4">
            <img
              onClick={() => {
                setLang(ger);
                setLangMenuVisible(false);
              }}
              className="h-4 cursor-pointer"
              src="/fiveOfAKindReact/german.png"
              alt="German"
            />
            <img
              onClick={() => {
                setLang(eng);
                setLangMenuVisible(false);
              }}
              className="h-4 cursor-pointer"
              src="/fiveOfAKindReact/english.png"
              alt="English"
            />
          </div>
        ) : (
          <p
            className="m-auto cursor-pointer rounded p-2 text-xs hover:bg-blue-300"
            onClick={() => setLangMenuVisible(true)}
          >
            {lang.language}
          </p>
        )}
        <div className="m-auto flex flex-col items-center justify-center text-center text-xs">
          <p className="font-thin">created by Fabian Fischer</p>
          <p className="font-thin">v 0.7.7</p>
        </div>

        {diceColorMenuVisible ? (
          <div className="m-auto flex h-4 items-center justify-center gap-4">
            <img
              onClick={() => {
                setDiceLink(blueDice);
                setDiceColorMenuVisible(false);
              }}
              className="h-6 cursor-pointer"
              src="/fiveOfAKindReact/dice-6.png"
              alt="German"
            />
            <img
              onClick={() => {
                setDiceLink(redDice);
                setDiceColorMenuVisible(false);
              }}
              className="h-6 cursor-pointer"
              src="/fiveOfAKindReact/dicer-6.png"
              alt="English"
            />
          </div>
        ) : (
          <p
            className="m-auto cursor-pointer rounded p-2 text-xs hover:bg-blue-300"
            onClick={() => setDiceColorMenuVisible(true)}
          >
            {lang.color}
          </p>
        )}
      </div>
    </div>
  );
}
