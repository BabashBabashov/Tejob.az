"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MapPin,
  Calendar,
  Crown,
  Phone,
  Mail,
  Briefcase,
  Clock,
  X,
  Building2,
  Eye,
  Star,
} from "lucide-react";
import { Job } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { hasViewedRecently, markViewed } from "@/lib/viewCounter";
import { isBookmarked, toggleBookmark } from "@/lib/bookmarks";
import CompanyLogo from "./CompanyLogo";

interface JobDetailPanelProps {
  job: Job | null;
  onClose: () => void;
  onSelectJob?: (job: Job) => void;
}

export default function JobDetailPanel({ job, onClose, onSelectJob }: JobDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<"description" | "other">("description");
  const [otherJobs, setOtherJobs] = useState<Job[]>([]);
  const [loadingOther, setLoadingOther] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleToggleBookmark = () => {
    if (!job) return;
    const added = toggleBookmark(job.id);
    setBookmarked(added);
  };

  // Increment view count when a job is selected (once per 12h per user)
  useEffect(() => {
    if (job?.slug && !hasViewedRecently(job.slug)) {
      fetch(`/api/jobs/${job.slug}/view/`, { method: "POST" })
        .then(() => markViewed(job.slug))
        .catch(() => {});
    }
  }, [job?.slug]);

  // Reset tab when job changes
  useEffect(() => {
    setActiveTab("description");
    setOtherJobs([]);
  }, [job?.id]);

  // Sync bookmark state when job changes
  useEffect(() => {
    if (job?.id) {
      setBookmarked(isBookmarked(job.id));
    }
  }, [job?.id]);

  // Fetch other jobs when "other" tab is selected
  useEffect(() => {
    if (activeTab === "other" && job?.company?.slug && otherJobs.length === 0) {
      setLoadingOther(true);
      fetch(`/api/jobs?company=${job.company.slug}`)
        .then((res) => res.json())
        .then((data) => {
          const jobs = (data.jobs || []).filter((j: Job) => j.id !== job.id);
          setOtherJobs(jobs);
        })
        .catch(() => {})
        .finally(() => setLoadingOther(false));
    }
  }, [activeTab, job?.company?.slug, job?.id, otherJobs.length]);

  if (!job) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center dark:border-slate-700 dark:bg-slate-900">
        <p className="text-slate-500 dark:text-slate-400">
          Elan seçin ki, detalları burada görəsiniz.
        </p>
      </div>
    );
  }

  const company = job.company;
  const region = job.region;

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      {/* Company header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-100 bg-white dark:border-slate-700 dark:bg-slate-800">
            <CompanyLogo
              src={company?.logo}
              alt={company?.name || "Şirkət logosu"}
              className="h-8 w-8 object-contain"
            />
          </div>
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{company?.name}</span>
        </div>
        <div className="flex items-center gap-2">
            <button
              onClick={handleToggleBookmark}
            className={`rounded p-1 transition-colors ${
              bookmarked
                ? "text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                : "text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
            }`}
            aria-label="Seçilmiş elanlara əlavə et"
          >
            <Star size={18} fill={bookmarked ? "currentColor" : "none"} />
          </button>
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Job title + metadata */}
      <div className="mt-5">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-xl font-bold leading-tight text-slate-900 dark:text-slate-100">
            {job.title}
          </h2>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {region && (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
              <MapPin size={12} />
              {region.name}
            </span>
          )}
          {job.workType && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
              <Briefcase size={12} />
              {job.workType}
            </span>
          )}
          {job.deadline && (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <Clock size={12} />
              {formatDate(job.deadline)}
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-5 border-b border-slate-200 dark:border-slate-700">
        <div className="flex gap-0">
          <button
            onClick={() => setActiveTab("description")}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === "description"
                ? "border-emerald-500 text-emerald-700 dark:text-emerald-400"
                : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400"
            }`}
          >
            İşin təsviri
          </button>
          <button
            onClick={() => setActiveTab("other")}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === "other"
                ? "border-emerald-500 text-emerald-700 dark:text-emerald-400"
                : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400"
            }`}
          >
            Digər iş elanları
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="mt-4 flex-1 overflow-y-auto">
        {activeTab === "description" ? (
          <div className="space-y-4">
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {job.description}
            </p>

            {job.salary && (
              <div>
                <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Əmək haqqı</h4>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{job.salary}</p>
              </div>
            )}

            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Əlaqə</h4>
              <div className="flex flex-col gap-2">
                {job.contactPhone && (
                  <a
                    href={`tel:${job.contactPhone}`}
                    className="inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400"
                  >
                    <Phone size={16} />
                    {job.contactPhone}
                  </a>
                )}
                {job.contactEmail && (
                  <a
                    href={`mailto:${job.contactEmail}`}
                    className="inline-flex w-fit items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300"
                  >
                    <Mail size={16} />
                    {job.contactEmail}
                  </a>
                )}
                {!job.contactPhone && !job.contactEmail && company?.phone && (
                  <a
                    href={`tel:${company.phone}`}
                    className="inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400"
                  >
                    <Phone size={16} />
                    {company.phone}
                  </a>
                )}
              </div>
            </div>

            <div className="mt-2 flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
              <svg className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              <p className="text-sm leading-relaxed text-blue-800 dark:text-blue-300">
                Vakansiyalar barədə məlumatı ən tez bizim{" "}
                <a
                  href="https://t.me/TEJob_LLC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-2 hover:text-blue-600 dark:hover:text-blue-200"
                >
                  Telegram kanalında
                </a>{" "}
                izləyə bilərsiniz.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {loadingOther ? (
              <div className="py-8 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">Yüklənir...</p>
              </div>
            ) : otherJobs.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">Digər elan tapılmadı.</p>
              </div>
            ) : (
              otherJobs.map((otherJob) => (
                <div
                  key={otherJob.id}
                  onClick={() => onSelectJob?.(otherJob)}
                  className={`cursor-pointer rounded-lg border p-3 transition-colors ${
                    onSelectJob
                      ? "hover:border-emerald-300 hover:bg-slate-50 dark:hover:border-emerald-700 dark:hover:bg-slate-800/50"
                      : ""
                  } border-slate-100 dark:border-slate-800`}
                >
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {otherJob.title}
                  </h4>
                  <div className="mt-1 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    {otherJob.region && (
                      <span className="flex items-center gap-1">
                        <MapPin size={11} />
                        {otherJob.region.name}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {formatDate(otherJob.createdAt)}
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
