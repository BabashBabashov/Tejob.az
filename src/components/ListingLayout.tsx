"use client";

import { useMemo } from "react";
import JobCard from "./JobCard";
import { Job } from "@/lib/types";

interface ListingLayoutProps {
  title: string;
  subtitle: string;
  jobs: Job[];
  positions?: { slug: string; name: string; jobCount?: number }[];
  sectors?: { slug: string; name: string; jobCount?: number }[];
  children?: React.ReactNode;
  emptyText?: string;
  detailPanel?: React.ReactNode;
  selectedJobId?: string | null;
  onSelectJob?: (job: Job) => void;
}

export default function ListingLayout({
  title,
  subtitle,
  jobs,
  children,
  emptyText = "Bu kateqoriyada aktiv elan yoxdur.",
  detailPanel,
  selectedJobId,
  onSelectJob,
}: ListingLayoutProps) {
  const sortedJobs = useMemo(() => {
    return [...jobs].sort((a, b) => {
      if (a.isPremium && !b.isPremium) return -1;
      if (!a.isPremium && b.isPremium) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [jobs]);

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-0">
      {/* Center list */}
      <div className="flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-2">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{title}</h1>
          <p className="text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>

        {children ? (
          children
        ) : sortedJobs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center dark:border-slate-700 dark:bg-slate-900">
            <p className="text-slate-500 dark:text-slate-400">{emptyText}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 overflow-y-auto pr-1">
            {sortedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job as any}
                onSelectJob={onSelectJob}
                isSelected={selectedJobId === job.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* Right detail panel */}
      <div className="hidden min-w-0 flex-1 overflow-y-auto border-l border-slate-200 px-5 py-4 dark:border-slate-800 md:block">
        {detailPanel || (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center dark:border-slate-700 dark:bg-slate-900">
            <p className="text-slate-500 dark:text-slate-400">Elan seçin ki, detalları burada görəsiniz.</p>
          </div>
        )}
      </div>
    </div>
  );
}
