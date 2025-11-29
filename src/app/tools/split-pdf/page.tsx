"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function SplitPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [range, setRange] = useState<string>("1-3");
  const [isSplitting, setIsSplitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSplit() {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    setError(null);
    setIsSplitting(true);

    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);

      const [startStr, endStr] = range.split("-");
      const start = Math.max(1, parseInt(startStr || "1", 10));
      const end = Math.min(
        pdf.getPageCount(),
        parseInt(endStr || startStr, 10)
      );

      if (isNaN(start) || isNaN(end) || start > end) {
        setError("Please enter a valid page range (e.g. 1-3).");
        setIsSplitting(false);
        return;
      }

      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(
        pdf,
        Array.from({ length: end - start + 1 }, (_, i) => start - 1 + i)
      );
      copiedPages.forEach((page) => newPdf.addPage(page));

      const newBytes = await newPdf.save();
      const blob = new Blob([newBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `split_${start}-${end}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while splitting the PDF.");
    } finally {
      setIsSplitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Split PDF
        </h1>
        <p className="mt-2 text-sm text-slate-600 md:text-base">
          Extract specific pages from a PDF into a new file.
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

          <div className="mt-5 flex flex-col gap-2 text-sm">
            <label className="font-medium text-slate-800">
              Page range (e.g. 1-3):
            </label>
            <input
              type="text"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="1-3"
            />
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-600">{error}</p>
          )}

          <button
            onClick={handleSplit}
            disabled={isSplitting || !file}
            className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm disabled:bg-blue-300 disabled:cursor-not-allowed hover:bg-blue-700 transition"
          >
            {isSplitting ? "Splitting..." : "Split & Download"}
          </button>
        </div>
      </div>
    </main>
  );
}
