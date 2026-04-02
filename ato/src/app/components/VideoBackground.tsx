interface VideoBackgroundProps {
  overlayRef: React.RefObject<HTMLDivElement | null>;
}

export function VideoBackground({ overlayRef }: VideoBackgroundProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-dvh -z-10 bg-black">
      <video
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
