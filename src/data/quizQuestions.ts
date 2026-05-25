export type AnswerOption = {
  text: string;
  points: number;
  tags: string[];
};

export type Question = {
  id: string;
  question: string;
  options: AnswerOption[];
};

export const quizQuestions: Question[] = [
  {
    id: "paycheck_delay",
    question: "If your paycheck was delayed by two weeks, what changes first?",
    options: [
      { text: "Nothing — I have savings that cover this", points: 1, tags: [] },
      { text: "I'd shuffle some things but manage fine", points: 8, tags: ["paycheck_dependent"] },
      { text: "A few bills would be late or I'd lean on a card", points: 20, tags: ["paycheck_dependent", "debt_normalized"] },
      { text: "It would cascade into multiple real problems", points: 28, tags: ["paycheck_dependent", "optimist_bias"] },
    ],
  },
  {
    id: "avoidance",
    question: "How often do you avoid checking certain account balances?",
    options: [
      { text: "Never — I track everything regularly", points: 1, tags: [] },
      { text: "Occasionally, but I know the rough numbers", points: 8, tags: ["avoider"] },
      { text: "Sometimes, especially after a rough spending stretch", points: 18, tags: ["avoider", "emotional_spender"] },
      { text: "Pretty often — I'd rather not know", points: 24, tags: ["avoider", "awareness_deficit"] },
      { text: "Actively — I know what I'd find and I'm not ready for that", points: 28, tags: ["avoider", "awareness_deficit", "debt_normalized"] },
    ],
  },
  {
    id: "stress_spending",
    question: "How often does a rough day turn into unnecessary spending?",
    options: [
      { text: "Almost never", points: 1, tags: [] },
      { text: "Rarely, but it happens", points: 8, tags: ["emotional_spender"] },
      { text: "Sometimes — the 'I deserve this' logic kicks in", points: 16, tags: ["emotional_spender"] },
      { text: "Pretty reliably, especially with certain kinds of stress", points: 22, tags: ["emotional_spender", "avoider"] },
      { text: "Regularly — it's basically how I decompress", points: 28, tags: ["emotional_spender", "lifestyle_drifter"] },
    ],
  },
  {
    id: "good_month",
    question: "When you have a really good income month, what happens to your spending?",
    options: [
      { text: "Same as usual — I save or invest the extra", points: 1, tags: [] },
      { text: "I treat myself a little but stay mostly controlled", points: 8, tags: ["lifestyle_drifter"] },
      { text: "It goes up — I earned it", points: 18, tags: ["lifestyle_drifter", "emotional_spender"] },
      { text: "My lifestyle quietly upgrades and rarely comes fully back down", points: 28, tags: ["lifestyle_drifter", "optimist_bias"] },
    ],
  },
  {
    id: "convenience",
    question: "Honestly, what percentage of your food and coffee spending is really 'I don't want to deal with this right now'?",
    options: [
      { text: "Almost none — I plan ahead", points: 1, tags: [] },
      { text: "Maybe 20–30%", points: 8, tags: ["convenience_addict"] },
      { text: "Probably half of it", points: 16, tags: ["convenience_addict", "emotional_spender"] },
      { text: "Most of it — convenience is the point", points: 22, tags: ["convenience_addict", "lifestyle_drifter"] },
      { text: "That's just how I eat. Cooking isn't realistic right now.", points: 28, tags: ["convenience_addict", "awareness_deficit"] },
    ],
  },
  {
    id: "financial_plan",
    question: "How would you honestly describe your financial plan?",
    options: [
      { text: "Specific — I budget and track it regularly", points: 1, tags: [] },
      { text: "General — I have a sense of what I should be doing", points: 10, tags: ["optimist_bias"] },
      { text: "More of a financial vibe than an actual plan", points: 18, tags: ["optimist_bias", "avoider"] },
      { text: "Spend what I need and hope the rest works out", points: 24, tags: ["optimist_bias", "lifestyle_drifter"] },
      { text: "Next paycheck is the plan", points: 28, tags: ["optimist_bias", "paycheck_dependent"] },
    ],
  },
  {
    id: "debt_feeling",
    question: "How do you relate to your current debt?",
    options: [
      { text: "I have little to none — it's not really a factor", points: 1, tags: [] },
      { text: "It's manageable and I'm actively paying it down", points: 8, tags: [] },
      { text: "It's real, but I try not to think about the total", points: 18, tags: ["debt_normalized", "avoider"] },
      { text: "I've kind of made peace with it being part of my life", points: 24, tags: ["debt_normalized", "optimist_bias"] },
      { text: "I've stopped tracking it — the number stopped feeling useful", points: 28, tags: ["debt_normalized", "awareness_deficit"] },
    ],
  },
  {
    id: "subscriptions",
    question: "When's the last time you audited everything charging you monthly?",
    options: [
      { text: "Recently — I know exactly what I pay for", points: 1, tags: [] },
      { text: "Within the last year", points: 8, tags: ["awareness_deficit"] },
      { text: "Probably over a year ago", points: 16, tags: ["awareness_deficit", "avoider"] },
      { text: "I genuinely couldn't tell you", points: 22, tags: ["awareness_deficit", "lifestyle_drifter"] },
      { text: "I haven't, and I'm not entirely sure I want to", points: 28, tags: ["awareness_deficit", "avoider", "emotional_spender"] },
    ],
  },
  {
    id: "future_reliance",
    question: "Are any of your current financial commitments counting on income you don't have yet?",
    options: [
      { text: "No — everything is covered by what I make now", points: 1, tags: [] },
      { text: "Slightly, but it's realistic and close", points: 10, tags: ["optimist_bias"] },
      { text: "I'm counting on things improving relatively soon", points: 20, tags: ["optimist_bias", "future_reliant"] },
      { text: "Yes — my current lifestyle requires an income bump to actually work", points: 28, tags: ["future_reliant", "lifestyle_drifter", "optimist_bias"] },
    ],
  },
  {
    id: "identity_spend",
    question: "What's the most honest reason for your biggest financial commitment right now?",
    options: [
      { text: "Purely practical — I researched it and it made sense", points: 1, tags: [] },
      { text: "Mix of practical and I genuinely enjoy it", points: 8, tags: ["status_spender"] },
      { text: "It matches where I see myself heading", points: 18, tags: ["status_spender", "future_reliant"] },
      { text: "Mainly how it looks or feels, not what I actually need", points: 24, tags: ["status_spender", "lifestyle_drifter"] },
      { text: "I can't answer this without feeling something", points: 28, tags: ["status_spender", "emotional_spender", "avoider"] },
    ],
  },
];
