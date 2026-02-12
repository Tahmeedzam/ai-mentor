export type DummyNode = {
  id: string;
  label: string;
  description: string;
  color: "purple" | "blue" | "pink" | "emerald"; // Restricted to our theme keys
  progress: number;
};

export const dummyNodeMap: Record<string, DummyNode> = {
  user: {
    id: "user",
    label: "User",
    description: "The end user interacting with KAIROS via the UI.",
    color: "purple",
    progress: 100,
  },
  frontend: {
    id: "frontend",
    label: "Frontend (Next.js)",
    description: "The web interface responsible for user interaction.",
    color: "blue",
    progress: 65,
  },
  ai: {
    id: "ai",
    label: "AI Engine",
    description: "Processes user intent and generates structured output.",
    color: "emerald",
    progress: 30,
  },
};
