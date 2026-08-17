import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAuthAdmin } from "@/lib/auth";
import CompanyForm from "@/app/admin/CompanyForm";

interface EditCompanyPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCompanyPage({ params }: EditCompanyPageProps) {
  const admin = await getAuthAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const company = await prisma.company.findUnique({
    where: { id },
  });

  if (!company) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Şirkəti redaktə et
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Şirkət məlumatlarını yeniləyin
        </p>
      </div>

      <CompanyForm company={company} />
    </div>
  );
}
