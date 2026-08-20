import {
  BarChart3Icon,
  BookOpenIcon,
  ExternalLinkIcon,
  InboxIcon,
  LayersIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MailIcon,
  MessageSquareQuoteIcon,
  PackageIcon,
  ScaleIcon,
  SettingsIcon,
  SignpostIcon,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { LogoMark } from "@/components/public/BrandLogo";
import { signOut } from "@/lib/actions/admin";
import { cn } from "@/lib/utils";

const NAV: { group: string; items: { href: string; label: string; icon: LucideIcon }[] }[] = [
  {
    group: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboardIcon }],
  },
  {
    group: "Content",
    items: [
      { href: "/admin/software", label: "Software", icon: PackageIcon },
      { href: "/admin/reviews", label: "Reviews", icon: MessageSquareQuoteIcon },
      { href: "/admin/categories", label: "Categories", icon: LayersIcon },
      { href: "/admin/articles", label: "Articles", icon: BookOpenIcon },
      { href: "/admin/comparisons", label: "Comparisons", icon: ScaleIcon },
      { href: "/admin/pages", label: "Pages", icon: BookOpenIcon },
      { href: "/admin/redirects", label: "Redirects", icon: SignpostIcon },
    ],
  },
  {
    group: "Audience",
    items: [
      { href: "/admin/newsletter", label: "Newsletter", icon: MailIcon },
      { href: "/admin/contact", label: "Messages", icon: InboxIcon },
      { href: "/admin/analytics", label: "Analytics", icon: BarChart3Icon },
    ],
  },
  {
    group: "System",
    items: [{ href: "/admin/settings", label: "Settings", icon: SettingsIcon }],
  },
];

export function AdminShell({
  children,
  active,
  title,
  description,
  actions,
}: {
  children: React.ReactNode;
  /** Href of the nav item to mark current. */
  active: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground lg:flex">
        <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-5">
          <LogoMark className="size-7" />
          <span className="font-heading text-base font-medium tracking-[-0.03em] text-white">
            Bos<span className="font-semibold text-sidebar-primary">beraad</span>
          </span>
        </div>

        <nav aria-label="Admin" className="flex-1 overflow-y-auto p-3">
          {NAV.map((group) => (
            <div key={group.group} className="mb-6">
              <p className="px-3 pb-2 text-[0.65rem] font-bold tracking-[0.18em] text-sidebar-foreground/40 uppercase">
                {group.group}
              </p>
              <ul className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const isActive = active === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors",
                          isActive
                            ? "bg-sidebar-primary font-medium text-sidebar-primary-foreground"
                            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        )}
                      >
                        <item.icon className="size-4 shrink-0" aria-hidden="true" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <ExternalLinkIcon className="size-4" aria-hidden="true" />
            View the site
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <LogOutIcon className="size-4" aria-hidden="true" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-col gap-4 border-b border-border px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <div>
            <h1 className="font-heading text-2xl font-bold tracking-tight">{title}</h1>
            {description ? (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
        </header>

        <div className="flex-1 p-6 lg:p-10">{children}</div>
      </div>
    </div>
  );
}

/** Shown wherever the admin needs Supabase and it is not configured. */
export function SupabaseRequired() {
  return (
    <div className="card-modern mx-auto max-w-lg p-8 text-center">
      <h2 className="font-heading text-xl font-bold tracking-tight">Supabase is not connected</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        The public site runs on the bundled editorial dataset, which is why it renders. The admin
        panel writes to the database, so it needs a project.
      </p>
      <ol className="mt-5 flex flex-col gap-2 text-left text-sm text-muted-foreground">
        <li>1. Create a Supabase project.</li>
        <li>
          2. Put the URL, anon key and service role key in <code>.env.local</code>.
        </li>
        <li>
          3. Run the migrations in <code>supabase/migrations</code> in order.
        </li>
        <li>
          4. Run <code>npm run create-admin</code> then <code>npm run seed</code>.
        </li>
      </ol>
    </div>
  );
}
