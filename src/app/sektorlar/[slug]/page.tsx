import { notFound } from "next/navigation";
import { getSectorBySlug, getPositions, getSectors } from "@/lib/api";
import SektorClient from "./SektorClient";

interface SectorPageProps {
  params: Promise<{ slug: string }>;
}

export default async function SectorPage({ params }: SectorPageProps) {
  const { slug } = await params;
  const [sector, positions, sectors] = await Promise.all([
    getSectorBySlug(slug),
    getPositions(),
    getSectors(),
  ]);

  if (!sector) {
    notFound();
  }

  return <SektorClient sector={sector} positions={positions} sectors={sectors} />;
}
