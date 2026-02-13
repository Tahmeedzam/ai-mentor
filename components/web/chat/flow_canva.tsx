"use client";

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  OnEdgesChange,
  ConnectionMode,
  OnNodesChange,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";
import type { Node, Edge } from "@xyflow/react";
import { Boxes, MousePointer2, Plus } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import type { FlowResponse } from "@/lib/flow/flowSchema";
import StepNode from "@/components/web/flow/stepNode";
// import { overviewFlow, roadmapFlow } from "@/data/dummyFlows";
import { useParams, useRouter } from "next/navigation";
import { dummyNodeMap } from "@/data/dummyFlows";
import { simpleAppFlow } from "@/lib/flow/dummy/flow.template";
import { adaptFlowToReactFlow } from "@/lib/flow/adapters/reactflow.adapter";
import { FlowGraph } from "@/lib/flow/types";
import type { Connection, OnConnect } from "@xyflow/react";
import FlowCardBar from "../flow/flowCardBar";
import { validateFlow } from "@/lib/flow/validation/validateFlow";
import { Button } from "@/components/ui/button";
import { FlowNode } from "@/lib/flow/schema/node.schema";
import { getFlowIssues } from "@/lib/flow/validation/getFlowIssue";

type StepNodeData = FlowGraph["nodes"][number];

