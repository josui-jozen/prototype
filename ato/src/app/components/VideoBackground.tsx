import { useEffect, useRef } from "react";

interface VideoBackgroundProps {
  overlayRef: React.RefObject<HTMLDivElement | null>;
}

export function VideoBackground({ overlayRef }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // iOS requires explicit play() call
    const tryPlay = () => {
      v.play().catch(() => {});
    };

    // Attempt autoplay immediately
    tryPlay();

    // Also retry when video data is ready
    v.addEventListener("canplay", tryPlay, { once: true });

    const resume = () => {
      if (!v.paused) return;
      v.play().catch(() => {
        const t = v.currentTime;
        v.src = v.src;
        v.currentTime = t;
        v.play().catch(() => {});
      });
    };
    const handleVisibility = () => {
      if (document.visibilityState === "visible") resume();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pageshow", resume);
    window.addEventListener("focus", resume);
    return () => {
      v.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pageshow", resume);
      window.removeEventListener("focus", resume);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        src="/movies/landscape.mp4"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* 黒オーバーレイ（常時） */}
      <div className="absolute inset-0 bg-black/75" style={{ zIndex: 2 }} />
      {/* 白オーバーレイ（スクロールでopacity変化） */}
      <div
        ref={overlayRef}
        className="absolute inset-0 will-change-[opacity]"
        style={{ backgroundColor: "rgb(246,247,248)", opacity: 0, zIndex: 3 }}
      />
      {/* 和紙テクスチャ（白オーバーレイと連動） */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/textures/washi.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "multiply",
          opacity: 0.12,
          zIndex: 4,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
