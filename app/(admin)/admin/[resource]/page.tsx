import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminShell, SupabaseRequired } from "@/components/admin/AdminShell";
import { CtaButton } from "@/components/public/CtaButton";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { loadRecords } from "@/lib/admin/data";
import { getResource, RESOURCE_KEYS } from "@/lib/admin/resources";
import { formatDate, formatNumber } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return RESOURCE_KEYS.map((resource) => ({ resource }));
}

export default async function ResourceListPage(props: PageProps<"/admin/[resource]">) {
  const { resource: key } = await props.params;
  const searchParams = await props.searchParams;

  const resource = getResource(key);
  if (!resource) notFound();

  const statusFilter = Array.isArray(searchParams.status)
    ? searchParams.status[0]
    : searchParams.status;

  const result = await loadRecords(resource, statusFilter ? { status: statusFilter } : {});

  return (
    <AdminShell
      active={`/admin/${resource.key}`}
      title={resource.label}
      description={
        result.available
          ? `${formatNumber(result.rows.length)} ${result.rows.length === 1 ? "row" : "rows"}${statusFilter ? `, filtered to ${statusFilter}` : ""}`
          : undefined
      }
      actions={
        resource.canCreate ? (
          <CtaButton href={`/admin/${resource.key}/new`} size="sm">
            New {resource.labelSingular.toLowerCase()}
          </CtaButton>
        ) : null
      }
    >
      {!result.available ? (
        <SupabaseRequired />
      ) : result.rows.length === 0 ? (
        <div className="card-modern p-12 text-center">
          <h2 className="font-heading text-lg font-bold tracking-tight">Nothing here yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {resource.canCreate
              ? `Create your first ${resource.labelSingular.toLowerCase()}, or run the seed scripts.`
              : "Rows will appear here once there are some."}
          </p>
        </div>
      ) : (
        <div className="card-modern p-2">
          <Table caption={`${resource.label} list`}>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-64">{resource.labelSingular}</TableHead>
                {resource.listFields.map((field) => (
                  <TableHead key={field.name}>{field.label}</TableHead>
                ))}
                <TableHead className="text-right">Edit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.rows.map((row) => {
                const id = String(row.id);
                return (
                  <TableRow key={id}>
                    <TableCell className="font-medium">
                      <Link
                        href={`/admin/${resource.key}/${id}`}
                        className="hover:text-[var(--color-brand-dark)]"
                      >
                        {String(row[resource.titleField] ?? id)}
                      </Link>
                    </TableCell>

                    {resource.listFields.map((field) => (
                      <TableCell key={field.name}>
                        <Cell value={row[field.name]} type={field.type} name={field.name} />
                      </TableCell>
                    ))}

                    <TableCell className="text-right">
                      <Link
                        href={`/admin/${resource.key}/${id}`}
                        className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
                      >
                        Edit
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </AdminShell>
  );
}

function Cell({ value, type, name }: { value: unknown; type?: string; name: string }) {
  if (value === null || value === undefined) {
    return <span className="text-muted-foreground">Not set</span>;
  }

  if (name === "status") {
    const status = String(value);
    return (
      <Badge variant={status === "published" ? "success" : status === "hidden" ? "amber" : "muted"}>
        {status}
      </Badge>
    );
  }

  if (type === "date") {
    return <span className="tabular-nums">{formatDate(String(value), "short")}</span>;
  }

  if (type === "number") {
    return <span className="tabular-nums">{formatNumber(Number(value))}</span>;
  }

  return <span>{String(value)}</span>;
}
