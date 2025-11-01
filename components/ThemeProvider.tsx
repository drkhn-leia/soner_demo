"use client";
import * as React from "react";

type ThemeVars = Record<string, string>;

function applyTheme(vars: ThemeVars) {
  const root = document.documentElement;
  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
}

function getInitialKey(): "light" | "dark" {
  const stored =
    typeof window !== "undefined" ? localStorage.getItem("themeKey") : null;
  if (stored === "light" || stored === "dark") return stored as any;
  // Sistem tercihi
  if (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}

export default function ThemeProvider() {
  const [key, setKey] = React.useState<"light" | "dark">(getInitialKey);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/theme?key=${key}`, { cache: "no-store" });
        if (!res.ok) throw new Error();
        const json: { vars: ThemeVars } = await res.json();
        if (!cancelled) applyTheme(json.vars);
      } finally {
        // Tema uygulandı -> loader’ı sal
        window.dispatchEvent(new CustomEvent("theme:ready"));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [key]);

  // Sistem teması değişirse canlı güncelle
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const next = mq.matches ? "dark" : "light";
      setKey(next);
      localStorage.setItem("themeKey", next);
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  return null;
}
