import { roastDatabase } from "../data/roasts";

export function generateRoasts(answers: any) {
  const matchedRoasts = roastDatabase.filter((entry) =>
    entry.condition(answers)
  );

  return matchedRoasts;
}