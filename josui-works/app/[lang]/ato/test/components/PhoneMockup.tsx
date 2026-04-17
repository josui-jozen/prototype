// iPhone 16 frame asset: 453x912 (includes 30px shadow overflow on all sides)
// Inner screen area: 393x852 at offset (30, 30)

export function PhoneMockup({
  children,
  className = "",
}: {
  children: React.ReactNode;
  isDark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: 393, height: 852 }}
    >
      {/* Screen content extended under bezel to eliminate gap */}
      <div
        className="absolute overflow-hidden"
        style={{ top: -6, left: -6, right: -6, bottom: -6, borderRadius: 62 }}
      >
        <div className="relative w-full h-full">{children}</div>
      </div>
      {/* iPhone 16 frame (always on top) */}
      <img
        src="/bezel/iphone16.png"
        alt=""
        aria-hidden="true"
        className="absolute pointer-events-none max-w-none z-50"
        style={{ top: -30, left: -30, width: 453, height: 912 }}
      />
    </div>
  );
}
