import { useEffect, useRef, useCallback } from "react";

const videos = [
  "/landscape/京都.mp4",
  "/landscape/寺.mp4",
  "/landscape/水.mp4",
  "/landscape/田.mp4",
  "/landscape/竹.mp4",
  "/landscape/親子.mp4",
  "/landscape/雪.mp4",
];

interface VideoBackgroundProps {
  overlayRef: React.RefObject<HTMLDivElement | null>;
}

export function VideoBackground({ overlayRef }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const indexRef = useRef(0);

  const handleEnded = useCallback(() => {
    indexRef.current = (indexRef.current + 1) % videos.length;
    const video = videoRef.current;
    if (!video) return;
    video.src = videos[indexRef.current];
    video.play();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.src = videos[0];
    video.play();
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <video
        ref={videoRef}
        muted
        playsInline
        onEnded={handleEnded}
        className="w-full h-full object-cover"
      />
      {/* 黒オーバーレイ（常時） */}
      <div className="absolute inset-0 bg-black/75" />
      {/* 白オーバーレイ（スクロールでopacity変化） */}
      <div
        ref={overlayRef}
        className="absolute inset-0 will-change-[opacity]"
        style={{ backgroundColor: "rgb(246,247,248)", opacity: 0 }}
      />
    </div>
  );
}
