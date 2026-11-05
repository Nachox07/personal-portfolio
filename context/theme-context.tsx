"use client";

import React, { createContext, useContext } from "react";

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = {
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

// The theme lives on <html class="dark">, set before paint by the layout's inline script.
// Components style both themes with `dark:` classes, so no React state is needed.
export default function ThemeContextProvider({
  children,
}: ThemeContextProviderProps) {
  const toggleTheme = () => {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      window.localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }

  return context;
}
