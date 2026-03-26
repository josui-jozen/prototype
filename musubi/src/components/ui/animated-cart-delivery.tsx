"use client";

import { motion } from "framer-motion";

const svgPaths = {
  // キャラ
  mouth: "M115.396 112.01C115.396 114.01 113.5 114.51 112.396 114.51C112.396 114.51 109.896 114.01 109.896 112.01C109.896 110.629 111.291 109.51 112.396 109.51C113.5 109.51 115.396 110.629 115.396 112.01Z",
  body: "M138.195 46.336C172.377 49.325 196.997 64.7962 213.104 87.051C229.24 109.346 236.895 138.544 236.895 169.01C236.895 179.265 234.487 187.814 229.881 194.894C225.271 201.98 218.395 207.693 209.305 212.164C191.082 221.126 164.158 225.004 129.53 225.009C94.8587 221.977 62.8037 219.023 40.0532 209.296C28.7136 204.448 19.8086 197.964 14.0476 189.053C8.29526 180.156 5.5737 168.677 6.89002 153.64C12.1732 93.2884 69.8107 40.3565 138.195 46.336Z",
  ahoge: "M130.085 41.0792L133.31 44.3728L133.092 46.8633L144.548 47.8656L144.679 46.3713L144.355 44.3353L145.115 41.3903L146.329 38.987L149.037 36.7144L152.244 34.4854L153.501 31.5839L153.676 29.5916L153.894 27.1011L154.155 24.1125L152.381 21.4477L149.199 17.656L150.388 21.2734L150.17 23.7639L148.913 26.6653L146.702 28.9815L144.081 30.2579L142.045 30.5817L139.057 30.3202L136.566 30.1023L134.032 30.3825L131.454 31.1608L129.829 32.5244L128.615 34.9277L128.354 37.9163L130.085 41.0792Z",
  cheekL: "M63.2567 103.26C64.3612 105.173 62.461 110.162 58.3955 112.51C58.3955 112.51 51.3955 118.804 46.8955 111.01C44.8955 107.546 45.8955 103.26 51.3955 102.01C56.8954 100.76 62.1521 101.347 63.2567 103.26Z",
  cheekR: "M198.897 120.01C196.831 123.597 187.332 122.693 184.928 120.01C180.896 115.51 180.366 112.597 182.433 109.01C184.499 105.422 189.896 105.51 195.904 108.01C201.396 110.295 200.964 116.422 198.897 120.01Z",
  eyeL: "M87.8955 89.0096C90.976 94.3452 88.3955 107.51 78.3955 111.01C68.3955 114.51 59.3955 109.01 58.3955 102.51C55.315 97.1741 58.8967 90.8391 66.3955 86.5096C73.8943 82.1802 84.815 83.6741 87.8955 89.0096Z",
  eyeR: "M185.895 113.51C181.277 121.51 170.894 121.839 163.396 117.51C155.897 113.18 153.315 104.345 156.396 99.0097C159.476 93.6741 171.397 89.6802 178.896 94.0096C189.396 100.072 188.976 108.174 185.895 113.51Z",
  handR: "M150.222 136.031C147.786 146.274 146.601 155.303 153.914 156.638C161.592 159.338 166.349 152.122 170.592 143.75",
  handL: "M65.846 123.002C68.262 135.613 68.2758 145.421 58.6882 148.635C48.3477 150.458 46.964 136.847 47.627 126.215",
  // 荷車
  wheelBack: "M475.5 271.5C514.722 271.5 546.5 302.626 546.5 341C546.5 379.374 514.722 410.5 475.5 410.5C436.278 410.5 404.5 379.374 404.5 341C404.5 302.626 436.278 271.5 475.5 271.5Z",
  wheelOuter: "M66.0084 104.347L58.1092 123.333L51 141.529V158.142L53.3697 178.711L58.1092 194.533L66.0084 210.356L78.6471 223.013L92.0756 230.133L107.084 237.253L122.092 242H141.84H160.008L176.597 239.627L210.563 223.013L228.731 200.071L239 166.844V141.529L235.84 128.08L228.731 113.049L220.042 100.391L210.563 88.5244L202.664 79.8222L187.655 71.12L172.647 66.3733L156.059 64L138.681 66.3733H122.092L102.345 73.4933L88.1261 79.8222L74.6975 92.48L66.0084 104.347Z",
  wheelInner: "M83.7353 114.507L77.5588 129.333L72 143.542V156.516L73.8529 172.578L77.5588 184.933L83.7353 197.289L93.6176 207.173L104.118 212.733L115.853 218.293L122.092 222H141.84H157.235L170.206 220.147L196.765 207.173L210.971 189.258L219 163.311V141.529L216.529 128.08L210.971 113.049L204.176 100.391L196.765 88.5244L190.588 79.8222L178.853 71.12L167.118 66.3733L154.147 64L140.559 66.3733H127.588L112.147 73.4933L101.029 79.8222L88.1261 92.48L83.7353 114.507Z",
  wheelSpokeFill: "M136.74 141.622L138.895 90.0363L153.26 88V94.1088V132.119L148.232 145.694L153.26 147.731L198.508 105.648L210 120.58L187.017 136.87L159.006 154.518L184.144 170.808L210 183.026L200.663 196.601L167.624 183.026L156.851 170.808L148.232 165.378L144.641 219H136.74V212.891V162.663H130.276L90.7735 193.207L83.5912 183.026L121.657 157.912L126.685 151.803L80 125.332L90.7735 111.756L130.276 141.622H136.74Z",
  wheelSpokeStroke: "M148.232 145.694L153.26 147.731L198.508 105.648L210 120.58L187.017 136.87L159.006 154.518L184.144 170.808L210 183.026L200.663 196.601L167.624 183.026L156.851 170.808L148.232 165.378L144.641 219H136.74V212.891V162.663H130.276L90.7735 193.207L83.5912 183.026L121.657 157.912L126.685 151.803L80 125.332L90.7735 111.756L130.276 141.622H136.74L138.895 90.0363L153.26 88V94.1088V132.119L148.232 145.694ZM148.232 145.694L138.895 141.622L130.276 145.694V154.518L133.149 160.627L148.232 162.663L153.26 160.627V152.837",
  cartBody: "M23.0522 100.937L18.367 73.9831L240.02 20.6906L242.006 154.341L49.0536 188.507L45.3525 184.162L35.6318 147.884L27.0548 115.874L23.0522 100.937Z",
  cartSide: "M14.6415 73.5891L12.1554 64.3107L35.8096 58.5941L71.437 49.0478L150.117 27.3441L187.104 16.8117L219.097 8.86084L239.272 5.31961L243.001 19.2372L228.599 23.0964L177.189 34.3854L82.2803 59.1946L62.5716 64.4755L45.1369 69.1471L33.0085 72.3969L19.364 76.053L15.5738 77.0685L14.6415 73.5891Z",
  // 手紙
  letterBody: "M0.5 254L32.5 15L376.5 57L344 296L0.5 254Z",
  letterFlap: "M32.5 15L135.5 131.5L376.5 57",
};

