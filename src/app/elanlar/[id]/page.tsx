import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Crown,
  Phone,
  Mail,
  Briefcase,
  Clock,
  ArrowLeft,
  Building2,
  Eye,
} from "lucide-react";
import { getJobBySlug, formatDate } from "@/lib/api";
import ViewCounter from "./ViewCounter";
import CompanyLogo from "@/components/CompanyLogo";

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  const job = await getJobBySlug(id);

  if (!job) {
    notFound();
  }

  const company = job.company;
  const region = job.region;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <ViewCounter slug={job.slug} />
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400"
      >
        <ArrowLeft size={16} />
        Bütün elanlar
      </Link>

      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-white dark:border-slate-700 dark:bg-slate-800">
              <CompanyLogo
                src={company?.logo}
                alt={company?.name || "Şirkət logosu"}
                className="h-12 w-12 object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {job.title}
              </h1>
              <Link
                href={`/sirketler/${company?.slug}`}
                className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
              >
                <Building2 size={14} />
                {company?.name}
              </Link>
            </div>
          </div>
          {job.isPremium && (
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              <Crown size={14} />
              PREMIUM
            </span>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-slate-100 py-4 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
          {region && (
            <span className="flex items-center gap-1.5">
              <MapPin size={16} />
              {region.name}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Calendar size={16} />
            {formatDate(job.createdAt)}
          </span>
          {job.workType && (
            <span className="flex items-center gap-1.5">
              <Briefcase size={16} />
              {job.workType}
            </span>
          )}
          {job.deadline && (
            <span className="flex items-center gap-1.5">
              <Clock size={16} />
              Son tarix: {formatDate(job.deadline)}
            </span>
          )}
          {job.showViews && (
            <span className="flex items-center gap-1.5">
              <Eye size={16} />
              {job.views} baxış
            </span>
          )}
        </div>

        <div className="mt-6 space-y-6">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
              İş haqqında
            </h2>
            <p className="whitespace-pre-line text-slate-700 dark:text-slate-300">
              {job.description}
            </p>
          </section>


          {job.salary && (
            <section>
              <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                Əmək haqqı
              </h2>
              <p className="text-slate-700 dark:text-slate-300">{job.salary}</p>
            </section>
          )}

          <section>
            <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-slate-100">
              Əlaqə
            </h2>
            <div className="flex flex-col gap-2 text-slate-700 dark:text-slate-300">
              {job.contactPhone && (
                <a
                  href={`tel:${job.contactPhone}`}
                  className="inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400"
                >
                  <Phone size={16} />
                  {job.contactPhone}
                </a>
              )}
              {job.contactEmail && (
                <a
                  href={`mailto:${job.contactEmail}`}
                  className="inline-flex w-fit items-center gap-2 rounded-lg bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300"
                >
                  <Mail size={16} />
                  {job.contactEmail}
                </a>
              )}
              {!job.contactPhone && !job.contactEmail && company?.phone && (
                <a
                  href={`tel:${company.phone}`}
                  className="inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400"
                >
                  <Phone size={16} />
                  {company.phone}
                </a>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
