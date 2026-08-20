"use client";

import { useState } from "react";
import JobCard from "@/components/JobCard";
import JobDetailPanel from "@/components/JobDetailPanel";
import ListingLayout from "@/components/ListingLayout";
import { Job } from "@/lib/types";

interface RayonClientProps {
  region: {
    name: string;
    jobs: Job[];
  };
  positions: { slug: string; name: string; jobCount?: number }[];
  sectors: { slug: string; name: string; jobCount?: number }[];
}

export default function RayonClient({ region, positions, sectors }: RayonClientProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  return (
    <ListingLayout
      title={region.name}
      subtitle={`${region.jobs.length} ${region.jobs.length === 1 ? "elan" : "elan"} tapıldı`}
      jobs={region.jobs}
      positions={positions}
      sectors={sectors}
      detailPanel={<JobDetailPanel job={selectedJob} onClose={() => setSelectedJob(null)} />}
      selectedJobId={selectedJob?.id}
    >
      {region.jobs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center dark:border-slate-700 dark:bg-slate-900">
          <p className="text-slate-500 dark:text-slate-400">
            Bu rayonda aktiv elan yoxdur.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 overflow-y-auto pr-1">
          {region.jobs.map((job) => (
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
