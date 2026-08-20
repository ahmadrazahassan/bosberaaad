import {
  BookOpenIcon,
  InboxIcon,
  MailIcon,
  MessageSquareQuoteIcon,
  MousePointerClickIcon,
  PackageIcon,
} from "lucide-react";
import Link from "next/link";

import { AdminShell } from "@/components/admin/AdminShell";
import { formatNumber } from "@/lib/format";
import { getSiteStats } from "@/lib/queries/content";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createSupabaseServerClient();
  const stats = await getSiteStats();

  const [pendingReviews, unhandledMessages, subscribers, clicks] = supabase
    ? await Promise.all([
        supabase.from("reviews").select("id", { count: "exact", head: true }).eq("status", "hidden"),
        supabase
          .from("contact_messages")
          .select("id", { count: "exact", head: true })
          .eq("handled", false),
        supabase
          .from("newsletter_subscribers")
          .select("id", { count: "exact", head: true })
          .eq("status", "confirmed"),
        supabase.from("affiliate_clicks").select("id", { count: "exact", head: true }),
      ])
    : [null, null, null, null];

  const tiles = [
    {
      label: "Products",
      value: formatNumber(stats.software),
      href: "/admin/software",
      icon: PackageIcon,
    },
    {
      label: "Published reviews",
      value: formatNumber(stats.reviews),
      href: "/admin/reviews",
      icon: MessageSquareQuoteIcon,
    },
    {
      label: "Articles",
      value: formatNumber(stats.articles),
      href: "/admin/articles",
      icon: BookOpenIcon,
    },
    {
      label: "Affiliate clicks",
      value: formatNumber(clicks?.count ?? 0),
      href: "/admin/analytics",
      icon: MousePointerClickIcon,
    },
    {
      label: "Confirmed subscribers",
      value: formatNumber(subscribers?.count ?? 0),
      href: "/admin/newsletter",
      icon: MailIcon,
    },
    {
      label: "Unread messages",
      value: formatNumber(unhandledMessages?.count ?? 0),
      href: "/admin/contact",
      icon: InboxIcon,
    },
  ];

  const awaitingModeration = pendingReviews?.count ?? 0;

  return (
    <AdminShell
      active="/admin"
      title="Dashboard"
      description={
        supabase
          ? "Everything that needs your attention, in one place."
          : "Running on the bundled dataset. Connect Supabase to edit content."
      }
    >
      <div className="flex flex-col gap-8">
        {awaitingModeration > 0 ? (
          <Link
            href="/admin/reviews?status=hidden"
            className="card-modern card-modern-hover flex items-center justify-between gap-4 p-6"
          >
            <div>
              <p className="font-heading text-lg font-bold tracking-tight">
                {formatNumber(awaitingModeration)} review
                {awaitingModeration === 1 ? "" : "s"} awaiting moderation
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Submissions are held until you publish them. Only published reviews affect the
                rating on a product.
              </p>
            </div>
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[var(--color-brand-deep)] text-[var(--color-brand-ink)]">
              <MessageSquareQuoteIcon className="size-5" aria-hidden="true" />
            </span>
          </Link>
        ) : null}

        <dl className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((tile) => (
            <Link key={tile.label} href={tile.href} className="card-modern card-modern-hover p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <dt className="text-[0.7rem] font-bold tracking-widest text-muted-foreground uppercase">
                    {tile.label}
                  </dt>
                  <dd className="mt-2 font-heading text-3xl font-extrabold tabular-nums tracking-tight">
                    {tile.value}
                  </dd>
                </div>
                <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-muted text-muted-foreground">
                  <tile.icon className="size-5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </dl>

        <div className="card-modern p-6">
          <h2 className="font-heading text-lg font-bold tracking-tight">A reminder on ratings</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            The five averages and the review count on every product are written by the
            <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-xs">update_software_ratings</code>
            trigger, from published reviews only. There is no field anywhere in this admin that lets
            you set them by hand, and that is deliberate. If a rating looks wrong, the fix is a
            review that should or should not be published.
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
