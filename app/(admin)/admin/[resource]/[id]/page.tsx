import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminShell, SupabaseRequired } from "@/components/admin/AdminShell";
import { ResourceForm } from "@/components/admin/ResourceForm";
import { loadRecord, loadReferences } from "@/lib/admin/data";
import { getResource } from "@/lib/admin/resources";
import { hasSupabase } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function EditResourcePage(props: PageProps<"/admin/[resource]/[id]">) {
  const { resource: key, id } = await props.params;

  const resource = getResource(key);
  if (!resource) notFound();

  if (!hasSupabase()) {
    return (
      <AdminShell active={`/admin/${resource.key}`} title={`Edit ${resource.labelSingular.toLowerCase()}`}>
        <SupabaseRequired />
      </AdminShell>
    );
  }

  const [record, references] = await Promise.all([
    loadRecord(resource, id),
    loadReferences(resource),
  ]);

  if (!record) notFound();

  const title = String(record[resource.titleField] ?? id);
  const publicHref =
    resource.key === "software"
      ? `/software/${record.slug}`
      : resource.key === "articles"
        ? `/blog/${record.slug}`
        : resource.key === "categories"
          ? `/category/${record.slug}`
          : resource.key === "pages"
            ? `/${record.slug}`
            : null;

  return (
    <AdminShell
      active={`/admin/${resource.key}`}
      title={title}
      description={`Editing a ${resource.labelSingular.toLowerCase()}`}
      actions={
        publicHref ? (
          <Link
            href={publicHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center rounded-xl border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
          >
            View on the site
          </Link>
        ) : null
      }
    >
      <div className="card-modern p-6 lg:p-8">
        <ResourceForm resource={resource} record={record} references={references} />
      </div>
    </AdminShell>
  );
}
