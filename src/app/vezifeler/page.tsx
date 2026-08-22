import { getPositions, getSectors } from "@/lib/api";
import VezifeListClient from "./VezifeListClient";

export const dynamic = "force-dynamic";

export default async function VezifelerPage() {
  const [positions, sectors] = await Promise.all([
    getPositions(),
    getSectors(),
  ]);

  return <VezifeListClient positions={positions} sectors={sectors} />;
}
