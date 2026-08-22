"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Newspaper } from "lucide-react";
import ListingLayout from "@/components/ListingLayout";

interface Sector {
  id: string;
  slug: string;
  name: string;
  jobCount: number;
}

interface SektorListClientProps {
  positions: { slug: string; name: string; jobCount?: number }[];
  sectors: Sector[];
}

export default function SektorListClient({
  positions,
  sectors,
}: SektorListClientProps) {
  const [query, setQuery] = useState("");

  const filteredSectors = useMemo(() => {
    return sectors
      .filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => b.jobCount - a.jobCount);
  }, [sectors, query]);

  return (
    <ListingLayout
      title="Sektorlar"
      subtitle={`${filteredSectors.length} sektor tapıldı`}
      jobs={[]}
      positions={positions}
      sectors={sectors}
    >
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Sektor üzrə axtar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-10 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>

      {/* Sector list */}
      {filteredSectors.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center dark:border-slate-700 dark:bg-slate-900">
          <p className="text-slate-500 dark:text-slate-400">Sektor tapılmadı.</p>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-slate-100 overflow-y-auto rounded-xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
          {filteredSectors.map((sector) => (
            <Link
              key={sector.slug}
              href={`/sektorlar/${sector.slug}`}
              className="flex items-center gap-4 px-4 py-3.5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              {/* Icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                <Newspaper size={18} />
              </div>

              {/* Name */}
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {sector.name}
                </h3>
              </div>

              {/* Job count */}
              <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                {sector.jobCount} elan
              </span>
            </Link>
          ))}
        </div>
      )}
    </ListingLayout>
  );
}
