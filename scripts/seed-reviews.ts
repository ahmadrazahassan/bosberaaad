/**
 * Reviews only. Useful after moderating or regenerating the corpus.
 * Runs the same code path as the full seed, scoped to one entity, so the
 * two can never disagree about the shape of a row.
 */
process.env.SEED_ONLY = "reviews";

await import("./seed");
export {};
