"use client";

import { useEffect } from "react";
import { hasViewedRecently, markViewed } from "@/lib/viewCounter";

interface ViewCounterProps {
  slug: string;
}

export default function ViewCounter({ slug }: ViewCounterProps) {
  useEffect(() => {
    if (hasViewedRecently(slug)) return;

    fetch(`/api/jobs/${slug}/view/`, { method: "POST" })
      .then(() => markViewed(slug))
      .catch(() => {});
  }, [slug]);

  return null;
}
