"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";


export default function MergePdfPage() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [isMerging, setIsMerging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleMerge() {
    if (!files || files.length < 2) {
      setError("Please select at least two PDF files to merge.");
      return;
    }

    setError(null);
    setIsMerging(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of Array.from(files)) {
        if (!file.type.includes("pdf")) continue;
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while merging PDFs.");
    } finally {
      setIsMerging(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Merge PDF
        </h1>
        <p className="mt-2 text-sm text-slate-600 md:text-base">
          Combine multiple PDF files into a single document. All processing
          happens in your browser – your files never leave your device.
        </p>

        <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm">
          <label className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center cursor-pointer hover:border-blue-500 transition">
            <span className="text-sm font-medium text-slate-800">
              Click to select PDF files
            </span>
            <span className="mt-1 text-xs text-slate-500">
              You can choose multiple files at once
            </span>
            <input
              type="file"
              multiple
              accept="application/pdf"
              className="hidden"
              onChange={(e) => setFiles(e.target.files)}
            />
          </label>

          {files && files.length > 0 && (
            <div className="mt-4 rounded-lg bg-slate-50 p-3 text-xs text-slate-700">
              <p className="font-semibold mb-2">
                Selected files ({files.length}):
              </p>
              <ul className="space-y-1">
                {Array.from(files).map((file) => (
                  <li key={file.name} className="truncate">
                    • {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {error && (
            <p className="mt-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            onClick={handleMerge}
            disabled={isMerging || !files || files.length < 2}
            className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:bg-blue-300 hover:bg-blue-700 transition"
          >
            {isMerging ? "Merging..." : "Merge PDF & Download"}
          </button>
        </div>
      </div>
    </main>
  );
}
