"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-8 w-14 items-center rounded-full bg-slate-200 p-1 transition-colors duration-300 dark:bg-slate-700"
      aria-label="Gündüz/Gecə rejimi"
      title="Gündüz/Gecə rejimi"
    >
      <span
        className={`absolute left-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm transition-all duration-300 ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <Sun size={14} className="text-amber-500" />
        ) : (
          <Moon size={14} className="text-slate-600" />
        )}
      </span>
      <span className="sr-only">Gündüz/Gecə rejimi</span>
    </button>
  );
}
