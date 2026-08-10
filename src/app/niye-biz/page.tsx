import { socialLinks, pageContents } from "@/lib/data";

export default function WhyUsPage() {
  const page = pageContents["niye-biz"];

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

      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
          Bizi izləyin
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border border-slate-200 p-3 transition-colors hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-700 dark:hover:bg-emerald-900/20"
              style={{ color: link.color }}
            >
              <span className="font-medium">{link.name}</span>
              <span className="text-sm text-slate-400">→</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
