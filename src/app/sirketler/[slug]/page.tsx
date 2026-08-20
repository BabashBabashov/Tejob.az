import { notFound } from "next/navigation";
import Link from "next/link";
import { Building2, Briefcase, ArrowLeft, Mail, Phone } from "lucide-react";
import { getCompanyBySlug } from "@/lib/api";
import JobCard from "@/components/JobCard";
import CompanyLogo from "@/components/CompanyLogo";

interface CompanyPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CompanyDetailPage({ params }: CompanyPageProps) {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);

  if (!company) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Link
        href="/sirketler"
        className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400"
      >
        <ArrowLeft size={16} />
        Bütün şirkətlər
      </Link>

      <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        {/* Banner + Logo overlay (LinkedIn style) */}
        <div className="relative">
          {/* Banner */}
          {company.banner ? (
            <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
              <img
                src={company.banner}
                alt={`${company.name} banner`}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="h-48 w-full rounded-t-xl bg-gradient-to-r from-emerald-600 to-emerald-400" />
          )}

          {/* Logo overlapping banner bottom */}
          <div className="absolute -bottom-10 left-6">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border-4 border-white bg-white shadow-lg dark:border-slate-900 dark:bg-slate-800">
              <CompanyLogo
                src={company.logo}
                alt={company.name}
                className="h-18 w-18 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Company info */}
        <div className="pt-14 px-6 pb-6">
          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {company.name}
            </h1>
            <p className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-400">
              <Building2 size={16} />
              {company.sector}
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              {company.description}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {company.email && (
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300"
                >
                  <Mail size={14} />
                  {company.email}
                </a>
              )}
              {company.phone && (
                <a
                  href={`tel:${company.phone}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-sm text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400"
                >
                  <Phone size={14} />
                  {company.phone}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Şirkətin elanları
          </h2>
          <span className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
            <Briefcase size={14} />
            {company.jobs.length} elan
          </span>
        </div>

        {company.jobs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center dark:border-slate-700 dark:bg-slate-900">
            <p className="text-slate-500 dark:text-slate-400">
              Bu şirkətə aid aktiv elan yoxdur.
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {company.jobs.map((job: any) => (
              <JobCard key={job.id} job={job as any} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
