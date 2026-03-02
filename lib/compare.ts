export type ComparisonResult = "win" | "lose" | "tie";

export function compareValues(
  a: number,
  b: number,
  higherIsBetter: boolean
): { aResult: ComparisonResult; bResult: ComparisonResult } {
  if (a === b) return { aResult: "tie", bResult: "tie" };
  const aWins = higherIsBetter ? a > b : a < b;
  return {
    aResult: aWins ? "win" : "lose",
    bResult: aWins ? "lose" : "win",
  };
}
