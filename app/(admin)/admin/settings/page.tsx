import { AdminShell, SupabaseRequired } from "@/components/admin/AdminShell";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import { SettingsForm, type Setting } from "./SettingsForm";

export const dynamic = "force-dynamic";

/**
 * Settings the editorial team may change without a deployment. Anything that
 * belongs in code, such as the brand palette or the compliance checklists,
 * deliberately does not appear here.
 */
export const SETTING_DEFINITIONS: { key: string; label: string; help: string; multiline?: boolean }[] =
  [
    {
      key: "announcement",
      label: "Site announcement",
      help: "Leave blank for none. Shown nowhere until you add a banner, and stored here so it is ready.",
      multiline: true,
    },
    {
      key: "affiliate_disclosure_short",
      label: "Short affiliate disclosure",
      help: "The one line shown next to commercial buttons.",
      multiline: true,
    },
    {
      key: "price_check_note",
      label: "Price freshness note",
      help: "Appears under pricing tables on every product page.",
      multiline: true,
    },
    {
      key: "adsense_client",
      label: "AdSense client ID",
      help: "Leave blank while advertising slots are placeholders.",
    },
    {
      key: "contact_response_days",
      label: "Stated reply time, working days",
      help: "Used in copy on the contact page and in confirmation messages.",
    },
  ];

export default async function SettingsPage() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return (
      <AdminShell active="/admin/settings" title="Settings">
        <SupabaseRequired />
      </AdminShell>
    );
  }

  const { data } = await supabase.from("site_settings").select("key, value");
  const stored = new Map((data ?? []).map((row) => [String(row.key), String(row.value ?? "")]));

  const settings: Setting[] = SETTING_DEFINITIONS.map((definition) => ({
    ...definition,
    value: stored.get(definition.key) ?? "",
  }));

  return (
    <AdminShell
      active="/admin/settings"
      title="Settings"
      description="Values the editorial team can change without a deployment."
    >
      <div className="card-modern max-w-3xl p-6 lg:p-8">
        <SettingsForm settings={settings} />
      </div>
    </AdminShell>
  );
}
