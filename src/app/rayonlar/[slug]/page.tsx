import { notFound } from "next/navigation";
import { getRegionBySlug, getPositions, getSectors } from "@/lib/api";
import RayonClient from "./RayonClient";

interface RegionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function RegionDetailPage({ params }: RegionPageProps) {
  const { slug } = await params;
  const [region, positions, sectors] = await Promise.all([
    getRegionBySlug(slug),
    getPositions(),
    getSectors(),
  ]);

  if (!region) {
    notFound();
  }

  return <RayonClient region={region} positions={positions} sectors={sectors} />;
}
