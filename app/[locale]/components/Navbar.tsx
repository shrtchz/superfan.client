
"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const initialLocale = useLocale();

  const languageCode = pathname.split("/")[1];
  const urlPath = pathname.replace(`/${languageCode}`, "");

const languages = {
  en: { code: "en", name: "English"  },
  fr: { code: "fr", name: "Français" },
  // de: { code: "de", name: "Deutsch" },
} as const;

type Locale = keyof typeof languages;

const [userLocale, setUserLocale] = useState<Locale>(initialLocale as Locale);

const currentLanguage = languages[userLocale];


  const [pendingLocale, setPendingLocale] = useState<string | null>(null);

useEffect(() => {
  if (!pendingLocale) return;

  document.cookie = `NEXT_LOCALE=${pendingLocale}; path=/; max-age=31536000`;

}, [pendingLocale]);


const handleLocaleChange = (locale: Locale) => {

  setPendingLocale(locale);
  setUserLocale(locale);
  router.push(`/${locale}${urlPath}`);
};




  return (
    <nav className="w-full border-b border-b-gray-300 bg-white backdrop-blur-md h-[80px]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${userLocale}`} className="flex items-center space-x-2">
          <Image
            src="/GAME WHITE AND BLACK 2-1.svg"
            alt="Logo"
            width={250}
            height={150}
            priority
          />
        </Link>

        {/* Language Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center text-black  space-x-2 bg-transparent"
            >
              {/* <span>{currentLanguage.flag}</span> */}
              <span className="hidden sm:inline">{currentLanguage.name}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="bg-white">
            {Object.values(languages).map((language) => (
              <DropdownMenuItem
                key={language.code}
                onClick={() => handleLocaleChange(language.code)}
                className="flex items-center bg-white  data-[variant=default]:text-black   hover:bg-gray-400 text-black space-x-2 cursor-pointer"
              >
                {/* <span>{language.flag}</span> */}
                <span>{language.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
