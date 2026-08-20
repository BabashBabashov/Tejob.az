"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Upload } from "lucide-react";
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
  sectorName: string;
  categoryIds: string[];
  description: string;
  salary: string;
  workType: string;
  deadline: string;
  contactPhone: string;
  contactEmail: string;
  isPremium: boolean;
  isInternship: boolean;
  isWomenOnly: boolean;
  showViews: boolean;
  views: number;
}

interface CompanyData {
  phone?: string | null;
  email?: string | null;
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
    sectorName: job?.sectorName || "",
    categoryIds: job?.categoryIds || [],
    description: job?.description || "",
    salary: job?.salary || "Razılaşma yolu ilə",
    workType: job?.workType || "Tam ştat",
    deadline: job?.deadline || "",
    contactPhone: job?.contactPhone || "",
    contactEmail: job?.contactEmail || "",
    isPremium: job?.isPremium || false,
    isInternship: job?.isInternship || false,
    isWomenOnly: job?.isWomenOnly || false,
    showViews: job?.showViews ?? true,
    views: job?.views || 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | string[]>("");
  const [positionSuggestions, setPositionSuggestions] = useState<string[]>([]);
  const [showPositionSuggestions, setShowPositionSuggestions] = useState(false);
  const [sectorSuggestions, setSectorSuggestions] = useState<string[]>([]);
  const [showSectorSuggestions, setShowSectorSuggestions] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const sectorRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const company = companies.find((c) => c.id === formData.companyId);
    if (company && !isEditing) {
      setFormData((prev) => ({
        ...prev,
        contactPhone: company.phone || "",
        contactEmail: company.email || "",
      }));
    }
  }, [formData.companyId, companies, isEditing]);

  useEffect(() => {
    if (formData.title.trim().length < 2) {
      setPositionSuggestions([]);
      return;
    }
    const timer = setTimeout(() => {
      fetch(`/api/positions?q=${encodeURIComponent(formData.title)}`)
        .then((res) => res.json())
        .then((data) => setPositionSuggestions(data.map((p: any) => p.name)))
        .catch(() => setPositionSuggestions([]));
    }, 200);
    return () => clearTimeout(timer);
  }, [formData.title]);

  useEffect(() => {
    if (formData.sectorName.trim().length < 2) {
      setSectorSuggestions([]);
      return;
    }
    const timer = setTimeout(() => {
      fetch(`/api/sectors?q=${encodeURIComponent(formData.sectorName)}`)
        .then((res) => res.json())
        .then((data) => setSectorSuggestions(data.map((s: any) => s.name)))
        .catch(() => setSectorSuggestions([]));
    }, 200);
    return () => clearTimeout(timer);
  }, [formData.sectorName]);

  const handleCategoryToggle = (categoryId: string) => {
    setFormData((prev) => {
      const exists = prev.categoryIds.includes(categoryId);
      const nextCategoryIds = exists
        ? prev.categoryIds.filter((id) => id !== categoryId)
        : [...prev.categoryIds, categoryId];
      return { ...prev, categoryIds: nextCategoryIds };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.title.trim().length < 3) {
      setError("Vəzifə adı ən azı 3 simvol olmalıdır");
      return;
    }

    if (!formData.companyId) {
      setError("Şirkət seçilməlidir");
      return;
    }

    if (!formData.regionId) {
      setError("Region seçilməlidir");
      return;
    }

    if (!formData.sectorName.trim()) {
      setError("Sektor adı daxil edilməlidir");
      return;
    }

    if (formData.description.trim().length < 10) {
      setError("İş haqqında məlumat ən azı 10 simvol olmalıdır");
      return;
    }

    if (
      formData.contactEmail.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail.trim())
    ) {
      setError("Düzgün e-poçt ünvanı daxil edin");
      return;
    }

    setLoading(true);

    const payload = {
      ...formData,
      salary: formData.salary || "Razılaşma yolu ilə",
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
        setError(data.messages || data.error || "Xəta baş verdi");
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
          {Array.isArray(error) ? (
            <ul className="list-disc space-y-1 pl-4">
              {error.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          ) : (
            error
          )}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="relative sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Vəzifə adı
          </label>
          <input
            ref={titleRef}
            type="text"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            onFocus={() => setShowPositionSuggestions(true)}
            onBlur={() => setTimeout(() => setShowPositionSuggestions(false), 200)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
          {showPositionSuggestions && positionSuggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
              {positionSuggestions.map((name) => (
                <li
                  key={name}
                  onMouseDown={() => {
                    setFormData((prev) => ({ ...prev, title: name }));
                    setShowPositionSuggestions(false);
                  }}
                  className="cursor-pointer px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
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

      <div className="relative">
        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Sektor
        </label>
        <input
          ref={sectorRef}
          type="text"
          required
          value={formData.sectorName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, sectorName: e.target.value }))
          }
          onFocus={() => setShowSectorSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSectorSuggestions(false), 200)}
          placeholder="məs: Retail / Satış"
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
        {showSectorSuggestions && sectorSuggestions.length > 0 && (
          <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
            {sectorSuggestions.map((name) => (
              <li
                key={name}
                onMouseDown={() => {
                  setFormData((prev) => ({ ...prev, sectorName: name }));
                  setShowSectorSuggestions(false);
                }}
                className="cursor-pointer px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
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
          rows={6}
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
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
            <option value="Yarımştat">Yarımştat</option>
            <option value="Uzaqdan">Uzaqdan</option>
            <option value="Növbəli">Növbəli</option>
            <option value="Frilans">Frilans</option>
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
            checked={formData.isInternship}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                isInternship: e.target.checked,
              }))
            }
            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Təcrübə proqramı
          </span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.isWomenOnly}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                isWomenOnly: e.target.checked,
              }))
            }
            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Qadın işləri
          </span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.showViews}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                showViews: e.target.checked,
              }))
            }
            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Baxış sayını göstər
          </span>
        </label>
      </div>

      {isEditing && (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Baxış sayı
          </label>
          <input
            type="number"
            min={0}
            value={formData.views}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                views: parseInt(e.target.value || "0", 10),
              }))
            }
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>
      )}

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