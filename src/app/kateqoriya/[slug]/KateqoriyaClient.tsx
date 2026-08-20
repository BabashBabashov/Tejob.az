"use client";

import { useState, useMemo } from "react";
import JobCard from "@/components/JobCard";
import JobDetailPanel from "@/components/JobDetailPanel";
import ListingLayout from "@/components/ListingLayout";
import { Job } from "@/lib/types";

interface KateqoriyaClientProps {
  category: {
    name: string;
    jobs: Job[];
    slug: string;
  };
  positions: { slug: string; name: string; jobCount?: number }[];
  sectors: { slug: string; name: string; jobCount?: number }[];
}

export default function KateqoriyaClient({ category, positions, sectors }: KateqoriyaClientProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const filteredJobs = useMemo(() => {
    return category.jobs.filter((job: any) => {
      if (category.slug === "qadin-isleri") return job.isWomenOnly;
      if (category.slug === "tecrube-proqramlari") return job.isInternship;
      return true;
    });
  }, [category]);

  return (
    <ListingLayout
      title={category.name}
      subtitle={`${filteredJobs.length} ${filteredJobs.length === 1 ? "elan" : "elan"} tapıldı`}
      jobs={filteredJobs}
      positions={positions}
      sectors={sectors}
      detailPanel={<JobDetailPanel job={selectedJob} onClose={() => setSelectedJob(null)} />}
      selectedJobId={selectedJob?.id}
    >
      {filteredJobs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center dark:border-slate-700 dark:bg-slate-900">
          <p className="text-slate-500 dark:text-slate-400">
            Bu kateqoriyada aktiv elan yoxdur.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 overflow-y-auto pr-1">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job as any}
              onSelectJob={setSelectedJob}
              isSelected={selectedJob?.id === job.id}
            />
          ))}
        </div>
      )}
    </ListingLayout>
  );
}
