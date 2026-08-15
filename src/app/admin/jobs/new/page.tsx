import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAuthAdmin } from "@/lib/auth";
import JobForm from "@/app/admin/JobForm";

export default async function NewJobPage() {
  const admin = await getAuthAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  const [companies, regions, categories] = await Promise.all([
    prisma.company.findMany({ orderBy: { name: "asc" } }),
    prisma.region.findMany({ orderBy: { name: "asc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Yeni elan
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Sayta yeni iş elanı əlavə edin
        </p>
      </div>

      <JobForm
        companies={companies}
        regions={regions}
        categories={categories}
      />
    </div>
  );
}
