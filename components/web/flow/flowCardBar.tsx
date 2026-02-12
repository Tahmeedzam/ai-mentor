"use client";

import { DummyNode } from "@/data/dummyFlows";
import {
  X,
  Activity,
  Zap,
  Terminal,
  CheckCircle2,
  ArrowRight,
  Info,
  Layers,
  Beaker,
} from "lucide-react";

interface FlowCardBarProps {
  node: DummyNode;
  onClose: () => void;
}

const THEME_COLORS = {
  purple: "#8B5CF6",
  blue: "#0EA5E9",
  emerald: "#10B981",
  orange: "#F59E0B",
  pink: "#F43F5E",
};

export default function FlowCardBar({ node, onClose }: FlowCardBarProps) {
  const accentColor =
    THEME_COLORS[node.color as keyof typeof THEME_COLORS] ||
    THEME_COLORS.purple;

  return (
    <div className="absolute top-0 right-0 h-full w-96 bg-[#0A0A0B]/95 backdrop-blur-2xl border-l border-white/10 z-50 shadow-[-20px_0_50px_rgba(0,0,0,0.8)] animate-in slide-in-from-right duration-300 flex flex-col">
      {/* Top Line */}
      <div
        className="absolute top-0 left-0 w-full h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        }}
      />

      {/* 1. HEADER */}
      <div className="p-6 flex items-start justify-between border-b border-white/5 bg-white/1">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[10px] font-black px-2 py-0.5 rounded border border-white/10 bg-white/5 uppercase tracking-widest"
              style={{ color: accentColor }}
            >
              {node.id} {/* Node ID */}
            </span>
            <span className="text-[10px] text-white/20 font-mono tracking-tighter">
              v1.0.2
            </span>
          </div>
          <h3 className="text-xl font-black text-white tracking-tight leading-tight">
            {node.label}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {/* DESCRIPTION */}
        <section className="space-y-3">
          <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] flex items-center gap-2">
            <Info size={14} /> Documentation
          </label>
          <p className="text-sm text-white/70 leading-relaxed font-medium bg-white/2 p-3 rounded-lg border border-white/5">
            {node.description}
          </p>
        </section>

        {/*  CHECKLIST */}
        <section className="space-y-4">
          <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] flex items-center gap-2">
            <CheckCircle2 size={14} /> Implementation Steps
          </label>
          <div className="space-y-2">
            {[
              "Initialize Schema",
              "Connect WebSocket handshakes",
              "Validate Data Integrity",
            ].map((step, i) => (
              <div
                key={i}
                className="group flex items-center justify-between p-3 rounded-lg bg-white/3 border border-white/5 hover:border-white/20 transition-all"
              >
                <span className="text-xs text-white/60">{step}</span>
                <button className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-[9px] font-bold uppercase tracking-tighter text-white hover:underline transition-all">
                  Details <ArrowRight size={10} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* PERFORMANCE  */}
        <section className="space-y-3">
          <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] flex items-center gap-2">
            <Activity size={14} /> Real-time Performance
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/2 border border-white/5 p-3 rounded-lg">
              <span className="block text-[8px] text-white/20 uppercase font-bold mb-1">
                Latency
              </span>
              <span className="text-sm font-mono text-emerald-500">24ms</span>
            </div>
            <div className="bg-white/2 border border-white/5 p-3 rounded-lg">
              <span className="block text-[8px] text-white/20 uppercase font-bold mb-1">
                Load
              </span>
              <span className="text-sm font-mono text-blue-400">
                {node.progress}%
              </span>
            </div>
          </div>
        </section>

        {/*  INPUT/OUTPUT SCHEMA  */}
        <section className="space-y-3">
          <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] flex items-center gap-2">
            <Layers size={14} /> Schema Contract
          </label>
          <div className="bg-black/40 rounded border border-white/5 p-4 font-mono text-[10px] text-emerald-500/80">
            <p className="text-white/20 mb-2">// Inbound Request</p>
            <p>{"{"}</p>
            <p className="pl-4">"action": "TRIGGER_PROCESS",</p>
            <p className="pl-4">"origin": "{node.id}_edge"</p>
            <p>{"}"}</p>
          </div>
        </section>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="p-6 border-t border-white/5 bg-white/1 flex gap-3">
        <button className="flex-1 py-3 rounded-lg bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-white/90 transition-all active:scale-95">
          Deploy Logic
        </button>
        <button className="p-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
          <Beaker size={18} />
        </button>
      </div>
    </div>
  );
}
