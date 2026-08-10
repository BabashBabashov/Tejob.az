import Link from "next/link";
import { socialLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-[#0f172a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              tejob.az
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} Bütün hüquqlar qorunur.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600 dark:text-slate-400">
            <Link href="/niye-biz" className="hover:text-emerald-700 dark:hover:text-emerald-400">
              Niyə Biz
            </Link>
            <Link href="/elaqe" className="hover:text-emerald-700 dark:hover:text-emerald-400">
              Əlaqə
            </Link>
            <Link href="/sertler" className="hover:text-emerald-700 dark:hover:text-emerald-400">
              Şərtlər
            </Link>
            <Link href="/is-elani-yerlesdir" className="hover:text-emerald-700 dark:hover:text-emerald-400">
              Elan yerləşdir
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-500 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400"
                title={link.name}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
