const VIEW_KEY_PREFIX = "job_view_";
const VIEW_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export function hasViewedRecently(slug: string): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = localStorage.getItem(`${VIEW_KEY_PREFIX}${slug}`);
    if (!raw) return false;
    const timestamp = Number(raw);
    return Date.now() - timestamp < VIEW_EXPIRY_MS;
  } catch {
    return false;
  }
}

export function markViewed(slug: string) {
  try {
    localStorage.setItem(`${VIEW_KEY_PREFIX}${slug}`, String(Date.now()));
  } catch {
    // ignore
  }
}
