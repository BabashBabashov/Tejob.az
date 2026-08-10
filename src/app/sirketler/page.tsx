"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Building2, Briefcase } from "lucide-react";
import { companies } from "@/lib/data";
import { getCompanyJobCount } from "@/lib/utils";

export default function CompaniesPage() {
  const [query, setQuery] = useState("");

  const filteredCompanies = useMemo(() => {
    return companies
      .filter((company) =>
        company.name.toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => getCompanyJobCount(b.id) - getCompanyJobCount(a.id));
  }, [query]);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Şirkətlər
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          İş elanı yerləşdirən şirkətlər
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Şirkət adına görə axtar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
      </div>

      {filteredCompanies.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center dark:border-slate-700 dark:bg-slate-900">
          <p className="text-slate-500 dark:text-slate-400">
            Şirkət tapılmadı.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((company) => {
            const jobCount = getCompanyJobCount(company.id);
            return (
              <Link
                key={company.id}
                href={`/sirketler/${company.slug}`}
                className="group flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-700"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-100 bg-white dark:border-slate-700 dark:bg-slate-800">
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={56}
                      height={56}
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 dark:text-slate-100 dark:group-hover:text-emerald-400">
                      {company.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {company.sector}
                    </p>
                  </div>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                    <Briefcase size={13} />
                    {jobCount} {jobCount === 1 ? "elan" : "elan"}
                  </span>
                  <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    Ətraflı →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
