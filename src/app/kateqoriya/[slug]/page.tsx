import { notFound } from "next/navigation";
import { categories, jobs } from "@/lib/data";
import { getCategoryBySlug } from "@/lib/utils";
import JobCard from "@/components/JobCard";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryJobs = jobs.filter((j) => j.categoryIds.includes(category.id));

  const sortedJobs = [...categoryJobs].sort((a, b) => {
    if (a.isPremium && !b.isPremium) return -1;
    if (!a.isPremium && b.isPremium) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {category.name}
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          {sortedJobs.length} {sortedJobs.length === 1 ? "elan" : "elan"} tapıldı
        </p>
      </div>

      {sortedJobs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center dark:border-slate-700 dark:bg-slate-900">
          <p className="text-slate-500 dark:text-slate-400">
            Bu kateqoriyada aktiv elan yoxdur.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {sortedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
