"use client";

import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
import JobDetailPanel from "@/components/JobDetailPanel";
import ListingLayout from "@/components/ListingLayout";
import { Job } from "@/lib/types";

interface Position {
  slug: string;
  name: string;
  jobCount?: number;
}

interface Sector {
  slug: string;
  name: string;
  jobCount?: number;
}

export default function BookmarkedJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarkedJobs") || "[]");

    const fetchJobs = saved.length
      ? fetch(`/api/jobs?ids=${saved.join(",")}`).then((res) => res.json())
      : Promise.resolve({ jobs: [] });

    Promise.all([fetchJobs, fetch("/api/positions").then((r) => r.json()), fetch("/api/sectors").then((r) => r.json())])
      .then(([jobsData, positionsData, sectorsData]) => {
        setJobs(jobsData.jobs || []);
        setPositions(positionsData || []);
        setSectors(sectorsData || []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <ListingLayout
      title="Seçilmiş elanlar"
      subtitle={loading ? "Yüklənir..." : `${jobs.length} ${jobs.length === 1 ? "elan" : "elan"} seçilib`}
      jobs={jobs}
      positions={positions}
      sectors={sectors}
      detailPanel={<JobDetailPanel job={selectedJob} onClose={() => setSelectedJob(null)} />}
      selectedJobId={selectedJob?.id}
      onSelectJob={setSelectedJob}
    >
      {loading ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center dark:border-slate-700 dark:bg-slate-900">
          <p className="text-slate-500 dark:text-slate-400">Yüklənir...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center dark:border-slate-700 dark:bg-slate-900">
          <p className="text-slate-500 dark:text-slate-400">
            Hələ heç bir elan seçilməyib.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 overflow-y-auto pr-1">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job as any}
              onSelect={setSelectedJob}
              isSelected={selectedJob?.id === job.id}
            />
          ))}
        </div>
      )}
    </ListingLayout>
  );
}
