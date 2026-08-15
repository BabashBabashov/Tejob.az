"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, Briefcase } from "lucide-react";

interface Region {
  id: string;
  slug: string;
  name: string;
  jobCount: number;
}

export default function RegionsPage() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/regions/")
      .then((res) => res.json())
      .then((data) => {
        setRegions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredRegions = useMemo(() => {
    return regions
      .filter((region) =>
        region.name.toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => b.jobCount - a.jobCount);
  }, [regions, query]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Şəhər / Rayon
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Rayon üzrə vakansiyalar
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Şəhər/Rayon adına görə axtar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
      </div>

      {filteredRegions.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center dark:border-slate-700 dark:bg-slate-900">
          <p className="text-slate-500 dark:text-slate-400">
            Rayon tapılmadı.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRegions.map((region) => (
            <Link
              key={region.id}
              href={`/rayonlar/${region.slug}`}
              className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-700"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 dark:text-slate-100 dark:group-hover:text-emerald-400">
                    {region.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {region.jobCount} {region.jobCount === 1 ? "elan" : "elan"}
                  </p>
                </div>
              </div>
              <Briefcase
                size={18}
                className="text-slate-300 group-hover:text-emerald-500 dark:text-slate-600"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
