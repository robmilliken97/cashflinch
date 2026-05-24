"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PersonalizedRoastProps {
  roasts: any[];
}

function idToHashtag(id: string): string {
  return "#" + id.split("-").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
}

export function PersonalizedRoast({ roasts }: PersonalizedRoastProps) {
  const [index, setIndex] = useState(0);

  if (!roasts.length) return null;

  const current = roasts[index % roasts.length];

  const handleReroll = () => {
    setIndex((i) => (i + 1) % roasts.length);
  };

  return (
    <div className="relative overflow-hidden rounded-[16px] border border-white/[0.12] bg-[#111113] px-10 md:px-14 py-12 md:py-14">
      {/* Decorative quote mark — cinematic scale */}
      <span
        aria-hidden="true"
        className="absolute top-[-30px] left-8 font-display text-[210px] leading-none text-red-500/[0.07] select-none pointer-events-none"
      >
        &ldquo;
      </span>

      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative z-10 font-display italic leading-[1.5] text-white/90"
          style={{ fontSize: "clamp(22px, 2.6vw, 30px)" }}
        >
          &ldquo;{current.roast}&rdquo;
        </motion.p>
      </AnimatePresence>

      {/* Meta row — editorial divider composition */}
      <div className="mt-10 pt-6 border-t border-white/[0.06] flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-data text-xs tracking-[0.08em] uppercase px-[10px] py-[5px] rounded-[6px] border border-white/[0.10] text-zinc-400">
            {idToHashtag(current.id)}
          </span>
          {current.severity === "high" && (
            <span className="font-data text-xs tracking-[0.08em] uppercase px-[10px] py-[5px] rounded-[6px] border border-red-500/20 text-red-500/70">
              Critical Risk
            </span>
          )}
        </div>
        {roasts.length > 1 && (
          <button
            onClick={handleReroll}
            className="font-data text-xs tracking-[0.06em] uppercase text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            &#8635; Reroll
          </button>
        )}
      </div>
    </div>
  );
}