function Letter({ delayBase = 0 }: { delayBase?: number }) {
  return (
    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 405 308">
      <motion.path
        d={svgPaths.letterBody}
        fill="var(--fill-0, #F7F7F7)"
        stroke="var(--stroke-0, #4E3A3A)"
        strokeWidth="3"
        animate={{ rotateX: [0, -8, 0] }}
        transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut", delay: delayBase + 0.05 }}
        style={{ transformOrigin: "204px 36px" }}
      />
      <motion.path
        d={svgPaths.letterFlap}
        stroke="var(--stroke-0, #4E3A3A)"
        strokeWidth="3"
        animate={{ rotateX: [0, 45, 0] }}
        transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut", delay: delayBase + 0.1 }}
        style={{ transformOrigin: "204px 36px" }}
      />
    </svg>
  );
}

function Cart() {
  return (
    <div className="absolute h-[278px] left-[485px] top-[376px] w-[314px]" data-name="大八車">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 314 278">
        <g clipPath="url(#clip-cart-main)" id="大八車_全体">
          <path d={svgPaths.wheelBack} fill="var(--fill-0, #D9D9D9)" stroke="var(--stroke-0, black)" />
          <motion.g
            id="荷台"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <g clipPath="url(#clip-cart-sub)">
              <rect fill="var(--fill-0, #37150D)" height="113.485" stroke="var(--stroke-0, black)" transform="rotate(-8 28.5647 76.4255)" width="6.40356" x="28.5647" y="76.4255" />
              <path d={svgPaths.cartBody} fill="var(--fill-0, #B47D56)" stroke="var(--stroke-0, #37150D)" strokeWidth="3" />
              <path d="M214 85.5L232 78" stroke="var(--stroke-0, #37150D)" strokeWidth="3" />
              <path d="M142.5 57.5L218 39.5" stroke="var(--stroke-0, #37150D)" strokeWidth="1.5" />
              <path d="M36.5 88L54 78.5" stroke="var(--stroke-0, #37150D)" strokeWidth="1.5" />
              <path d={svgPaths.cartSide} fill="var(--fill-0, #B47D56)" stroke="var(--stroke-0, #37150D)" strokeWidth="3" />
              <path d="M151 35L163 30L174 25.5L180 23" stroke="var(--stroke-0, #37150D)" strokeWidth="1.5" />
              <path d="M116 43L130 37L138 34" stroke="var(--stroke-0, #37150D)" strokeWidth="1.5" />
              <path d="M72.5 57L88.5 52.5L94.5 49" stroke="var(--stroke-0, #37150D)" strokeWidth="1.5" />
              <path d="M27 65.5C35.4 64.3 42.5 61.3333 45 60" stroke="var(--stroke-0, #37150D)" strokeWidth="1.5" />
              <path d="M33 107L66 98.5" stroke="var(--stroke-0, #37150D)" strokeWidth="3" />
              <path d="M193 71L231 61.5L44 109" stroke="var(--stroke-0, #37150D)" strokeWidth="3" />
              <path d="M36.5 134.5L53.5 128" stroke="var(--stroke-0, #37150D)" strokeWidth="3" />
              <rect fill="var(--fill-0, #37150D)" height="114.982" transform="rotate(-15 17.5654 77.528)" width="15.2509" x="17.5654" y="77.528" />
            </g>
          </motion.g>
          <motion.g
            id="車輪"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "145px 153px" }}
          >
            <path d={svgPaths.wheelOuter} fill="var(--fill-0, #B47D56)" stroke="var(--stroke-0, #37150D)" strokeWidth="6" />
            <path d={svgPaths.wheelInner} fill="var(--fill-0, #B47D56)" stroke="var(--stroke-0, #37150D)" strokeWidth="3" />
            <g>
              <path d={svgPaths.wheelSpokeFill} fill="var(--fill-0, #B47D56)" />
              <path d={svgPaths.wheelSpokeStroke} stroke="var(--stroke-0, #37150D)" strokeWidth="3" />
            </g>
          </motion.g>
        </g>
        <defs>
          <clipPath id="clip-cart-main">
            <rect fill="white" height="278" width="314" />
          </clipPath>
          <clipPath id="clip-cart-sub">
            <rect fill="white" height="191" transform="translate(12 3)" width="244" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Character() {
  return (
    <motion.div
      className="absolute h-[243px] left-[299px] top-[407px] w-[249px]"
      data-name="キャラ"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut", delay: 0.05 }}
    >
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 249 243">
        <g clipPath="url(#clip-char-main)">
          <motion.path
            d={svgPaths.ahoge}
            fill="var(--fill-0, #F3F1EC)"
            stroke="var(--stroke-0, #4E3A3A)"
            strokeWidth="3"
            animate={{ rotate: [0, 10, -5, 0] }}
            transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "145px 47px" }}
          />
          <path d={svgPaths.body} fill="var(--fill-0, #F3F1EC)" stroke="var(--stroke-0, #4E3A3A)" strokeWidth="3" />
          <path d={svgPaths.cheekL} fill="var(--fill-0, #FF1717)" />
          <path d={svgPaths.cheekR} fill="var(--fill-0, #FF1717)" />
          <path d={svgPaths.mouth} fill="var(--fill-0, #4E3A3A)" />
          <g clipPath="url(#clip-char-eyes)">
            <path d={svgPaths.eyeL} fill="var(--fill-0, #4E3A3A)" />
            <path d={svgPaths.eyeR} fill="var(--fill-0, #4E3A3A)" />
          </g>
          <g>
            <line stroke="var(--stroke-0, #37150D)" strokeWidth="6" x1="9.29392" x2="202.294" y1="146.014" y2="165.014" />
            <line stroke="var(--stroke-0, #37150D)" strokeWidth="6" x1="201.24" x2="236.24" y1="165.098" y2="155.938" />
          </g>
          <motion.path
            d={svgPaths.handR}
            stroke="var(--stroke-0, #4E3A3A)"
            strokeWidth="3"
            animate={{ y: [0, -3, 0], x: [0, 4, 0] }}
            transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
          />
          <motion.path
            d={svgPaths.handL}
            stroke="var(--stroke-0, #4E3A3A)"
            strokeWidth="3"
            animate={{ y: [0, -3, 0], x: [0, 4, 0] }}
            transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
          />
        </g>
        <defs>
          <clipPath id="clip-char-main">
            <rect fill="white" height="243" width="249" />
          </clipPath>
          <clipPath id="clip-char-eyes">
            <rect fill="white" height="48" transform="translate(30 78)" width="189" />
          </clipPath>
        </defs>
      </svg>
    </motion.div>
  );
}

