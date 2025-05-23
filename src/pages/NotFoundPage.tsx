import { Link } from "react-router-dom";
import { useLanguageStore } from "../store/LanguageStore";
import Footer from "../components/Footer";

export default function NotFoundPage() {
  const { lang } = useLanguageStore();
  return (
    <div className="mt-40 flex h-full w-full flex-col items-center justify-center gap-56">
      <h1 className="text-center text-3xl">{lang.oops}</h1>
      <Link to="/">
        {" "}
        <button className="m-autow-1/2 cursor-pointer rounded bg-blue-400 p-2 text-center shadow-xl">
          {lang.mainMenu}
        </button>
      </Link>
      <Footer></Footer>
    </div>
  );
}
