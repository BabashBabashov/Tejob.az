"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, LogOut, LayoutDashboard, PlusCircle, Briefcase, Building2 } from "lucide-react";

interface AdminHeaderProps {
  admin: { username: string } | null;
}

export default function AdminHeader({ admin }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout/", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0f172a]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/admin" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-emerald-600" />
          <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Admin Panel
          </span>
        </Link>

        {admin && (
          <nav className="hidden items-center gap-1 sm:flex">
            <Link
              href="/admin"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
            <Link
              href="/admin/jobs/new"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <PlusCircle size={16} />
              Yeni elan
            </Link>
            <Link
              href="/admin/companies/new"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Building2 size={16} />
              Yeni şirkət
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Briefcase size={16} />
              Sayta bax
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-3">
          {admin ? (
            <>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {admin.username}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                <LogOut size={16} />
                Çıxış
              </button>
            </>
          ) : (
            <Link
              href="/admin/login"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Daxil ol
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
