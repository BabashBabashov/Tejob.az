import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tejob.az";

  const jobs = await prisma.job.findMany({
    select: { slug: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  const companies = await prisma.company.findMany({
    select: { slug: true },
  });

  const regions = await prisma.region.findMany({
    select: { slug: true },
  });

  const categories = await prisma.category.findMany({
    select: { slug: true },
  });

  const jobUrls = jobs.map((job) => ({
    url: `${baseUrl}/elanlar/${job.slug}`,
    lastModified: job.createdAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const companyUrls = companies.map((company) => ({
    url: `${baseUrl}/sirketler/${company.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const regionUrls = regions.map((region) => ({
    url: `${baseUrl}/rayonlar/${region.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/kateqoriya/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/sirketler`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/rayonlar`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/niye-biz`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/elaqe`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/is-elani-yerlesdir`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/abune`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/sertler`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...jobUrls,
    ...companyUrls,
    ...regionUrls,
    ...categoryUrls,
  ];
}
