"use client";

import { DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useTheme } from "next-themes";
import ColorModaIcon from "@/public/icons/ColorModeIcon";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const isLight = resolvedTheme === "light";
  const isDark = resolvedTheme === "dark";

  return (
    <DropdownMenuSub>
       <DropdownMenuSubTrigger className="w-max flex items-center p-2 cursor-pointer [&>svg]:rotate-90 [&>svg]:transition-transform [&>svg]:duration-200">
        <div className="flex dark:text-white items-center gap-2">
        <ColorModaIcon/>
          <span className="text-sm">Theme</span>
        </div>
      </DropdownMenuSubTrigger>

      <DropdownMenuPortal>
        <DropdownMenuSubContent className="w-28 p-1">

          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className={`
              ${isLight ? "bg-black/70 dark:bg-gray-100 text-white dark:text-gray-300" : ""}
              rounded-md cursor-pointer
            `}
          >
            Light
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className={`
              ${isDark ? "bg-blue-100 dark:bg-white/70 text-blue-700 dark:text-black/90" : ""}
              rounded-md cursor-pointer
            `}
          >
            Dark
          </DropdownMenuItem>

        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
