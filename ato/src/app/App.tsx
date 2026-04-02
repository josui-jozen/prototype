import { useState, useEffect, useRef, useCallback } from "react";
import { VideoBackground } from "./components/VideoBackground";
import { Concept } from "./components/Concept";
import { Values } from "./components/Values";
import { Features } from "./components/Features";
import { LocaleSwitcher } from "./components/LocaleSwitcher";
import { useT } from "../i18n";

export default function App() {
  const [ready, setReady] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const t = useT();

  useEffect(() => {
    // Explicitly load the needed font weights before showing the page
    Promise.all([
      document.fonts.load('400 1em "Shippori Mincho"', 'あ'),
      document.fonts.load('700 1em "Shippori Mincho"', 'あ'),
    ]).then(() => setReady(true))
      .catch(() => setReady(true)); // fallback: show page anyway
  }, []);

  const update = useCallback(() => {
    const scrollT = Math.min(window.scrollY / (window.innerHeight * 0.3), 1);
    if (rootRef.current) {
      rootRef.current.style.setProperty("--t", String(scrollT));
    }
    if (overlayRef.current) {
      overlayRef.current.style.opacity = String(scrollT);
    }
  }, []);

  useEffect(() => {
    let raf = 0;
    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(raf);
    };
  }, [update]);

  return (
    <div
      ref={rootRef}
      className="min-h-screen selection:bg-ato-selection transition-opacity duration-700"
      style={{ opacity: ready ? 1 : 0, color: "color-mix(in srgb, var(--ato-text) calc(var(--t, 0) * 100%), white)" }}
    >
      <VideoBackground overlayRef={overlayRef} />
      <div className="fixed top-4 right-4 z-50">
        <LocaleSwitcher />
      </div>
      <main className="relative flex flex-col items-center max-w-[640px] mx-auto px-4 sm:px-0 py-8 gap-8 sm:gap-12">
        <div className="flex flex-col items-center gap-2">
          <div
            role="img"
            aria-label="あと、"
            className="w-32 sm:w-40 aspect-[200/84]"
            style={{
              backgroundColor: "currentColor",
              maskImage: "url(/ato-logo.webp)",
              WebkitMaskImage: "url(/ato-logo.webp)",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
          <p className="ato-body tracking-widest text-center">{t("app.subtitle.line1")}<br />{t("app.subtitle.line2")}</p>
          {t("app.pronunciation") && <p className="ato-body text-center opacity-60">{t("app.pronunciation")}</p>}
        </div>
        <Concept />
        <Features />
        <Values />
      </main>
    </div>
  );
}
