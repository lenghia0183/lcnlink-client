"use client";

import { useLanguage } from "@/context/LanguageProvider";
import { Locales } from "@/config/locales";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe, Check } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const langFromPathname = (path: string): Locales => {
  const langSegment = path.split("/")[1];
  switch (langSegment) {
    case "vi-VN":
      return Locales.VI;
    case "en-US":
      return Locales.EN;
    default:
      return Locales.EN;
  }
};

export default function LanguageSwitcher() {
  const { changeLanguage } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const currentLang = langFromPathname(pathname);

  const languages = [
    { label: "Tiếng Việt", value: Locales.VI, flag: "🇻🇳", locale: "vi-VN" },
    { label: "English", value: Locales.EN, flag: "🇺🇸", locale: "en-US" },
  ];

  const handleLanguageChange = (lang: (typeof languages)[number]) => {
    changeLanguage(lang.value);
    const segments = pathname.split("/");
    segments[1] = lang.locale;
    const newPath = segments.join("/") || "/";
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <span className="capitalize">
            {languages.find((l) => l.value === currentLang)?.label}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[180px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.value}
            onClick={() => handleLanguageChange(lang)}
            className="flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              {lang.flag} {lang.label}
            </span>
            {currentLang === lang.value && (
              <Check className="w-4 h-4 text-green-500" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
