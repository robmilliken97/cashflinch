export type RecoveryLever = {
  lead: string;
  body: string;
};

export type BehavioralProfile = {
  level: string;
  archetype: string;
  color: string;
  insight: string;
  pattern: string;
  blindSpot: string;
  metric1: string;
  metric2: string;
  metric3: string;
  metricLabels: [string, string, string];
  metricScores: [number, number, number];
  survivability: string;
  financialPressure: string;
  risks: string[];
  recoveryLevers: RecoveryLever[];
};

const MAX_POSSIBLE = 280;

const TAG_WEIGHTS: Record<string, number> = {
  emotional_spender: 3,
  avoider: 3,
  debt_normalized: 3,
  awareness_deficit: 2,
  lifestyle_drifter: 2,
  paycheck_dependent: 2,
  future_reliant: 2,
  optimist_bias: 1,
  convenience_addict: 1,
  status_spender: 1,
};

const TAG_TO_ARCHETYPE: Record<string, string> = {
  emotional_spender: "comfort_spender",
  avoider: "quiet_avoider",
  debt_normalized: "normalized",
  awareness_deficit: "quiet_avoider",
  lifestyle_drifter: "lifestyle_maxxer",
  paycheck_dependent: "paycheck_hostage",
  future_reliant: "optimistic_drifter",
  optimist_bias: "optimistic_drifter",
  convenience_addict: "convenience_economy",
  status_spender: "status_investor",
};

// Returns [pressureScore, avoidanceScore, driftScore] scaled 0-99
// based on actual behavioral signals in answers — not burnScore multipliers
function calculateMetricScores(answers: Record<string, any>): [number, number, number] {
  let pressure = 0, avoidance = 0, drift = 0;

  Object.values(answers).forEach((a: any) => {
    if (!a?.tags) return;
    if (a.tags.some((t: string) => ["emotional_spender", "debt_normalized", "paycheck_dependent"].includes(t))) pressure++;
    if (a.tags.some((t: string) => ["avoider", "awareness_deficit"].includes(t))) avoidance++;
    if (a.tags.some((t: string) => ["lifestyle_drifter", "future_reliant", "optimist_bias", "convenience_addict", "status_spender"].includes(t))) drift++;
  });

  // Max possible: pressure=9, avoidance=7, drift=7 across 10 questions
  return [
    Math.min(99, Math.round((pressure / 9) * 99)),
    Math.min(99, Math.round((avoidance / 7) * 99)),
    Math.min(99, Math.round((drift / 7) * 99)),
  ];
}

