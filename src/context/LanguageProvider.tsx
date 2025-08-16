"use client";

import { createContext, useContext } from "react";
import { Locale, LocalesArray } from "@/config/locales";
import { usePathname } from "@/i18n/routing";
import { useRouter } from "next/navigation";
import { setLocalStorageItem } from "@/utils/localStorage";
import { setCookie } from "cookies-next";

interface LanguageContextType {
  changeLanguage: (lang: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  changeLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (newLang: Locale) => {
    if (!LocalesArray.includes(newLang)) return;
    setLocalStorageItem("i18n", newLang);
    setCookie("i18n", newLang);
    router.push(`/${newLang}${pathname}`);
    router.refresh();
  };

  return (
    <LanguageContext.Provider value={{ changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
