import { FlowGraph } from "../types";
import { FlowNode, NodeIssue } from "../schema/node.schema";

function collectProvidedCapabilities(nodes: FlowNode[]): Set<string> {
  const provided = new Set<string>();

  nodes.forEach((node) => {
    node.provides.forEach((cap) => provided.add(cap));
  });

  return provided;
}

function buildEdgeMap(edges: FlowGraph["edges"]) {
  const map = new Map<string, { incoming: number; outgoing: number }>();

  edges.forEach((edge) => {
    if (!map.has(edge.source)) {
      map.set(edge.source, { incoming: 0, outgoing: 0 });
    }
    if (!map.has(edge.target)) {
      map.set(edge.target, { incoming: 0, outgoing: 0 });
    }

    map.get(edge.source)!.outgoing += 1;
    map.get(edge.target)!.incoming += 1;
  });

  return map;
}

export function validateFlow(flow: FlowGraph): FlowGraph {
  const providedCapabilities = collectProvidedCapabilities(flow.nodes);
  const edgeMap = buildEdgeMap(flow.edges);

  const validatedNodes: FlowNode[] = flow.nodes.map((node) => {
    const issues: NodeIssue[] = [];

    // 🔴 Rule 1: Missing required capabilities
    node.requires.forEach((requiredCap) => {
      if (!providedCapabilities.has(requiredCap)) {
        issues.push({
          id: `missing-${requiredCap}`,
          severity: "error",
          message: `Missing required capability: ${requiredCap}`,
          relatedCapability: requiredCap,
        });
      }
    });

    // 🟡 Rule 2: Orphan node
    const connections = edgeMap.get(node.id);
    const isOrphan =
      !connections ||
      (connections.incoming === 0 && connections.outgoing === 0);

    if (isOrphan) {
      issues.push({
        id: "orphan-node",
        severity: "warning",
        message: "This node is not connected to any other node",
      });
    }

    // 🧠 Determine status
    const status = issues.some((i) => i.severity === "error")
      ? "error"
      : issues.some((i) => i.severity === "warning")
        ? "warning"
        : "ok";

    return {
      ...node,
      issues,
      status,
    };
  });

  return {
    ...flow,
    nodes: validatedNodes,
  };
}
