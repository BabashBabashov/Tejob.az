"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Loader2 } from "lucide-react";
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

interface HomeClientProps {
  initialJobs: Job[];
  companies: Company[];
  regions: Region[];
  categories: Category[];
  positions: { slug: string; name: string; jobCount?: number }[];
  sectors: { slug: string; name: string; jobCount?: number }[];
  initialHasMore: boolean;
}

export default function HomeClient({
  initialJobs,
  companies,
  regions,
  categories,
  positions,
  sectors,
  initialHasMore,
}: HomeClientProps) {
  const [query, setQuery] = useState("");
  const [regionSlug, setRegionSlug] = useState("");
  const [companySlug, setCompanySlug] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [allJobs, setAllJobs] = useState<Job[]>(initialJobs);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loadingMore, setLoadingMore] = useState(false);
  const pageRef = useRef(1);
  const loadingRef = useRef(false);
  const observerRef = useRef<HTMLDivElement>(null);

  // Memoized detail panel
  const detailPanel = useMemo(
    () => <JobDetailPanel job={selectedJob} onClose={() => setSelectedJob(null)} onSelectJob={setSelectedJob} />,
    [selectedJob]
  );

  // Memoized job titles for filter
  const jobTitles = useMemo(() => allJobs.map((j) => j.title), [allJobs]);

  const filteredJobs = useMemo(() => {
    return allJobs
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
  }, [allJobs, query, regionSlug, companySlug, categorySlug]);

  // Load more jobs
  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setLoadingMore(true);
    try {
      const nextPage = pageRef.current + 1;
      const res = await fetch(`/api/jobs?page=${nextPage}&limit=20`);
      if (!res.ok) return;
      const data = await res.json();
      if (data.jobs && data.jobs.length > 0) {
        setAllJobs((prev) => [...prev, ...data.jobs]);
        pageRef.current = nextPage;
        setHasMore(data.hasMore);
      } else {
        setHasMore(false);
      }
    } catch {
      // silently fail
    } finally {
      loadingRef.current = false;
      setLoadingMore(false);
    }
  }, [hasMore]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingRef.current) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore, hasMore]);

  // Reset when filters change
  const hasActiveFilters = query || regionSlug || companySlug || categorySlug;
  const prevFiltersRef = useRef(hasActiveFilters);

  useEffect(() => {
    if (prevFiltersRef.current !== hasActiveFilters) {
      prevFiltersRef.current = hasActiveFilters;
      if (hasActiveFilters) {
        setHasMore(false);
      } else {
        setAllJobs(initialJobs);
        pageRef.current = 1;
        setHasMore(initialHasMore);
      }
    }
  }, [hasActiveFilters, initialJobs, initialHasMore]);

  return (
    <ListingLayout
      title="İş elanları"
      subtitle={`${filteredJobs.length} elan tapıldı`}
      jobs={filteredJobs}
      positions={positions}
      sectors={sectors}
      detailPanel={detailPanel}
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
          jobTitles={jobTitles}
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

            {/* Infinite scroll trigger */}
            {!hasActiveFilters && (
              <div ref={observerRef} className="flex items-center justify-center py-6">
                {loadingMore && (
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Loader2 size={16} className="animate-spin" />
                    Daha çox elan yüklənir...
                  </div>
                )}
                {!hasMore && allJobs.length > 20 && (
                  <p className="text-sm text-slate-400 dark:text-slate-500">
                    Bütün elanlar yükləndi
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </ListingLayout>
  );
}
