import { getJobs, getCompanies, getRegions, getCategories, getPositions, getSectors } from "@/lib/api";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function Home() {
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
}
