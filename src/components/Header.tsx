import { useNavigate } from "react-router-dom";
import Tooltip from "./Tooltip";
import { useResetRound } from "../hooks/useResetRound";
import { useState } from "react";
import { useLanguageStore } from "../store/LanguageStore";

export default function Header() {
  const navigate = useNavigate();
  const resetRound = useResetRound();
  const { lang } = useLanguageStore();
  const [resetCount, setResetCount] = useState(2);

  const handleOnBannerClick = () => {
    if (resetCount > 1) {
      setResetCount(resetCount - 1);
      return;
    } else {
      setResetCount(2);
      resetRound();
      navigate("/");
    }
  };
  return (
    <>
      <Tooltip
        message={`${lang.clickHere}${resetCount} ${lang.forReset}`}
        sendTip={true}
      >
        <img
          onClick={() => handleOnBannerClick()}
          className="m-auto mt-2 w-5/6 cursor-pointer rounded-xl object-scale-down p-2 md:flex md:h-48"
          src="/fiveOfAKindReact/longbanner.png"
          alt=""
        />
      </Tooltip>
    </>
  );
}
