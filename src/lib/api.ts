import { prisma } from "./prisma";

const now = () => new Date();

function expiresFilter() {
  return { OR: [{ expiresAt: null }, { expiresAt: { gte: now() } }] };
}

function computePremium(job: any) {
  return !!(job.isPremium && job.premiumExpiresAt && new Date(job.premiumExpiresAt) > now());
}

function mapJob(job: any) {
  return {
    ...job,
    createdAt: job.createdAt.toISOString(),
    isPremium: computePremium(job),
  };
}

export async function getJobs(page = 1, limit = 20) {
  const skip = (page - 1) * limit;
  const where = expiresFilter();

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
    jobs: jobs.map(mapJob),
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
  return mapJob(job);
}

export async function getCompanies() {
  const companies = await prisma.company.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: {
          jobs: { where: expiresFilter() },
        },
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
        where: expiresFilter(),
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
    jobs: company.jobs.map(mapJob),
  };
}

export async function getRegions() {
  const regions = await prisma.region.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: {
          jobs: { where: expiresFilter() },
        },
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
        where: expiresFilter(),
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
    jobs: region.jobs.map(mapJob),
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
        where: expiresFilter(),
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
    jobs: category.jobs.map(mapJob),
  };
}

export async function getPositions() {
  const positions = await prisma.position.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: {
          jobs: { where: expiresFilter() },
        },
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
        select: {
          jobs: { where: expiresFilter() },
        },
      },
    },
  });

  return sectors.map((sector: any) => ({
    ...sector,
    jobCount: sector._count.jobs,
  }));
}

export async function getPositionBySlug(slug: string) {
  const position = await prisma.position.findUnique({
    where: { slug },
    include: {
      jobs: {
        where: expiresFilter(),
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
    jobs: position.jobs.map(mapJob),
  };
}

export async function getSectorBySlug(slug: string) {
  const sector = await prisma.sector.findUnique({
    where: { slug },
    include: {
      jobs: {
        where: expiresFilter(),
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
    jobs: sector.jobs.map(mapJob),
  };
}
