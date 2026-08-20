"use client";

import { Search, X } from "lucide-react";

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
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Axtarış
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Vəzifə adına görə axtar"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Region
        </label>
        <select
          value={regionSlug}
          onChange={(e) => onRegionChange(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        >
          <option value="">Bütün regionlar</option>
          {regions.map((region) => (
            <option key={region.id} value={region.slug}>
              {region.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 space-y-3">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Şirkət
        </label>
        <select
          value={companySlug}
          onChange={(e) => onCompanyChange(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        >
          <option value="">Bütün şirkətlər</option>
          {companies.map((company) => (
            <option key={company.id} value={company.slug}>
              {company.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Kateqoriya
          </label>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-red-600 dark:text-slate-400"
            >
              <X size={12} />
              Təmizlə
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() =>
                onCategoryChange(
                  categorySlug === category.slug ? "" : category.slug
                )
              }
              className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                categorySlug === category.slug
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
