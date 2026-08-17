"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Search, Crown, Eye, EyeOff } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Job {
  id: string;
  slug: string;
  title: string;
  isPremium: boolean;
  showViews: boolean;
  views: number;
  createdAt: string;
  company: { name: string };
  region: { name: string };
  categories: { name: string }[];
}

interface JobsTableProps {
  jobs: Job[];
}

export default function JobsTable({ jobs }: JobsTableProps) {
  const [query, setQuery] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);
  const router = useRouter();

  const filtered = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleToggleViews = async (id: string) => {
    setToggling(id);
    try {
      const res = await fetch(`/api/admin/jobs/${id}/toggle-views/`, {
        method: "PATCH",
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Baxış sayı dəyişilərkən xəta baş verdi");
      }
    } catch {
      alert("Şəbəkə xətası");
    } finally {
      setToggling(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu elanı silmək istədiyinizə əminsiniz?")) return;
    setDeleting(id);

    try {
      const res = await fetch(`/api/admin/jobs/${id}/`, {
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
            placeholder="Elan axtar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>
        <Link
          href="/admin/jobs/new"
          className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          + Yeni elan
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#1e293b]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                  Elan
                </th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                  Şirkət
                </th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                  Region
                </th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                  Tarix
                </th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                  Status
                </th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                  Baxış
                </th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700 dark:text-slate-300">
                  Əməliyyatlar
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                      {job.title}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {job.categories.map((c) => c.name).join(", ")}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    {job.company.name}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    {job.region.name}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    {formatDate(job.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    {job.isPremium ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        <Crown size={10} />
                        Premium
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Adi
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggleViews(job.id)}
                      disabled={toggling === job.id}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium transition-colors hover:bg-slate-100 disabled:opacity-50 dark:hover:bg-slate-800"
                      title={job.showViews ? "Baxışı gizlət" : "Baxışı göstər"}
                    >
                      {job.showViews ? (
                        <>
                          <Eye size={14} className="text-emerald-600" />
                          <span className="text-slate-700 dark:text-slate-300">{job.views}</span>
                        </>
                      ) : (
                        <>
                          <EyeOff size={14} className="text-slate-400" />
                          <span className="text-slate-400">—</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/jobs/${job.id}/edit`}
                        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(job.id)}
                        disabled={deleting === job.id}
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
                    colSpan={7}
                    className="px-4 py-12 text-center text-slate-500 dark:text-slate-400"
                  >
                    Elan tapılmadı.
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
