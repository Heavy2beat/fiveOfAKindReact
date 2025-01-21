import { eng } from "../lang/eng";
import { ger } from "../lang/ger";
import { useLanguageStore } from "../store/LanguageStore";

export default function Footer() {
  const { setLang } = useLanguageStore();

  return (
    <div>
      <div className="flex h-6 items-center justify-center gap-4 p-10">
        <label htmlFor="chooseLanguage"></label>

        <img
          onClick={() => setLang(ger)}
          className="h-6 cursor-pointer"
          src="/fiveOfAKindReact/german.png"
          alt=""
        />
        <img
          onClick={() => setLang(eng)}
          className="h-6 cursor-pointer"
          src="/fiveOfAKindReact/english.png"
          alt=""
        />
      </div>
      <div className="flex items-center justify-center text-xs">
        <p>designed by Fabian Fischer</p>
      </div>
    </div>
  );
}
