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
  relationshipRisk: string;
  vehicleAggression: string;
  delusionScore: string;
  survivability: string;
  financialPressure: string;
  risks: string[];
  recoveryLevers: RecoveryLever[];
};

// Max possible points across all 10 questions (worst answer on each)
const MAX_POSSIBLE = 280;

// Behavioral tag weights — higher = more alarming signal
const TAG_WEIGHTS: Record<string, number> = {
  emotional_spender: 3,
  avoider: 3,
  debt_normalized: 3,
  awareness_deficit: 2,
  lifestyle_drifter: 2,
  paycheck_dependent: 2,
  optimist_bias: 1,
  future_reliant: 2,
  convenience_addict: 1,
  status_spender: 1,
};

// Maps dominant behavioral tag → archetype key
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

const ARCHETYPES: Record<string, BehavioralProfile> = {
  comfort_spender: {
    level: "Emotionally Funded",
    archetype: "The Comfort Spender",
    color: "text-orange-500",
    insight:
      "Spending is your fastest available tool for emotional regulation. It works in the short term, which is exactly why the habit is so durable — and so expensive over time.",
    pattern: "Emotional Regulation Through Spending",
    blindSpot:
      "The purchases don't feel like a problem because they solve a real one. The issue is the cost compounds invisibly until one difficult month makes the total undeniable.",
    relationshipRisk:
      "Your close relationships likely absorb the financial friction of your emotional recovery without a full picture of what it actually costs.",
    vehicleAggression:
      "Purchases made under emotional pressure tend to stay in your life long after the feeling that justified them has passed.",
    delusionScore:
      "You probably understand this pattern intellectually. The gap between understanding it and stopping it is where the real cost lives.",
    survivability: "UNSTABLE",
    financialPressure: "HIGH",
    risks: [
      "Emotional spending scales with stress, not income — good months don't reliably solve it",
      "Rough periods generate financial damage that outlasts the emotion that caused it",
      "Relief-based purchasing is structurally indistinguishable from compulsion at the account level",
      "Your 'I deserve this' logic consistently activates before your budget awareness does",
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
        lead: "One spending boundary this month.",
        body: "Pick the most frequent emotional spend category and put a dollar cap on it for 30 days. One constraint, not a full overhaul.",
      },
    ],
  },

  quiet_avoider: {
    level: "Strategically Unaware",
    archetype: "The Quiet Avoider",
    color: "text-orange-500",
    insight:
      "You have a working theory that things are probably fine. You've decided, more or less deliberately, not to stress-test it.",
    pattern: "Strategic Financial Avoidance",
    blindSpot:
      "Avoidance doesn't stabilize your finances — it removes the feedback loop that would let you course-correct before a crisis. The problems don't pause because you stopped looking.",
    relationshipRisk:
      "Financial avoidance creates asymmetry in relationships. You've made commitments you haven't fully measured, and someone else may eventually feel that gap.",
    vehicleAggression:
      "Recurring charges operate most effectively in the space your awareness left. Subscriptions, interest, fees — they compound in the dark.",
    delusionScore:
      "You're not deluded — you're deliberately not looking. That distinction matters, and it's actually harder to fix than genuine unawareness.",
    survivability: "UNSTABLE",
    financialPressure: "MODERATE-HIGH",
    risks: [
      "No financial feedback loop means problems compound undetected until a threshold event forces the conversation",
      "Account avoidance is functionally equivalent to ignoring symptoms and hoping they resolve on their own",
      "Passive charges grow most aggressively inside awareness gaps — your subscriptions know this",
      "The moment you finally look will feel significantly worse than if you'd been looking regularly",
    ],
    recoveryLevers: [
      {
        lead: "Do one look. Just one.",
        body: "Pull every account balance this week. Don't do anything with it yet. Just know the actual number.",
      },
      {
        lead: "Automate the feedback you're avoiding.",
        body: "Set weekly balance notifications. Let the number reach you passively so avoidance requires active effort.",
      },
      {
        lead: "Start with subscriptions.",
        body: "Easiest win. Cancel everything you can't name without looking. Resubscribe only to what you notice missing.",
      },
      {
        lead: "Name what you're afraid to find.",
        body: "Write it down — the specific number or situation you've been avoiding. Naming it reduces its power over your behavior.",
      },
    ],
  },

  paycheck_hostage: {
    level: "Cash Flow Dependent",
    archetype: "The Paycheck Hostage",
    color: "text-red-500",
    insight:
      "Your finances work exactly as designed — until one variable changes. That's not a budget. That's a system with no fault tolerance.",
    pattern: "Income-Dependent Financial Architecture",
    blindSpot:
      "When nothing has gone wrong, the fragility is invisible. The system feels stable because it hasn't been tested. That is not the same as actually being stable.",
    relationshipRisk:
      "Financial fragility creates a specific kind of relationship stress — one that only surfaces in emergencies, exactly when you have the least capacity to handle it.",
    vehicleAggression:
      "Fixed monthly obligations that made sense at one income level become structural vulnerabilities the moment anything shifts.",
    delusionScore:
      "The math works right now. The problem is 'right now' is doing a lot of load-bearing in that sentence.",
    survivability: "CRITICAL",
    financialPressure: "SEVERE",
    risks: [
      "A two-week income disruption would require debt, borrowing, or significant lifestyle contraction",
      "Your fixed obligations leave no buffer for irregular-but-inevitable expenses",
      "One health event, job disruption, or major repair can trigger a cascade with no recovery mechanism",
      "The system has no capacity to absorb change without structural damage",
    ],
    recoveryLevers: [
      {
        lead: "Build $500 before anything else.",
        body: "Not a full emergency fund. Just $500 of actual insulation between you and the next thing. One number. Start there.",
      },
      {
        lead: "Total your fixed monthly obligations.",
        body: "List every one. Calculate how many days of income they require. That number is your actual fragility index.",
      },
      {
        lead: "Find one reducible fixed cost.",
        body: "Insurance, a subscription audit, a rate renegotiation — one commitment you can lower this month. Small but structural.",
      },
      {
        lead: "Identify your most likely disruption.",
        body: "What's the single most probable thing that could interrupt income or add a major expense? Have a plan for just that one thing.",
      },
    ],
  },

  optimistic_drifter: {
    level: "Optimistically Underwater",
    archetype: "The Optimistic Drifter",
    color: "text-yellow-500",
    insight:
      "Your financial confidence is genuine — it's just attached to a version of the future that hasn't happened yet. You're spending from that future while living in the present.",
    pattern: "Future-Income Anchored Spending",
    blindSpot:
      "Optimism about income trajectory is usually accurate. The error is treating projected income as if it's already arrived. The gap between now and then is where the financial damage accumulates.",
    relationshipRisk:
      "People who share finances with optimistic drifters often carry a disproportionate amount of financial anxiety — one person's optimism becomes the other person's job to absorb.",
    vehicleAggression:
      "Commitments made based on expected future income are structurally identical to commitments made on credit. They work if the assumption holds.",
    delusionScore:
      "The vision is probably right. The timeline is probably generous. The math in the middle doesn't care about either.",
    survivability: "MODERATE",
    financialPressure: "MODERATE",
    risks: [
      "Current financial commitments are calibrated to income you don't have yet",
      "Optimism bias reliably delays corrective action until the cost is significantly higher",
      "The gap between current and expected income is being bridged by debt or quiet depletion",
      "When the income increase arrives, lifestyle will have already expanded to absorb it",
    ],
    recoveryLevers: [
      {
        lead: "Stress-test the timeline.",
        body: "What if the raise or opportunity takes 18 months instead of 6? Does the math still work? Run that version.",
      },
      {
        lead: "Separate hope from plan.",
        body: "What you expect to happen is not a financial plan. Write down what happens if it doesn't.",
      },
      {
        lead: "Reduce one forward-leaning commitment.",
        body: "Identify the financial commitment most dependent on future income and find one way to reduce its footprint now.",
      },
      {
        lead: "Let current income be enough. Temporarily.",
        body: "Live within actual earnings for 60 days and observe what has to change. That's the real picture.",
      },
    ],
  },

  lifestyle_maxxer: {
    level: "Lifestyle Leveraged",
    archetype: "The Lifestyle Maxxer",
    color: "text-red-500",
    insight:
      "You've calibrated your life to your best months, not your average ones. The gap between those two numbers is where your financial stability used to be.",
    pattern: "Lifestyle Calibrated to Peak Income",
    blindSpot:
      "Lifestyle inflation is invisible from the inside because each upgrade felt reasonable in context. The problem isn't any single decision — it's the aggregated baseline they created together.",
    relationshipRisk:
      "Lifestyle creep affects shared finances asymmetrically. The person more attached to the upgraded baseline becomes the implicit veto on any correction.",
    vehicleAggression:
      "Each layer of lifestyle was added during a period of relative abundance. Together they form a fixed cost structure that doesn't compress easily.",
    delusionScore:
      "You can probably point to the income that justified each upgrade. The issue is the income wasn't as permanent as the lifestyle became.",
    survivability: "UNSTABLE",
    financialPressure: "HIGH",
    risks: [
      "Your baseline expenses were calibrated to income peaks, not sustainable averages",
      "Lifestyle compression is psychologically painful in exact proportion to how normalized the level has become",
      "Each upgrade added fixed costs that don't automatically reduce if income changes",
      "The most dangerous phase is when the lifestyle feels completely normal — that's when it's most entrenched",
    ],
    recoveryLevers: [
      {
        lead: "Identify the last three lifestyle upgrades.",
        body: "Anything in the last two years that added a recurring cost. Evaluate each independently against your actual average income, not your peak.",
      },
      {
        lead: "Find the one you'd miss least.",
        body: "There's always one upgrade that felt better in theory than in practice. That one goes first.",
      },
      {
        lead: "Freeze the baseline for 90 days.",
        body: "No new subscriptions, no lifestyle additions. Observe what the current baseline actually costs to maintain.",
      },
      {
        lead: "Calculate the gap number.",
        body: "Difference between average monthly income and fixed monthly obligations. That number is your actual financial margin.",
      },
    ],
  },

  convenience_economy: {
    level: "Friction-Free and Cooked",
    archetype: "The Convenience Economy",
    color: "text-yellow-500",
    insight:
      "You've learned that friction disappears when you pay for it. The problem isn't that this is wrong — it's that you've applied this logic in more places than your budget was built for.",
    pattern: "Friction-Avoidance as Primary Spending Driver",
    blindSpot:
      "Convenience spending feels small per transaction, which is the exact reason it's so effective at accumulating. No single purchase looks like the problem.",
    relationshipRisk:
      "Convenience spending tends to be invisible in shared finances because each transaction is individually defensible. The pattern only becomes visible in aggregate.",
    vehicleAggression:
      "The convenience premium compounds across food, transportation, services, and time. It feels like efficiency. It bills like a second rent.",
    delusionScore:
      "The math is hidden inside the individual transactions. Each one is fine. All of them together is a different conversation.",
    survivability: "MODERATE",
    financialPressure: "MODERATE",
    risks: [
      "Convenience spending is structurally invisible because it happens in small, individually defensible increments",
      "Food delivery and convenience services have high emotional stickiness — they're difficult to remove once normalized",
      "The aggregate cost of friction-avoidance spending often rivals a fixed monthly bill",
      "This pattern accelerates during stressful periods, exactly when the budget has the least capacity",
    ],
    recoveryLevers: [
      {
        lead: "Total one month of convenience spending.",
        body: "Add every delivery, rideshare, prepared meal, and paid convenience service for 30 days. The number is usually clarifying.",
      },
      {
        lead: "Identify the highest-cost friction you pay to avoid.",
        body: "One habit, converted to a monthly number, usually creates the motivation to change it.",
      },
      {
        lead: "Batch instead of eliminate.",
        body: "One grocery run covers five delivery orders. One cooking session covers a week. Consolidation, not deprivation.",
      },
      {
        lead: "Give convenience a line item.",
        body: "A defined monthly number converts it from an invisible leak to a managed expense. The amount matters less than the awareness.",
      },
    ],
  },

  status_investor: {
    level: "Identity-Forward",
    archetype: "The Status Investor",
    color: "text-yellow-500",
    insight:
      "Your spending tells a story about who you're becoming. The math reflects who you are right now. There's a meaningful gap between those two versions, and you're currently funding both.",
    pattern: "Identity-Forward Financial Behavior",
    blindSpot:
      "Status and identity spending is uniquely resistant to correction because it isn't irrational — it's aspirational. The purchases feel like investments in a future self. The balance sheet doesn't agree yet.",
    relationshipRisk:
      "Identity-anchored spending creates financial asymmetry in relationships — one person is building a self-image, the other is funding a vision they may not fully share.",
    vehicleAggression:
      "Commitments made for identity reasons are harder to exit than purely financial ones. The cost isn't just money — it's narrative.",
    delusionScore:
      "The aspirational logic is internally consistent. The problem is aspirational spending at current-self income creates a version of you the math doesn't support yet.",
    survivability: "MODERATE",
    financialPressure: "MODERATE",
    risks: [
      "Aspirational spending requires an income level you may not have reached yet",
      "Identity-anchored commitments are psychologically expensive to reverse — the cost isn't just financial",
      "The gap between self-image and financial reality tends to widen before it narrows",
      "Status spending crowds out savings and investment that would actually close the gap",
    ],
    recoveryLevers: [
      {
        lead: "Separate identity from spending.",
        body: "List the three things you spend on primarily for how they look or feel. Ask: what would change if these were invisible to others?",
      },
      {
        lead: "Invest in the actual version, not the aspired one.",
        body: "Skills, credentials, relationships that move you toward your aspirational self cost less and compound more than the aesthetic of it.",
      },
      {
        lead: "Find the identity spend that isn't earning its keep.",
        body: "Some status spending genuinely opens doors. Most maintains an image. Identify which is which.",
      },
      {
        lead: "Redirect one aspirational spend toward an aspirational asset.",
        body: "Whatever you spend to project the next version of yourself — redirect a portion to the financial foundation that version actually requires.",
      },
    ],
  },

  normalized: {
    level: "Pressure-Adapted",
    archetype: "The Normalized",
    color: "text-red-500",
    insight:
      "You've been under financial pressure long enough that it stopped feeling like pressure. That's not adaptation — it's desensitization, and it removes the signal that would motivate you to change.",
    pattern: "Normalized Financial Instability",
    blindSpot:
      "When nothing has broken yet, the system feels stable. But 'nothing has broken' and 'stable' are not the same thing. The absence of a crisis is not financial health.",
    relationshipRisk:
      "Normalized financial pressure tends to become ambient relationship tension — always present, never directly addressed, because it's started to feel like just how things are.",
    vehicleAggression:
      "Debt that's been present long enough stops feeling like a choice. It starts feeling like weather — something you manage around rather than something you can change.",
    delusionScore:
      "You haven't lost the ability to see the problem. You've lost the urgency to act on it. That's the specific risk profile here, and it's harder to fix than denial.",
    survivability: "CRITICAL",
    financialPressure: "SEVERE",
    risks: [
      "Desensitization to financial pressure removes the signal that normally triggers corrective behavior",
      "Long-term debt normalization is one of the strongest predictors of sustained financial instability",
      "The absence of acute crisis can mask chronic financial deterioration until it becomes structurally irreversible",
      "Normalized pressure calibrates your risk tolerance upward, enabling increasingly poor financial decisions",
    ],
    recoveryLevers: [
      {
        lead: "Recalibrate what 'fine' actually means.",
        body: "Write your actual numbers: total debt, monthly obligations, monthly net. Then evaluate whether 'fine' is accurate or just familiar.",
      },
      {
        lead: "Treat debt like an active problem again.",
        body: "Not guilt — urgency. Pick the smallest debt and eliminate it within 90 days. The goal is to reactivate the feedback loop.",
      },
      {
        lead: "Find the number that would create real movement.",
        body: "What monthly amount, redirected toward debt, would generate visible progress? Even $50 reactivates momentum.",
      },
      {
        lead: "Name the normalization out loud.",
        body: "To someone. The pattern of financial pressure feeling normal needs to be a stated thing before it can become a changed thing.",
      },
    ],
  },

  low_risk: {
    level: "Quietly Functional",
    archetype: "The Functional Adult",
    color: "text-emerald-400",
    insight:
      "Your finances appear more together than you probably give yourself credit for. The patterns here suggest awareness, not avoidance — which puts you in a smaller category than you might expect.",
    pattern: "Low Behavioral Risk Profile",
    blindSpot:
      "The risk for financially functional people is complacency, not crisis. The system works until one assumption quietly stops being true, and the absence of urgency means you might not notice.",
    relationshipRisk:
      "Financial health doesn't make conversations about money easier — it makes them less urgent. That's different from unnecessary.",
    vehicleAggression:
      "Lower financial pressure creates its own blind spot: the sense that since nothing's wrong, nothing needs attention.",
    delusionScore:
      "Relatively grounded. The main risk is overconfidence from a period of stability rather than from structural soundness.",
    survivability: "STABLE",
    financialPressure: "LOW",
    risks: [
      "Stability can mask the gradual erosion of good habits during life transitions",
      "Financial health requires active maintenance — not just the absence of crisis",
    ],
    recoveryLevers: [
      {
        lead: "Document what's working.",
        body: "The habits that got you here are worth writing down so they survive major lifestyle changes.",
      },
      {
        lead: "Stress-test the system.",
        body: "What's the single disruption most likely to challenge your current stability? Have a plan for just that one scenario.",
      },
      {
        lead: "Convert stability into growth.",
        body: "Financial stability is most valuable when it's actively used to build future resilience, not just maintained.",
      },
      {
        lead: "Stay curious about the behavioral patterns.",
        body: "The risks that don't affect you now tend to emerge during specific life transitions. Worth understanding before you're in one.",
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
  // Low score → functional profile regardless of pattern
  if (burnScore < 28) {
    return { ...ARCHETYPES.low_risk, color: "text-emerald-400" };
  }

  // Count weighted behavioral tags across all answers
  const tagCounts: Record<string, number> = {};
  Object.values(answers).forEach((answer: any) => {
    if (answer?.tags) {
      answer.tags.forEach((tag: string) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + (TAG_WEIGHTS[tag] || 1);
      });
    }
  });

  // Find dominant behavioral tag
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

  // Override color based on burn score severity
  let color = base.color;
  if (burnScore >= 75) color = "text-red-500";
  else if (burnScore >= 55) color = "text-orange-500";
  else if (burnScore >= 35) color = "text-yellow-500";
  else color = "text-emerald-400";

  return { ...base, color };
}
