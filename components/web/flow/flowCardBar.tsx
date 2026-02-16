"use client";

import { useState } from "react";
import type { FlowGraph } from "@/lib/flow/types";
import {
  X,
  Activity,
  CheckCircle2,
  ArrowRight,
  Info,
  Layers,
  Beaker,
  Pencil,
  Save,
} from "lucide-react";

type FlowNode = FlowGraph["nodes"][number];

interface FlowCardBarProps {
  node: FlowNode;
  onClose: () => void;
  onUpdate: (node: FlowNode) => void;
}

export default function FlowCardBar({
  node,
  onClose,
  onUpdate,
}: FlowCardBarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<FlowNode>(node);

  // Sync draft when node changes
  if (!isEditing && draft.id !== node.id) {
    setDraft(node);
  }

  const handleSave = () => {
    onUpdate({
      ...draft,
      updatedAt: new Date().toISOString(),
    });
    setIsEditing(false);
  };

  const updateField = (field: keyof FlowNode, value: any) => {
    setDraft((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const parseArrayInput = (value: string) =>
    value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

  return (
    <div className="absolute top-0 right-0 h-full w-96 bg-[#0A0A0B]/95 backdrop-blur-2xl border-l border-white/10 z-50 shadow-[-20px_0_50px_rgba(0,0,0,0.8)] flex flex-col">
      {/* HEADER */}
      <div className="p-6 flex items-start justify-between border-b border-white/5">
        <div className="space-y-1 w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black px-2 py-0.5 rounded border border-white/10 bg-white/5 uppercase tracking-widest">
              {node.id}
            </span>

            <div className="flex items-center gap-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 hover:bg-white/5 rounded text-white/50 hover:text-white"
                >
                  <Pencil size={16} />
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="p-2 hover:bg-emerald-500/20 rounded text-emerald-400"
                >
                  <Save size={16} />
                </button>
              )}

              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded text-white/40 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* TITLE */}
          {!isEditing ? (
            <h3 className="text-xl font-black text-white">{node.title}</h3>
          ) : (
            <input
              value={draft.title}
              onChange={(e) => updateField("title", e.target.value)}
              className="w-full bg-white/5 text-white p-2 rounded"
            />
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* DESCRIPTION */}
        <section className="space-y-3">
          <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] flex items-center gap-2">
            <Info size={14} /> Documentation
          </label>

          {!isEditing ? (
            <p className="text-sm text-white/70 bg-white/5 p-3 rounded">
              {node.description}
            </p>
          ) : (
            <textarea
              value={draft.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="w-full bg-white/5 text-white p-3 rounded"
            />
          )}
        </section>

        {/* CAPABILITIES */}
        <section className="space-y-3">
          <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
            Capabilities
          </label>

          <div className="space-y-3 text-xs">
            {/* PROVIDES */}
            <div>
              <span className="text-white/40">Provides:</span>
              {!isEditing ? (
                <div className="mt-1 text-white">
                  {node.provides.join(", ") || "—"}
                </div>
              ) : (
                <input
                  value={draft.provides.join(", ")}
                  onChange={(e) =>
                    updateField("provides", parseArrayInput(e.target.value))
                  }
                  placeholder="comma separated"
                  className="w-full bg-white/5 text-white p-2 rounded mt-1"
                />
              )}
            </div>

            {/* REQUIRES */}
            <div>
              <span className="text-white/40">Requires:</span>
              {!isEditing ? (
                <div className="mt-1">
                  {node.requires.map((req) => {
                    const isMissing = node.issues.some(
                      (i) => i.relatedCapability === req,
                    );

                    return (
                      <span
                        key={req}
                        className={
                          isMissing ? "text-red-400 font-semibold mr-1" : "mr-1"
                        }
                      >
                        {req}
                      </span>
                    );
                  })}
                </div>
              ) : (
                <input
                  value={draft.requires.join(", ")}
                  onChange={(e) =>
                    updateField("requires", parseArrayInput(e.target.value))
                  }
                  placeholder="comma separated"
                  className="w-full bg-white/5 text-white p-2 rounded mt-1"
                />
              )}
            </div>
          </div>
        </section>

        {/* ISSUES */}
        {node.issues.length > 0 && !isEditing && (
          <section className="space-y-3">
            <label className="text-[10px] font-bold text-red-400 uppercase tracking-[0.2em]">
              Issues
            </label>
            <div className="space-y-2 text-xs">
              {node.issues.map((issue) => (
                <div
                  key={issue.id}
                  className="p-2 rounded bg-red-500/10 border border-red-500/20"
                >
                  {issue.message}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PERFORMANCE */}
        <section className="space-y-3">
          <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] flex items-center gap-2">
            <Activity size={14} /> Real-time Performance
          </label>
          <div className="bg-white/5 p-3 rounded text-emerald-400 text-sm font-mono">
            24ms
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <div className="p-6 border-t border-white/5 flex gap-3">
        <button className="flex-1 py-3 rounded-lg bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-white/90 transition-all active:scale-95">
          Mark Completed
        </button>
        <button className="p-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
          <Beaker size={18} />
        </button>
      </div>
    </div>
  );
}
