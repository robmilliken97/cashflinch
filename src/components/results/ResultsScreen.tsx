"use client";

import { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { PersonalizedRoast } from "./PersonalizedRoast";

interface ResultsScreenProps {
  burnScore: number;
  result: any;
  personalizedRoasts: any[];
  onRetake?: () => void;
}


const colorToBg: Record<string, string> = {
  "text-red-500": "bg-red-500",
  "text-orange-500": "bg-orange-500",
  "text-yellow-500": "bg-yellow-500",
  "text-emerald-400": "bg-emerald-400",
};

function getMetricColor(val: number): string {
  if (val >= 75) return "text-red-500";
  if (val >= 55) return "text-orange-500";
  if (val >= 35) return "text-amber-500";
  return "text-emerald-400";
}

function getBarColor(val: number): string {
  if (val >= 75) return "bg-red-500";
  if (val >= 55) return "bg-orange-500";
  if (val >= 35) return "bg-amber-500";
  return "bg-emerald-400";
}

function getRiskSeverity(index: number): "high" | "medium" | "low" {
  if (index <= 1) return "high";
  if (index === 2) return "medium";
  return "low";
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export function ResultsScreen({
  burnScore,
  result,
  personalizedRoasts,
  onRetake,
}: ResultsScreenProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => clearTimeout(timer);
  }, []);

  const vehicleScore = Math.min(99, Math.round(burnScore * 1.2));
  const relScore    = Math.min(99, Math.round(burnScore * 0.9));
  const delusionVal = Math.min(99, Math.round(burnScore * 0.85));

  const metrics = [
    {
      label: "Relationship Risk™",
      value: relScore,
      desc: result.relationshipRisk,
      colorClass: getMetricColor(relScore),
      barClass: getBarColor(relScore),
    },
    {
      label: "Vehicle Aggression Index™",
      value: vehicleScore,
      desc: result.vehicleAggression,
      colorClass: getMetricColor(vehicleScore),
      barClass: getBarColor(vehicleScore),
    },
    {
      label: "Delusion Score™",
      value: delusionVal,
      desc: result.delusionScore,
      colorClass: getMetricColor(delusionVal),
      barClass: getBarColor(delusionVal),
    },
  ];

  const burnBarBg = colorToBg[result.color] ?? "bg-orange-500";

  return (
    <section ref={sectionRef} id="results" className="border-t border-white/[0.04]">
      <div className="max-w-[1160px] mx-auto px-6 md:px-12 py-24 md:py-36">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >

          {/* ── HERO ── */}
          <motion.div variants={itemVariants}>
            <div className="grid md:grid-cols-[1fr_280px] border border-white/[0.12] rounded-[20px] overflow-hidden bg-[#111113]">

              {/* Hero Left */}
              <div className="p-8 md:p-[56px] border-b md:border-b-0 md:border-r border-white/[0.07]">
                <div className="flex items-center gap-2 mb-8">
                  <span className="w-[6px] h-[6px] rounded-full bg-red-500 animate-pulse shrink-0" />
                  <span className="font-data text-xs tracking-[0.09em] uppercase text-zinc-500">
                    Behavioral Finance Report · CashFlinch
                  </span>
                </div>
                <h2
                  className="font-display italic leading-[1.05] tracking-[-0.01em] text-white mb-3"
                  style={{ fontSize: "clamp(38px, 4vw, 56px)" }}
                >
                  {result.archetype}
                </h2>
                {result.pattern && (
                  <p className="font-data text-[11px] tracking-[0.08em] uppercase text-orange-500/60 mb-5">
                    {result.pattern}
                  </p>
                )}
                <p className="text-[15px] text-zinc-400 leading-[1.65] max-w-[420px] font-light">
                  {result.insight}
                </p>
              </div>

              {/* Hero Right */}
              <div className="p-8 md:pt-[56px] md:pb-[52px] md:px-10 flex flex-col justify-between gap-10">
                <div>
                  <p className="font-data text-xs tracking-[0.1em] uppercase text-zinc-500 mb-4">
                    Burn Score™
                  </p>
                  <p
                    className={`font-display italic leading-none tracking-[-0.02em] ${result.color}`}
                    style={{ fontSize: "88px" }}
                  >
                    {burnScore}
                  </p>
                  <p className="font-data text-[13px] text-zinc-500 mt-2">/ 100</p>
                </div>
                <div>
                  <div className="h-[3px] bg-[#1f1f23] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${burnScore}%` }}
                      transition={{ duration: 1.4, ease: "easeOut", delay: 0.6 }}
                      className={`h-full rounded-full ${burnBarBg}`}
                    />
                  </div>
                  <div className="flex justify-between mt-2 font-data text-xs text-zinc-500">
                    <span>Stable</span>
                    <span>Concerning</span>
                    <span>Nuclear</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* ── PRIMARY ROAST ── */}
          <motion.div variants={itemVariants}>
            <PersonalizedRoast roasts={personalizedRoasts} />
          </motion.div>

          {/* ── METRICS GRID ── */}
          <motion.div variants={itemVariants}>
            <p className="font-data text-xs tracking-[0.1em] uppercase text-zinc-500 mb-5">
              Diagnostic Indices
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {metrics.map(({ label, value, desc, colorClass, barClass }) => (
                <div
                  key={label}
                  className="border border-white/[0.07] rounded-[14px] bg-[#111113] p-8 md:p-10 hover:border-white/[0.12] transition-colors duration-300"
                >
                  <p className="font-data text-xs tracking-[0.08em] uppercase text-zinc-400 mb-5">
                    {label}
                  </p>
                  <p className={`font-display italic text-[48px] leading-none mb-4 ${colorClass}`}>
                    {value}
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed font-light">{desc}</p>
                  <div className="mt-5 h-[2px] bg-[#1f1f23] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ duration: 1.6, ease: "easeOut", delay: 0.8 }}
                      className={`h-full rounded-full ${barClass}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── LOWER ASYMMETRIC GRID ── */}
          {result.risks && result.risks.length > 0 && (
            <motion.div variants={itemVariants}>
              <div className="grid md:grid-cols-[1.65fr_1fr] gap-5">

                {/* Risk Signals — dominant */}
                <div className="border border-white/[0.07] rounded-[14px] bg-[#111113] p-9 md:p-11">
                  <p className="font-data text-[13px] tracking-[0.04em] text-white mb-7">
                    Risk Signals
                  </p>
                  <div>
                    {result.risks.map((risk: string, i: number) => {
                      const sev = getRiskSeverity(i);
                      return (
                        <div
                          key={i}
                          className="flex items-start gap-4 py-[18px] border-b border-white/[0.05] last:border-b-0"
                        >
                          <span
                            className={`mt-[7px] w-[6px] h-[6px] rounded-full shrink-0 ${
                              sev === "high"
                                ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                                : sev === "medium"
                                ? "bg-orange-500"
                                : "bg-amber-500"
                            }`}
                          />
                          <p className="text-sm text-zinc-300 leading-[1.7] font-light">
                            {risk}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recovery Protocol — supportive */}
                <div className="border border-white/[0.07] rounded-[14px] bg-[#111113] p-8 md:p-9">
                  <p className="font-data text-[13px] tracking-[0.04em] text-zinc-400 mb-5">
                    Recovery Protocol
                  </p>
                  <div>
                    {(result.recoveryLevers || []).map((item: { lead: string; body: string }, i: number) => (
                      <div
                        key={i}
                        className="flex gap-[14px] py-[13px] border-b border-white/[0.05] last:border-b-0 items-start"
                      >
                        <span className="font-data text-xs text-zinc-500 mt-[3px] shrink-0 w-[18px]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-sm text-zinc-400 leading-[1.65] font-light">
                          <strong className="text-zinc-200 font-medium">{item.lead}</strong>{" "}
                          {item.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* ── SHARE ROW ── */}
          <motion.div variants={itemVariants}>
            <div className="flex gap-3">
              <button
                onClick={onRetake}
                className="flex-1 py-[14px] px-5 rounded-xl border border-white/[0.10] bg-[#111113] font-data text-xs tracking-[0.06em] uppercase text-zinc-400 hover:text-white hover:border-white/[0.20] hover:bg-[#18181b] transition-all duration-200 text-center"
              >
                &#8635; Try again
              </button>
              <button className="flex-1 py-[14px] px-5 rounded-xl bg-white font-data text-xs tracking-[0.06em] uppercase text-black font-medium hover:bg-zinc-100 transition-all duration-200 text-center">
                Share result
              </button>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
