import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-6 dark:border-slate-800 dark:bg-[#0f172a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <Link href="/" className="text-sm font-semibold text-slate-900 hover:text-emerald-700 dark:text-slate-100 dark:hover:text-emerald-400">
            tejob.az
          </Link>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Bütün hüquqlar qorunur.
          </p>
        </div>
      </div>
    </footer>
  );
}
