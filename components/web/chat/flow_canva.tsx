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
import { useEffect, useState } from "react";
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

type StepNodeData = FlowGraph["nodes"][number];

export default function ArchitectureCanvas() {
  const [flowGraph, setFlowGraph] = useState<FlowGraph>(simpleAppFlow);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const { chatid } = useParams<{ chatid: string }>();
  const { theme } = useTheme();
  // const validatedFlow = validateFlow(flowGraph);
  // const flowIssues = getFlowIssues(validatedFlow);
  const { nodes: adaptedNodes, edges: adaptedEdges } =
    adaptFlowToReactFlow(flowGraph);

  const [nodes, setNodes, rfOnNodesChange] = useNodesState(adaptedNodes);
  const [edges, setEdges, rfOnEdgesChange] = useEdgesState(adaptedEdges);

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
    setNodes((nds) => {
      const updated = applyNodeChanges(changes, nds) as Node<FlowNode>[];

      // sync back to flowGraph: take each RF node's `data` (the full FlowNode)
      // and update its `position` from the RF node
      setFlowGraph((prev) => ({
        ...prev,
        nodes: updated.map((n) => ({
          ...(n.data as any),
          position: n.position,
        })),
      }));

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
