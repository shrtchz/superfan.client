// "use client";

// import { useEffect } from "react";

// export function ThemeProvider({ children }: { children: React.ReactNode }) {
//   useEffect(() => {
//     const theme = localStorage.getItem('theme');
//     const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
//     if (theme === 'dark' || (!theme && systemDark)) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, []);

//   return <>{children}</>;
// }
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}