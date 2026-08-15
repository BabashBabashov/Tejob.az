"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Plus, Trash2 } from "lucide-react";
import type { Company, Region, Category, Job } from "@prisma/client";

interface JobFormProps {
  job?: JobFormData;
  companies: Company[];
  regions: Region[];
  categories: Category[];
}

interface JobFormData {
  id?: string;
  title: string;
  companyId: string;
  regionId: string;
  categoryIds: string[];
  description: string;
  requirements: string[];
  salary: string;
  workType: string;
  deadline: string;
  contactPhone: string;
  contactEmail: string;
  isPremium: boolean;
  views: number;
}

export default function JobForm({
  job,
  companies,
  regions,
  categories,
}: JobFormProps) {
  const router = useRouter();
  const isEditing = Boolean(job?.id);

  const [formData, setFormData] = useState<JobFormData>({
    title: job?.title || "",
    companyId: job?.companyId || companies[0]?.id || "",
    regionId: job?.regionId || regions[0]?.id || "",
    categoryIds: job?.categoryIds || [],
    description: job?.description || "",
    requirements: job?.requirements?.length ? job.requirements : [""],
    salary: job?.salary || "",
    workType: job?.workType || "Tam ştat",
    deadline: job?.deadline || "",
    contactPhone: job?.contactPhone || "",
    contactEmail: job?.contactEmail || "",
    isPremium: job?.isPremium || false,
    views: job?.views || 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showViews, setShowViews] = useState(
    isEditing ? (job?.views ?? 0) > 0 : false
  );

  const handleCategoryToggle = (categoryId: string) => {
    setFormData((prev) => {
      const exists = prev.categoryIds.includes(categoryId);
      return {
        ...prev,
        categoryIds: exists
          ? prev.categoryIds.filter((id) => id !== categoryId)
          : [...prev.categoryIds, categoryId],
      };
    });
  };

  const addRequirement = () => {
    setFormData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ""],
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.requirements];
      updated[index] = value;
      return { ...prev, requirements: updated };
    });
  };

  const removeRequirement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      ...formData,
      requirements: formData.requirements.filter((r) => r.trim() !== ""),
    };

    try {
      const url = isEditing ? `/api/admin/jobs/${job?.id}/` : "/api/admin/jobs/";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Xəta baş verdi");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Şəbəkə xətası");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#1e293b]"
    >
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Vəzifə adı
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Şirkət
          </label>
          <select
            required
            value={formData.companyId}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, companyId: e.target.value }))
            }
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Region
          </label>
          <select
            required
            value={formData.regionId}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, regionId: e.target.value }))
            }
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Kateqoriyalar
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const selected = formData.categoryIds.includes(category.id);
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryToggle(category.id)}
                className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                  selected
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          İş haqqında
        </label>
        <textarea
          required
          rows={5}
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Tələblər
        </label>
        <div className="space-y-2">
          {formData.requirements.map((req, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={req}
                onChange={(e) => updateRequirement(index, e.target.value)}
                placeholder={`Tələb ${index + 1}`}
                className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
              {formData.requirements.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRequirement(index)}
                  className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:text-slate-300"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addRequirement}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            <Plus size={16} />
            Tələb əlavə et
          </button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Əmək haqqı
          </label>
          <input
            type="text"
            value={formData.salary}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, salary: e.target.value }))
            }
            placeholder="məs: 1000 - 1500 AZN"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            İş qrafiki
          </label>
          <select
            value={formData.workType}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, workType: e.target.value }))
            }
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="Tam ştat">Tam ştat</option>
            <option value="Hissəvi">Hissəvi</option>
            <option value="Uzaqdan">Uzaqdan</option>
            <option value="Növbəli">Növbəli</option>
            <option value="Frilans">Frilans</option>
            <option value="Təcrübə">Təcrübə</option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Son tarix
          </label>
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, deadline: e.target.value }))
            }
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Əlaqə telefonu
          </label>
          <input
            type="tel"
            value={formData.contactPhone}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                contactPhone: e.target.value,
              }))
            }
            placeholder="+994 55 123 45 67"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Əlaqə e-poçtu
          </label>
          <input
            type="email"
            value={formData.contactEmail}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                contactEmail: e.target.value,
              }))
            }
            placeholder="hr@example.com"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.isPremium}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                isPremium: e.target.checked,
              }))
            }
            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Premium elan
          </span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showViews}
            onChange={(e) => setShowViews(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Baxış sayını göstər
          </span>
        </label>

        {showViews && (
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Baxış sayı:
            </label>
            <input
              type="number"
              min={0}
              value={formData.views}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  views: parseInt(e.target.value) || 0,
                }))
              }
              className="w-24 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <X size={16} />
          Ləğv et
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-70"
        >
          <Save size={16} />
          {loading ? "Saxlanılır..." : isEditing ? "Yenilə" : "Yarat"}
        </button>
      </div>
    </form>
  );
}
