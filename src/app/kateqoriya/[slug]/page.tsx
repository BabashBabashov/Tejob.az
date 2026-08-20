import { notFound } from "next/navigation";
import { getCategoryBySlug, getPositions, getSectors } from "@/lib/api";
import KateqoriyaClient from "./KateqoriyaClient";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, positions, sectors] = await Promise.all([
    getCategoryBySlug(slug),
    getPositions(),
    getSectors(),
  ]);

  if (!category) {
    notFound();
  }

  return <KateqoriyaClient category={category} positions={positions} sectors={sectors} />;
}
