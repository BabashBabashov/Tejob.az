"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import JobCard from "@/components/JobCard";
import JobDetailPanel from "@/components/JobDetailPanel";
import ListingLayout from "@/components/ListingLayout";
import FilterPanel from "@/components/FilterPanel";
import SocialBanner from "@/components/SocialBanner";
import { Job } from "@/lib/types";

interface Company {
  id: string;
  slug: string;
  name: string;
  logo: string;
}

interface Region {
  id: string;
  slug: string;
  name: string;
}

interface Category {
  id: string;
  slug: string;
  name: string;
  type: string;
}

interface Pagination {
  page: number;
  totalPages: number;
  total: number;
}

interface HomeClientProps {
  initialJobs: Job[];
  companies: Company[];
  regions: Region[];
  categories: Category[];
  positions: { slug: string; name: string; jobCount?: number }[];
  sectors: { slug: string; name: string; jobCount?: number }[];
  pagination: Pagination;
}

export default function HomeClient({
  initialJobs,
  companies,
  regions,
  categories,
  positions,
  sectors,
  pagination,
}: HomeClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [regionSlug, setRegionSlug] = useState("");
  const [companySlug, setCompanySlug] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const filteredJobs = useMemo(() => {
    return initialJobs
      .filter((job) => {
        const matchesQuery =
          query.trim() === "" ||
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.company.name.toLowerCase().includes(query.toLowerCase());
        const matchesRegion =
          regionSlug === "" || job.region.slug === regionSlug;
        const matchesCompany =
          companySlug === "" || job.company.slug === companySlug;
        const matchesCategory =
          categorySlug === "" ||
          (job.categories &&
            job.categories.some((c) => c.slug === categorySlug));
        return (
          matchesQuery && matchesRegion && matchesCompany && matchesCategory
        );
      })
      .sort((a, b) => {
        if (a.isPremium && !b.isPremium) return -1;
        if (!a.isPremium && b.isPremium) return 1;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
  }, [initialJobs, query, regionSlug, companySlug, categorySlug]);

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/?${params.toString()}`);
  };

  return (
    <ListingLayout
      title="İş elanları"
      subtitle={`${filteredJobs.length} elan tapıldı`}
      jobs={filteredJobs}
      positions={positions}
      sectors={sectors}
      detailPanel={<JobDetailPanel job={selectedJob} onClose={() => setSelectedJob(null)} />}
      selectedJobId={selectedJob?.id}
      onSelectJob={setSelectedJob}
    >
      <div className="flex flex-col gap-4">
        <FilterPanel
          query={query}
          onQueryChange={setQuery}
          regionSlug={regionSlug}
          onRegionChange={setRegionSlug}
          companySlug={companySlug}
          onCompanyChange={setCompanySlug}
          categorySlug={categorySlug}
          onCategoryChange={setCategorySlug}
          regions={regions}
          companies={companies}
          categories={categories}
        />
        <SocialBanner />
        {filteredJobs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center dark:border-slate-700 dark:bg-slate-900">
            <p className="text-slate-500 dark:text-slate-400">
              Seçdiyiniz kriteriyalara uyğun elan tapılmadı.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 pr-1">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job as any}
                onSelectJob={(job) => setSelectedJob(job)}
                isSelected={selectedJob?.id === job.id}
              />
            ))}
          </div>
        )}

        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4">
            <button
              onClick={() => goToPage(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <ChevronLeft size={16} />
              Əvvəlki
            </button>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Səhifə {pagination.page} / {pagination.totalPages}
            </span>
            <button
              onClick={() => goToPage(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              Növbəti
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </ListingLayout>
  );
}
