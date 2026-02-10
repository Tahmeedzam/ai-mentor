export type DummyNode = {
  id: string;
  label: string;
  description: string;
};

export const dummyNodeMap: Record<string, DummyNode> = {
  user: {
    id: "user",
    label: "User",
    description: "The end user interacting with KAIROS via the UI.",
  },
  frontend: {
    id: "frontend",
    label: "Frontend (Next.js)",
    description: "The web interface responsible for user interaction.",
  },
  ai: {
    id: "ai",
    label: "AI Engine",
    description: "Processes user intent and generates structured output.",
  },
};
