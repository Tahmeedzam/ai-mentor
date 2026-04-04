export function detectNodeType(label: string): string {
  const text = label.toLowerCase();

  if (text.includes("ui") || text.includes("frontend")) return "frontend";

  if (
    text.includes("backend") ||
    text.includes("api") ||
    text.includes("server") ||
    text.includes("auth")
  )
    return "backend";

  if (
    text.includes("database") ||
    text.includes("db") ||
    text.includes("schema") ||
    text.includes("storage")
  )
    return "database";

  if (text.includes("ai") || text.includes("model")) return "ai";

  return "other";
}
