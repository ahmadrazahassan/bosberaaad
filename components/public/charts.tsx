"use client";

import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { withAlpha } from "@/lib/brandColors";
import { formatNumber, formatRating } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * Charts convey the shape. Every one of them is followed by the same figures
 * in a table or a list, so nothing here is the only carrier of information.
 */

/* ------------------------------------------------------ SoftwareRatingsChart */

export function SoftwareRatingsChart({
  data,
  accentColor,
  className,
}: {
  data: { dimension: string; value: number }[];
  accentColor: string;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <div className="h-64 w-full" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="72%">
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis
              dataKey="dimension"
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
            />
            <Radar
              dataKey="value"
              stroke={accentColor}
              fill={accentColor}
              fillOpacity={0.22}
              strokeWidth={2}
              isAnimationActive={false}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <dl className="mt-2 grid gap-2 sm:grid-cols-2">
        {data.map((entry) => (
          <div key={entry.dimension} className="flex items-center justify-between gap-3 text-sm">
            <dt className="text-muted-foreground">{entry.dimension}</dt>
            <dd className="font-heading font-bold tabular-nums">{formatRating(entry.value)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ----------------------------------------------------------- CompanySizeChart */

export function CompanySizeChart({
  data,
  accentColor,
  className,
}: {
  data: { name: string; value: number }[];
  accentColor: string;
  className?: string;
}) {
  const total = data.reduce((sum, entry) => sum + entry.value, 0) || 1;

  return (
    <div className={cn("w-full", className)}>
      <div className="h-64 w-full" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={128}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
            />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} isAnimationActive={false}>
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={withAlpha(accentColor.startsWith("#") ? accentColor : "#ff5a1f", 1 - index * 0.12)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <dl className="mt-2 flex flex-col gap-1.5">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center justify-between gap-3 text-sm">
            <dt className="text-muted-foreground">{entry.name}</dt>
            <dd className="tabular-nums">
              {formatNumber(entry.value)}{" "}
              <span className="text-muted-foreground">
                ({Math.round((entry.value / total) * 100)}%)
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ------------------------------------------------------------------ DonutChart */

export function DonutChart({
  data,
  className,
}: {
  data: { name: string; value: number; colour: string }[];
  className?: string;
}) {
  const total = data.reduce((sum, entry) => sum + entry.value, 0) || 1;

  return (
    <div className={cn("flex flex-col items-center gap-4 sm:flex-row", className)}>
      <div className="h-44 w-44 shrink-0" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius="60%"
              outerRadius="100%"
              paddingAngle={2}
              stroke="none"
              isAnimationActive={false}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.colour} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <dl className="flex w-full flex-col gap-2">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2.5 text-sm">
            <span
              className="size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: entry.colour }}
              aria-hidden="true"
            />
            <dt className="flex-1 text-muted-foreground">{entry.name}</dt>
            <dd className="font-heading font-bold tabular-nums">
              {Math.round((entry.value / total) * 100)}%
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
