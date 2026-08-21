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
  ExternalLink,
  Star,
} from "lucide-react";
import { Job } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { hasViewedRecently, markViewed } from "@/lib/viewCounter";
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

  // Bookmark helpers (same logic as JobCard)
  const getBookmarks = (): string[] => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("bookmarkedJobs") || "[]");
    } catch {
      return [];
    }
  };

  const toggleBookmark = () => {
    if (!job) return;
    const bookmarks = getBookmarks();
    const index = bookmarks.indexOf(job.id);
    let next: string[];
    if (index > -1) {
      next = bookmarks.filter((id) => id !== job.id);
    } else {
      next = [...bookmarks, job.id];
    }
    localStorage.setItem("bookmarkedJobs", JSON.stringify(next));
    setBookmarked(index === -1);
    window.dispatchEvent(new Event("bookmarksChanged"));
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
      setBookmarked(getBookmarks().includes(job.id));
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
            onClick={toggleBookmark}
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

            <Link
              href={`/elanlar/${job.slug}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
            >
              <ExternalLink size={16} />
              Tam görünüşdə aç
            </Link>
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
