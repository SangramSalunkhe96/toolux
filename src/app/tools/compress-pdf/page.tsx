"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function CompressPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCompress() {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }
    setError(null);
    setIsCompressing(true);

    try {
      const originalBytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(originalBytes);

      // NOTE: This will not magically shrink huge PDFs,
      // but re-saving sometimes optimizes structure a bit.
      const newBytes = await pdf.save();
      const blob = new Blob([newBytes], { type: "application/pdf" });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `compressed_${file.name}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while compressing the PDF.");
    } finally {
      setIsCompressing(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Compress PDF
        </h1>
        <p className="mt-2 text-sm text-slate-600 md:text-base">
          Reduce your PDF size with a quick browser-side optimization. For very
          strong compression (images etc.), a future Pro/backend version can be
          added.
        </p>

        <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm">
          <label className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center cursor-pointer hover:border-blue-500 transition">
            <span className="text-sm font-medium text-slate-800">
              Click to select a PDF file
            </span>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          {file && (
            <p className="mt-3 text-xs text-slate-700">
              Selected: <span className="font-semibold">{file.name}</span>
            </p>
          )}

          {error && (
            <p className="mt-3 text-sm text-red-600">{error}</p>
          )}

          <button
            onClick={handleCompress}
            disabled={isCompressing || !file}
            className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm disabled:bg-blue-300 disabled:cursor-not-allowed hover:bg-blue-700 transition"
          >
            {isCompressing ? "Compressing..." : "Compress & Download"}
          </button>
        </div>
      </div>
    </main>
  );
}
