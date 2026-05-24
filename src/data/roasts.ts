export const roastDatabase = [
    {
      id: "doordash-addict",
      condition: (answers: any) =>
        answers.food?.text === "Basically daily",
  
      roast:
        "You appear to be financially sponsored by Uber Eats.",
  
      severity: "high",
    },
  
    {
      id: "subscription-chaos",
      condition: (answers: any) =>
        answers.subscriptions?.text ===
        "I genuinely don't know",
  
      roast:
        "Your subscriptions are now operating autonomously.",
  
      severity: "high",
    },
  
    {
      id: "vehicle-main-character",
      condition: (answers: any) =>
        answers.car?.text === "Financial warfare",
  
      roast:
        "Your vehicle payment has become the main character.",
  
      severity: "high",
    },
  
    {
      id: "emergency-fund",
      condition: (answers: any) =>
        answers.savings?.text ===
        "Absolutely none",
  
      roast:
        "Emergency funds were apparently considered optional.",
  
      severity: "high",
    },
  
    {
      id: "treat-yourself",
      condition: (answers: any) =>
        answers.spending?.text ===
        "Constantly",
  
      roast:
        "You are currently funding emotional recovery through consumer spending.",
  
      severity: "medium",
    },
  
    {
      id: "quietly-cooked",
      condition: (answers: any) =>
        answers.spending?.text === "Sometimes",
  
      roast:
        "You may not be reckless, but your spending habits are quietly plotting against you.",
  
      severity: "medium",
    },
  ];