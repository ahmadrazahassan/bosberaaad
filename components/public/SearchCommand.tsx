"use client";

import { Command } from "cmdk";
import { BookOpenIcon, LayersIcon, PackageIcon, ScaleIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/overlays";
import { formatRating } from "@/lib/format";
import type { SearchIndexEntry } from "@/lib/types";
import { cn } from "@/lib/utils";

const GROUPS = [
  { type: "software" as const, heading: "Software", icon: PackageIcon },
  { type: "comparison" as const, heading: "Comparisons", icon: ScaleIcon },
  { type: "article" as const, heading: "Articles", icon: BookOpenIcon },
  { type: "category" as const, heading: "Categories", icon: LayersIcon },
];

export function SearchCommand({
  index,
  open,
  onOpenChange,
}: {
  index: SearchIndexEntry[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  /* Clearing on close belongs in the event, not in an effect watching `open`. */
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!next) setQuery("");
      onOpenChange(next);
    },
    [onOpenChange],
  );

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen(!open);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl gap-0 overflow-hidden p-0" showClose={false}>
        <DialogTitle className="sr-only">Search Bosberaaad</DialogTitle>
        <DialogDescription className="sr-only">
          Search software, comparisons, articles and categories.
        </DialogDescription>

        <Command
          className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[0.7rem] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:uppercase"
          shouldFilter
        >
          <div className="flex items-center gap-3 border-b border-border px-5">
            <SearchIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <Command.Input
              value={query}
              onValueChange={setQuery}
              placeholder="Search software, comparisons and guides"
              className="h-14 w-full bg-transparent text-base outline-hidden placeholder:text-muted-foreground"
            />
            <kbd className="hidden shrink-0 rounded-md border border-border px-1.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground sm:block">
              esc
            </kbd>
          </div>

          <Command.List className="max-h-[26rem] overflow-y-auto p-2">
            <Command.Empty className="px-3 py-10 text-center text-sm text-muted-foreground">
              Nothing matched that. Try a vendor name, a category or a compliance term such as
              VAT201.
            </Command.Empty>

            {GROUPS.map(({ type, heading, icon: Icon }) => {
              const entries = index.filter((entry) => entry.type === type);
              if (entries.length === 0) return null;

              return (
                <Command.Group key={type} heading={heading}>
                  {entries.map((entry) => (
                    <Command.Item
                      key={entry.href}
                      value={`${entry.title} ${entry.subtitle}`}
                      onSelect={() => go(entry.href)}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm",
                        "data-[selected=true]:bg-muted",
                      )}
                    >
                      <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium">{entry.title}</span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {entry.subtitle}
                        </span>
                      </span>
                      {entry.rating ? (
                        <span className="shrink-0 font-heading text-sm font-bold tabular-nums text-muted-foreground">
                          {formatRating(entry.rating)}
                        </span>
                      ) : null}
                    </Command.Item>
                  ))}
                </Command.Group>
              );
            })}
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
