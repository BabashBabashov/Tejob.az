import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAuthAdmin } from "@/lib/auth";
import CompaniesTable from "./CompaniesTable";

export default async function AdminCompaniesPage() {
  const admin = await getAuthAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  const companies = await prisma.company.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { jobs: true },
      },
    },
  });

  const formattedCompanies = companies.map((company) => ({
    ...company,
    jobCount: company._count.jobs,
  }));

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Şirkətlər
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Bütün şirkətləri idarə edin
        </p>
      </div>

      <CompaniesTable companies={formattedCompanies} />
    </div>
  );
}