export default function ArchitectureCanvas() {
  // ============ STATE ============
  const [flowGraph, setFlowGraph] = useState<FlowGraph>(simpleAppFlow);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [validatedFlow, setValidatedFlow] = useState<FlowGraph>(
    validateFlow(simpleAppFlow),
  );
  const flowIssues = getFlowIssues(validatedFlow);

  // Track if we're syncing from validatedFlow to prevent loops
  const isSyncingFromValidatedFlow = useRef(false);

  // console.log(validatedFlow.nodes);
  // console.log(flowIssues);

  // ============ CONTEXT ============
  const { chatid } = useParams<{ chatid: string }>();
  const { theme } = useTheme();

  // ============ ADAPT TO REACT FLOW ============
  const { nodes: adaptedNodes, edges: adaptedEdges } =
    adaptFlowToReactFlow(validatedFlow);
  const [nodes, setNodes, rfOnNodesChange] = useNodesState(adaptedNodes);
  const [edges, setEdges, rfOnEdgesChange] = useEdgesState(adaptedEdges);

  // ============ VALIDATION EFFECTS ============
  // Step 1: Whenever flowGraph changes, re-validate it
  useEffect(() => {
    console.log("flowGraph changed, validating...");
    const validated = validateFlow(flowGraph);
    setValidatedFlow(validated);
    // setFlowIssues(getFlowIssues(validated));
  }, [flowGraph]);

  // Step 2: Whenever validatedFlow changes, update nodes and edges
  useEffect(() => {
    console.log("validatedFlow changed, updating nodes/edges...");
    isSyncingFromValidatedFlow.current = true;
    const { nodes: newNodes, edges: newEdges } =
      adaptFlowToReactFlow(validatedFlow);
    setNodes(newNodes);
    setEdges(newEdges);
    // Reset flag after a tick
    setTimeout(() => {
      isSyncingFromValidatedFlow.current = false;
    }, 0);
  }, [validatedFlow]);

  // ============ HELPERS ============
  const isEmpty = nodes.length === 0;
  const selectedNode = selectedNodeId ? dummyNodeMap[selectedNodeId] : null;

  const handleAIResponse = (data: FlowResponse) => {
    // AI responses contain a simplified `FlowStep` shape (id + label).
    // Keep this mapping flexible by using `Node<any>[]` so it doesn't
    // conflict with our full `StepNodeData` (FlowNode) type.
    const newNodes: Node<any>[] = data.steps.map((step, index) => ({
      id: step.id,
      type: "step",
      data: { label: step.label },
      position: { x: index * 250, y: 0 },
    }));

    const newEdges: Edge[] = data.connections.map((conn) => ({
      id: `e-${conn.from}-${conn.to}`,
      source: conn.from,
      target: conn.to,
      animated: true,
    }));

    // setNodes(newNodes);
    // setEdges(newEdges);
  };

  // Handle node changes (position, removal) via React Flow helpers
  const onNodesChange: OnNodesChange = (changes) => {
    // If we're currently syncing from validatedFlow, don't sync back to avoid loop
    if (isSyncingFromValidatedFlow.current) {
      setNodes((nds) => applyNodeChanges(changes, nds) as Node<FlowNode>[]);
      return;
    }

    // Apply changes and sync back to flowGraph
    setNodes((nds) => {
      const updated = applyNodeChanges(changes, nds) as Node<FlowNode>[];

      // Only sync meaningful changes (position, remove)
      const hasMeaningfulChanges = changes.some(
        (c) => c.type === "position" || c.type === "remove",
      );

      if (hasMeaningfulChanges) {
        setFlowGraph((prev) => ({
          ...prev,
          nodes: updated.map((n) => ({
            ...(n.data as any),
            position: n.position,
          })),
        }));
      }

      return updated;
    });
  };

  const onEdgesChange: OnEdgesChange = (changes) => {
    setEdges((eds) => {
      const updated = applyEdgeChanges(changes, eds);

      setFlowGraph((prev) => ({
        ...prev,
        edges: updated.map((e) => ({
          id: e.id,
          source: e.source,
          target: e.target,
          type: (e as any).type || "required",
        })),
      }));

      return updated;
    });
  };

  const onConnect: OnConnect = (connection: Connection) => {
    if (!connection.source || !connection.target) return;

    const newEdge: Edge = {
      id: `e-${connection.source}-${connection.target}-${Date.now()}`,
      source: connection.source,
      target: connection.target,
    };

    setEdges((eds) => [...eds, newEdge]);

    setFlowGraph((prev) => ({
      ...prev,
      edges: [
        ...prev.edges,
        {
          id: newEdge.id,
          source: newEdge.source,
          target: newEdge.target,
          type: "required",
        },
      ],
    }));
  };

  const handleNodeClick = (_: any, node: Node<StepNodeData>) => {
    setSelectedNodeId(node.id);
  };

  // node/edge updates are derived directly from `flowGraph`

  (globalThis as any).__FLOW_HANDLE__ = handleAIResponse;

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
            <Boxes className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">
              Project Architecture / Flow
            </h2>
            <p className="text-xs text-muted-foreground">
              Generated based on chat input
            </p>
          </div>
        </div>
        <div>
          <Button>
            <Plus />
          </Button>
          <button
            onClick={() =>
              setFlowGraph((prev) => ({
                ...prev,
                nodes: prev.nodes.filter((n) => n.id !== "database"),
              }))
            }
          >
            Remove Database
          </button>
        </div>

        {/* {flowIssues.length > 0 ? (
          <div className="absolute bottom-4 right-4 bg-black/80 text-white p-4 rounded-xl w-80">
            <h4 className="font-bold mb-2">Flow Issues</h4>
            {flowIssues.map((issue) => (
              <div key={issue.message} className="text-sm mb-1">
                ❌ {issue.message}
              </div>
            ))}
          </div>
        ) : (
          <div>NO ERROR</div>
        )} */}
      </div>

      {/* Canvas */}
      <div className="flex-1 min-h-0 rounded-lg overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          className="text-black"
          nodesDraggable={true}
          nodesConnectable={true}
          panOnDrag={true}
          zoomOnScroll={true}
          zoomOnPinch={true}
          panOnScroll={false}
          edgesFocusable={true}
          elementsSelectable
          proOptions={{ hideAttribution: true }}
          nodeTypes={{ step: StepNode }}
          onNodeClick={handleNodeClick}
          onPaneClick={() => setSelectedNodeId(null)}
          deleteKeyCode={["Backspace", "Delete"]}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          connectionMode={ConnectionMode.Loose}
          defaultEdgeOptions={{
            animated: true,
            style: { stroke: "red" },
          }}
        >
          {flowIssues.length > 0 && (
            <div className="absolute bottom-4 right-4 bg-black/80 text-white p-4 rounded-xl w-80">
              <h4 className="font-bold mb-2">Flow Issues</h4>
              {flowIssues.map((issue) => (
                <div key={issue.message} className="text-sm mb-1">
                  ❌ {issue.message}
                </div>
              ))}
            </div>
          )}
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            bgColor={theme === "dark" ? "#202020" : "#F9FAFF"}
          />
          <Controls className="text-black" />
          {/* <MiniMap /> */}
        </ReactFlow>

        {/* each Node sidebar */}
        {selectedNode && (
          <FlowCardBar
            node={selectedNode}
            onClose={() => setSelectedNodeId(null)}
          />
        )}

        {isEmpty && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <Boxes className="w-10 h-10 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-muted-foreground">
                Describe your project to generate flow
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
