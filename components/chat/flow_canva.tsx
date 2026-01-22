import { ReactFlow, Background, Controls, BackgroundVariant } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Boxes, MousePointer2 } from "lucide-react";

export default function ArchitectureCanvas() {
  return (
    <div className="flex flex-col h-full panel">
      {/* Header */}
      <div className="panel-header flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
            <Boxes className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="panel-title">Project Architecture / Flow</h2>
            <p className="panel-subtitle">Click on any block to explore details in chat</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
          <MousePointer2 className="w-3.5 h-3.5" />
          <span>Interactive</span>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative bg-canvas-bg">
        <ReactFlow
          nodes={[]}
          edges={[]}
          fitView
          proOptions={{ hideAttribution: true }}
        >
          <Background 
            variant={BackgroundVariant.Dots} 
            gap={20} 
            size={1}
            className="bg-canvas-bg!"
            color="hsl(var(--canvas-grid))"
          />
          <Controls 
            className="bg-surface! border-border! rounded-lg! shadow-sm! [&>button]:bg-surface! [&>button]:border-border! [&>button]:text-foreground! [&>button:hover]:bg-surface-hover!"
          />
        </ReactFlow>

        {/* Empty State Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="w-20 h-20 rounded-2xl bg-surface border border-border shadow-sm flex items-center justify-center mx-auto mb-4">
              <Boxes className="w-10 h-10 text-muted-foreground/40" />
            </div>
            <p className="text-muted-foreground font-medium">Architecture will be generated here</p>
            <p className="text-muted-foreground/60 text-sm mt-1">
              Describe your project in the chat to get started
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
