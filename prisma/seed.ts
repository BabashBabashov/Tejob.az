import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { companies, regions, categories, jobs } from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
  // Seed companies
  for (const company of companies) {
    await prisma.company.upsert({
      where: { id: company.id },
      update: company,
      create: company,
    });
  }

  // Seed regions
  for (const region of regions) {
    await prisma.region.upsert({
      where: { id: region.id },
      update: region,
      create: region,
    });
  }

  // Seed categories
  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {
        id: category.id,
        slug: category.slug,
        name: category.name,
        type: category.type,
      },
      create: {
        id: category.id,
        slug: category.slug,
        name: category.name,
        type: category.type,
      },
    });
  }

  // Seed jobs
  for (const job of jobs) {
    await prisma.job.upsert({
      where: { id: job.id },
      update: {
        slug: job.slug,
        title: job.title,
        description: job.description,
        salary: job.salary ?? null,
        workType: job.workType ?? null,
        deadline: job.deadline ?? null,
        contactPhone: job.contactPhone ?? null,
        contactEmail: job.contactEmail ?? null,
        isPremium: job.isPremium,
        views: job.views,
        createdAt: new Date(job.createdAt),
        company: { connect: { id: job.companyId } },
        region: { connect: { id: job.regionId } },
        categories: {
          set: (job.categoryIds || []).map((id: string) => ({ id })),
        },
      },
      create: {
        id: job.id,
        slug: job.slug,
        title: job.title,
        description: job.description,
        salary: job.salary ?? null,
        workType: job.workType ?? null,
        deadline: job.deadline ?? null,
        contactPhone: job.contactPhone ?? null,
        contactEmail: job.contactEmail ?? null,
        isPremium: job.isPremium,
        views: job.views,
        createdAt: new Date(job.createdAt),
        company: { connect: { id: job.companyId } },
        region: { connect: { id: job.regionId } },
        categories: {
          connect: (job.categoryIds || []).map((id: string) => ({ id })),
        },
      },
    });
  }

  // Seed admin user
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  await prisma.adminUser.upsert({
    where: { username: process.env.ADMIN_USERNAME ?? "admin" },
    update: { password: hashedPassword },
    create: {
      username: process.env.ADMIN_USERNAME ?? "admin",
      password: hashedPassword,
    },
  });

  console.log("✅ Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
