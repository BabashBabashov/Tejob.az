"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Search, MapPin, Building2, X } from "lucide-react";

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
  jobTitles: string[];
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
  jobTitles,
}: FilterPanelProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const hasActiveFilters =
    regionSlug !== "" || companySlug !== "" || categorySlug !== "";

  const clearFilters = () => {
    onRegionChange("");
    onCompanyChange("");
    onCategoryChange("");
  };

  // Filter suggestions based on query
  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const unique = [...new Set(jobTitles)];
    return unique
      .filter((title) => title.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, jobTitles]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (title: string) => {
    onQueryChange(title);
    setShowSuggestions(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[highlightedIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Horizontal filter bar */}
      <div className="flex items-center gap-2">
        {/* Search input with autocomplete */}
        <div className="relative flex-1" ref={wrapperRef}>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Vəzifə adına görə axtar"
            value={query}
            onChange={(e) => {
              onQueryChange(e.target.value);
              setShowSuggestions(true);
              setHighlightedIndex(-1);
            }}
            onFocus={() => query.trim() && setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />

          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
              {suggestions.map((title, index) => (
                <button
                  key={title}
                  onClick={() => handleSelect(title)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm transition-colors ${
                    index === highlightedIndex
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                      : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                  }`}
                >
                  <Search size={14} className="shrink-0 text-slate-400" />
                  <span className="truncate">{title}</span>
                </button>
              ))}
            </div>
          )}
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

        {/* Clear filters button */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            title="Filtrləri təmizlə"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
