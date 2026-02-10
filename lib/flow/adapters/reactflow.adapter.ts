import type { Node, Edge } from "@xyflow/react";
import type { FlowGraph } from "../types";

/**
 * Converts domain FlowGraph → React Flow data
 */
export function adaptFlowToReactFlow(flow: FlowGraph): {
  nodes: Node<{ label: string; status: string }>[];
  edges: Edge[];
} {
  const nodes: Node<{ label: string; status: string }>[] = flow.nodes.map(
    (node) => ({
      id: node.id,
      type: "step", // later: map by node.type
      position: node.position,
      data: {
        label: node.title,
        status: node.status,
      },
    }),
  );

  const edges: Edge[] = flow.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    animated: edge.type === "required",
    style:
      edge.status === "error"
        ? { stroke: "#ef4444" }
        : edge.status === "warning"
          ? { stroke: "#f59e0b" }
          : undefined,
  }));

  return { nodes, edges };
}
