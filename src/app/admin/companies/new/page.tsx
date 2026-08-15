import { redirect } from "next/navigation";
import { getAuthAdmin } from "@/lib/auth";
import CompanyForm from "@/app/admin/CompanyForm";

export default async function NewCompanyPage() {
  const admin = await getAuthAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Yeni şirkət
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Sistemə yeni şirkət əlavə edin
        </p>
      </div>

      <CompanyForm />
    </div>
  );
}