const ARCHETYPES: Record<string, Omit<BehavioralProfile, "metricScores" | "color">> = {
  comfort_spender: {
    level: "Emotionally Funded",
    archetype: "The Comfort Spender",
    insight:
      "Spending is your fastest available tool for emotional regulation. It works in the short term, which is exactly why the habit is so durable — and so expensive over time.",
    pattern: "Emotional Regulation Through Spending",
    blindSpot:
      "The purchases don't feel like a problem because they solve a real one. The issue is the cost compounds invisibly until one difficult month makes the total undeniable.",
    metricLabels: ["Emotional Spend Index™", "Avoidance Tendency™", "Lifestyle Drift™"],
    metric1:
      "Your spending is functionally linked to your emotional state. The index reflects how consistently stress converts into transactions — a pattern that operates independently of your income.",
    metric2:
      "You tend to avoid reviewing the financial impact of stress-driven purchases. The pattern is easier to sustain when the numbers stay abstract.",
    metric3:
      "Comfort spending quietly elevates the baseline over time. What starts as relief becomes expectation, then fixed cost.",
    survivability: "UNSTABLE",
    financialPressure: "HIGH",
    risks: [
      "Emotional spending scales with stress, not income — good months don't reliably solve it",
      "Rough periods generate financial damage that outlasts the emotion that caused it",
      "Relief-based purchasing is structurally indistinguishable from compulsion at the account level",
      "Your 'I deserve this' logic activates before your budget awareness does, every time",
    ],
    recoveryLevers: [
      {
        lead: "Name the trigger, not the purchase.",
        body: "Track what happens before the spend — the emotion, context, time of day. Most patterns become manageable once they're visible.",
      },
      {
        lead: "Install a 48-hour rule on non-essentials.",
        body: "Not as punishment. As a test. Most stress-purchased items look completely different two days later.",
      },
      {
        lead: "Find a cheaper emotional substitute.",
        body: "The goal isn't to feel nothing — it's to find regulation that doesn't compound financially over time.",
      },
      {
        lead: "One category cap this month.",
        body: "Pick the most frequent emotional spend category and put a dollar limit on it for 30 days. One constraint. Not a full overhaul.",
      },
    ],
  },

  quiet_avoider: {
    level: "Strategically Unaware",
    archetype: "The Quiet Avoider",
    insight:
      "You have a working theory that things are probably fine. You've decided, more or less deliberately, not to stress-test it.",
    pattern: "Strategic Financial Avoidance",
    blindSpot:
      "Avoidance doesn't stabilize your finances — it removes the feedback loop that would let you course-correct before a crisis. The problems don't pause because you stopped looking.",
    metricLabels: ["Awareness Deficit™", "Passive Drift Index™", "Confrontation Lag™"],
    metric1:
      "The gap between what's happening in your finances and what you're actively monitoring. This gap has a cost — it just gets charged with a delay.",
    metric2:
      "Charges and obligations accumulating inside your awareness gap. The less attention you direct here, the more autonomously this number grows.",
    metric3:
      "How far you currently are from the financial reality you've been postponing. The lag compounds — every month of avoidance increases the eventual confrontation cost.",
    survivability: "UNSTABLE",
    financialPressure: "MODERATE-HIGH",
    risks: [
      "No financial feedback loop means problems compound undetected until a threshold event forces the conversation",
      "Passive charges grow most aggressively in awareness gaps — subscriptions and interest work best when unmonitored",
      "Each month of avoidance increases the psychological cost of eventually looking, making it easier to keep not looking",
      "The moment you finally check will feel significantly worse than if you'd been checking regularly",
    ],
    recoveryLevers: [
      {
        lead: "Do one look. Just one.",
        body: "Pull every account balance this week. Don't act on it yet. Just know the actual number.",
      },
      {
        lead: "Automate the feedback you're avoiding.",
        body: "Set weekly balance notifications. Let the number reach you passively so avoidance requires active effort to maintain.",
      },
      {
        lead: "Start with subscriptions.",
        body: "Cancel everything you can't name without looking. Resubscribe only to what you notice missing.",
      },
      {
        lead: "Name the specific thing you're avoiding.",
        body: "Write it down — the number, the account, the conversation. Naming it precisely reduces its psychological power.",
      },
    ],
  },

  paycheck_hostage: {
    level: "Cash Flow Dependent",
    archetype: "The Paycheck Hostage",
    insight:
      "Your finances work exactly as designed — until one variable changes. That's not a budget. That's a system with no fault tolerance.",
    pattern: "Income-Dependent Financial Architecture",
    blindSpot:
      "When nothing has gone wrong, the fragility is invisible. The system feels stable because it hasn't been tested. That is not the same as actually being stable.",
    metricLabels: ["Income Fragility™", "Buffer Deficit™", "Cascade Risk™"],
    metric1:
      "How dependent your current financial structure is on consistent, uninterrupted income. High fragility means one disruption has disproportionate consequences.",
    metric2:
      "The gap between your current obligations and your capacity to absorb unexpected costs. The smaller this gap, the less room the system has to breathe.",
    metric3:
      "The probability that one financial disruption triggers a second. Systems without buffers tend to fail in sequences, not single events.",
    survivability: "CRITICAL",
    financialPressure: "SEVERE",
    risks: [
      "A two-week income disruption requires debt, borrowing, or immediate lifestyle contraction",
      "Fixed obligations leave no capacity for irregular-but-inevitable expenses",
      "One health event, job disruption, or major repair can trigger a cascade with no built-in recovery",
      "The system has no mechanism for absorbing change without structural damage",
    ],
    recoveryLevers: [
      {
        lead: "Build $500 before anything else.",
        body: "Not a full emergency fund. Just $500 of actual insulation between you and the next disruption. One number. Start there.",
      },
      {
        lead: "List every fixed monthly obligation.",
        body: "Total them. Calculate how many days of income they require. That number is your actual fragility index.",
      },
      {
        lead: "Find one reducible fixed cost.",
        body: "One rate negotiation, one subscription audit, one insurance review. Small, but structural.",
      },
      {
        lead: "Plan for one specific disruption.",
        body: "What's the single most probable thing that could interrupt your income or add a major expense? Have a plan for just that scenario.",
      },
    ],
  },

  optimistic_drifter: {
    level: "Optimistically Underwater",
    archetype: "The Optimistic Drifter",
    insight:
      "Your financial confidence is genuine. It's calibrated to a version of your life that hasn't fully arrived yet — and in the meantime, the current version is running on credit.",
    pattern: "Future-Income Anchored Spending",
    blindSpot:
      "Optimism about income trajectory is often accurate. The error is treating projected income as already arrived. The gap between now and then doesn't pause while you wait.",
    metricLabels: ["Projection Gap™", "Commitment Overhang™", "Timeline Risk™"],
    metric1:
      "The distance between what your current spending assumes about your income and where your income actually is right now.",
    metric2:
      "Financial commitments that make sense in the future scenario but create friction in the present one. This is where optimism meets cash flow.",
    metric3:
      "How exposed you are if the income improvement or life change arrives later than projected. The risk isn't the goal — it's the dependency on the timeline.",
    survivability: "MODERATE",
    financialPressure: "MODERATE",
    risks: [
      "Current commitments are calibrated to income you're projecting, not income you have",
      "The delay between now and the expected improvement isn't financial downtime — it accumulates",
      "When the income increase arrives, lifestyle will have already expanded to absorb it",
      "Optimism about outcomes is often right; optimism about timelines almost never is",
    ],
    recoveryLevers: [
      {
        lead: "Run the 18-month scenario.",
        body: "What if the raise or opportunity takes 18 months instead of 6? Does the math still hold? Model that version.",
      },
      {
        lead: "Separate the hope from the plan.",
        body: "What you expect to happen is a forecast, not a budget. Write down what happens financially if it doesn't.",
      },
      {
        lead: "Reduce one forward-leaning commitment.",
        body: "The financial commitment most dependent on future income — find one way to reduce its footprint right now.",
      },
      {
        lead: "Let current income be enough, temporarily.",
        body: "Live within actual earnings for 60 days. Observe what has to change. That's the real picture.",
      },
    ],
  },

  lifestyle_maxxer: {
    level: "Lifestyle Leveraged",
    archetype: "The Lifestyle Maxxer",
    insight:
      "You've calibrated your life to your best months, not your average ones. The gap between those two numbers is where your financial stability used to be.",
    pattern: "Lifestyle Calibrated to Peak Income",
    blindSpot:
      "Lifestyle inflation is invisible from the inside because each upgrade felt reasonable in context. The problem isn't any single decision — it's the fixed cost floor they created together.",
    metricLabels: ["Baseline Inflation™", "Compression Resistance™", "Peak Dependency™"],
    metric1:
      "How elevated your fixed cost baseline is relative to your average monthly income. The higher this number, the less your finances can weather a below-average month.",
    metric2:
      "How psychologically difficult it would be to reduce your current lifestyle. High compression resistance means the baseline has normalized — it no longer feels optional.",
    metric3:
      "How much of your financial stability depends on income staying at or near its highest point. The more peak-dependent the system, the less resilient it is to normal income variation.",
    survivability: "UNSTABLE",
    financialPressure: "HIGH",
    risks: [
      "Your baseline expenses were calibrated to peak months, not the average ones that make up most of the year",
      "Lifestyle compression is psychologically painful in proportion to how normal the current level feels",
      "Each upgrade added fixed costs that don't automatically reduce if income fluctuates",
      "The most dangerous phase is when the lifestyle feels completely normal — that's when it's most entrenched",
    ],
    recoveryLevers: [
      {
        lead: "List the last three recurring upgrades.",
        body: "Anything in the last two years that added a fixed monthly cost. Evaluate each against your average income, not your best month.",
      },
      {
        lead: "Find the one you'd miss least.",
        body: "There's always one upgrade that felt better in theory than in practice. That one goes first.",
      },
      {
        lead: "Freeze the baseline for 90 days.",
        body: "No new subscriptions, no lifestyle additions. Observe what it actually costs to sustain the current level.",
      },
      {
        lead: "Calculate the real margin number.",
        body: "Average monthly income minus fixed obligations. That number — not the burn score — is your actual financial situation.",
      },
    ],
  },

  convenience_economy: {
    level: "Frictionlessly Broke",
    archetype: "The Convenience Economy",
    insight:
      "You've outsourced the parts of daily life that feel like too much right now. The problem isn't any single outsourcing decision — it's that you've applied this logic to more situations than your budget was designed for.",
    pattern: "Friction-Avoidance as Primary Spending Driver",
    blindSpot:
      "Convenience spending feels small per transaction, which is the exact reason it's so effective at accumulating. No individual purchase looks like the problem. The pattern is.",
    metricLabels: ["Friction Premium™", "Visibility Deficit™", "Habit Entrenchment™"],
    metric1:
      "The aggregate cost of paying to remove friction from daily life. Locally reasonable. Globally, this number tends to surprise people the first time they add it up.",
    metric2:
      "Convenience spending is structurally difficult to track because it happens in small, frequent, individually defensible transactions. This reflects how much is operating outside your awareness.",
    metric3:
      "How deeply embedded the convenience patterns are. High entrenchment means these habits have high emotional stickiness — they don't respond to willpower-based approaches.",
    survivability: "MODERATE",
    financialPressure: "MODERATE",
    risks: [
      "The aggregate cost of convenience spending often rivals a fixed monthly bill — it's just spread across dozens of transactions",
      "Each individual transaction is defensible, which makes the pattern nearly invisible until you add a month together",
      "Convenience habits accelerate during stressful periods, exactly when budget capacity is lowest",
      "High entrenchment means reducing these patterns requires systems, not willpower",
    ],
    recoveryLevers: [
      {
        lead: "Add up one month. Just look at the total.",
        body: "Every delivery, rideshare, prepared meal, and paid convenience for 30 days. The number is usually the motivation.",
      },
      {
        lead: "Find the highest-cost single habit.",
        body: "One pattern, converted to a monthly number. That number, made visible, usually does more than a general spending plan.",
      },
      {
        lead: "Batch instead of eliminate.",
        body: "One grocery run covers five delivery orders. Consolidation, not deprivation — the friction is mostly in the decision, not the task.",
      },
      {
        lead: "Give convenience a line item.",
        body: "A defined monthly budget converts it from an invisible leak to a managed expense. The amount matters less than the constraint.",
      },
    ],
  },

  status_investor: {
    level: "Identity-Forward",
    archetype: "The Status Investor",
    insight:
      "Your spending tells a story about who you're becoming. Your balance sheet tells a different story about who you are right now. You're currently funding both versions simultaneously.",
    pattern: "Identity-Forward Financial Behavior",
    blindSpot:
      "Status spending is uniquely resistant to correction because it isn't irrational — it's aspirational. The purchases feel like investments in a future self. The balance sheet disagrees about the timeline.",
    metricLabels: ["Narrative Leverage™", "Identity Lock™", "Aspirational Gap™"],
    metric1:
      "How much of your current spending is attached to the story of who you're becoming rather than who you currently are financially. Leverage isn't inherently bad — the ratio is.",
    metric2:
      "How difficult your current identity-anchored commitments would be to exit. The cost isn't just financial — it's narrative, and that makes it harder to quantify and harder to reduce.",
    metric3:
      "The distance between the financial behavior of your aspirational self and the actual capacity of your current financial situation. This gap is meant to close — the question is from which direction.",
    survivability: "MODERATE",
    financialPressure: "MODERATE",
    risks: [
      "Aspirational spending requires an income or financial position you may not have reached yet",
      "Identity-anchored commitments are psychologically expensive to reverse — the resistance is rarely about money",
      "Status spending consistently crowds out the savings and investment that would actually close the aspirational gap",
      "The gap between self-image and financial reality tends to widen before external feedback narrows it",
    ],
    recoveryLevers: [
      {
        lead: "Separate the identity from the spending.",
        body: "Name three things you spend on primarily for how they signal something. Ask: what would change if these were invisible to others?",
      },
      {
        lead: "Invest in the actual version, not the projected one.",
        body: "Skills, credentials, relationships that move toward the aspirational self cost less and compound more than the aesthetic of it.",
      },
      {
        lead: "Find the identity spend that isn't earning its keep.",
        body: "Some status spending genuinely opens doors. Most maintains an image. Identify which is which.",
      },
      {
        lead: "Redirect one aspirational spend toward an aspirational asset.",
        body: "Whatever you spend to project the next version of yourself — redirect part of it to the financial foundation that version requires.",
      },
    ],
  },

  normalized: {
    level: "Pressure-Adapted",
    archetype: "The Normalized",
    insight:
      "You've been under financial pressure long enough that it stopped feeling like pressure. That's not adaptation — it's the loss of the signal that would otherwise motivate you to change.",
    pattern: "Normalized Financial Instability",
    blindSpot:
      "When nothing has broken yet, the system feels stable. But 'nothing has broken yet' and 'stable' are not the same condition. The absence of a crisis is not financial health.",
    metricLabels: ["Pressure Threshold™", "Signal Deficit™", "Crisis Readiness™"],
    metric1:
      "How much financial pressure you've normalized. A high threshold means you've adapted to conditions that would register as alarming to someone experiencing them for the first time.",
    metric2:
      "How clearly you can still detect when your financial situation is deteriorating. Prolonged normalization degrades the internal alarm system that drives corrective behavior.",
    metric3:
      "Your current capacity to absorb a financial disruption without it escalating. Low readiness paired with high normalization is a specific and underappreciated risk profile.",
    survivability: "CRITICAL",
    financialPressure: "SEVERE",
    risks: [
      "Desensitization to financial pressure removes the signal that normally triggers corrective behavior before a threshold is crossed",
      "Long-term debt normalization is one of the strongest predictors of sustained, compounding financial instability",
      "Chronic financial pressure can mask gradual deterioration until it becomes structurally irreversible",
      "Normalized pressure calibrates your risk tolerance upward — enabling decisions that would otherwise register as clearly bad",
    ],
    recoveryLevers: [
      {
        lead: "Recalibrate what 'fine' actually means.",
        body: "Write down actual numbers: total debt, monthly obligations, monthly net income. Then evaluate whether 'fine' is accurate or just familiar.",
      },
      {
        lead: "Treat debt like an active problem again.",
        body: "Not guilt — urgency. Pick the smallest debt and build a plan to eliminate it within 90 days. The goal is to reactivate the feedback loop.",
      },
      {
        lead: "Find the monthly number that creates real movement.",
        body: "What amount, redirected toward debt, would generate visible progress within 6 months? Even a small number reactivates momentum.",
      },
      {
        lead: "Name the normalization out loud.",
        body: "To someone. The pattern of financial pressure feeling normal needs to be stated before it can be changed.",
      },
    ],
  },

  low_risk: {
    level: "Quietly Functional",
    archetype: "The Functional Adult",
    insight:
      "Your financial behavior reflects awareness and some degree of structure. The patterns here don't show the warning signs that reliably predict instability — which puts you in a smaller group than you might expect.",
    pattern: "Low Behavioral Risk Profile",
    blindSpot:
      "Financial stability creates a specific blind spot: the sense that because nothing's wrong, nothing needs attention. The habits that keep a system stable require maintenance, not just existence.",
    metricLabels: ["Resilience Index™", "Awareness Score™", "Stability Margin™"],
    metric1:
      "Your structural capacity to absorb financial disruption without cascading consequences. Resilience is different from current stability — it's how the system performs under stress.",
    metric2:
      "How closely your financial behavior tracks your financial awareness. High alignment means fewer surprises in either direction.",
    metric3:
      "The buffer between your current obligations and your income. Your margin determines how much the system can flex before something has to give.",
    survivability: "STABLE",
    financialPressure: "LOW",
    risks: [
      "Stability can quietly erode during major life transitions when the conditions that created it change",
      "Financial health requires active maintenance — the absence of crisis isn't a strategy",
    ],
    recoveryLevers: [
      {
        lead: "Document what's actually working.",
        body: "The habits and decisions that got you here are worth writing down — they don't survive major lifestyle changes automatically.",
      },
      {
        lead: "Stress-test one scenario.",
        body: "What's the single disruption most likely to challenge your current stability? Build one specific plan for that scenario.",
      },
      {
        lead: "Convert stability into forward momentum.",
        body: "Financial stability is most valuable when it's actively used to build future resilience, not just maintained as a current condition.",
      },
      {
        lead: "Stay ahead of the behavioral patterns.",
        body: "The risks that don't affect you now tend to appear during specific life transitions — income changes, relationship shifts, major purchases. Understanding them in advance is the advantage.",
      },
    ],
  },
};

