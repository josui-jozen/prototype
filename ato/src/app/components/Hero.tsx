import { motion } from 'motion/react';

export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center pt-40 pb-32 px-6 w-full ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col md:flex-row items-center justify-between w-full gap-24 md:gap-16"
      >
        {/* Left Side: Text */}
        <div className="flex-1 flex justify-center md:justify-start">
          <h1 className="text-[7rem] leading-[1.1] md:text-[9rem] tracking-widest text-ato-text font-medium whitespace-nowrap">
            <span className="block mb-4">和文</span>
            <span className="block">組版</span>
          </h1>
        </div>

        {/* Center: Multiply Sign */}
        <div className="text-7xl md:text-8xl text-ato-text font-light hidden md:block">
          ×
        </div>
        <div className="text-6xl text-ato-text font-light md:hidden">
          ×
        </div>

        {/* Right Side: Icons Group */}
        <div className="flex-1 relative flex justify-center md:justify-end min-h-[250px] w-full max-w-[300px]">
          {/* Sparkle/Burst Shape */}
          <svg
            className="absolute top-8 -right-8 md:-right-12 w-48 h-48 md:w-64 md:h-64 text-ato-accent z-0"
            viewBox="0 0 100 100"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M50 5 L53 38 L83 17 L62 45 L95 50 L62 55 L83 83 L53 62 L50 95 L47 62 L17 83 L38 55 L5 50 L38 45 L17 17 L47 38 Z" />
          </svg>

          {/* Markdown Icon Box */}
          <div className="absolute top-0 right-12 md:right-24 bg-ato-surface border-4 border-ato-text rounded-3xl px-5 py-4 flex items-center justify-center gap-2 z-10 shadow-sm transition-transform hover:scale-105 duration-500">
            {/* The 'M' */}
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter">
              <path d="M3 21V3l9 9 9-9v18" />
            </svg>
            {/* The down arrow */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter">
              <path d="M12 3v18M5 14l7 7 7-7" />
            </svg>
          </div>

          {/* GitHub Icon Box */}
          <div className="absolute bottom-4 right-16 md:right-32 bg-ato-text text-ato-surface rounded-full p-6 z-10 shadow-xl border-4 border-ato-base transition-transform hover:scale-105 duration-500">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full mt-24 text-left flex flex-col gap-4"
      >
        <p className="text-2xl md:text-3xl text-ato-text tracking-wide">
          美しい日本語と、テクノロジーの融合。
        </p>
      </motion.div>
    </div>
  );
}
