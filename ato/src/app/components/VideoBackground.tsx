import { useEffect, useRef, useCallback } from "react";

const videos = [
  "/landscape/竹.mov",
  "/landscape/雪.mov",
  "/landscape/寺.mov",
  "/landscape/田.mov",
  "/landscape/坂.mp4",
  "/landscape/苔.mov",
];

interface VideoBackgroundProps {
  overlayRef: React.RefObject<HTMLDivElement | null>;
}

export function VideoBackground({ overlayRef }: VideoBackgroundProps) {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const indexRef = useRef(0);
  const activeRef = useRef<"a" | "b">("a");

  const getActive = () => activeRef.current === "a" ? videoARef.current : videoBRef.current;
  const getNext = () => activeRef.current === "a" ? videoBRef.current : videoARef.current;

  const preloadNext = useCallback(() => {
    const nextIdx = (indexRef.current + 1) % videos.length;
    const next = getNext();
    if (!next) return;
    next.src = videos[nextIdx];
    next.load();
  }, []);

  const handleEnded = useCallback(() => {
    indexRef.current = (indexRef.current + 1) % videos.length;
    const next = getNext();
    const active = getActive();
    if (!next || !active) return;

    next.style.zIndex = "1";
    active.style.zIndex = "0";
    next.play().catch(() => {});

    activeRef.current = activeRef.current === "a" ? "b" : "a";
    preloadNext();
  }, [preloadNext]);

  useEffect(() => {
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    videoA.src = videos[0];
    videoA.style.zIndex = "1";
    videoB.style.zIndex = "0";
    videoA.play().catch(() => {
      // Autoplay blocked — retry on first user interaction
      const retry = () => {
        videoA.play().catch(() => {});
        document.removeEventListener("click", retry);
        document.removeEventListener("touchstart", retry);
        document.removeEventListener("scroll", retry);
      };
      document.addEventListener("click", retry, { once: true });
      document.addEventListener("touchstart", retry, { once: true });
      document.addEventListener("scroll", retry, { once: true });
    });
    preloadNext();
  }, [preloadNext]);

  return (
    <div className="fixed top-0 left-0 w-full h-dvh -z-10 bg-black">
      <video
        ref={videoARef}
        muted
        playsInline
        onEnded={handleEnded}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <video
        ref={videoBRef}
        muted
        playsInline
        onEnded={handleEnded}
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
