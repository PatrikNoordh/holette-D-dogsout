import { createContext, useContext, useState } from 'react';
import en from "./en";
import sv from "./sv";

const STORAGE_KEY = "hdd:lang";
const LANGUAGES = { en, sv };

function readLang() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored in LANGUAGES ? stored : "en";
    }catch {
        return "en";
    }
}

function writeLang(lang) {
    try {
        localStorage.setItem(STORAGE_KEY, lang);
    }catch {

    }
}

const LanguageContext = createContext(null);

export function LanguageProvider ({ children }) {
    const [ lang, setLangState ] = useState(readLang);

    function setLang(next) {
        if (!(next in LANGUAGES)) return;
        writeLang(next);
        setLangState(next);
    }

    const value = { t: LANGUAGES[lang], lang, setLang };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useStrings () {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useStrings must be used inside <LanguageProvider>");
    }

    return context;
}