// SVG viewBox版（小さいコンテナでも正しく表示）
export function AnimatedCartDeliveryMini() {
  return (
    <div className="relative size-full">
      <svg className="block size-full" fill="none" viewBox="290 370 520 290">
        {/* 荷車 */}
        <g transform="translate(485, 376)">
          <g clipPath="url(#clip-mini-cart)">
            <path d={svgPaths.wheelBack} fill="#D9D9D9" stroke="black" />
            <motion.g
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <g clipPath="url(#clip-mini-cart-sub)">
                <rect fill="#37150D" height="113.485" stroke="black" transform="rotate(-8 28.5647 76.4255)" width="6.40356" x="28.5647" y="76.4255" />
                <path d={svgPaths.cartBody} fill="#B47D56" stroke="#37150D" strokeWidth="3" />
                <path d={svgPaths.cartSide} fill="#B47D56" stroke="#37150D" strokeWidth="3" />
                <rect fill="#37150D" height="114.982" transform="rotate(-15 17.5654 77.528)" width="15.2509" x="17.5654" y="77.528" />
              </g>
            </motion.g>
            <motion.g
              animate={{ rotate: -360 }}
              transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "145px 153px" }}
            >
              <path d={svgPaths.wheelOuter} fill="#B47D56" stroke="#37150D" strokeWidth="6" />
              <path d={svgPaths.wheelInner} fill="#B47D56" stroke="#37150D" strokeWidth="3" />
              <g>
                <path d={svgPaths.wheelSpokeFill} fill="#B47D56" />
                <path d={svgPaths.wheelSpokeStroke} stroke="#37150D" strokeWidth="3" />
              </g>
            </motion.g>
          </g>
          <defs>
            <clipPath id="clip-mini-cart">
              <rect fill="white" height="278" width="314" />
            </clipPath>
            <clipPath id="clip-mini-cart-sub">
              <rect fill="white" height="191" transform="translate(12 3)" width="244" />
            </clipPath>
          </defs>
        </g>

        {/* キャラ */}
        <g transform="translate(299, 407)">
        <motion.g
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut", delay: 0.025 }}
        >
          <motion.path
            d={svgPaths.ahoge}
            fill="#F3F1EC"
            stroke="#4E3A3A"
            strokeWidth="3"
            animate={{ rotate: [0, 10, -5, 0] }}
            transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "145px 47px" }}
          />
          <path d={svgPaths.body} fill="#F3F1EC" stroke="#4E3A3A" strokeWidth="3" />
          <path d={svgPaths.cheekL} fill="#FF1717" />
          <path d={svgPaths.cheekR} fill="#FF1717" />
          <path d={svgPaths.mouth} fill="#4E3A3A" />
          <path d={svgPaths.eyeL} fill="#4E3A3A" />
          <path d={svgPaths.eyeR} fill="#4E3A3A" />
          <g>
            <line stroke="#37150D" strokeWidth="6" x1="9.29392" x2="202.294" y1="146.014" y2="165.014" />
            <line stroke="#37150D" strokeWidth="6" x1="201.24" x2="236.24" y1="165.098" y2="155.938" />
          </g>
          <motion.path d={svgPaths.handR} stroke="#4E3A3A" strokeWidth="3" animate={{ y: [0, -3, 0], x: [0, 4, 0] }} transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut", delay: 0.05 }} />
          <motion.path d={svgPaths.handL} stroke="#4E3A3A" strokeWidth="3" animate={{ y: [0, -3, 0], x: [0, 4, 0] }} transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut", delay: 0.075 }} />
        </motion.g>
        </g>
      </svg>
    </div>
  );
}

export function AnimatedCartDelivery({ compact = false }: { compact?: boolean } = {}) {
  const scale = compact ? "scale-[0.06]" : "scale-[0.4] sm:scale-75 md:scale-90 lg:scale-100";
  return (
    <div className="relative size-full flex items-center justify-center" data-name="返信">
      <div className={`relative h-[800px] w-[1100px] ${scale}`}>
        <motion.div
          className="absolute flex h-[469px] items-center justify-center left-[382px] top-[44px] w-[504px]"
          animate={{ y: [0, -18, 0], rotate: [-2, 1, -2] }}
          transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
        >
          <div className="-rotate-30 flex-none w-[405px] h-[308px] relative">
            <Letter delayBase={0.1} />
          </div>
        </motion.div>
        <motion.div
          className="absolute flex h-[496px] items-center justify-center left-[373px] top-[44px] w-[508px]"
          animate={{ y: [0, -22, 0], rotate: [1, -1, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
          <div className="-rotate-40 flex-none w-[405px] h-[308px] relative">
            <Letter delayBase={0.2} />
          </div>
        </motion.div>
        <Cart />
        <Character />
      </div>
    </div>
  );
}
