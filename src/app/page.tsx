import { getJobs, getCompanies, getRegions, getCategories, getPositions, getSectors } from "@/lib/api";
import HomeClient from "./HomeClient";

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);

  const [jobsData, companies, regions, categories, positions, sectors] = await Promise.all([
    getJobs(currentPage, 20),
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
      pagination={{
        page: jobsData.page,
        totalPages: jobsData.totalPages,
        total: jobsData.total,
      }}
    />
  );
}
