"use client";

import { Search, SlidersHorizontal, MapPin, Building2, X } from "lucide-react";

interface FilterPanelProps {
  query: string;
  onQueryChange: (value: string) => void;
  regionSlug: string;
  onRegionChange: (value: string) => void;
  companySlug: string;
  onCompanyChange: (value: string) => void;
  categorySlug: string;
  onCategoryChange: (value: string) => void;
  regions: { id: string; slug: string; name: string }[];
  companies: { id: string; slug: string; name: string }[];
  categories: { id: string; slug: string; name: string }[];
}

export default function FilterPanel({
  query,
  onQueryChange,
  regionSlug,
  onRegionChange,
  companySlug,
  onCompanyChange,
  categorySlug,
  onCategoryChange,
  regions,
  companies,
  categories,
}: FilterPanelProps) {
  const hasActiveFilters =
    regionSlug !== "" || companySlug !== "" || categorySlug !== "";

  const clearFilters = () => {
    onRegionChange("");
    onCompanyChange("");
    onCategoryChange("");
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Horizontal filter bar */}
      <div className="flex items-center gap-2">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Vəzifə adına görə axtar"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        {/* Region dropdown */}
        <div className="relative shrink-0">
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <MapPin size={14} />
          </div>
          <select
            value={regionSlug}
            onChange={(e) => onRegionChange(e.target.value)}
            className="appearance-none rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-8 text-sm text-slate-700 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            <option value="">Rayonlar</option>
            {regions.map((region) => (
              <option key={region.id} value={region.slug}>
                {region.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Company dropdown */}
        <div className="relative shrink-0">
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Building2 size={14} />
          </div>
          <select
            value={companySlug}
            onChange={(e) => onCompanyChange(e.target.value)}
            className="appearance-none rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-8 text-sm text-slate-700 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            <option value="">Şirkətlər</option>
            {companies.map((company) => (
              <option key={company.id} value={company.slug}>
                {company.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Filter button */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            title="Filtrləri təmizlə"
          >
            <X size={14} />
          </button>
        )}
        <button
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2.5 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
          title="Əlavə filtrlər"
        >
          <SlidersHorizontal size={16} />
        </button>
      </div>


    </div>
  );
}
