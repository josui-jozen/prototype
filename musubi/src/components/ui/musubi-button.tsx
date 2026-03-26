"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const openPaths = {
  p18ed5000:
    "M311.895 195.51C307.277 203.51 296.894 203.839 289.396 199.51C281.897 195.18 279.315 186.345 282.396 181.01C285.476 175.674 297.397 171.68 304.896 176.01C315.396 182.072 314.976 190.174 311.895 195.51Z",
  pf0f8700:
    "M213.895 171.01C216.976 176.345 214.396 189.51 204.395 193.01C194.395 196.51 185.395 191.01 184.395 184.51C181.315 179.174 184.897 172.839 192.396 168.51C199.894 164.18 210.815 165.674 213.895 171.01Z",
};

const paths = {
  mouth:
    "M241.396 194.01C241.396 196.01 239.5 196.51 238.396 196.51C238.396 196.51 235.896 196.01 235.896 194.01C235.896 192.629 237.291 191.51 238.396 191.51C239.5 191.51 241.396 192.629 241.396 194.01Z",
  closedEyeL:
    "M220.5 181.752C220.709 182.866 208.904 185.688 198.461 186.965C188.019 188.242 184.832 187.482 187 186C186.791 184.886 190.76 183.111 199.391 181.752C208.021 180.394 220.291 180.638 220.5 181.752Z",
  cheekL:
    "M189.257 185.26C190.361 187.173 188.461 192.162 184.395 194.51C184.395 194.51 177.395 200.804 172.896 193.01C170.896 189.546 171.896 185.26 177.395 184.01C182.895 182.76 188.152 183.347 189.257 185.26Z",
  closedEyeR:
    "M310.501 193.403C310.033 195.151 301.229 193.903 292.865 191.662C284.502 189.421 278.398 186.495 278.71 185.329C279.022 184.163 287.543 184.536 295.907 186.777C307.618 189.915 310.814 192.237 310.501 193.403Z",
  ahoge:
    "M256.085 123.079L259.31 126.373L259.092 128.863L270.548 129.866L270.679 128.371L270.355 126.335L271.115 123.39L272.329 120.987L275.037 118.714L278.244 116.485L279.501 113.584L279.676 111.592L279.894 109.101L280.155 106.112L278.381 103.448L275.199 99.656L276.388 103.273L276.17 105.764L274.913 108.665L272.702 110.981L270.081 112.258L268.045 112.582L265.057 112.32L262.566 112.102L260.032 112.383L257.454 113.161L255.829 114.524L254.615 116.928L254.354 119.916L256.085 123.079Z",
  handR:
    "M261.896 227.51C251.806 230.521 243.396 234.01 245.896 241.01C247.396 249.01 256.024 249.521 265.396 249.01",
  cheekR:
    "M324.897 202.01C322.831 205.597 313.332 204.693 310.928 202.01C306.896 197.51 306.366 194.597 308.433 191.01C310.499 187.422 315.896 187.51 321.904 190.01C327.396 192.295 326.964 198.422 324.897 202.01Z",
  body: "M264.195 128.336C298.377 131.325 322.997 146.796 339.104 169.051C355.24 191.346 362.895 220.544 362.895 251.01C362.895 261.265 360.487 269.814 355.881 276.894C351.271 283.98 344.395 289.693 335.305 294.164C317.082 303.126 290.158 307.004 255.53 307.009C220.859 303.977 188.804 301.023 166.053 291.296C154.714 286.448 145.809 279.964 140.048 271.053C134.295 262.156 131.574 250.677 132.89 235.64C138.173 175.288 195.811 122.357 264.195 128.336Z",
  handL:
    "M190.896 222.51C203.734 222.32 213.396 224.01 214.896 234.01C214.896 244.51 201.251 243.509 190.896 241.01",
};

function MusubiSvg({
  isBlinking,
  isInteracting,
}: {
  isBlinking: boolean;
  isInteracting: boolean;
}) {
  return (
    <svg
      className="overflow-visible w-full h-auto"
      fill="none"
      viewBox="0 0 522 416"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* アホ毛 */}
      <motion.path
        d={paths.ahoge}
        fill="#FFFBFB"
        stroke="#4E3A3A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ originX: 0.63, originY: 1 }}
        animate={{
          rotate: isInteracting ? [-25, 30, -25] : [-4, 8, -4],
        }}
        transition={{
          duration: isInteracting ? 0.12 : 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: isInteracting ? 0 : 0.4,
        }}
      />
      {/* 体 */}
      <path
        d={paths.body}
        fill="#F3F1EC"
        stroke="#4E3A3A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 左手 */}
      <motion.path
        d={paths.handL}
        stroke="#4E3A3A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ originX: 0, originY: 0.5 }}
        animate={{
          rotate: isInteracting ? [-15, 10, -15] : [-4, 6, -2],
        }}
        transition={{
          duration: isInteracting ? 0.2 : 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* 右手 */}
      <motion.path
        d={paths.handR}
        stroke="#4E3A3A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ originX: 1, originY: 0.5 }}
        animate={{
          rotate: isInteracting ? [25, -30, 25] : [4, -8, 4],
        }}
        transition={{
          duration: isInteracting ? 0.12 : 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* ほっぺ */}
      <path d={paths.cheekL} fill="#FF1717" />
      <path d={paths.cheekR} fill="#FF1717" />
      {/* 口 */}
      <path d={paths.mouth} fill="#4E3A3A" />
      {/* 目 */}
      {isBlinking ? (
        <>
          <path d={paths.closedEyeL} fill="#4E3A3A" />
          <path d={paths.closedEyeR} fill="#4E3A3A" />
        </>
      ) : (
        <>
          <path d={openPaths.pf0f8700} fill="#4E3A3A" />
          <path d={openPaths.p18ed5000} fill="#4E3A3A" />
        </>
      )}
    </svg>
  );
}

export function MusubiButton({
  size = 80,
  onClick,
}: {
  size?: number;
  onClick?: () => void;
}) {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const blink = () => {
      if (!isInteracting) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
      timeoutId = setTimeout(blink, Math.random() * 3000 + 2000);
    };
    timeoutId = setTimeout(blink, 2000);
    return () => clearTimeout(timeoutId);
  }, [isInteracting]);

  return (
    <motion.button
      onClick={onClick}
      onPointerDown={() => {
        setIsInteracting(true);
        setIsBlinking(true);
      }}
      onPointerUp={() => {
        setIsInteracting(false);
        setIsBlinking(false);
      }}
      onPointerCancel={() => {
        setIsInteracting(false);
        setIsBlinking(false);
      }}
      className="cursor-pointer"
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scaleX: 1.25, scaleY: 0.75 }}
      transition={{ type: "spring", stiffness: 350, damping: 8, mass: 1.5 }}
    >
      <motion.div
        className="w-full h-full origin-bottom"
        animate={{
          scaleY: [1, 1.03, 1],
          scaleX: [1, 0.98, 1],
          y: [0, -3, 0],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <MusubiSvg isBlinking={isBlinking} isInteracting={isInteracting} />
      </motion.div>
    </motion.button>
  );
}
