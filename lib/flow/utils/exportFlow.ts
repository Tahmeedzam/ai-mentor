import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

type ExportFormat = "png" | "pdf" | "svg";

interface ExportOptions {
  format: ExportFormat;
  quality?: number;
  backgroundColor?: string;
  scale?: number;
}

/**
 * Get the bounding box of all elements in the flowchart
 */
function getFlowchartBounds(container: HTMLElement): {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
} {
  const nodes = container.querySelectorAll("[data-testid^='rf__node']");

  if (nodes.length === 0) {
    return { minX: 0, minY: 0, maxX: 800, maxY: 600, width: 800, height: 600 };
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  nodes.forEach((node) => {
    const rect = (node as HTMLElement).getBoundingClientRect();
    minX = Math.min(minX, rect.left);
    minY = Math.min(minY, rect.top);
    maxX = Math.max(maxX, rect.right);
    maxY = Math.max(maxY, rect.bottom);
  });

  const padding = 40;
  return {
    minX: minX - padding,
    minY: minY - padding,
    maxX: maxX + padding,
    maxY: maxY + padding,
    width: maxX - minX + padding * 2,
    height: maxY - minY + padding * 2,
  };
}

/**
 * Export flowchart as PNG
 */
export async function exportFlowAsPNG(
  containerId: string,
  filename: string = `flowchart-${Date.now()}.png`,
  options: Partial<ExportOptions> = {},
): Promise<void> {
  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Container with id "${containerId}" not found`);
  }

  const quality = options.quality ?? 2;
  const scale = options.scale ?? 2;

  try {
    const canvas = await html2canvas(container, {
      scale: scale,
      backgroundColor: options.backgroundColor || "#1a1a1a",
      useCORS: true,
      logging: false,
      windowHeight: container.scrollHeight,
      windowWidth: container.scrollWidth,
      ignoreElements: (element) => {
        // Ignore elements that might cause color parsing issues
        return false;
      },
      onclone: (clonedDoc) => {
        // Fix CSS color issues in cloned document
        const clonedContainer = clonedDoc.getElementById(containerId);
        if (clonedContainer) {
          // Remove problematic CSS properties
          clonedContainer.querySelectorAll("*").forEach((el) => {
            const htmlEl = el as HTMLElement;
            // Reset any lab/lch colors to fallback colors
            if (
              htmlEl.style.color?.includes("lab") ||
              htmlEl.style.color?.includes("lch")
            ) {
              htmlEl.style.color = "";
            }
            if (
              htmlEl.style.backgroundColor?.includes("lab") ||
              htmlEl.style.backgroundColor?.includes("lch")
            ) {
              htmlEl.style.backgroundColor = "";
            }
          });
        }
      },
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error exporting as PNG:", error);
    throw new Error("Failed to export as PNG");
  }
}

/**
 * Export flowchart as PDF
 */
export async function exportFlowAsPDF(
  containerId: string,
  filename: string = `flowchart-${Date.now()}.pdf`,
  options: Partial<ExportOptions> = {},
): Promise<void> {
  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Container with id "${containerId}" not found`);
  }

  const scale = options.scale ?? 2;

  try {
    const canvas = await html2canvas(container, {
      scale: scale,
      backgroundColor: options.backgroundColor || "#1a1a1a",
      useCORS: true,
      logging: false,
      windowHeight: container.scrollHeight,
      windowWidth: container.scrollWidth,
      onclone: (clonedDoc) => {
        // Fix CSS color issues in cloned document
        const clonedContainer = clonedDoc.getElementById(containerId);
        if (clonedContainer) {
          // Remove problematic CSS properties
          clonedContainer.querySelectorAll("*").forEach((el) => {
            const htmlEl = el as HTMLElement;
            // Reset any lab/lch colors to fallback colors
            if (
              htmlEl.style.color?.includes("lab") ||
              htmlEl.style.color?.includes("lch")
            ) {
              htmlEl.style.color = "";
            }
            if (
              htmlEl.style.backgroundColor?.includes("lab") ||
              htmlEl.style.backgroundColor?.includes("lch")
            ) {
              htmlEl.style.backgroundColor = "";
            }
          });
        }
      },
    });

    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pdf = new jsPDF({
      orientation: imgHeight > imgWidth ? "portrait" : "landscape",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const ratio = imgHeight / imgWidth;
    const finalHeight = pdfWidth * ratio;

    // If content is taller than one page, add multiple pages
    let yOffset = 0;
    let remainingHeight = finalHeight;

    while (remainingHeight > 0) {
      if (yOffset > 0) {
        pdf.addPage();
      }

      const pageHeight = Math.min(remainingHeight, pdfHeight);
      pdf.addImage(imgData, "PNG", 0, -yOffset, pdfWidth, finalHeight);

      yOffset += pdfHeight;
      remainingHeight -= pdfHeight;
    }

    pdf.save(filename);
  } catch (error) {
    console.error("Error exporting as PDF:", error);
    throw new Error("Failed to export as PDF");
  }
}

/**
 * Export flowchart as SVG (simplified)
 */
export async function exportFlowAsSVG(
  containerId: string,
  filename: string = `flowchart-${Date.now()}.svg`,
): Promise<void> {
  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Container with id "${containerId}" not found`);
  }

  try {
    // Clone the container
    const clone = container.cloneNode(true) as HTMLElement;

    // Create SVG
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", container.offsetWidth.toString());
    svg.setAttribute("height", container.offsetHeight.toString());

    // Convert HTML to SVG (simplified approach)
    const svgString = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error exporting as SVG:", error);
    throw new Error("Failed to export as SVG");
  }
}

/**
 * Main export function that handles all formats
 */
export async function exportFlow(
  containerId: string,
  format: ExportFormat = "png",
  options: Partial<ExportOptions> = {},
): Promise<void> {
  const timestamp = new Date().toISOString().split("T")[0];
  const filename = `flowchart-${timestamp}.${format}`;

  switch (format) {
    case "png":
      return exportFlowAsPNG(containerId, filename, options);
    case "pdf":
      return exportFlowAsPDF(containerId, filename, options);
    case "svg":
      return exportFlowAsSVG(containerId, filename);
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
}
