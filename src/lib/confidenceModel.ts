/**
 * Probabilistic Confidence Model — freshness decay and confidence ranges.
 * Replaces static confidence scores with time-aware probabilistic estimates.
 */

const DEFAULT_HALF_LIFE_DAYS = 30; // confidence halves every 30 days without re-verification
const MIN_CONFIDENCE = 15; // floor — never show below this
const UNCERTAINTY_MARGIN = 7; // ±7 points for range display

export interface ConfidenceResult {
  /** Adjusted score after freshness decay (0-100) */
  adjustedScore: number;
  /** Original base score */
  baseScore: number;
  /** Low end of confidence range */
  rangeLow: number;
  /** High end of confidence range */
  rangeHigh: number;
  /** Freshness status */
  freshness: "fresh" | "aging" | "stale";
  /** Days since last verification */
  daysSinceVerified: number;
  /** Decay factor applied (0-1) */
  decayFactor: number;
}

/**
 * Calculate freshness-adjusted confidence with decay.
 */
export function calculateConfidence(
  baseScore: number,
  lastVerifiedAt: string,
  halfLifeDays = DEFAULT_HALF_LIFE_DAYS
): ConfidenceResult {
  const now = new Date();
  const verified = new Date(lastVerifiedAt);
  const daysSinceVerified = Math.max(0, (now.getTime() - verified.getTime()) / (1000 * 60 * 60 * 24));

  // Exponential decay: score * 0.5^(days / halfLife)
  const decayFactor = Math.pow(0.5, daysSinceVerified / halfLifeDays);
  const adjustedScore = Math.max(MIN_CONFIDENCE, Math.round(baseScore * decayFactor));

  // Uncertainty grows with age
  const ageUncertainty = Math.min(15, Math.round(daysSinceVerified / 5));
  const rangeLow = Math.max(0, adjustedScore - UNCERTAINTY_MARGIN - ageUncertainty);
  const rangeHigh = Math.min(100, adjustedScore + UNCERTAINTY_MARGIN);

  // Freshness classification
  let freshness: "fresh" | "aging" | "stale";
  if (daysSinceVerified <= 7) freshness = "fresh";
  else if (daysSinceVerified <= 30) freshness = "aging";
  else freshness = "stale";

  return {
    adjustedScore,
    baseScore,
    rangeLow,
    rangeHigh,
    freshness,
    daysSinceVerified: Math.round(daysSinceVerified),
    decayFactor,
  };
}

/**
 * Format confidence as a display string.
 */
export function formatConfidenceRange(result: ConfidenceResult): string {
  return `${result.rangeLow}–${result.rangeHigh}%`;
}

/**
 * Format confidence for compact display.
 */
export function formatConfidenceCompact(result: ConfidenceResult): string {
  return `${result.adjustedScore}%`;
}

/**
 * Get CSS class for freshness indicator.
 */
export function getFreshnessColor(freshness: "fresh" | "aging" | "stale"): string {
  switch (freshness) {
    case "fresh": return "text-emerald-500";
    case "aging": return "text-amber-500";
    case "stale": return "text-red-400";
  }
}

/**
 * Get freshness label.
 */
export function getFreshnessLabel(freshness: "fresh" | "aging" | "stale"): string {
  switch (freshness) {
    case "fresh": return "Fresh";
    case "aging": return "Aging";
    case "stale": return "Stale";
  }
}

/**
 * Check if a listing needs re-verification based on decay.
 */
export function needsReverification(
  baseScore: number,
  lastVerifiedAt: string,
  threshold = 60
): boolean {
  const { adjustedScore } = calculateConfidence(baseScore, lastVerifiedAt);
  return adjustedScore < threshold;
}
