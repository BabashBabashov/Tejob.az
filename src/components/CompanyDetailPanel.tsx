"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Briefcase,
  Mail,
  Phone,
  X,
  ExternalLink,
} from "lucide-react";

interface CompanyDetailPanelProps {
  company: {
    id: string;
    slug: string;
    name: string;
    logo: string;
    banner?: string | null;
    sector: string;
    description: string;
    email?: string | null;
    phone?: string | null;
    jobs?: { id: string; title: string; slug: string }[];
  } | null;
  onClose: () => void;
}

export default function CompanyDetailPanel({
  company,
  onClose,
}: CompanyDetailPanelProps) {
  if (!company) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center dark:border-slate-700 dark:bg-slate-900">
        <p className="text-slate-500 dark:text-slate-400">
          Şirkət seçin ki, detalları burada görəsiniz.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Şirkət detayı</h2>
        <button
          onClick={onClose}
          className="rounded p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X size={18} />
        </button>
      </div>

      {company.banner && (
        <div className="relative mb-4 h-24 w-full overflow-hidden rounded-lg">
          <Image
            src={company.banner}
            alt={`${company.name} banner`}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-white dark:border-slate-700 dark:bg-slate-800">
          <Image
            src={company.logo}
            alt={company.name}
            width={64}
            height={64}
            className="h-12 w-12 object-contain"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">{company.name}</h3>
          <p className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
            <Building2 size={14} />
            {company.sector}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">
        {company.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
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

      <div className="mt-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
          <Briefcase size={14} />
          {company.jobs?.length || 0} elan
        </span>
      </div>

      <Link
        href={`/sirketler/${company.slug}`}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
      >
        <ExternalLink size={16} />
        Şirkət səhifəsinə bax
      </Link>
    </div>
  );
}
