import { notFound } from "next/navigation";
import { getPositionBySlug, getPositions, getSectors } from "@/lib/api";
import VezifeClient from "./VezifeClient";

interface PositionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PositionPage({ params }: PositionPageProps) {
  const { slug } = await params;
  const [position, positions, sectors] = await Promise.all([
    getPositionBySlug(slug),
    getPositions(),
    getSectors(),
  ]);

  if (!position) {
    notFound();
  }

  return <VezifeClient position={position} positions={positions} sectors={sectors} />;
}
