"use client";

import { motion } from "framer-motion";

const svgPaths = {
  body: "M256.195 321.336C290.377 324.325 314.997 339.796 331.104 362.051C347.24 384.346 354.895 413.544 354.895 444.01C354.895 454.265 352.487 462.814 347.881 469.894C343.271 476.98 336.395 482.693 327.305 487.164C309.082 496.126 282.158 500.004 247.53 500.009C212.859 496.977 180.804 494.023 158.053 484.296C146.714 479.448 137.809 472.964 132.048 464.053C126.295 455.156 123.574 443.677 124.89 428.64C130.173 368.288 187.811 315.357 256.195 321.336Z",
  ahoge: "M248.085 316.079L251.31 319.373L251.092 321.863L262.548 322.866L262.679 321.371L262.355 319.335L263.115 316.39L264.329 313.987L267.037 311.714L270.244 309.485L271.501 306.584L271.676 304.592L271.894 302.101L272.155 299.112L270.381 296.448L267.199 292.656L268.388 296.273L268.17 298.764L266.913 301.665L264.702 303.981L262.081 305.258L260.045 305.582L257.057 305.32L254.566 305.102L252.032 305.383L249.454 306.161L247.829 307.524L246.615 309.928L246.354 312.916L248.085 316.079Z",
  handL: "M182.896 415.51C195.734 415.32 205.396 417.01 206.896 427.01C206.896 437.51 193.251 436.509 182.896 434.01",
  handR: "M253.896 420.51C243.806 423.521 235.396 427.01 237.896 434.01C239.396 442.01 248.024 442.521 257.396 442.01",
  cheekL: "M181.257 378.26C182.361 380.173 180.461 385.162 176.395 387.51C176.395 387.51 169.395 393.804 164.896 386.01C162.896 382.546 163.896 378.26 169.395 377.01C174.895 375.76 180.152 376.347 181.257 378.26Z",
  cheekR: "M316.897 395.01C314.831 398.597 305.332 397.693 302.928 395.01C298.896 390.51 298.366 387.597 300.433 384.01C302.499 380.422 307.896 380.51 313.904 383.01C319.396 385.295 318.964 391.422 316.897 395.01Z",
  mouth: "M233.396 387.01C233.396 389.01 231.5 389.51 230.396 389.51C230.396 389.51 227.896 389.01 227.896 387.01C227.896 385.629 229.291 384.51 230.396 384.51C231.5 384.51 233.396 385.629 233.396 387.01Z",
  eyeL: "M205.895 364.01C208.976 369.345 206.396 382.51 196.395 386.01C186.395 389.51 177.395 384.01 176.395 377.51C173.315 372.174 176.897 365.839 184.396 361.51C191.894 357.18 202.815 358.674 205.895 364.01Z",
  eyeR: "M303.895 388.51C299.277 396.51 288.894 396.839 281.396 392.51C273.897 388.18 271.315 379.345 274.396 374.01C277.476 368.674 289.397 364.68 296.896 369.01C307.396 375.072 306.976 383.174 303.895 388.51Z",
  letterBody: "M58.5 307L90.5 68L434.5 110L402 349L58.5 307Z",
  letterFlap: "M90.5 68L193.5 184.5L434.5 110",
};

export function AnimatedDeliveryCharacter() {
  return (
    <div className="relative size-full" data-name="手紙">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 547 574">
        <rect fill="transparent" height="574" width="547" />

        <motion.g
          id="character-wrapper"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* 体 */}
          <path d={svgPaths.body} fill="var(--fill-0, #F3F1EC)" stroke="var(--stroke-0, #4E3A3A)" strokeWidth="3" />

          {/* アホ毛 */}
          <motion.path
            d={svgPaths.ahoge}
            fill="var(--fill-0, #F3F1EC)"
            stroke="var(--stroke-0, #4E3A3A)"
            strokeWidth="3"
            animate={{ rotate: [0, 8, -4, 0] }}
            transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "262px 322px" }}
          />

          {/* 左手 */}
          <motion.path
            d={svgPaths.handL}
            stroke="var(--stroke-0, #4E3A3A)"
            strokeWidth="3"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 0.15, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* 右手 */}
          <motion.path
            d={svgPaths.handR}
            stroke="var(--stroke-0, #4E3A3A)"
            strokeWidth="3"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 0.15, repeat: Infinity, ease: "easeInOut", delay: 0.075 }}
          />

          {/* ほっぺ */}
          <path d={svgPaths.cheekL} fill="var(--fill-0, #FF1717)" />
          <path d={svgPaths.cheekR} fill="var(--fill-0, #FF1717)" />

          {/* 口 */}
          <path d={svgPaths.mouth} fill="var(--fill-0, #4E3A3A)" />

          {/* 目 */}
          <g clipPath="url(#clip0_delivery)">
            <path d={svgPaths.eyeL} fill="var(--fill-0, #4E3A3A)" />
            <path d={svgPaths.eyeR} fill="var(--fill-0, #4E3A3A)" />
          </g>

          {/* 手紙 */}
          <motion.g
            id="letter"
            animate={{ y: [0, -6, 0], rotate: [-1, 1, -1] }}
            transition={{
              y: { duration: 0.3, repeat: Infinity, ease: "easeInOut", delay: 0.05 },
              rotate: { duration: 0.6, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ transformOrigin: "246px 328px" }}
          >
            <motion.path
              d={svgPaths.letterBody}
              fill="var(--fill-0, #F7F7F7)"
              stroke="var(--stroke-0, #4E3A3A)"
              strokeWidth="3"
              animate={{ rotateX: [0, -8, 0] }}
              transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut", delay: 0.08 }}
              style={{ transformOrigin: "262px 89px" }}
            />
            <motion.path
              d={svgPaths.letterFlap}
              stroke="var(--stroke-0, #4E3A3A)"
              strokeWidth="3"
              animate={{ rotateX: [0, 45, 0] }}
              transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut", delay: 0.12 }}
              style={{ transformOrigin: "262px 89px" }}
            />
          </motion.g>
        </motion.g>

        <defs>
          <clipPath id="clip0_delivery">
            <rect fill="white" height="48" transform="translate(148 353)" width="189" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
