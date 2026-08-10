import { Company, Job, Region, Category } from "./types";
import { companies, jobs, regions, categories } from "./data";

export function getCompanyById(id: string): Company | undefined {
  return companies.find((c) => c.id === id);
}

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

export function getRegionById(id: string): Region | undefined {
  return regions.find((r) => r.id === id);
}

export function getRegionBySlug(slug: string): Region | undefined {
  return regions.find((r) => r.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getJobsByCompany(companyId: string): Job[] {
  return jobs.filter((j) => j.companyId === companyId);
}

export function getJobsByRegion(regionId: string): Job[] {
  return jobs.filter((j) => j.regionId === regionId);
}

export function getJobsByCategory(categoryId: string): Job[] {
  return jobs.filter((j) => j.categoryIds.includes(categoryId));
}

export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}

export function getCompanyJobCount(companyId: string): number {
  return jobs.filter((j) => j.companyId === companyId).length;
}

export function getRegionJobCount(regionId: string): number {
  return jobs.filter((j) => j.regionId === regionId).length;
}

export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-");
  return `${day}.${month}.${year}`;
}

export function searchJobs(query: string): Job[] {
  const lower = query.toLowerCase();
  return jobs.filter((job: Job) => {
    const company = getCompanyById(job.companyId);
    return (
      job.title.toLowerCase().includes(lower) ||
      company?.name.toLowerCase().includes(lower) ||
      false
    );
  });
}
