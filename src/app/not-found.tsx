import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
          <SearchX className="h-10 w-10 text-slate-400" />
        </div>
        <h1 className="mb-2 text-4xl font-bold text-slate-900 dark:text-slate-100">
          404
        </h1>
        <p className="mb-6 text-lg text-slate-500 dark:text-slate-400">
          Axtardığınız səhifə tapılmadı.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
        >
          Ana səhifəyə qayıt
        </Link>
      </div>
    </div>
  );
}
