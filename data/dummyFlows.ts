export interface DummyNode {
  id: string;
  label: string;
  description: string;
  color: "purple" | "blue" | "emerald" | "orange" | "pink"; // Match your THEMES keys
  progress: number;
}

export const dummyNodeMap: Record<string, DummyNode> = {
  user: {
    id: "user",
    label: "Client Request",
    description: "External user interaction via REST/WebSockets.",
    color: "purple",
    progress: 100,
  },
  frontend: {
    id: "frontend",
    label: "Next.js Edge",
    description: "Global Vercel Edge Network rendering and routing.",
    color: "blue",
    progress: 85,
  },
  ai: {
    id: "ai",
    label: "Gemini Pro",
    description: "Core LLM processing for semantic architecture analysis.",
    color: "emerald",
    progress: 40,
  },
  database: {
    id: "database",
    label: "PostgreSQL",
    description: "Vector-enabled persistence layer for long-term memory.",
    color: "orange",
    progress: 95,
  },
};
