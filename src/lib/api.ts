import { prisma } from "./prisma";

export async function getJobs(page = 1, limit = 20) {
  const now = new Date();
  const skip = (page - 1) * limit;

  const where = {
    OR: [
      { expiresAt: null },
      { expiresAt: { gte: now } },
    ],
  };

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      include: {
        company: true,
        region: true,
        position: true,
        sector: true,
        categories: true,
      },
      orderBy: [{ isPremium: "desc" }, { createdAt: "desc" }],
      skip,
      take: limit,
    }),
    prisma.job.count({ where }),
  ]);

  return {
    jobs: jobs.map((job: any) => ({
      ...job,
      createdAt: job.createdAt.toISOString().split("T")[0],
      // premium ExpiresAt-dən sonra premium=false kimi davranır
      isPremium: job.isPremium && job.premiumExpiresAt && new Date(job.premiumExpiresAt) > now,
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getJobBySlug(slug: string) {
  const job = await prisma.job.findUnique({
    where: { slug },
    include: {
      company: true,
      region: true,
      position: true,
      sector: true,
      categories: true,
    },
  });

  if (!job) return null;

  return {
    ...job,
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
          position: true,
          sector: true,
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
          position: true,
          sector: true,
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
          position: true,
          sector: true,
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
      createdAt: job.createdAt.toISOString().split("T")[0],
    })),
  };
}

export async function getPositions() {
  const positions = await prisma.position.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { jobs: true },
      },
    },
  });

  return positions.map((position: any) => ({
    ...position,
    jobCount: position._count.jobs,
  }));
}

export async function getSectors() {
  const sectors = await prisma.sector.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { jobs: true },
      },
    },
  });

  return sectors.map((sector: any) => ({
    ...sector,
    jobCount: sector._count.jobs,
  }));
}

export async function getPositionBySlug(slug: string) {
  const now = new Date();
  const position = await prisma.position.findUnique({
    where: { slug },
    include: {
      jobs: {
        where: {
          OR: [
            { expiresAt: null },
            { expiresAt: { gte: now } },
          ],
        },
        include: {
          company: true,
          region: true,
          position: true,
          sector: true,
          categories: true,
        },
        orderBy: [{ isPremium: "desc" }, { createdAt: "desc" }],
      },
    },
  });

  if (!position) return null;

  return {
    ...position,
    jobs: position.jobs.map((job: any) => ({
      ...job,
      createdAt: job.createdAt.toISOString().split("T")[0],
      isPremium: job.isPremium && job.premiumExpiresAt && new Date(job.premiumExpiresAt) > now,
    })),
  };
}

export async function getSectorBySlug(slug: string) {
  const now = new Date();
  const sector = await prisma.sector.findUnique({
    where: { slug },
    include: {
      jobs: {
        where: {
          OR: [
            { expiresAt: null },
            { expiresAt: { gte: now } },
          ],
        },
        include: {
          company: true,
          region: true,
          position: true,
          sector: true,
          categories: true,
        },
        orderBy: [{ isPremium: "desc" }, { createdAt: "desc" }],
      },
    },
  });

  if (!sector) return null;

  return {
    ...sector,
    jobs: sector.jobs.map((job: any) => ({
      ...job,
      createdAt: job.createdAt.toISOString().split("T")[0],
      isPremium: job.isPremium && job.premiumExpiresAt && new Date(job.premiumExpiresAt) > now,
    })),
  };
}

export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-");
  return `${day}.${month}.${year}`;
}