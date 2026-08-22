"use client";

import { useState, useEffect } from "react";
import { MapPin, Calendar, Crown, Star, Eye } from "lucide-react";
import { Job } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import CompanyLogo from "./CompanyLogo";

function getBookmarks(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("bookmarkedJobs") || "[]");
  } catch {
    return [];
  }
}

function toggleBookmark(jobId: string): boolean {
  const bookmarks = getBookmarks();
  const index = bookmarks.indexOf(jobId);
  let next: string[];
  if (index > -1) {
    next = bookmarks.filter((id) => id !== jobId);
  } else {
    next = [...bookmarks, jobId];
  }
  localStorage.setItem("bookmarkedJobs", JSON.stringify(next));
  return index === -1; // true if added, false if removed
}

interface JobCardProps {
  job: Job;
  onSelectJob?: (job: Job) => void;
  isSelected?: boolean;
  showBookmark?: boolean;
}

export default function JobCard({
  job,
  onSelectJob,
  isSelected,
  showBookmark = true,
}: JobCardProps) {
  const company = job.company;
  const region = job.region;
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(getBookmarks().includes(job.id));
  }, [job.id]);

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    const added = toggleBookmark(job.id);
    setBookmarked(added);
    // Dispatch custom event so other components can react
    window.dispatchEvent(new Event("bookmarksChanged"));
  };

  const content = (
    <div
      className={`group flex gap-4 rounded-xl border bg-white p-4 transition-all hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-[#1e293b] dark:hover:border-emerald-700 ${
        isSelected
          ? "border-emerald-500 ring-1 ring-emerald-500"
          : "border-slate-200"
      } ${onSelectJob ? "cursor-pointer" : ""}`}
    >
      <div className="shrink-0">
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg border border-slate-100 bg-white dark:border-slate-700 dark:bg-slate-800">
          <CompanyLogo
            src={company?.logo}
            alt={company?.name || "Şirkət logosu"}
            className="h-10 w-10 rounded-lg border border-slate-100 object-contain dark:border-slate-700"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-slate-900 group-hover:text-emerald-700 dark:text-slate-100 dark:group-hover:text-emerald-400">
            {job.title}
          </h3>
          <div className="flex shrink-0 items-center gap-1">
            {job.isPremium && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                <Crown size={12} />
                PREMIUM
              </span>
            )}
            {showBookmark && (
              <button
                onClick={handleBookmark}
                className={`rounded p-1 transition-colors ${
                  bookmarked
                    ? "text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                    : "text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}
                aria-label="Seçilmiş elanlara əlavə et"
              >
                <Star size={18} fill={bookmarked ? "currentColor" : "none"} />
              </button>
            )}
          </div>
        </div>

        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {company?.name}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
          {region && (
            <span className="flex items-center gap-1">
              <MapPin size={13} />
              {region.name}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar size={13} />
            {formatDate(job.createdAt)}
          </span>
          {job.showViews && (
            <span className="flex items-center gap-1">
              <Eye size={13} />
              {job.views} baxış
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (onSelectJob) {
    return (
      <div onClick={() => onSelectJob(job)} className="cursor-pointer">
        {content}
      </div>
    );
  }

  return <div>{content}</div>;
}
