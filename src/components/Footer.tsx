import { useEffect, useState } from "react";
import { eng } from "../lang/eng";
import { ger } from "../lang/ger";
import { useLanguageStore } from "../store/LanguageStore";

import Tooltip from "./Tooltip";
import { ColorResult, SketchPicker } from "react-color";
import { useDiceColorStore } from "../store/DiceColorStore";
import { sendToast } from "../utils/utils";

export default function Footer() {
  const { setLang, lang } = useLanguageStore();
  const [isFixed, setIsFixed] = useState(true);

  const { diceColor, setDiceColor, isChampion } = useDiceColorStore();

  const [langMenuVisible, setLangMenuVisible] = useState(false);
  const [diceColorMenuVisible, setDiceColorMenuVisible] = useState(false);

  const handleChangeComplete = (color: ColorResult) => {
    setDiceColor(color.hex);
  };

  useEffect(() => {
    const handleResize = () => {
      const contentHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;
      setIsFixed(contentHeight + 48 < windowHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleColorMenu = () => {
    if (isChampion) {
      sendToast(lang.championsWearGold, 2000);
      return;
    }
    setDiceColorMenuVisible(true);
  };

  return (
    <div
      className={`mt-auto h-12 w-full bg-blue-200 p-2 transition-opacity duration-300 ${isFixed ? "fixed bottom-0" : "relative"}`}
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
          <Tooltip message={"v 0.8.6"} sendTip={true}>
            <p className="w-[12ch] font-thin lg:w-full">
              created by Fabian Fischer
            </p>
          </Tooltip>
        </div>

        {diceColorMenuVisible ? (
          <div className="absolute bottom-[25vh] right-1 flex h-4 items-center justify-center gap-4 md:right-[10vw]">
            <div className="solid rounded border bg-slate-200">
              <SketchPicker
                color={diceColor}
                onChangeComplete={(color) => {
                  handleChangeComplete(color);
                }}
              />
              <button
                className="h-18 w-full cursor-pointer rounded bg-blue-400 p-4 shadow-2xl hover:bg-blue-500"
                onClick={() => setDiceColorMenuVisible(false)}
              >
                Farbe wählen
              </button>
            </div>
          </div>
        ) : (
          <p
            className="m-auto cursor-pointer rounded p-2 text-xs hover:bg-blue-300"
            onClick={() => handleColorMenu()}
          >
            {lang.color}
          </p>
        )}
      </div>
    </div>
  );
}
