"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

function subscribe(callback: () => void) {
  window.addEventListener("rweru-theme", callback);
  return () => window.removeEventListener("rweru-theme", callback);
}
function snapshot() {
  return document.documentElement.dataset.theme === "dark";
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, snapshot, () => false);
  function toggle() {
    const theme = dark ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("rweru-theme", theme);
    } catch {
      /* Preference still applies for this visit. */
    }
    window.dispatchEvent(new Event("rweru-theme"));
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
      className="flex size-10 shrink-0 items-center justify-center rounded-lg text-slate hover:bg-slate/5"
    >
      {dark ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
    </button>
  );
}
