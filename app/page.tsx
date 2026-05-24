"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateRoasts } from "@/src/lib/roastEngine";
import {
  calculateBurnScore,
  determineFinancialProfile,
} from "@/src/lib/scoringEngine";
import { PersonalizedRoast } from "@/src/components/results/PersonalizedRoast";
import { ResultsScreen } from "@/src/components/results/ResultsScreen";
import { quizQuestions } from "@/src/data/quizQuestions";
import { QuestionCard } from "@/src/components/quiz/QuestionCard";

const rotatingMessages = [
  "Your paycheck deserves better decisions.",
  "Checking your bank account shouldn't feel dangerous.",
  "Built for financially self-aware people.",
  "Lifestyle inflation has entered the chat.",
  "Your subscriptions are getting confident.",
];


function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/[0.05]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="text-2xl font-black tracking-tight">
          <span className="text-emerald-400">Cash</span>
          <span className="text-white">Flinch</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>

          <a href="#quiz" className="hover:text-white transition-colors">
            Quiz
          </a>

          <a
            href="#quiz"
            className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-semibold transition-all"
          >
            Check Your Score
          </a>
        </div>
      </div>
    </nav>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.03] p-8 hover:border-orange-500/30 transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>

        <p className="text-zinc-400 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

function QuizSection() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  const currentQuestion = quizQuestions[step];
  const burnScore = calculateBurnScore(answers);

  const progress = ((step + 1) / quizQuestions.length) * 100;
  const personalizedRoasts = generateRoasts(answers);
  const result = determineFinancialProfile(burnScore);

  const handleAnswer = (option: any) => {
    const updated = {
      ...answers,
      [currentQuestion.id]: option,
    };

    setAnswers(updated);

    if (step < quizQuestions.length - 1) {
      setTimeout(() => {
        setStep(step + 1);
      }, 250);
    } else {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        setStep(step + 1);
      }, 2500);
    }
  };

  const handleRetake = () => {
    setStep(0);
    setAnswers({});
    setTimeout(() => {
      document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  if (loading) {
    const loadingLines = [
      "Analyzing financial survivability...",
      "Detecting emotional purchases...",
      "Reviewing questionable decisions...",
      "Calculating cooked levels...",
    ];

    return (
      <section className="py-32 border-t border-white/[0.05]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="w-12 h-12 border-2 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mx-auto mb-10" />

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl md:text-4xl font-black mb-10 text-white"
          >
            Generating Burn Report...
          </motion.h2>

          <div className="space-y-3">
            {loadingLines.map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.35, duration: 0.5 }}
                className="text-zinc-500 text-base"
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (step >= quizQuestions.length) {
    return (
      <ResultsScreen
        burnScore={burnScore}
        result={result}
        personalizedRoasts={personalizedRoasts}
        onRetake={handleRetake}
      />
    );
  }

  return (
    <section
      id="quiz"
      className="py-32 border-t border-white/[0.05]"
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-10">
          <div className="flex items-center justify-between text-sm text-zinc-500 mb-4">
            <span>
              Question {step + 1} of {quizQuestions.length}
            </span>

            <span>{Math.round(progress)}%</span>
          </div>

          <div className="w-full h-2 bg-white/[0.05] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-orange-500"
            />
          </div>
        </div>

        <QuestionCard
  step={step}
  currentQuestion={currentQuestion}
  handleAnswer={handleAnswer}
/>
      </div>
    </section>
  );
}

export default function Home() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(
        (prev) => (prev + 1) % rotatingMessages.length
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#0A0A0F] text-[#E8E8F0] overflow-x-hidden scroll-smooth">
      <Navbar />

      <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.15),transparent_40%)]" />

        <div className="absolute top-32 left-[-120px] w-[400px] h-[400px] bg-orange-500/10 blur-3xl rounded-full" />

        <div className="absolute bottom-0 right-[-120px] w-[350px] h-[350px] bg-emerald-500/5 blur-3xl rounded-full" />

        <div className="relative z-10 max-w-6xl mx-auto text-center pt-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-400 text-sm font-medium mb-8 transition-all duration-500">
            {rotatingMessages[messageIndex]}
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
            Are your finances
            <span className="block mt-2">
              secretly
              <span className="text-orange-500"> destroying </span>
              you?
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            CashFlinch analyzes spending habits, debt pressure,
            emotional spending, lifestyle inflation, and financial
            behavior patterns to uncover how cooked your money situation really is.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <a
              href="#quiz"
              className="px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-400 transition-all text-black font-bold text-lg shadow-lg shadow-orange-500/20"
            >
              Generate Burn Report
            </a>

            <button className="px-8 py-4 rounded-2xl border border-zinc-700 hover:border-zinc-500 transition-all text-white font-semibold text-lg">
              See How It Works
            </button>
          </div>

          <p className="mt-8 text-sm text-zinc-500">
            127,000+ financially questionable decisions analyzed
          </p>
        </div>
      </section>

      <section
        id="features"
        className="py-28 border-t border-white/[0.05]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <p className="text-orange-500 uppercase tracking-[0.2em] text-sm font-semibold mb-4">
              FEATURES
            </p>

            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Financial self-awareness
              <span className="block text-zinc-500">
                with consequences.
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard
              title="Burn Report"
              description="A behavioral breakdown of your financial habits, pressure points, and money patterns."
            />

            <FeatureCard
              title="Burn Score"
              description="A measure of how financially stressed and unstable your current situation may be."
            />

            <FeatureCard
              title="Lifestyle Drift"
              description="Track how your lifestyle quietly expanded while your financial stability disappeared."
            />

            <FeatureCard
              title="Delusion Detection™"
              description="Compare your income, spending habits, and financial confidence to objective reality."
            />
          </div>
        </div>
      </section>

      <QuizSection />
    </main>
  );
}
