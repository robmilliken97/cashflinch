export function calculateBurnScore(
    answers: Record<string, any>
  ) {
    const totalPoints = Object.values(answers).reduce(
      (acc: number, curr: any) => acc + (curr?.points || 0),
      0
    );
  
    return Math.min(totalPoints, 100);
  }
  
  export function determineFinancialProfile(
    burnScore: number
  ) {
    if (burnScore >= 85) {
      return {
        level: "Financially Extinct",
  
        archetype: "The Lifestyle Maxxer",
  
        color: "text-red-500",
  
        insight:
          "Your finances appear to be held together primarily by optimism and recurring payments.",
  
        relationshipRisk:
          "Target Run Tactical Unit",
  
        vehicleAggression:
          "Alpha Predator Payment",
  
        delusionScore:
          "Extremely Elevated",
  
        survivability:
          "CRITICAL",
  
        financialPressure:
          "SEVERE",
  
        risks: [
          "Lifestyle inflation detected",
          "Aggressive recurring spending",
          "Subscription overload",
          "High emotional spending",
        ],
      };
    }
  
    if (burnScore >= 65) {
      return {
        level: "Deep Fried",
  
        archetype:
          "The Truck Payment Warrior",
  
        color: "text-orange-500",
  
        insight:
          "You’ve normalized financial stress to an impressive degree.",
  
        relationshipRisk:
          "Weekly Financial Ambush Potential",
  
        vehicleAggression:
          "Emotionally Motivated Financing",
  
        delusionScore:
          "Noticeable",
  
        survivability:
          "UNSTABLE",
  
        financialPressure:
          "HIGH",
  
        risks: [
          "Vehicle payment instability",
          "Impulse spending detected",
          "Lifestyle drift accelerating",
        ],
      };
    }
  
    if (burnScore >= 45) {
      return {
        level: "Medium Rare",
  
        archetype:
          "The Quiet Overspender",
  
        color: "text-yellow-500",
  
        insight:
          "You make enough money to survive, but your habits are quietly applying pressure.",
  
        relationshipRisk:
          "Mostly Stable",
  
        vehicleAggression:
          "Manageable",
  
        delusionScore:
          "Mild",
  
        survivability:
          "MODERATE",
  
        financialPressure:
          "MODERATE",
  
        risks: [
          "Convenience spending",
          "Subscription accumulation",
        ],
      };
    }
  
    return {
      level: "Lightly Toasted",
  
      archetype:
        "The Responsible Adult",
  
      color: "text-emerald-400",
  
      insight:
        "You appear financially functional. Suspiciously functional.",
  
      relationshipRisk:
        "Financially Responsible Household",
  
      vehicleAggression:
        "Civilian-Level Financing",
  
      delusionScore:
        "Low",
  
      survivability:
        "STABLE",
  
      financialPressure:
        "LOW",
  
      risks: [
        "Minor lifestyle inflation",
      ],
    };
  }