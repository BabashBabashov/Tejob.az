export function formatDate(dateString: string): string {
  const normalized = dateString.includes("T")
    ? dateString.split("T")[0]
    : dateString;
  const [year, month, day] = normalized.split("-");
  return `${day}.${month}.${year}`;
}
