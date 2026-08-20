"use client";

import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import JobCard from "./JobCard";
import { Job } from "@/lib/types";

interface ListingLayoutProps {
  title: string;
  subtitle: string;
  jobs: Job[];
  positions: { slug: string; name: string; jobCount?: number }[];
  sectors: { slug: string; name: string; jobCount?: number }[];
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
  positions,
  sectors,
  children,
  emptyText = "Bu kateqoriyada aktiv elan yoxdur.",
  detailPanel,
  selectedJobId,
  onSelectJob,
}: ListingLayoutProps) {
  const pathname = usePathname();
  const [openPositions, setOpenPositions] = useState(true);
  const [openSectors, setOpenSectors] = useState(true);

  const sortedJobs = useMemo(() => {
    return [...jobs].sort((a, b) => {
      if (a.isPremium && !b.isPremium) return -1;
      if (!a.isPremium && b.isPremium) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [jobs]);

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-4">
      {/* Left sidebar with categories */}
      <div className="hidden w-44 shrink-0 flex-col gap-6 overflow-y-auto md:flex">
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <button
            onClick={() => setOpenSectors((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <span>Sektorlar</span>
            {openSectors ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openSectors && (
            <div className="mt-1 flex max-h-60 flex-col gap-1 overflow-y-auto pl-2">
              {sectors.map((sector) => (
                <Link
                  key={sector.slug}
                  href={`/sektorlar/${sector.slug}`}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                    pathname === `/sektorlar/${sector.slug}`
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  <span>{sector.name}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    {sector.jobCount || 0}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <button
            onClick={() => setOpenPositions((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <span>Vəzifələr</span>
            {openPositions ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openPositions && (
            <div className="mt-1 flex max-h-60 flex-col gap-1 overflow-y-auto pl-2">
              {positions.map((position) => (
                <Link
                  key={position.slug}
                  href={`/vezifeler/${position.slug}`}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                    pathname === `/vezifeler/${position.slug}`
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  <span>{position.name}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    {position.jobCount || 0}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center list */}
      <div className="flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto">
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
                onSelect={onSelectJob}
                isSelected={selectedJobId === job.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* Right detail panel */}
      <div className="hidden w-60 shrink-0 overflow-y-auto md:block">
        {detailPanel || (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center dark:border-slate-700 dark:bg-slate-900">
            <p className="text-slate-500 dark:text-slate-400">Elan seçin ki, detalları burada görəsiniz.</p>
          </div>
        )}
      </div>
    </div>
  );
}
