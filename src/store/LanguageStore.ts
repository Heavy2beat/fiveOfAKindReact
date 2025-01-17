import { create } from "zustand";
import { language } from "../lang/lang";
import { ger } from "../lang/ger";

interface LanguageStore {
    lang: language;
    setLang: (langToSet:language)=>void;
}

export const useLanguageStore = create<LanguageStore>()((set)=> ({
    lang : ger,
    setLang: (langToSet : language) => set(()=> ({lang: langToSet })),}));;