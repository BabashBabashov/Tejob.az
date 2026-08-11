"use client";

import { useState, useMemo } from "react";
import { Search, MapPin, Building2, SlidersHorizontal } from "lucide-react";
import { jobs, companies, regions } from "@/lib/data";
import JobCard from "@/components/JobCard";
import SocialBanner from "@/components/SocialBanner";

export default function Home() {
  const [query, setQuery] = useState("");
  const [regionSlug, setRegionSlug] = useState("");
  const [companySlug, setCompanySlug] = useState("");

  const filteredJobs = useMemo(() => {
    return jobs
      .filter((job) => {
        const company = companies.find((c) => c.id === job.companyId);
        const region = regions.find((r) => r.id === job.regionId);
        const matchesQuery =
          query.trim() === "" ||
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          company?.name.toLowerCase().includes(query.toLowerCase()) ||
          false;
        const matchesRegion = regionSlug === "" || region?.slug === regionSlug;
        const matchesCompany = companySlug === "" || company?.slug === companySlug;
        return matchesQuery && matchesRegion && matchesCompany;
      })
      .sort((a, b) => {
        if (a.isPremium && !b.isPremium) return -1;
        if (!a.isPremium && b.isPremium) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [query, regionSlug, companySlug]);

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

          <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
            <SlidersHorizontal size={16} />
            Filter
          </button>
        </div>
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
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
