const STORAGE_KEY = "bookmarkedJobs";

export function getBookmarks(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function toggleBookmark(jobId: string): boolean {
  const bookmarks = getBookmarks();
  const index = bookmarks.indexOf(jobId);
  let next: string[];
  if (index > -1) {
    next = bookmarks.filter((id) => id !== jobId);
  } else {
    next = [...bookmarks, jobId];
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  // Dispatch event for other components
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("bookmarksChanged"));
  }
  return index === -1; // true if added, false if removed
}

export function isBookmarked(jobId: string): boolean {
  return getBookmarks().includes(jobId);
}
