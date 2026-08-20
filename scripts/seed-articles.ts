/**
 * Articles only.
 * Runs the same code path as the full seed, scoped to one entity, so the
 * two can never disagree about the shape of a row.
 */
process.env.SEED_ONLY = "articles";

await import("./seed");
export {};
