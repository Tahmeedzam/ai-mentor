import { Node, Edge } from "@xyflow/react";

export const overviewFlow = {
  nodes: [
    { id: "1", data: { label: "User" }, position: { x: 0, y: 100 } },
    { id: "2", data: { label: "MentorFlow UI" }, position: { x: 200, y: 100 } },
    { id: "3", data: { label: "Project Roadmap" }, position: { x: 400, y: 100 } },
  ],
  edges: [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
  ],
};

export const roadmapFlow = {
  nodes: [
    { id: "1", data: { label: "Project" }, position: { x: 0, y: 100 } },
    { id: "2", data: { label: "Phase 1: Setup" }, position: { x: 200, y: 0 } },
    { id: "3", data: { label: "Phase 2: Core" }, position: { x: 200, y: 100 } },
    { id: "4", data: { label: "Phase 3: Polish" }, position: { x: 200, y: 200 } },
  ],
  edges: [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e1-3", source: "1", target: "3" },
    { id: "e1-4", source: "1", target: "4" },
  ],
};

export const systemFlow = {
  nodes: [
    { id: "1", data: { label: "User" }, position: { x: 0, y: 100 } },
    { id: "2", data: { label: "Frontend (Next.js)" }, position: { x: 200, y: 100 } },
    { id: "3", data: { label: "AI Engine (Later)" }, position: { x: 400, y: 100 } },
    { id: "4", data: { label: "Structured Output" }, position: { x: 600, y: 100 } },
  ],
  edges: [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
    { id: "e3-4", source: "3", target: "4" },
  ],
};
