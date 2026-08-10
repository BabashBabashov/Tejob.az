import { Mail, Phone, MapPin } from "lucide-react";
import { socialLinks, pageContents } from "@/lib/data";

export default function ContactPage() {
  const page = pageContents["elaqe"];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h1 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
          {page.title}
        </h1>
        <div
          className="prose prose-slate max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <a
          href="mailto:info@tejob.az"
          className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-5 text-center transition-colors hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-emerald-900/20"
        >
          <Mail className="h-6 w-6 text-emerald-600" />
          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
            info@tejob.az
          </span>
        </a>
        <a
          href="tel:+994555002920"
          className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-5 text-center transition-colors hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-emerald-900/20"
        >
          <Phone className="h-6 w-6 text-emerald-600" />
          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
            +994 55 500 29 20
          </span>
        </a>
        <div className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-5 text-center dark:border-slate-800 dark:bg-slate-900">
          <MapPin className="h-6 w-6 text-emerald-600" />
          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
            Bakı, Nərimanov
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
          Sosial şəbəkələr
        </h2>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-emerald-100 hover:text-emerald-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
