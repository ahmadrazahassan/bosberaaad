import type { Software } from "@/lib/types";

/**
 * Ranking uses a Bayesian weighted average rather than a raw star average.
 *
 * A raw average lets a product with eleven reviews at 4.8 outrank one with
 * four hundred at 4.4, which is not useful to a buyer. Each product is blended
 * towards the platform mean, weighted by its own review volume, using the
 * median review count across the set as the prior weight.
 *
 *   score = (v / (v + m)) * R + (m / (v + m)) * C
 *
 *   v = the product's review count
 *   m = prior weight, the median review count across the set
 *   R = the product's own average
 *   C = the mean average across the set
 *
 * A product with many reviews sits close to its own average. A product with
 * few sits closer to the middle until it has earned its position.
 */

export type RankingPriors = {
  /** Mean rating across the comparison set. */
  platformMean: number;
  /** Median review count across the comparison set. */
  priorWeight: number;
};

function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[middle - 1] + sorted[middle]) / 2 : sorted[middle];
}

export function computePriors(items: Software[]): RankingPriors {
  const rated = items.filter((item) => item.review_count > 0);
  if (rated.length === 0) return { platformMean: 0, priorWeight: 1 };

  const platformMean =
    rated.reduce((total, item) => total + item.overall_rating, 0) / rated.length;
  const priorWeight = Math.max(1, median(rated.map((item) => item.review_count)));

  return { platformMean, priorWeight };
}

export function bayesianScore(software: Software, priors: RankingPriors): number {
  const v = software.review_count;
  const m = priors.priorWeight;
  if (v + m === 0) return 0;
  return (v / (v + m)) * software.overall_rating + (m / (v + m)) * priors.platformMean;
}

/**
 * Rank a set of products. Priors are computed from the set passed in, so a
 * category page ranks within its category and the home page ranks across the
 * whole catalogue.
 */
export function rankByBayesian(items: Software[], priorSet: Software[] = items): Software[] {
  const priors = computePriors(priorSet);
  return [...items].sort((a, b) => {
    const difference = bayesianScore(b, priors) - bayesianScore(a, priors);
    if (Math.abs(difference) > 0.0001) return difference;
    return b.review_count - a.review_count;
  });
}
