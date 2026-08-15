"use client";

import { useEffect } from "react";

interface ViewCounterProps {
  slug: string;
}

export default function ViewCounter({ slug }: ViewCounterProps) {
  useEffect(() => {
    fetch(`/api/jobs/${slug}/view/`, { method: "POST" }).catch(() => {
      // Silently ignore errors to not break user experience
    });
  }, [slug]);

  return null;
}
