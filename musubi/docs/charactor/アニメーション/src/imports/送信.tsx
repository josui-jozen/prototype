import svgPaths from "./svg-baphil8kze";

export default function Component() {
  return (
    <div className="relative size-full" data-name="送信">
      <svg className="absolute block size-full overflow-visible" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 700 800">
        <g id="éä¿¡">
          <rect fill="white" height="800" width="700" />
          
          <g className="anim-char-send" style={{ transformOrigin: "350px 750px" }}>
            <path className="anim-inner-ahoge" style={{ transformOrigin: "350px 480px" }} d={svgPaths.p3642c100} fill="var(--fill-0, #F3F1EC)" id="ã¢ãæ¯" stroke="var(--stroke-0, #4E3A3A)" strokeWidth="3" />
            <g className="anim-inner-body" style={{ transformOrigin: "350px 700px" }}>
              <path d={svgPaths.p29cf2b00} fill="var(--fill-0, #F3F1EC)" id="ä½" stroke="var(--stroke-0, #4E3A3A)" strokeWidth="3" />
              <path d={svgPaths.p3d55ea80} fill="var(--fill-0, #FF1717)" id="å·¦éå" />
              <path d={svgPaths.p3db0000} fill="var(--fill-0, #FF1717)" id="å³éå" />
              <path d={svgPaths.p163d9000} fill="var(--fill-0, #4E3A3A)" id="å£" />
              <g clipPath="url(#clip0_1_209)" id="ç®(é)">
                <path d={svgPaths.p1944c300} fill="var(--fill-0, #4E3A3A)" id="å·¦ç®" />
                <path d={svgPaths.p6914800} fill="var(--fill-0, #4E3A3A)" id="å³ç®" />
              </g>
            </g>
            <path className="anim-inner-hand-r" style={{ transformOrigin: "475px 580px" }} d={svgPaths.p2cdd840} id="å³æ" stroke="var(--stroke-0, #4E3A3A)" strokeWidth="3" />
            <path className="anim-inner-hand-l" style={{ transformOrigin: "210px 590px" }} d={svgPaths.p3e1c8900} id="å·¦æ" stroke="var(--stroke-0, #4E3A3A)" strokeWidth="3" />
          </g>

          <g className="anim-letter-bounce" id="æç´">
            <path d={svgPaths.p5dd7500} fill="var(--fill-0, #F7F7F7)" id="æç´ä¸é¨" stroke="var(--stroke-0, #4E3A3A)" strokeWidth="3" />
            <path className="anim-letter-top" style={{ transformOrigin: "350px 450px" }} d={svgPaths.p3d0a3cc0} id="æç´ä¸é¨" stroke="var(--stroke-0, #4E3A3A)" strokeWidth="3" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_209">
            <rect fill="white" height="48" transform="translate(237 631)" width="189" />
          </clipPath>
          <clipPath id="clip1_1_209">
            <rect fill="white" height="308" transform="translate(147 331)" width="405" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}