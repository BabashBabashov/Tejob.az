import { prisma } from "./prisma";

export async function getJobs() {
  const jobs = await prisma.job.findMany({
    include: {
      company: true,
      region: true,
      categories: true,
    },
    orderBy: [{ isPremium: "desc" }, { createdAt: "desc" }],
  });

  return jobs.map((job: any) => ({
    ...job,
    requirements:
      typeof job.requirements === "string"
        ? JSON.parse(job.requirements)
        : job.requirements,
    createdAt: job.createdAt.toISOString().split("T")[0],
  }));
}

export async function getJobBySlug(slug: string) {
  const job = await prisma.job.findUnique({
    where: { slug },
    include: {
      company: true,
      region: true,
      categories: true,
    },
  });

  if (!job) return null;

  return {
    ...job,
    requirements:
      typeof job.requirements === "string"
        ? JSON.parse(job.requirements)
        : job.requirements,
    createdAt: job.createdAt.toISOString().split("T")[0],
  };
}

export async function getCompanies() {
  const companies = await prisma.company.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { jobs: true },
      },
    },
  });

  return companies.map((company: any) => ({
    ...company,
    jobCount: company._count.jobs,
  }));
}

export async function getCompanyBySlug(slug: string) {
  const company = await prisma.company.findUnique({
    where: { slug },
    include: {
      jobs: {
        include: {
          region: true,
          categories: true,
        },
        orderBy: [{ isPremium: "desc" }, { createdAt: "desc" }],
      },
    },
  });

  if (!company) return null;

  return {
    ...company,
    jobs: company.jobs.map((job: any) => ({
      ...job,
      requirements:
        typeof job.requirements === "string"
          ? JSON.parse(job.requirements)
          : job.requirements,
      createdAt: job.createdAt.toISOString().split("T")[0],
    })),
  };
}

export async function getRegions() {
  const regions = await prisma.region.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { jobs: true },
      },
    },
  });

  return regions.map((region: any) => ({
    ...region,
    jobCount: region._count.jobs,
  }));
}

export async function getRegionBySlug(slug: string) {
  const region = await prisma.region.findUnique({
    where: { slug },
    include: {
      jobs: {
        include: {
          company: true,
          categories: true,
        },
        orderBy: [{ isPremium: "desc" }, { createdAt: "desc" }],
      },
    },
  });

  if (!region) return null;

  return {
    ...region,
    jobs: region.jobs.map((job: any) => ({
      ...job,
      requirements:
        typeof job.requirements === "string"
          ? JSON.parse(job.requirements)
          : job.requirements,
      createdAt: job.createdAt.toISOString().split("T")[0],
    })),
  };
}

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

export async function getCategoryBySlug(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      jobs: {
        include: {
          company: true,
          region: true,
          categories: true,
        },
        orderBy: [{ isPremium: "desc" }, { createdAt: "desc" }],
      },
    },
  });

  if (!category) return null;

  return {
    ...category,
    jobs: category.jobs.map((job: any) => ({
      ...job,
      requirements:
        typeof job.requirements === "string"
          ? JSON.parse(job.requirements)
          : job.requirements,
      createdAt: job.createdAt.toISOString().split("T")[0],
    })),
  };
}

export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-");
  return `${day}.${month}.${year}`;
}
