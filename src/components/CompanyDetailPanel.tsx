"use client";

import { useState, useEffect } from "react";
import {
  Building2,
  Mail,
  Phone,
  X,
  MapPin,
} from "lucide-react";
import CompanyLogo from "./CompanyLogo";
import { Job } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface CompanyDetailPanelProps {
  company: {
    id: string;
    slug: string;
    name: string;
    logo: string;
    banner?: string | null;
    sector: string;
    description: string;
    email?: string | null;
    phone?: string | null;
    jobs?: { id: string; title: string; slug: string }[];
  } | null;
  onClose: () => void;
  onSelectJob?: (job: Job) => void;
}

export default function CompanyDetailPanel({
  company,
  onClose,
  onSelectJob,
}: CompanyDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<"about" | "jobs">("about");
  const [companyJobs, setCompanyJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);

  useEffect(() => {
    setActiveTab("about");
    setCompanyJobs([]);
  }, [company?.id]);

  useEffect(() => {
    if (activeTab === "jobs" && company?.slug && companyJobs.length === 0) {
      setLoadingJobs(true);
      fetch(`/api/jobs?company=${company.slug}`)
        .then((res) => res.json())
        .then((data) => setCompanyJobs(data.jobs || []))
        .catch(() => {})
        .finally(() => setLoadingJobs(false));
    }
  }, [activeTab, company?.slug, companyJobs.length]);

  if (!company) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center dark:border-slate-700 dark:bg-slate-900">
        <p className="text-slate-500 dark:text-slate-400">
          Şirkət seçin ki, detalları burada görəsiniz.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      {/* Banner */}
      <div className="relative">
        {company.banner ? (
          <div className="relative h-36 w-full overflow-t rounded-t-xl">
            <img
              src={company.banner}
              alt={`${company.name} banner`}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="h-36 w-full rounded-t-xl bg-gradient-to-r from-emerald-600 to-emerald-400" />
        )}

        {/* Logo overlapping banner */}
        <div className="absolute -bottom-6 left-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border-3 border-white bg-white shadow-lg dark:border-slate-900 dark:bg-slate-800">
            <CompanyLogo
              src={company.logo}
              alt={company.name}
              className="h-12 w-12 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Company info */}
      <div className="px-4 pt-8 pb-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {company.name}
        </h3>
        <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
          {company.sector}
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 px-4 dark:border-slate-700">
        <div className="flex gap-0">
          <button
            onClick={() => setActiveTab("about")}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === "about"
                ? "border-emerald-500 text-emerald-700 dark:text-emerald-400"
                : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400"
            }`}
          >
            Şirkət haqqında
          </button>
          <button
            onClick={() => setActiveTab("jobs")}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === "jobs"
                ? "border-emerald-500 text-emerald-700 dark:text-emerald-400"
                : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400"
            }`}
          >
            Son iş elanları
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "about" ? (
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Şirkət haqqında
              </h4>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {company.description}
              </p>
            </div>

            <div className="space-y-2">
              {company.email && (
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300"
                >
                  <Mail size={14} />
                  {company.email}
                </a>
              )}
              {company.phone && (
                <a
                  href={`tel:${company.phone}`}
                  className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400"
                >
                  <Phone size={14} />
                  {company.phone}
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {loadingJobs ? (
              <div className="py-8 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">Yüklənir...</p>
              </div>
            ) : companyJobs.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">Elan tapılmadı.</p>
              </div>
            ) : (
              companyJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => onSelectJob?.(job)}
                  className={`cursor-pointer rounded-lg border border-slate-100 p-3 transition-colors hover:border-emerald-300 hover:bg-slate-50 dark:border-slate-800 dark:hover:border-emerald-700 dark:hover:bg-slate-800/50 ${
                    onSelectJob ? "cursor-pointer" : ""
                  }`}
                >
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {job.title}
                  </h4>
                  <div className="mt-1 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    {job.region && (
                      <span className="flex items-center gap-1">
                        <MapPin size={11} />
                        {job.region.name}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Building2 size={11} />
                      {formatDate(job.createdAt)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
