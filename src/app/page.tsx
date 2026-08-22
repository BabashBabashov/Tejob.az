import { getJobs, getCompanies, getRegions, getCategories, getPositions, getSectors } from "@/lib/api";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  try {
    const [jobsData, companies, regions, categories, positions, sectors] = await Promise.all([
      getJobs(1, 20),
      getCompanies(),
      getRegions(),
      getCategories(),
      getPositions(),
      getSectors(),
    ]);

    return (
      <HomeClient
        initialJobs={jobsData.jobs}
        companies={companies}
        regions={regions}
        categories={categories}
        positions={positions}
        sectors={sectors}
        initialHasMore={jobsData.totalPages > 1}
      />
    );
  } catch (error) {
    console.error("Home page error:", error);
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Xəta baş verdi</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Səhifə yüklənərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.</p>
        </div>
      </div>
    );
  }
}
