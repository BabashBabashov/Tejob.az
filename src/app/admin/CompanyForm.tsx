"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Upload } from "lucide-react";

interface CompanyFormProps {
  company?: {
    id: string;
    name: string;
    sector: string;
    description: string;
    logo: string;
    banner?: string | null;
    email: string | null;
    phone: string | null;
  };
}

export default function CompanyForm({ company }: CompanyFormProps) {
  const router = useRouter();
  const isEditing = Boolean(company?.id);

  const [formData, setFormData] = useState({
    name: company?.name || "",
    sector: company?.sector || "",
    description: company?.description || "",
    logo: company?.logo || "/logo.png",
    banner: company?.banner || "",
    email: company?.email || "",
    phone: company?.phone || "",
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File, field: "logo" | "banner") => {
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Upload xətası");
      } else {
        setFormData((prev) => ({ ...prev, [field]: result.url }));
      }
    } catch {
      setError("Upload xətası");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "logo" | "banner"
  ) => {
    const file = e.target.files?.[0];
    if (file) await uploadFile(file, field);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = isEditing
        ? `/api/admin/companies/${company?.id}/`
        : "/api/admin/companies/";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Xəta baş verdi");
        return;
      }

      router.push("/admin/companies");
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
            Şirkətin adı
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Sektor
          </label>
          <input
            type="text"
            required
            value={formData.sector}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, sector: e.target.value }))
            }
            placeholder="məs: Retail / Satış"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Logo
          </label>
          <input
            ref={logoInputRef}
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => handleFileChange(e, "logo")}
            className="hidden"
          />
          <div className="flex items-center gap-3">
            {formData.logo && (
              <img
                src={formData.logo}
                alt="Logo"
                className="h-12 w-12 rounded-lg border border-slate-200 object-contain dark:border-slate-700"
              />
            )}
            <button
              type="button"
              onClick={() => logoInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              <Upload size={16} />
              Logo yüklə
            </button>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            JPG, JPEG, PNG (max 5 MB)
          </p>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Banner
          </label>
          <input
            ref={bannerInputRef}
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => handleFileChange(e, "banner")}
            className="hidden"
          />
          <div className="flex items-center gap-3">
            {formData.banner && (
              <img
                src={formData.banner}
                alt="Banner"
                className="h-12 w-24 rounded-lg border border-slate-200 object-cover dark:border-slate-700"
              />
            )}
            <button
              type="button"
              onClick={() => bannerInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              <Upload size={16} />
              Banner yüklə
            </button>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            JPG, JPEG, PNG (max 5 MB)
          </p>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Haqqında
        </label>
        <textarea
          required
          rows={4}
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            E-poçt
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="hr@example.com"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Telefon
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            placeholder="+994 55 123 45 67"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => router.push("/admin/companies")}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <X size={16} />
          Ləğv et
        </button>
        <button
          type="submit"
          disabled={loading || uploading}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-70"
        >
          <Save size={16} />
          {loading ? "Saxlanılır..." : isEditing ? "Yenilə" : "Yarat"}
        </button>
      </div>
    </form>
  );
}