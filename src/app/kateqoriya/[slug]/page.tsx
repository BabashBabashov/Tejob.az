import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/lib/api";
import JobCard from "@/components/JobCard";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {category.name}
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          {category.jobs.length} {category.jobs.length === 1 ? "elan" : "elan"} tapıldı
        </p>
      </div>

      {category.jobs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center dark:border-slate-700 dark:bg-slate-900">
          <p className="text-slate-500 dark:text-slate-400">
            Bu kateqoriyada aktiv elan yoxdur.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {category.jobs.map((job: any) => (
            <JobCard key={job.id} job={job as any} />
          ))}
        </div>
      )}
    </div>
  );
}
