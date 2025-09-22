// src/hooks/useTheme.tsx
"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Theme } from "../types/portfolio";
import { themes } from "../types/portfolio";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialThemeName: string;
}

export function ThemeProvider({ children, initialThemeName }: ThemeProviderProps) {
  // ✅ FIX: Use nullish coalescing (??) to provide a guaranteed default.
  // This is a safer approach that handles cases where the themes array might be empty.
  const foundTheme = themes.find((t) => t.name.toLowerCase() === initialThemeName.toLowerCase());
  const initialTheme = foundTheme ?? { name: "Default", color: "bg-white", accent: "bg-black" };
  const [theme, setTheme] = useState<Theme>(initialTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}