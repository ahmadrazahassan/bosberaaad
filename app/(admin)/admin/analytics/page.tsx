import { AdminShell, SupabaseRequired } from "@/components/admin/AdminShell";
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

type Click = {
  id: string;
  software_name: string;
  affiliate_url: string;
  clicked_at: string;
  country_code: string | null;
  referrer: string | null;
};

const WINDOW_DAYS = 30;

export default async function AnalyticsPage() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return (
      <AdminShell active="/admin/analytics" title="Analytics">
        <SupabaseRequired />
      </AdminShell>
    );
  }

  // A dynamic server component, rendered per request, so reading the clock is
  // correct here. The purity rule targets client render, which this is not.
  // eslint-disable-next-line react-hooks/purity
  const since = new Date(Date.now() - WINDOW_DAYS * 86_400_000).toISOString();

  const { data } = await supabase
    .from("affiliate_clicks")
    .select("*")
    .gte("clicked_at", since)
    .order("clicked_at", { ascending: false })
    .limit(2000);

  const clicks = (data ?? []) as Click[];

  const byProduct = new Map<string, number>();
  for (const click of clicks) {
    byProduct.set(click.software_name, (byProduct.get(click.software_name) ?? 0) + 1);
  }
  const ranked = Array.from(byProduct.entries()).sort((a, b) => b[1] - a[1]);
  const max = ranked[0]?.[1] ?? 1;

  return (
    <AdminShell
      active="/admin/analytics"
      title="Affiliate analytics"
      description={`Clicks in the last ${WINDOW_DAYS} days. IP addresses are stored hashed, never raw.`}
    >
      <div className="flex flex-col gap-8">
        <dl className="grid gap-2 sm:grid-cols-3">
          <div className="card-modern p-6">
            <dt className="text-[0.7rem] font-bold tracking-widest text-muted-foreground uppercase">
              Total clicks
            </dt>
            <dd className="mt-2 font-heading text-3xl font-extrabold tabular-nums tracking-tight">
              {formatNumber(clicks.length)}
            </dd>
          </div>
          <div className="card-modern p-6">
            <dt className="text-[0.7rem] font-bold tracking-widest text-muted-foreground uppercase">
              Products clicked
            </dt>
            <dd className="mt-2 font-heading text-3xl font-extrabold tabular-nums tracking-tight">
              {formatNumber(ranked.length)}
            </dd>
          </div>
          <div className="card-modern p-6">
            <dt className="text-[0.7rem] font-bold tracking-widest text-muted-foreground uppercase">
              Daily average
            </dt>
            <dd className="mt-2 font-heading text-3xl font-extrabold tabular-nums tracking-tight">
              {formatNumber(Math.round(clicks.length / WINDOW_DAYS))}
            </dd>
          </div>
        </dl>

        {ranked.length === 0 ? (
          <div className="card-modern p-12 text-center">
            <h2 className="font-heading text-lg font-bold tracking-tight">No clicks recorded yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Every visit to a vendor goes through the tracking route, so clicks will appear here as
              soon as the site has traffic.
            </p>
          </div>
        ) : (
          <>
            <section className="card-modern p-6">
              <h2 className="font-heading text-lg font-bold tracking-tight">Clicks by product</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {ranked.slice(0, 15).map(([name, count]) => (
                  <li key={name} className="flex items-center gap-4">
                    <span className="w-48 shrink-0 truncate text-sm">{name}</span>
                    <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                      <span
                        className="block h-full rounded-full bg-[var(--color-brand)]"
                        style={{ width: `${(count / max) * 100}%` }}
                      />
                    </span>
                    <span className="w-14 shrink-0 text-right text-sm tabular-nums text-muted-foreground">
                      {formatNumber(count)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="card-modern p-2">
              <Table caption="Most recent affiliate clicks">
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-48">Product</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Referrer</TableHead>
                    <TableHead>When</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clicks.slice(0, 50).map((click) => (
                    <TableRow key={click.id}>
                      <TableCell className="font-medium">{click.software_name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {click.country_code ?? "Unknown"}
                      </TableCell>
                      <TableCell className="max-w-64 truncate text-muted-foreground">
                        {click.referrer ?? "Direct"}
                      </TableCell>
                      <TableCell className="tabular-nums text-muted-foreground">
                        {formatDate(click.clicked_at, "short")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>
          </>
        )}
      </div>
    </AdminShell>
  );
}
