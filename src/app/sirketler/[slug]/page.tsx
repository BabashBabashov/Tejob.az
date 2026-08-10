import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Building2, Briefcase, ArrowLeft, Mail, Phone } from "lucide-react";
import { companies, jobs } from "@/lib/data";
import { getCompanyBySlug } from "@/lib/utils";
import JobCard from "@/components/JobCard";

interface CompanyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return companies.map((company) => ({
    slug: company.slug,
  }));
}

export default async function CompanyDetailPage({ params }: CompanyPageProps) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);

  if (!company) {
    notFound();
  }

  const companyJobs = jobs.filter((j) => j.companyId === company.id);

  return (
    <div className="space-y-6">
      <Link
        href="/sirketler"
        className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400"
      >
        <ArrowLeft size={16} />
        Bütün şirkətlər
      </Link>

      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-white dark:border-slate-700 dark:bg-slate-800">
            <Image
              src={company.logo}
              alt={company.name}
              width={80}
              height={80}
              className="h-14 w-14 object-contain"
            />
          </div>
          <div className="flex-1 space-y-2">
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
            {companyJobs.length} elan
          </span>
        </div>

        {companyJobs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center dark:border-slate-700 dark:bg-slate-900">
            <p className="text-slate-500 dark:text-slate-400">
              Bu şirkətə aid aktiv elan yoxdur.
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {companyJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
