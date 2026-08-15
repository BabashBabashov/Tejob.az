import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAuthAdmin } from "@/lib/auth";
import JobForm from "@/app/admin/JobForm";

interface EditJobPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  const admin = await getAuthAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const job = await prisma.job.findUnique({
    where: { id },
    include: { categories: true },
  });

  if (!job) {
    notFound();
  }

  const [companies, regions, categories] = await Promise.all([
    prisma.company.findMany({ orderBy: { name: "asc" } }),
    prisma.region.findMany({ orderBy: { name: "asc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  const formattedJob = {
    ...job,
    requirements:
      typeof job.requirements === "string"
        ? JSON.parse(job.requirements)
        : job.requirements,
    categoryIds: job.categories.map((c: { id: string }) => c.id),
    salary: job.salary ?? "",
    workType: job.workType ?? "",
    deadline: job.deadline ?? "",
    contactPhone: job.contactPhone ?? "",
    contactEmail: job.contactEmail ?? "",
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Elanı redaktə et
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          İş elanının məlumatlarını yeniləyin
        </p>
      </div>

      <JobForm
        job={formattedJob}
        companies={companies}
        regions={regions}
        categories={categories}
      />
    </div>
  );
}
