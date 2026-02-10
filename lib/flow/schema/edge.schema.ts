export type EdgeType = "required" | "optional" | "conditional";

export type FlowEdge = {
  id: string;
  source: string;
  target: string;
  type: EdgeType;

  label?: string; // for decisions
  condition?: string; // e.g. "if user authenticated"

  /* Derived */
  status?: "ok" | "warning" | "error";
};
