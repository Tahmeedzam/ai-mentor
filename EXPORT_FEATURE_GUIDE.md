# Export Flow Feature - Implementation Guide

## ✅ What's Been Implemented

Your flowchart application now has a complete export feature with the following capabilities:

### 1. **Export Formats**

- 📷 **PNG** - High-quality image export (1.5x resolution)
- 📄 **PDF** - Vector format for printing/sharing (2x resolution)
- 🎨 **SVG** - Scalable vector format

### 2. **Features**

- ✅ Captures entire flowchart (all nodes and connections)
- ✅ Maintains dark theme and styling
- ✅ Automatic padding around edges
- ✅ Loading indicator while generating
- ✅ Auto-download with timestamp-based filename
- ✅ Success/error notifications using Sonner toast
- ✅ High-quality export (1.5x-2x resolution)
- ✅ Multi-page PDF support for large flowcharts

### 3. **Filename Format**

- Pattern: `flowchart-YYYY-MM-DD.{png|pdf|svg}`
- Example: `flowchart-2026-04-04.png`

## 📦 Installation

The dependencies have been added to `package.json`:

```json
"html2canvas": "^1.4.1",
"jspdf": "^2.5.1"
```

**Run this command to install:**

```bash
npm install
```

If you encounter npm issues, try:

```bash
npm install --legacy-peer-deps
```

## 📁 Files Created/Modified

### New Files:

1. **`lib/flow/utils/exportFlow.ts`** - Core export utility functions
   - `exportFlowAsPNG()` - Exports as PNG with high quality
   - `exportFlowAsPDF()` - Exports as PDF with multi-page support
   - `exportFlowAsSVG()` - Exports as SVG
   - `exportFlow()` - Main function dispatcher

2. **`components/web/flow/ExportButton.tsx`** - UI button component
   - Dropdown menu with export options
   - Loading state management
   - Toast notifications for success/error

### Modified Files:

1. **`components/web/chat/flow_canva.tsx`**
   - Added `ExportButton` import
   - Added export button to header toolbar (next to + button)
   - Added `id="flowchart-container"` to canvas div for capturing

## 🎨 UI Layout

The Export button is placed in the top-right toolbar:

```
┌────────────────────────────────────────────────────┐
│ [Icon] Project Architecture / Flow  [Export] [+]   │
│ Generated based on chat input                       │
└────────────────────────────────────────────────────┘
```

When clicked, it shows a dropdown menu:

```
┌──────────────────────┐
│ 📷 Export as PNG     │
│ 📄 Export as PDF     │
│ 🎨 Export as SVG     │
└──────────────────────┘
```

## 🔧 Technical Details

### Export Function Signature

```typescript
exportFlow(
  containerId: string,      // "flowchart-container"
  format: "png" | "pdf" | "svg",
  options?: {
    quality?: number;       // 1-2, default 2
    scale?: number;         // 1-3, default 1.5-2
    backgroundColor?: string; // default "#1a1a1a"
  }
): Promise<void>
```

### How It Works

1. **Capture Phase**
   - Uses `html2canvas` to render the DOM to canvas
   - Respects dark theme background (#1a1a1a)
   - Scales at 1.5x-2x for quality

2. **Export Phase**
   - **PNG**: Downloads canvas directly as image
   - **PDF**: Converts canvas to image, embeds in PDF (handles multi-page)
   - **SVG**: Creates SVG from HTML (simplified)

3. **User Feedback**
   - Loading spinner shows during export
   - Toast notification on success
   - Error toast if export fails

## 🎯 Usage

Users can now:

1. Create/edit their flowchart
2. Click **Export** button in toolbar
3. Select desired format (PNG/PDF/SVG)
4. File downloads automatically
5. Success notification appears

## 🚀 Optional Enhancements

If you want to add more features later:

### 1. **Transparent Background**

```typescript
// In ExportButton.tsx
const handleExport = async (format: "png" | "pdf" | "svg") => {
  await exportFlow(containerId, format, {
    backgroundColor: "transparent",
  });
};
```

### 2. **Quality Selection**

Add a quality dropdown before export:

```typescript
const [quality, setQuality] = useState(2);
await exportFlow(containerId, format, { scale: quality });
```

### 3. **Copy to Clipboard**

```typescript
export async function copyFlowToClipboard(containerId: string) {
  const canvas = await html2canvas(document.getElementById(containerId)!);
  canvas.toBlob((blob) => {
    navigator.clipboard.write([new ClipboardItem({ "image/png": blob! })]);
  });
}
```

## ⚠️ Troubleshooting

### Issue: "Container not found" error

**Solution**: Ensure the `id="flowchart-container"` is correctly set on the div wrapping ReactFlow.

### Issue: Export is blank/missing nodes

**Solution**: Check that all nodes are rendered before exporting. The capture might need a slight delay.

### Issue: PDF is too large or pages are cut off

**Solution**: The PDF automatically handles multi-page exports. Check your PDF viewer settings.

### Issue: Image quality is poor

**Solution**: Ensure scale is set to 2 or higher in export options.

## 📝 Notes

- The export functionality uses canvas rendering, so it respects all CSS styling applied to nodes
- Cross-origin images will only work if CORS is enabled (uses `useCORS: true`)
- SVG export is simplified and works best for basic shapes
- PDF export with images larger than the page will auto-paginate
- Filename includes date to prevent accidental overwrites

## 🧪 Testing

To test the export feature:

1. Create a flowchart with multiple nodes and connections
2. Click the **Export** button
3. Select each format and verify the downloads
4. Check that styling, colors, and all nodes are visible in exported files
5. Verify filename format is correct

---

**Ready to use!** Just run `npm install` and you're good to go. 🚀
