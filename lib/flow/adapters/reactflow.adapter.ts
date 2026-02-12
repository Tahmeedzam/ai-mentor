import type { Node, Edge } from "@xyflow/react";
import type { FlowGraph } from "../types";

export function adaptFlowToReactFlow(flow: FlowGraph): {
  nodes: Node<FlowGraph["nodes"][number]>[];
  edges: Edge[];
} {
  const nodes: Node<FlowGraph["nodes"][number]>[] = flow.nodes.map((node) => ({
    id: node.id,
    type: "step",
    position: node.position,
    data: node, // ✅ FULL NODE PASSED
  }));

  const edges: Edge[] = flow.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
  }));

  return { nodes, edges };
}
