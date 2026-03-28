import { useRef, useEffect, useState } from "react";

/** むすび本体がコンテナ幅に対して占める割合 */
const TARGET_BODY_RATIO = 0.4;

type Props = {
  /** キャンバスの内部幅 (px) — bboxで切り詰めた値 */
  canvasWidth: number;
  /** キャンバスの内部高さ (px) — bboxで切り詰めた値 */
  canvasHeight: number;
  /** むすび本体の幅 (canvas座標系, px)。指定するとキャラ体サイズが統一される */
  bodyWidth?: number;
  /** data-name属性 */
  name: string;
  children: React.ReactNode;
};

export default function CharacterBase({ canvasWidth, canvasHeight, bodyWidth, name, children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const fitScale = Math.min(el.clientWidth / canvasWidth, el.clientHeight / canvasHeight);
      if (bodyWidth) {
        const targetBodyPx = el.clientWidth * TARGET_BODY_RATIO;
        const bodyScale = targetBodyPx / bodyWidth;
        setScale(Math.min(bodyScale, fitScale));
      } else {
        setScale(fitScale);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [canvasWidth, canvasHeight, bodyWidth]);

  return (
    <div
      ref={containerRef}
      className="relative size-full overflow-hidden flex items-end justify-center"
      data-name={name}
    >
      <div
        className="relative shrink-0"
        style={{
          width: canvasWidth,
          height: canvasHeight,
          transform: `scale(${scale})`,
          transformOrigin: "bottom center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
