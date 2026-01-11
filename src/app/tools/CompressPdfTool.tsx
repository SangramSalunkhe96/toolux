"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";

declare global {
  interface Window {
    pdfjsLib: any;
  }
}

export default function CompressPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<string | null>(null);

  const handleFile = (f: File | null) => {
    if (!f) return;
    setFile(f);
    setInfo(`Original size: ${(f.size / 1024).toFixed(1)} KB`);
  };

  const compress = async () => {
    if (!file) return;
    setLoading(true);
    setInfo("Compressing...");

    try {
      const bytes = await file.arrayBuffer();
      let downloaded = false;

      /* ===== IMAGE BASED COMPRESSION (SCANNED PDFs) ===== */
      if (window.pdfjsLib) {
        try {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

          const pdf = await window.pdfjsLib.getDocument({ data: bytes }).promise;
          const newPdf = await PDFDocument.create();

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 1.4 });

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d")!;
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({ canvasContext: ctx, viewport }).promise;

            const imgData = canvas.toDataURL("image/jpeg", quality);
            const imgBytes = await fetch(imgData).then(r => r.arrayBuffer());
            const img = await newPdf.embedJpg(imgBytes);

            const p = newPdf.addPage([img.width, img.height]);
            p.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
          }

          const out = await newPdf.save();
          download(out, setInfo);
          downloaded = true;
        } catch (e) {
          console.warn("Image compression failed, using fallback", e);
        }
      }

      /* ===== FALLBACK (TEXT PDFs) ===== */
      if (!downloaded) {
        const pdfDoc = await PDFDocument.load(bytes);
        const out = await pdfDoc.save({ useObjectStreams: true });
        download(out, setInfo);
      }

    } catch (e) {
      console.error(e);
      alert("Compression failed. This PDF cannot be processed.");
    } finally {
      setLoading(false); // ✅ FIXED: button resets
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-xl space-y-6 text-black">

      <div className="text-center">
        <h1 className="text-2xl font-bold">Compress PDF</h1>
        <p className="text-sm text-gray-600">
          Reduce PDF size directly in your browser
        </p>
      </div>

      <label className="block border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
        <input
          type="file"
          accept="application/pdf"
          hidden
          disabled={loading}
          onChange={(e) => handleFile(e.target.files?.[0] || null)}
        />
        <p className="font-semibold">Click to upload PDF</p>
        <p className="text-xs text-gray-500">No server upload</p>
      </label>

      {file && <p className="text-sm text-center">📄 {file.name}</p>}

      {file && (
        <div>
          <label className="text-sm font-medium">
            Compression Level: {(quality * 100).toFixed(0)}%
          </label>
          <input
            type="range"
            min="0.3"
            max="0.9"
            step="0.05"
            disabled={loading}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full"
          />
        </div>
      )}

      <button
        onClick={compress}
        disabled={!file || loading}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Compressing..." : "Compress & Download"}
      </button>

      {info && <p className="text-center text-sm">{info}</p>}

      <p className="text-xs text-gray-500 text-center">
        🔒 Processing happens locally in your browser
      </p>
    </div>
  );
}

/* ===== helper ===== */
function download(bytes: Uint8Array, setInfo: any) {
  const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
  setInfo(`Compressed size: ${(blob.size / 1024).toFixed(1)} KB`);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "compressed.pdf";
  a.click();
  URL.revokeObjectURL(a.href);
}
