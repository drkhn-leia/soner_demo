import { createClient } from "@supabase/supabase-js";
import ThemeProvider from "@/components/ThemeProvider";
import Loader from "@/components/Loader";

type Vars = Record<string, string>;

async function getThemeVars(key: "light" | "dark"): Promise<Vars> {
  const url = process.env.SUPABASE_URL!; // sizin kullandığınız env isimleri
  const anon = process.env.SUPABASE_ANON_KEY!;
  const sb = createClient(url, anon, { auth: { persistSession: false } });
  const { data } = await sb
    .from("themes")
    .select("vars")
    .eq("key", key)
    .eq("is_active", true)
    .single();
  return (data?.vars ?? {}) as Vars;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // SSR’da iki varyasyonu da alalım
  const [lightVars, darkVars] = await Promise.all([
    getThemeVars("light"),
    getThemeVars("dark"),
  ]);

  const inlineLight = Object.entries(lightVars)
    .map(([k, v]) => `${k}:${v}`)
    .join(";");
  const inlineDark = Object.entries(darkVars)
    .map(([k, v]) => `${k}:${v}`)
    .join(";");

  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* İlk kare: app gizli, scroll kapalı */}
        <style id="boot">{`html{overflow-y:hidden} #app{display:none}`}</style>

        {/* System light (default) */}
        {inlineLight && <style>{`:root{${inlineLight}}`}</style>}

        {/* System dark (tercihe göre override) */}
        {inlineDark && (
          <style>{`@media (prefers-color-scheme: dark){:root{${inlineDark}}}`}</style>
        )}

        {/* Loader logosunu preload etmek iyi olur */}
        <link rel="preload" as="image" href="/nost.png" />
      </head>
      <body>
        {/* Client: seçili temayı fetch + uygula + theme:ready yayımla
            (initialThemeKey sistem tercihine göre ThemeProvider içinde belirlenecekse bu prop’a gerek yok) */}
        <ThemeProvider />

        {/* Loader: exit sinyalini bekler */}
        <Loader />

        {/* Asıl uygulama: başta görünmez */}
        <div id="app">{children}</div>

        {/* Reveal: min 1 sn + theme:ready → app görünür, scroll açılır, loader kapanır */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  var MIN_DELAY = 1000;
  var minDone=false, themeReady=false, revealed=false;

  function reveal(){
    if(revealed) return;
    if(!(minDone && themeReady)) return;

    var app = document.getElementById('app');
    if(app) app.style.display = '';

    document.documentElement.style.overflowY = 'auto';
    window.dispatchEvent(new CustomEvent('loader:exit'));

    var boot = document.getElementById('boot');
    if(boot && boot.parentNode) boot.parentNode.removeChild(boot);
    revealed = true;
  }

  setTimeout(function(){ minDone = true; reveal(); }, MIN_DELAY);
  window.addEventListener('theme:ready', function(){ themeReady = true; reveal(); }, { once: true });
})();
            `,
          }}
        />
      </body>
    </html>
  );
}
