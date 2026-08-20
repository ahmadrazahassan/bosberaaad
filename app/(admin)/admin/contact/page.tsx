import { AdminShell, SupabaseRequired } from "@/components/admin/AdminShell";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import { HandledToggle } from "./HandledToggle";

export const dynamic = "force-dynamic";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  handled: boolean;
  created_at: string;
};

export default async function ContactAdminPage() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return (
      <AdminShell active="/admin/contact" title="Messages">
        <SupabaseRequired />
      </AdminShell>
    );
  }

  const { data } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  const messages = (data ?? []) as Message[];
  const unhandled = messages.filter((message) => !message.handled).length;

  return (
    <AdminShell
      active="/admin/contact"
      title="Messages"
      description={`${unhandled} awaiting a reply. We tell people we respond within two working days.`}
    >
      {messages.length === 0 ? (
        <div className="card-modern p-12 text-center">
          <h2 className="font-heading text-lg font-bold tracking-tight">No messages yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Submissions from the contact form arrive here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <article key={message.id} className="card-modern flex flex-col gap-4 p-6">
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-heading text-base font-bold tracking-tight">
                    {message.subject}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {message.name},{" "}
                    <a
                      href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject}`)}`}
                      className="underline underline-offset-4 hover:text-foreground"
                    >
                      {message.email}
                    </a>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={message.handled ? "success" : "amber"}>
                    {message.handled ? "Handled" : "Open"}
                  </Badge>
                  <time
                    className="text-xs tabular-nums text-muted-foreground"
                    dateTime={message.created_at}
                  >
                    {formatDate(message.created_at, "short")}
                  </time>
                </div>
              </header>

              <p className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
                {message.message}
              </p>

              <footer className="border-t border-border pt-4">
                <HandledToggle id={message.id} handled={message.handled} />
              </footer>
            </article>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
