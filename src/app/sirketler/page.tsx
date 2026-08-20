import { getCompanies, getPositions, getSectors, getJobs } from "@/lib/api";
import SirketlarClient from "./SirketlarClient";

export default async function CompaniesPage() {
  const [companies, positions, sectors, jobsData] = await Promise.all([
    getCompanies(),
    getPositions(),
    getSectors(),
    getJobs(1, 1000),
  ]);

  return (
    <SirketlarClient
      initialCompanies={companies}
      positions={positions}
      sectors={sectors}
      jobs={jobsData.jobs}
    />
  );
}
