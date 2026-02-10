import { FlowNode } from "./schema/node.schema";
import { FlowEdge } from "./schema/edge.schema";

export type FlowGraph = {
  id: string;
  title: string;
  description?: string;

  nodes: FlowNode[];
  edges: FlowEdge[];

  createdAt: string;
  updatedAt: string;
};
