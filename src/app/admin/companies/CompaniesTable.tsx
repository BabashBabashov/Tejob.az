"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Search, Building2, Briefcase } from "lucide-react";

interface Company {
  id: string;
  slug: string;
  name: string;
  sector: string;
  logo: string;
  email: string | null;
  phone: string | null;
  jobCount: number;
}

interface CompaniesTableProps {
  companies: Company[];
}

export default function CompaniesTable({ companies }: CompaniesTableProps) {
  const [query, setQuery] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  const filtered = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(query.toLowerCase()) ||
      company.sector.toLowerCase().includes(query.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Bu şirkəti silmək istədiyinizə əminsiniz? Bu şirkətə aid bütün elanlar da silinəcək.")) return;
    setDeleting(id);

    try {
      const res = await fetch(`/api/admin/companies/${id}/`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert("Silinərkən xəta baş verdi");
      }
    } catch {
      alert("Şəbəkə xətası");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Şirkət axtar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>
        <Link
          href="/admin/companies/new"
          className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          + Yeni şirkət
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#1e293b]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                  Şirkət
                </th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                  Sektor
                </th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                  Əlaqə
                </th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                  Elan sayı
                </th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700 dark:text-slate-300">
                  Əməliyyatlar
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((company) => (
                <tr key={company.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-slate-400" />
                      <span className="font-medium text-slate-900 dark:text-slate-100">
                        {company.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    {company.sector}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    {company.email || company.phone || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400">
                      <Briefcase size={14} />
                      {company.jobCount}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/companies/${company.id}/edit`}
                        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(company.id)}
                        disabled={deleting === company.id}
                        className="rounded-lg p-2 text-slate-600 hover:bg-red-50 hover:text-red-700 disabled:opacity-50 dark:text-slate-300 dark:hover:bg-red-900/20"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-slate-500 dark:text-slate-400"
                  >
                    Şirkət tapılmadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