export function calculateBurnScore(answers: Record<string, any>): number {
  const total = Object.values(answers).reduce(
    (acc: number, curr: any) => acc + (curr?.points || 0),
    0
  );
  return Math.min(Math.round((total * 100) / MAX_POSSIBLE), 100);
}

export function determineFinancialProfile(
  burnScore: number,
  answers: Record<string, any> = {}
): BehavioralProfile {
  const metricScores = calculateMetricScores(answers);

  if (burnScore < 28 || Object.keys(answers).length === 0) {
    return { ...ARCHETYPES.low_risk, color: "text-emerald-400", metricScores };
  }

  const tagCounts: Record<string, number> = {};
  Object.values(answers).forEach((answer: any) => {
    if (answer?.tags) {
      answer.tags.forEach((tag: string) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + (TAG_WEIGHTS[tag] || 1);
      });
    }
  });

  let dominantTag = "optimist_bias";
  let maxCount = 0;
  Object.entries(tagCounts).forEach(([tag, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominantTag = tag;
    }
  });

  const archetypeKey = TAG_TO_ARCHETYPE[dominantTag] || "optimistic_drifter";
  const base = ARCHETYPES[archetypeKey] || ARCHETYPES.optimistic_drifter;

  let color = "text-orange-500";
  if (burnScore >= 75) color = "text-red-500";
  else if (burnScore >= 55) color = "text-orange-500";
  else if (burnScore >= 35) color = "text-yellow-500";
  else color = "text-emerald-400";

  return { ...base, color, metricScores };
}
