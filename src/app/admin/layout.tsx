import { redirect } from "next/navigation";
import { getAuthAdmin } from "@/lib/auth";
import AdminHeader from "./AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAuthAdmin();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
      <AdminHeader admin={admin ? { username: admin.username } : null} />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
