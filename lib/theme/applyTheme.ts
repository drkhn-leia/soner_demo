export type ThemeVars = Record<string, string>; // {"--background":"#fff", ...}

export function applyTheme(vars: ThemeVars) {
  const root = document.documentElement;
  Object.entries(vars).forEach(([k, v]) => {
    root.style.setProperty(k, v);
  });
}
