import { useEffect, useState } from "react";
import { eng } from "../lang/eng";
import { ger } from "../lang/ger";
import { useLanguageStore } from "../store/LanguageStore";

export default function Footer() {
  const { setLang } = useLanguageStore();
  const [isVisible, setIsVisible] = useState(true);

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
      <div className="flex h-4 items-center justify-center gap-4">
        <img
          onClick={() => setLang(ger)}
          className="h-4 cursor-pointer"
          src="/fiveOfAKindReact/german.png"
          alt="German"
        />
        <img
          onClick={() => setLang(eng)}
          className="h-4 cursor-pointer"
          src="/fiveOfAKindReact/english.png"
          alt="English"
        />
      </div>
      <div className="flex items-center justify-center text-xs">
        <p className="p-1">created by Fabian Fischer v0.7.5</p>
      </div>
    </div>
  );
}
