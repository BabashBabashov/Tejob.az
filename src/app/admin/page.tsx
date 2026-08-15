import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAuthAdmin } from "@/lib/auth";
import JobsTable from "./JobsTable";

export default async function AdminDashboardPage() {
  const admin = await getAuthAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  const jobs = await prisma.job.findMany({
    include: {
      company: true,
      region: true,
      categories: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const formattedJobs = jobs.map((job: any) => ({
    ...job,
    requirements:
      typeof job.requirements === "string"
        ? JSON.parse(job.requirements)
        : job.requirements,
    createdAt: job.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Elanlar
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Bütün iş elanlarını idarə edin
        </p>
      </div>

      <JobsTable jobs={formattedJobs} />
    </div>
  );
}
