"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
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
    en: { code: "en", name: "English" },
    fr: { code: "fr", name: "Français" },
  } as const;

  type Locale = keyof typeof languages;

  const [userLocale, setUserLocale] = useState<Locale>(initialLocale as Locale);
  const [pendingLocale, setPendingLocale] = useState<string | null>(null);

  const currentLanguage = languages[userLocale];

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
    <nav className="w-full border-t border-b h-[80px] text-black flex items-center justify-center py4">
      <div className="w-[90%] py-4 flex">
        <div className="px-1 grid grid-cols-4 w-full">
          
          {/* LOGO */}
          <div className="col-span-1">
            <Link
              href={`/${userLocale}`}
              className="flex w-full mt-1.5 items-center space-x-2"
            >
              <Image
                src="/GAME WHITE AND BLACK 2-1.svg"
                alt="Logo"
                width={220}
                height={150}
                priority
              />
            </Link>
          </div>

          {/* LANGUAGE SWITCHER */}
          <div className="col-span-3 w-full flex items-center justify-end py-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center text-black space-x-2 bg-transparent"
                >
                  <span className="hidden sm:inline">{currentLanguage.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="bg-white">
                {Object.values(languages).map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    onClick={() => handleLocaleChange(language.code as Locale)}
                    className="flex items-center hover:bg-gray-200 text-black cursor-pointer"
                  >
                    <span>{language.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        
        </div>
      </div>
    </nav>
  );
}
