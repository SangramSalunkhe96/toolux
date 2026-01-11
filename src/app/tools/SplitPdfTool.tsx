"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function SplitPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(1);
  const [loading, setLoading] = useState(false);

  const splitPdf = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const bytes = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(bytes);
      const total = srcPdf.getPageCount();

      const start = Math.max(1, from);
      const end = Math.min(to, total);

      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(
        srcPdf,
        Array.from({ length: end - start + 1 }, (_, i) => start - 1 + i)
      );

      pages.forEach((p) => newPdf.addPage(p));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });

      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "split.pdf";
      a.click();
      URL.revokeObjectURL(a.href);
    } catch {
      alert("Failed to split PDF");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-xl space-y-6 text-black">

      <div className="text-center">
        <h1 className="text-2xl font-bold">Split PDF Pages</h1>
        <p className="text-sm text-gray-600">
          Download selected pages from your PDF instantly
        </p>
      </div>

      {/* Upload */}
      <label className="block border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
        <input
          type="file"
          accept="application/pdf"
          hidden
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <p className="font-semibold">Click to upload PDF</p>
        <p className="text-xs text-gray-500">Files never leave your device</p>
      </label>

      {file && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">From page</label>
              <input
                type="number"
                value={from}
                onChange={(e) => setFrom(+e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium">To page</label>
              <input
                type="number"
                value={to}
                onChange={(e) => setTo(+e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <button
            onClick={splitPdf}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Split & Download PDF"}
          </button>
        </>
      )}
    </div>
  );
}
