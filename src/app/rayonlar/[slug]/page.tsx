import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Briefcase, ArrowLeft } from "lucide-react";
import { regions, jobs } from "@/lib/data";
import { getRegionBySlug } from "@/lib/utils";
import JobCard from "@/components/JobCard";

interface RegionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return regions.map((region) => ({
    slug: region.slug,
  }));
}

export default async function RegionDetailPage({ params }: RegionPageProps) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) {
    notFound();
  }

  const regionJobs = jobs.filter((j) => j.regionId === region.id);

  return (
    <div className="space-y-6">
      <Link
        href="/rayonlar"
        className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400"
      >
        <ArrowLeft size={16} />
        Bütün rayonlar
      </Link>

      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
            <MapPin size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {region.name}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {regionJobs.length} {regionJobs.length === 1 ? "elan" : "elan"} tapıldı
            </p>
          </div>
        </div>
      </div>

      {regionJobs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center dark:border-slate-700 dark:bg-slate-900">
          <p className="text-slate-500 dark:text-slate-400">
            Bu rayonda aktiv elan yoxdur.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {regionJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
