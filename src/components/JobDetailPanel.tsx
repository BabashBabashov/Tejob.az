"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  MapPin,
  Calendar,
  Crown,
  Phone,
  Mail,
  Briefcase,
  Clock,
  X,
  Building2,
  Eye,
  ExternalLink,
} from "lucide-react";
import { Job } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { hasViewedRecently, markViewed } from "@/lib/viewCounter";
import CompanyLogo from "./CompanyLogo";

interface JobDetailPanelProps {
  job: Job | null;
  onClose: () => void;
}

export default function JobDetailPanel({ job, onClose }: JobDetailPanelProps) {
  // Increment view count when a job is selected (once per 24h per user)
  useEffect(() => {
    if (job?.slug && !hasViewedRecently(job.slug)) {
      fetch(`/api/jobs/${job.slug}/view/`, { method: "POST" })
        .then(() => markViewed(job.slug))
        .catch(() => {});
    }
  }, [job?.slug]);

  if (!job) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center dark:border-slate-700 dark:bg-slate-900">
        <p className="text-slate-500 dark:text-slate-400">
          Elan seçin ki, detalları burada görəsiniz.
        </p>
      </div>
    );
  }

  const company = job.company;
  const region = job.region;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Elan detalı</h2>
        <button
          onClick={onClose}
          className="rounded p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-white dark:border-slate-700 dark:bg-slate-800">
          <CompanyLogo
            src={company?.logo}
            alt={company?.name || "Şirkət logosu"}
            className="h-12 w-12 object-contain"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">{job.title}</h3>
          <Link
            href={`/sirketler/${company?.slug}`}
            className="inline-flex items-center gap-1 text-sm text-emerald-700 hover:underline dark:text-emerald-400"
          >
            <Building2 size={14} />
            {company?.name}
          </Link>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 border-y border-slate-100 py-3 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
        {region && (
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {region.name}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Calendar size={14} />
          {formatDate(job.createdAt)}
        </span>
        {job.workType && (
          <span className="flex items-center gap-1">
            <Briefcase size={14} />
            {job.workType}
          </span>
        )}
        {job.deadline && (
          <span className="flex items-center gap-1">
            <Clock size={14} />
            Son tarix: {formatDate(job.deadline)}
          </span>
        )}
        {job.showViews && (
          <span className="flex items-center gap-1">
            <Eye size={14} />
            {job.views} baxış
          </span>
        )}
      </div>

      <div className="mt-4 space-y-4">
        <section>
          <h4 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">İş haqqında</h4>
          <p className="whitespace-pre-line text-sm text-slate-700 dark:text-slate-300">
            {job.description}
          </p>
        </section>

        {job.salary && (
          <section>
            <h4 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">Əmək haqqı</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">{job.salary}</p>
          </section>
        )}

        <section>
          <h4 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">Əlaqə</h4>
          <div className="flex flex-col gap-2">
            {job.contactPhone && (
              <a
                href={`tel:${job.contactPhone}`}
                className="inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400"
              >
                <Phone size={16} />
                {job.contactPhone}
              </a>
            )}
            {job.contactEmail && (
              <a
                href={`mailto:${job.contactEmail}`}
                className="inline-flex w-fit items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300"
              >
                <Mail size={16} />
                {job.contactEmail}
              </a>
            )}
            {!job.contactPhone && !job.contactEmail && company?.phone && (
              <a
                href={`tel:${company.phone}`}
                className="inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400"
              >
                <Phone size={16} />
                {company.phone}
              </a>
            )}
          </div>
        </section>

        <Link
          href={`/sirketler/${company?.slug}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <ExternalLink size={16} />
          Şirkətin digər elanları
        </Link>

        <Link
          href={`/elanlar/${job.slug}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          <ExternalLink size={16} />
          Tam görünüşdə aç
        </Link>
      </div>
    </div>
  );
}
