import { FileText, Mail, Phone, Clock, CheckCircle2 } from "lucide-react";
import { pageContents } from "@/lib/data";

export default function PostJobPage() {
  const page = pageContents["is-elani-yerlesdir"];

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

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            <FileText size={20} />
          </div>
          <h3 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">
            Sənəd göndərin
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Elan təsvirini Word və ya PDF formatında hazırlayın.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            <Mail size={20} />
          </div>
          <h3 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">
            E-poçta göndərin
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            info@tejob.az ünvanına göndərin.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            <Clock size={20} />
          </div>
          <h3 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">
            30 gün ərzində
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Elanınız 30 gün ərzində saytda saxlanılır.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            <CheckCircle2 size={20} />
          </div>
          <h3 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">
            Sosial mediada paylaşım
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Bütün sosial media kanallarımızda paylaşılır.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-emerald-50 p-6 dark:border-slate-800 dark:bg-emerald-900/10">
        <h2 className="mb-2 text-lg font-semibold text-emerald-900 dark:text-emerald-100">
          Əlaqə
        </h2>
        <div className="flex flex-col gap-2 text-emerald-800 dark:text-emerald-200">
          <a href="mailto:info@tejob.az" className="inline-flex items-center gap-2 hover:underline">
            <Mail size={16} />
            info@tejob.az
          </a>
          <a href="tel:+994555002920" className="inline-flex items-center gap-2 hover:underline">
            <Phone size={16} />
            +994 55 500 29 20
          </a>
        </div>
      </div>
    </div>
  );
}
