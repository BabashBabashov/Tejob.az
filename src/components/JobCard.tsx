import Link from "next/link";
import Image from "next/image";
import { Eye, MapPin, Calendar, Crown } from "lucide-react";
import { Job } from "@/lib/types";
import { getCompanyById, getRegionById, formatDate } from "@/lib/utils";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const company = getCompanyById(job.companyId);
  const region = getRegionById(job.regionId);

  return (
    <Link
      href={`/elanlar/${job.slug}`}
      className="group flex gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-[#1e293b] dark:hover:border-emerald-700"
    >
      <div className="shrink-0">
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg border border-slate-100 bg-white dark:border-slate-700 dark:bg-slate-800">
          <Image
            src={company?.logo || "/logo.png"}
            alt={company?.name || "Şirkət logosu"}
            width={56}
            height={56}
            className="h-10 w-10 object-contain"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-slate-900 group-hover:text-emerald-700 dark:text-slate-100 dark:group-hover:text-emerald-400">
            {job.title}
          </h3>
          {job.isPremium && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              <Crown size={12} />
              PREMIUM
            </span>
          )}
        </div>

        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {company?.name}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
          {region && (
            <span className="flex items-center gap-1">
              <MapPin size={13} />
              {region.name}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar size={13} />
            {formatDate(job.createdAt)}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={13} />
            {job.views}
          </span>
        </div>
      </div>
    </Link>
  );
}
