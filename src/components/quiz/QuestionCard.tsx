"use client";

import { motion, AnimatePresence } from "framer-motion";
interface QuestionCardProps {
    step: number;
    currentQuestion: any;
    handleAnswer: (option: any) => void;
  }
  export function QuestionCard({
    step,
    currentQuestion,
    handleAnswer,
  }: QuestionCardProps) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}
          className="rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-10 md:p-14"
        >
          <p className="text-orange-400 uppercase tracking-[0.2em] text-sm font-semibold mb-6">
            Burn Report Assessment
          </p>
  
          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-10">
            {currentQuestion.question}
          </h2>
  
          <div className="space-y-4">
            {currentQuestion.options.map((option: any) => (
              <button
                key={option.text}
                onClick={() => handleAnswer(option)}
                className="w-full text-left rounded-2xl border border-white/[0.06] bg-white/[0.03] hover:border-orange-500/40 hover:bg-orange-500/[0.04] px-6 py-5 transition-all text-lg text-zinc-300 hover:text-white"
              >
                {option.text}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }