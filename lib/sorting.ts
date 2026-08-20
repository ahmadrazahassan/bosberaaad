/**
 * Sort options live here rather than beside the queries, because the filter
 * controls are client components and importing them from the query layer would
 * drag the Supabase server client into the browser bundle.
 */

export type DirectorySort = "most-reviewed" | "highest-rated" | "recently-updated" | "price-low";

export const DIRECTORY_SORTS: { value: DirectorySort; label: string }[] = [
  { value: "most-reviewed", label: "Most reviewed" },
  { value: "highest-rated", label: "Highest rated" },
  { value: "recently-updated", label: "Recently updated" },
  { value: "price-low", label: "Lowest starting price" },
];

export const DIRECTORY_SORT_VALUES = DIRECTORY_SORTS.map((sort) => sort.value);

export type ReviewSort = "recent" | "helpful" | "highest" | "lowest";

export const REVIEW_SORTS: { value: ReviewSort; label: string }[] = [
  { value: "recent", label: "Most recent" },
  { value: "helpful", label: "Most helpful" },
  { value: "highest", label: "Highest rated" },
  { value: "lowest", label: "Lowest rated" },
];
