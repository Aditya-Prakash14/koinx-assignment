import React, { createContext, useContext, useState, useEffect } from "react";
import { THEMES } from "../utils/theme";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Try to load from localStorage, default to dark
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    return true; // default dark
  });

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.body.style.background = isDark ? THEMES.dark.bg : THEMES.light.bg;
    document.body.style.color = isDark ? THEMES.dark.text : THEMES.light.text;
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  const theme = isDark ? THEMES.dark : THEMES.light;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
