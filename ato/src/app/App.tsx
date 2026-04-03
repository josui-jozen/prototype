import { useState, useEffect, useRef, useCallback } from "react";
import { VideoBackground } from "./components/VideoBackground";
import { Concept } from "./components/Concept";
import { Values } from "./components/Values";
import { Features } from "./components/Features";
import { LocaleSwitcher } from "./components/LocaleSwitcher";
import { useT } from "../i18n";

export default function App() {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const loadedRef = useRef({ video: false, logo: false, font: false, minTime: false });
  const rootRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const t = useT();

  const checkReady = useCallback(() => {
    const { video, logo, font, minTime } = loadedRef.current;
    const resourceCount = [video, logo, font].filter(Boolean).length;
    setProgress(Math.round((resourceCount / 3) * 100));
    if (video && logo && font && minTime) setReady(true);
  }, []);

  useEffect(() => {
    // Logo image
    const img = new Image();
    img.src = "/ato-logo.webp";
    img.onload = () => { loadedRef.current.logo = true; checkReady(); };
    img.onerror = () => { loadedRef.current.logo = true; checkReady(); };

    // Font
    document.fonts.ready.then(() => {
      loadedRef.current.font = true;
      checkReady();
    });

    // Minimum 1.5s display
    const minTimer = setTimeout(() => {
      loadedRef.current.minTime = true;
      checkReady();
    }, 500);

    // Timeout fallback (10s)
    const timer = setTimeout(() => setReady(true), 10000);
    return () => { clearTimeout(minTimer); clearTimeout(timer); };
  }, [checkReady]);

  const handleVideoReady = useCallback(() => {
    loadedRef.current.video = true;
    checkReady();
  }, [checkReady]);

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
    <>
      {/* Loading screen */}
      <div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-700"
        style={{ opacity: ready ? 0 : 1, pointerEvents: ready ? "none" : "auto" }}
      >
        <div className="flex flex-col items-center gap-3">
          <p className="text-white/60 text-sm tracking-widest">読み込み中</p>
          <div className="w-48 h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-white/60 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/40 text-xs">{progress}%</p>
        </div>
      </div>
      <div
        ref={rootRef}
        className="min-h-screen selection:bg-ato-selection transition-opacity duration-700"
        style={{ opacity: ready ? 1 : 0, color: "color-mix(in srgb, var(--ato-text) calc(var(--t, 0) * 100%), white)" }}
      >
      <VideoBackground overlayRef={overlayRef} onReady={handleVideoReady} />
      <main className="relative flex flex-col items-center max-w-[640px] mx-auto px-4 sm:px-0 py-8 gap-12 sm:gap-12">
        <div className="self-end">
          <LocaleSwitcher />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div
            role="img"
            aria-label="あと、"
            className="w-18 sm:w-24 aspect-[200/84]"
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
          <p className="text-sm text-center opacity-60">{t("app.font")}<span className="inline-block" style={{ width: "0.6em" }} /></p>
          {t("app.pronunciation") && <p className="ato-body text-center opacity-60">{t("app.pronunciation")}</p>}
        </div>
        <Concept />
        <Features />
        <Values />
      </main>
      </div>
    </>
  );
}
