import { Link } from "react-router-dom";
import { useLanguageStore } from "../store/LanguageStore";

export default function NotFoundPage() {
  const { lang } = useLanguageStore();
  return (
    <div className="mt-20 flex h-full w-full flex-col justify-center p-10">
      <h1 className="text-center text-3xl">{lang.oops}</h1>
      <Link to="/">
        {" "}
        <button className="m-2 mt-20 w-5/6 cursor-pointer rounded bg-blue-400 p-2 text-center shadow-xl">
          {lang.mainMenu}
        </button>
      </Link>
    </div>
  );
}
