import { useRef, useEffect, useState } from "react";
import svgPaths from "./svg-kx2jqb1vb8";

function CartStatic() {
  return (
    <div className="absolute h-[278px] left-[244px] top-[522px] w-[314px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 314 278">
        <g clipPath="url(#clip0_rest_cart)">
          <path d={svgPaths.p3cd70500} fill="var(--fill-0, #D9D9D9)" stroke="var(--stroke-0, black)" />
          <g clipPath="url(#clip1_rest_cart)">
            <rect fill="var(--fill-0, #37150D)" height="113.485" stroke="var(--stroke-0, black)" transform="rotate(22 53.7276 26.6653)" width="6.40355" x="53.7276" y="26.6653" />
            <path d={svgPaths.p1d6bd000} fill="var(--fill-0, #B47D56)" stroke="var(--stroke-0, #37150D)" strokeWidth="3" />
            <path d={svgPaths.p16d86780} stroke="var(--stroke-0, #37150D)" strokeWidth="3" />
            <path d={svgPaths.pb879680} stroke="var(--stroke-0, #37150D)" strokeWidth="1.5" />
            <path d={svgPaths.p2e62ea80} stroke="var(--stroke-0, #37150D)" strokeWidth="1.5" />
            <path d={svgPaths.p3b0aa400} fill="var(--fill-0, #B47D56)" stroke="var(--stroke-0, #37150D)" strokeWidth="3" />
            <path d={svgPaths.p2f5a26c0} stroke="var(--stroke-0, #37150D)" strokeWidth="1.5" />
            <path d={svgPaths.p12dbd980} stroke="var(--stroke-0, #37150D)" strokeWidth="1.5" />
            <path d={svgPaths.p3f201fc0} stroke="var(--stroke-0, #37150D)" strokeWidth="1.5" />
            <path d={svgPaths.p1bb9d140} stroke="var(--stroke-0, #37150D)" strokeWidth="1.5" />
            <path d={svgPaths.p35aa1800} stroke="var(--stroke-0, #37150D)" strokeWidth="3" />
            <path d={svgPaths.p3a274180} stroke="var(--stroke-0, #37150D)" strokeWidth="3" />
            <path d={svgPaths.p1b5c0280} stroke="var(--stroke-0, #37150D)" strokeWidth="3" />
            <rect fill="var(--fill-0, #37150D)" height="114.982" transform="rotate(15 43.6507 22.1204)" width="15.2509" x="43.6507" y="22.1204" />
          </g>
          <g>
            <path d={svgPaths.p392c4800} fill="var(--fill-0, #B47D56)" stroke="var(--stroke-0, #37150D)" strokeWidth="6" />
            <path d={svgPaths.p1ffaf940} fill="var(--fill-0, #B47D56)" stroke="var(--stroke-0, #37150D)" strokeWidth="3" />
            <g>
              <path d={svgPaths.p11cbc00} fill="var(--fill-0, #B47D56)" />
              <path d={svgPaths.p1db6fa40} stroke="var(--stroke-0, #37150D)" strokeWidth="3" />
            </g>
          </g>
        </g>
        <defs>
          <clipPath id="clip0_rest_cart">
            <rect fill="white" height="278" width="314" />
          </clipPath>
          <clipPath id="clip1_rest_cart">
            <rect fill="white" height="191" transform="translate(76.0949 -45.2054) rotate(30)" width="244" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Character() {
  return (
    <div className="absolute h-[243px] left-[141px] top-[553px] w-[249px] anim-char-rest">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 249 243">
        <g>
          <path className="anim-inner-ahoge" style={{ transformOrigin: "90px 40px" }} d={svgPaths.p3c426e00} fill="var(--fill-0, #F3F1EC)" stroke="var(--stroke-0, #4E3A3A)" strokeWidth="3" />
          <g className="anim-inner-body" style={{ transformOrigin: "124px 200px" }}>
            <path d={svgPaths.p122a4580} fill="var(--fill-0, #F3F1EC)" stroke="var(--stroke-0, #4E3A3A)" strokeWidth="3" />
            <path d={svgPaths.p274af00} fill="var(--fill-0, #FF1717)" />
            <path d={svgPaths.p2bd3a600} fill="var(--fill-0, #FF1717)" />
            <path d={svgPaths.p107ddc00} fill="var(--fill-0, #4E3A3A)" />
            <g>
              <path d={svgPaths.p2daeca80} fill="var(--fill-0, #4E3A3A)" />
              <path d={svgPaths.pf16400} fill="var(--fill-0, #4E3A3A)" />
            </g>
          </g>
          <path className="anim-inner-hand-r" style={{ transformOrigin: "140px 140px" }} d={svgPaths.p21997180} stroke="var(--stroke-0, #4E3A3A)" strokeWidth="3" />
          <path className="anim-inner-hand-l" style={{ transformOrigin: "40px 140px" }} d={svgPaths.pbf21500} stroke="var(--stroke-0, #4E3A3A)" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

export default function Component() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      setScale(Math.min(el.clientWidth / 700, el.clientHeight / 800));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative size-full overflow-hidden" data-name="やすみ">
      <div
        className="w-[700px] h-[800px] origin-top-left relative"
        style={{ transform: `scale(${scale})` }}
      >
        <CartStatic />
        <Character />
      </div>
    </div>
  );
}
