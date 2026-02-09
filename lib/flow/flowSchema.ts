export type FlowStep = {
  id: string;
  label: string;
};

export type FlowConnection = {
  from: string;
  to: string;
};

export type FlowResponse = {
  summary: string;
  steps: FlowStep[];
  connections: FlowConnection[];
};

export function validateFlowJSON(data: any): data is FlowResponse {
  if (!data) return false;

  if (typeof data.summary !== "string") return false;
  if (!Array.isArray(data.steps)) return false;
  if (!Array.isArray(data.connections)) return false;

  const ids = new Set<string>();

  for (const step of data.steps) {
    if (typeof step.id !== "string" || typeof step.label !== "string") {
      return false;
    }
    ids.add(step.id);
  }

  for (const conn of data.connections) {
    if (
      typeof conn.from !== "string" ||
      typeof conn.to !== "string" ||
      !ids.has(conn.from) ||
      !ids.has(conn.to)
    ) {
      return false;
    }
  }

  return true;
}
