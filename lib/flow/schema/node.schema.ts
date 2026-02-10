import { Capability } from "./capability";

export type NodeStatus = "ok" | "warning" | "error";
export type NodeType = "process" | "decision" | "resource" | "external";

export type ChecklistItem = {
  id: string;
  label: string;
  completed: boolean;
};

export type NodeIssue = {
  id: string;
  severity: "warning" | "error";
  message: string;
  relatedCapability?: Capability;
};

export type FlowNode = {
  /* Identity */
  id: string;
  type: NodeType;
  title: string;
  description?: string;

  /* Capabilities & dependencies */
  provides: Capability[];
  requires: Capability[];
  optionalRequires?: Capability[];

  /* Work tracking */
  checklist: ChecklistItem[];

  /* Validation (computed, not user-edited) */
  status: NodeStatus;
  issues: NodeIssue[];

  /* UX / layout */
  position: {
    x: number;
    y: number;
  };
  collapsed?: boolean;

  /* AI / intelligence (future) */
  aiNotes?: string;
  confidenceScore?: number;
  assumptions?: string[];

  /* Meta */
  createdAt: string;
  updatedAt: string;
  version: number;
};
