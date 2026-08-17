import { getJobs, getCompanies, getRegions, getCategories } from "@/lib/api";
import HomeClient from "./HomeClient";

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);

  const [jobsData, companies, regions, categories] = await Promise.all([
    getJobs(currentPage, 20),
    getCompanies(),
    getRegions(),
    getCategories(),
  ]);

  return (
    <HomeClient
      initialJobs={jobsData.jobs}
      companies={companies}
      regions={regions}
      categories={categories}
      pagination={{
        page: jobsData.page,
        totalPages: jobsData.totalPages,
        total: jobsData.total,
      }}
    />
  );
}
