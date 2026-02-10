import { FlowGraph } from "../types";

export const simpleAppFlow: FlowGraph = {
  id: "flow_simple_app",
  title: "Simple App Architecture",
  description: "Basic frontend → backend → database flow",

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),

  nodes: [
    {
      id: "user",
      type: "resource",
      title: "User",
      description: "End user interacting with the system",

      provides: ["user"],
      requires: [],
      optionalRequires: [],

      checklist: [],

      status: "ok",
      issues: [],

      position: { x: 0, y: 200 },

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
    },

    {
      id: "frontend",
      type: "process",
      title: "Frontend (Next.js)",
      description: "Web UI layer",

      provides: ["frontend"],
      requires: ["user"],
      optionalRequires: ["auth"],

      checklist: [
        { id: "c1", label: "UI layout", completed: true },
        { id: "c2", label: "API integration", completed: false },
      ],

      status: "ok",
      issues: [],

      position: { x: 250, y: 200 },

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
    },

    {
      id: "database",
      type: "resource",
      title: "Database",
      description: "Persistent storage",

      provides: ["database"],
      requires: [],
      optionalRequires: [],

      checklist: [{ id: "c3", label: "Schema design", completed: false }],

      status: "ok",
      issues: [],

      position: { x: 500, y: 350 },

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
    },
  ],

  edges: [
    {
      id: "e-user-frontend",
      source: "user",
      target: "frontend",
      type: "required",
    },
    {
      id: "e-frontend-db",
      source: "frontend",
      target: "database",
      type: "required",
    },
  ],
};
