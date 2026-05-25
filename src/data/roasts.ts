export const roastDatabase = [
  // ── EMOTIONAL SPENDING ──────────────────────────────────────────────
  {
    id: "emotional-regulation",
    condition: (answers: any) =>
      answers.stress_spending?.points >= 22,
    roast:
      "You use spending the way other people use therapy — except it bills you without solving anything, and the receipts don't expire.",
    severity: "high",
  },
  {
    id: "deserve-it-economy",
    condition: (answers: any) =>
      answers.stress_spending?.points >= 16 && answers.good_month?.points >= 18,
    roast:
      "Your spending goes up when you earn more and goes up when you're stressed. It appears to have only one direction.",
    severity: "high",
  },
  {
    id: "stress-premium",
    condition: (answers: any) =>
      answers.stress_spending?.points >= 16 && answers.convenience?.points >= 16,
    roast:
      "You've built a stress-response that costs money. Somewhere there's a behavioral economist writing a paper about you specifically.",
    severity: "medium",
  },

  // ── AVOIDANCE ───────────────────────────────────────────────────────
  {
    id: "strategic-ignorance",
    condition: (answers: any) =>
      answers.avoidance?.points >= 24,
    roast:
      "You've chosen financial vibes over financial data. The data is still there. It's just waiting.",
    severity: "high",
  },
  {
    id: "double-avoidance",
    condition: (answers: any) =>
      answers.avoidance?.points >= 18 && answers.financial_plan?.points >= 18,
    roast:
      "You don't know the exact state of your finances and you don't have a specific plan for them. You are, technically, navigating blind. The fact that it's working is the concerning part — not the reassuring one.",
    severity: "high",
  },
  {
    id: "ghost-subscriptions",
    condition: (answers: any) =>
      answers.avoidance?.points >= 18 && answers.subscriptions?.points >= 16,
    roast:
      "You have recurring charges you've never consciously approved, in accounts you actively avoid checking. This is a very specific genre of financial horror story.",
    severity: "high",
  },

  // ── PAYCHECK DEPENDENCY ─────────────────────────────────────────────
  {
    id: "fault-tolerance",
    condition: (answers: any) =>
      answers.paycheck_delay?.points >= 20,
    roast:
      "Your financial system has no redundancy built in. In engineering, we call that a single point of failure. In personal finance, we call that Tuesday.",
    severity: "high",
  },
  {
    id: "cascade-risk",
    condition: (answers: any) =>
      answers.paycheck_delay?.points >= 20 && answers.debt_feeling?.points >= 18,
    roast:
      "Your income covers your debt and your debt requires your income and neither of these things is a buffer. That's not a financial plan, that's a tightrope.",
    severity: "high",
  },

  // ── FUTURE INCOME RELIANCE ──────────────────────────────────────────
  {
    id: "future-income-accounting",
    condition: (answers: any) =>
      answers.future_reliance?.points >= 20,
    roast:
      "You are currently spending money you are planning to make. That's a financial strategy, technically. It's also how most cautionary tales begin.",
    severity: "high",
  },
  {
    id: "raise-dependent",
    condition: (answers: any) =>
      answers.future_reliance?.points >= 20 && answers.financial_plan?.points >= 18,
    roast:
      "Your financial plan and your income plan are the same plan. That would be fine if it were a plan. It's currently more of a shared hope.",
    severity: "high",
  },

  // ── LIFESTYLE DRIFT ─────────────────────────────────────────────────
  {
    id: "lifestyle-ratchet",
    condition: (answers: any) =>
      answers.good_month?.points >= 18,
    roast:
      "Your lifestyle learned to upgrade. It never learned to downgrade. That's not flexibility — that's a ratchet.",
    severity: "medium",
  },
  {
    id: "peak-month-calibration",
    condition: (answers: any) =>
      answers.good_month?.points >= 28,
    roast:
      "You adapted your lifestyle to your best months and then kept living there. The math only works if every month is your best month.",
    severity: "high",
  },

  // ── DEBT NORMALIZATION ──────────────────────────────────────────────
  {
    id: "debt-weather",
    condition: (answers: any) =>
      answers.debt_feeling?.points >= 24,
    roast:
      "You've made peace with your debt, which sounds like wisdom until you realize peace was never the goal — movement was.",
    severity: "high",
  },
  {
    id: "debt-ecosystem",
    condition: (answers: any) =>
      answers.debt_feeling?.points >= 28,
    roast:
      "Your debt has been around long enough that you've stopped thinking of it as a problem and started thinking of it as a condition. Those require different treatments.",
    severity: "high",
  },

  // ── SUBSCRIPTION BLINDNESS ──────────────────────────────────────────
  {
    id: "subscription-autonomy",
    condition: (answers: any) =>
      answers.subscriptions?.points >= 22,
    roast:
      "You have a subscription ecosystem operating independently of your conscious participation. It's self-managing. Unfortunately, it's managing your money.",
    severity: "medium",
  },

  // ── IDENTITY SPENDING ───────────────────────────────────────────────
  {
    id: "aspirational-accounting",
    condition: (answers: any) =>
      answers.identity_spend?.points >= 18,
    roast:
      "You've been funding the next version of yourself before the current version could afford it. That's either visionary or very expensive. Possibly both.",
    severity: "medium",
  },
  {
    id: "narrative-debt",
    condition: (answers: any) =>
      answers.identity_spend?.points >= 24,
    roast:
      "Your biggest financial commitment is primarily about identity, not function. The exit cost isn't just financial — it's narrative. That makes it significantly harder to change.",
    severity: "high",
  },

  // ── CONVENIENCE SPENDING ────────────────────────────────────────────
  {
    id: "friction-tax",
    condition: (answers: any) =>
      answers.convenience?.points >= 22,
    roast:
      "You've quietly built a subscription to your own convenience. It's billed daily, the terms are unclear, and you've accepted all of them.",
    severity: "medium",
  },

  // ── NO PLAN ─────────────────────────────────────────────────────────
  {
    id: "vibe-budget",
    condition: (answers: any) =>
      answers.financial_plan?.points >= 18,
    roast:
      "Your financial plan is a general sense that things will probably be okay. That's not a plan — that's a disposition. They perform very differently in a crisis.",
    severity: "medium",
  },
  {
    id: "next-paycheck-plan",
    condition: (answers: any) =>
      answers.financial_plan?.points >= 28,
    roast:
      "The plan is the next paycheck. The next plan is also the next paycheck. This works until the paycheck is the one variable that changes.",
    severity: "high",
  },
];
