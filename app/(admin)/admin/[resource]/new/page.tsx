import { notFound } from "next/navigation";

import { AdminShell, SupabaseRequired } from "@/components/admin/AdminShell";
import { ResourceForm } from "@/components/admin/ResourceForm";
import { loadReferences } from "@/lib/admin/data";
import { getResource } from "@/lib/admin/resources";
import { hasSupabase } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function NewResourcePage(props: PageProps<"/admin/[resource]/new">) {
  const { resource: key } = await props.params;

  const resource = getResource(key);
  if (!resource || !resource.canCreate) notFound();

  const references = await loadReferences(resource);

  return (
    <AdminShell
      active={`/admin/${resource.key}`}
      title={`New ${resource.labelSingular.toLowerCase()}`}
      description={`Fields are defined by the resource registry, so nothing outside the whitelist can be written.`}
    >
      {hasSupabase() ? (
        <div className="card-modern p-6 lg:p-8">
          <ResourceForm resource={resource} references={references} />
        </div>
      ) : (
        <SupabaseRequired />
      )}
    </AdminShell>
  );
}
