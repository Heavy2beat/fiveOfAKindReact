import { create } from "zustand";
import { Language } from "../lang/lang";
import { ger } from "../lang/ger";

interface LanguageStore {
    lang: Language;
    setLang: (langToSet:Language)=>void;
}

export const useLanguageStore = create<LanguageStore>()((set)=> ({
    lang : ger,
    setLang: (langToSet : Language) => set(()=> ({lang: langToSet })),}));;