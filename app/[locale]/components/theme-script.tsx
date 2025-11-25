"use client";

import { useEffect } from "react";

export function ThemeScript() {
  useEffect(() => {
    // Only run on client
    const theme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (theme === 'dark' || (!theme && systemDark)) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return null;
}