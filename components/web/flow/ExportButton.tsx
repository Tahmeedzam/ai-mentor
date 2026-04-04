"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportFlow } from "@/lib/flow/utils/exportFlow";
import { toast } from "sonner";

interface ExportButtonProps {
  containerId: string;
}

export default function ExportButton({ containerId }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<
    "png" | "pdf" | "svg" | null
  >(null);

  const handleExport = async (format: "png" | "pdf" | "svg") => {
    setIsExporting(true);
    setExportFormat(format);

    try {
      await exportFlow(containerId, format, {
        scale: format === "pdf" ? 2 : 1.5,
      });
      toast.success(`Exported as ${format.toUpperCase()}!`);
      setIsOpen(false);
    } catch (error) {
      console.error("Export error:", error);
      toast.error(
        `Failed to export as ${format.toUpperCase()}. Make sure the flowchart is loaded.`,
      );
    } finally {
      setIsExporting(false);
      setExportFormat(null);
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isExporting}
        variant="outline"
        className="gap-2"
      >
        {isExporting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Exporting...
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            Export
          </>
        )}
      </Button>

      {isOpen && !isExporting && (
        <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-700 rounded-lg shadow-lg z-50">
          <div className="py-1">
            <button
              onClick={() => handleExport("png")}
              disabled={isExporting}
              className="w-full px-4 py-2 text-sm text-left hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <span>📷</span>
              Export as PNG
            </button>
            <button
              onClick={() => handleExport("pdf")}
              disabled={isExporting}
              className="w-full px-4 py-2 text-sm text-left hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <span>📄</span>
              Export as PDF
            </button>
            <button
              onClick={() => handleExport("svg")}
              disabled={isExporting}
              className="w-full px-4 py-2 text-sm text-left hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <span>🎨</span>
              Export as SVG
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
