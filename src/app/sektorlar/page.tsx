import { getPositions, getSectors } from "@/lib/api";
import SektorListClient from "./SektorListClient";

export const dynamic = "force-dynamic";

export default async function SektorlarPage() {
  const [positions, sectors] = await Promise.all([
    getPositions(),
    getSectors(),
  ]);

  return <SektorListClient positions={positions} sectors={sectors} />;
}
