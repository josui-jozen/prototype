import svgPaths from "./svg-ny7sqlqhy6";
import CharacterBase from "./CharacterBase";

export default function Component({ fit }: { fit?: boolean }) {
  return (
    <CharacterBase canvasWidth={260} canvasHeight={237} bodyWidth={fit ? undefined : 230} name="通常">
      <svg className="absolute inset-0 block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="185 556 260 237">
        <g id="éå¸¸">
          <path className="anim-inner-ahoge" style={{ transformOrigin: "350px 480px" }} d={svgPaths.pe960bc0} fill="var(--fill-0, #F3F1EC)" id="ã¢ãæ¯" stroke="var(--stroke-0, #4E3A3A)" strokeWidth="3" />
          <g className="anim-inner-body" style={{ transformOrigin: "350px 700px" }}>
            <path d={svgPaths.p36ccb880} fill="var(--fill-0, #F3F1EC)" id="ä½" stroke="var(--stroke-0, #4E3A3A)" strokeWidth="3" />
            <path d={svgPaths.p14bf700} fill="var(--fill-0, #FF1717)" id="å·¦éå" />
            <path d={svgPaths.p311bc880} fill="var(--fill-0, #FF1717)" id="å³éå" />
            <path d={svgPaths.p28e5d3c0} fill="var(--fill-0, #4E3A3A)" id="å£" />
            <g clipPath="url(#clip0_1_224)" id="ç®(é)" className="anim-blink">
              <path d={svgPaths.p3db98b00} fill="var(--fill-0, #4E3A3A)" id="å·¦ç®" />
              <path d={svgPaths.p193f5fc0} fill="var(--fill-0, #4E3A3A)" id="å³ç®" />
            </g>
          </g>
          <path className="anim-inner-hand-r" style={{ transformOrigin: "475px 580px" }} d={svgPaths.p376c8300} id="å³æ" stroke="var(--stroke-0, #4E3A3A)" strokeWidth="3" />
          <path className="anim-inner-hand-l" style={{ transformOrigin: "210px 590px" }} d={svgPaths.p10416b80} id="å·¦æ" stroke="var(--stroke-0, #4E3A3A)" strokeWidth="3" />
        </g>
        <defs>
          <clipPath id="clip0_1_224">
            <rect fill="white" height="48" transform="translate(223 631)" width="189" />
          </clipPath>
        </defs>
      </svg>
    </CharacterBase>
  );
}
