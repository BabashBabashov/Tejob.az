import { pageContents } from "@/lib/data";

export default function TermsPage() {
  const page = pageContents["sertler"];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h1 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
          {page.title}
        </h1>
        <div
          className="prose prose-slate max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  );
}
