"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin, Building2, SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import JobCard from "@/components/JobCard";
import SocialBanner from "@/components/SocialBanner";

interface Company {
  id: string;
  slug: string;
  name: string;
  logo: string;
}

interface Region {
  id: string;
  slug: string;
  name: string;
}

interface Category {
  id: string;
  slug: string;
  name: string;
  type: string;
}

interface Job {
  id: string;
  slug: string;
  title: string;
  description: string;
  requirements: string[];
  salary?: string | null;
  workType?: string | null;
  deadline?: string | null;
  contactPhone?: string | null;
  contactEmail?: string | null;
  isPremium: boolean;
  views: number;
  createdAt: string;
  company: Company;
  region: Region;
  categories?: Category[];
}

interface Pagination {
  page: number;
  totalPages: number;
  total: number;
}

interface HomeClientProps {
  initialJobs: Job[];
  companies: Company[];
  regions: Region[];
  categories: Category[];
  pagination: Pagination;
}

export default function HomeClient({
  initialJobs,
  companies,
  regions,
  categories,
  pagination,
}: HomeClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [regionSlug, setRegionSlug] = useState("");
  const [companySlug, setCompanySlug] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = regionSlug !== "" || companySlug !== "" || categorySlug !== "";

  const filteredJobs = useMemo(() => {
    return initialJobs
      .filter((job) => {
        const matchesQuery =
          query.trim() === "" ||
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.company.name.toLowerCase().includes(query.toLowerCase());
        const matchesRegion = regionSlug === "" || job.region.slug === regionSlug;
        const matchesCompany = companySlug === "" || job.company.slug === companySlug;
        const matchesCategory =
          categorySlug === "" ||
          (job.categories && job.categories.some((c) => c.slug === categorySlug));
        return matchesQuery && matchesRegion && matchesCompany && matchesCategory;
      })
      .sort((a, b) => {
        if (a.isPremium && !b.isPremium) return -1;
        if (!a.isPremium && b.isPremium) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [initialJobs, query, regionSlug, companySlug, categorySlug]);

  const clearFilters = () => {
    setRegionSlug("");
    setCompanySlug("");
    setCategorySlug("");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          İş elanları
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Ən son vakansiyalar və karyera imkanları
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-[#1e293b]">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Vəzifə adına görə axtar"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              value={regionSlug}
              onChange={(e) => setRegionSlug(e.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-8 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="">Region</option>
              {regions.map((region) => (
                <option key={region.id} value={region.slug}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              value={companySlug}
              onChange={(e) => setCompanySlug(e.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-8 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="">Şirkətlər</option>
              {companies.map((company) => (
                <option key={company.id} value={company.slug}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
              showFilters || hasActiveFilters
                ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <SlidersHorizontal size={16} />
            Filter
            {hasActiveFilters && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs text-white">
                {[regionSlug, companySlug, categorySlug].filter(Boolean).length}
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
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
            <div className="mt-2 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() =>
                    setCategorySlug(categorySlug === category.slug ? "" : category.slug)
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
        )}
      </div>

      <SocialBanner />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Ümumi elanlar
          </h2>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {filteredJobs.length} elan
          </span>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center dark:border-slate-700 dark:bg-slate-900">
            <p className="text-slate-500 dark:text-slate-400">
              Seçdiyiniz kriteriyalara uyğun elan tapılmadı.
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job as any} />
            ))}
          </div>
        )}

        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4">
            <button
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("page", String(pagination.page - 1));
                router.push(`/?${params.toString()}`);
              }}
              disabled={pagination.page <= 1}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <ChevronLeft size={16} />
              Əvvəlki
            </button>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Səhifə {pagination.page} / {pagination.totalPages}
            </span>
            <button
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("page", String(pagination.page + 1));
                router.push(`/?${params.toString()}`);
              }}
              disabled={pagination.page >= pagination.totalPages}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              Növbəti
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
