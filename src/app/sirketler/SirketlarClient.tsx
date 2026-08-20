"use client";

import { useState, useMemo } from "react";
import { Search, Briefcase, Building2 } from "lucide-react";
import ListingLayout from "@/components/ListingLayout";
import CompanyDetailPanel from "@/components/CompanyDetailPanel";
import CompanyLogo from "@/components/CompanyLogo";
import { Job } from "@/lib/types";

interface Company {
  id: string;
  slug: string;
  name: string;
  logo: string;
  banner?: string | null;
  sector: string;
  description: string;
  email?: string | null;
  phone?: string | null;
  jobCount: number;
}

interface SirketlarClientProps {
  initialCompanies: Company[];
  positions: { slug: string; name: string; jobCount?: number }[];
  sectors: { slug: string; name: string; jobCount?: number }[];
  jobs: Job[];
}

export default function SirketlarClient({
  initialCompanies,
  positions,
  sectors,
  jobs,
}: SirketlarClientProps) {
  const [query, setQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const filteredCompanies = useMemo(() => {
    return initialCompanies
      .filter((company) =>
        company.name.toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => b.jobCount - a.jobCount);
  }, [initialCompanies, query]);

  return (
    <ListingLayout
      title="Şirkətlər"
      subtitle={`${filteredCompanies.length} şirkət tapıldı`}
      jobs={jobs}
      positions={positions}
      sectors={sectors}
      detailPanel={
        <CompanyDetailPanel
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
          onSelectJob={(job) => {
            // When a job is selected from company detail, navigate to it
            window.location.href = `/elanlar/${job.slug}`;
          }}
        />
      }
      selectedJobId={selectedCompany?.id}
    >
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Şirkət üzrə axtar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-10 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>

      {/* Company list - JobSearch style */}
      {filteredCompanies.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center dark:border-slate-700 dark:bg-slate-900">
          <p className="text-slate-500 dark:text-slate-400">Şirkət tapılmadı.</p>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-slate-100 overflow-y-auto rounded-xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
          {filteredCompanies.map((company) => (
            <button
              key={company.id}
              onClick={() => setSelectedCompany(company)}
              className={`flex items-center gap-4 px-4 py-3.5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                selectedCompany?.id === company.id
                  ? "bg-emerald-50 dark:bg-emerald-900/10"
                  : ""
              }`}
            >
              {/* Logo */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
                <CompanyLogo
                  src={company.logo}
                  alt={company.name}
                  className="h-10 w-10 rounded-full object-contain"
                />
              </div>

              {/* Name + sector */}
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {company.name}
                </h3>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                  {company.sector}
                </p>
              </div>

              {/* Job count */}
              <span className="shrink-0 text-xs font-medium text-slate-500 dark:text-slate-400">
                {company.jobCount} iş elanı
              </span>
            </button>
          ))}
        </div>
      )}
    </ListingLayout>
  );
}
