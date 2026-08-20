import { DownloadIcon } from "lucide-react";

import { AdminShell, SupabaseRequired } from "@/components/admin/AdminShell";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatNumber } from "@/lib/format";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Subscriber = {
  id: string;
  email: string;
  status: string;
  interests: string[] | null;
  confirmed_at: string | null;
  created_at: string;
  consent_source: string | null;
};

export default async function NewsletterAdminPage() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return (
      <AdminShell active="/admin/newsletter" title="Newsletter">
        <SupabaseRequired />
      </AdminShell>
    );
  }

  const { data } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  const subscribers = (data ?? []) as Subscriber[];
  const confirmed = subscribers.filter((s) => s.status === "confirmed").length;
  const pending = subscribers.filter((s) => s.status === "pending").length;
  const unsubscribed = subscribers.filter((s) => s.status === "unsubscribed").length;

  return (
    <AdminShell
      active="/admin/newsletter"
      title="Newsletter"
      description="Double opt in. Only confirmed subscribers should ever receive a send."
      actions={
        // A plain anchor on purpose. The target is a route handler returning a
        // CSV attachment, not a page, so it needs a real navigation for the
        // browser to handle the download rather than a client side transition.
        // eslint-disable-next-line @next/next/no-html-link-for-pages
        <a
          href="/admin/newsletter-export"
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
        >
          <DownloadIcon className="size-4" aria-hidden="true" />
          Export confirmed
        </a>
      }
    >
      <div className="flex flex-col gap-8">
        <dl className="grid gap-2 sm:grid-cols-3">
          {[
            { label: "Confirmed", value: confirmed, variant: "success" as const },
            { label: "Awaiting confirmation", value: pending, variant: "amber" as const },
            { label: "Unsubscribed", value: unsubscribed, variant: "muted" as const },
          ].map((tile) => (
            <div key={tile.label} className="card-modern p-6">
              <dt className="text-[0.7rem] font-bold tracking-widest text-muted-foreground uppercase">
                {tile.label}
              </dt>
              <dd className="mt-2 font-heading text-3xl font-extrabold tabular-nums tracking-tight">
                {formatNumber(tile.value)}
              </dd>
            </div>
          ))}
        </dl>

        {subscribers.length === 0 ? (
          <div className="card-modern p-12 text-center">
            <h2 className="font-heading text-lg font-bold tracking-tight">No subscribers yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Signups from the site will appear here as soon as they arrive.
            </p>
          </div>
        ) : (
          <div className="card-modern p-2">
            <Table caption="Newsletter subscribers">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-64">Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Interests</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Signed up</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell className="font-medium">{subscriber.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          subscriber.status === "confirmed"
                            ? "success"
                            : subscriber.status === "pending"
                              ? "amber"
                              : "muted"
                        }
                      >
                        {subscriber.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {subscriber.interests?.length ? subscriber.interests.join(", ") : "All"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {subscriber.consent_source ?? "site"}
                    </TableCell>
                    <TableCell className="tabular-nums text-muted-foreground">
                      {formatDate(subscriber.created_at, "short")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
