"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function MergePdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    setFiles((prev) => [...prev, ...Array.from(list)]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const merge = async () => {
    if (files.length < 2) return;
    setLoading(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((p) => mergedPdf.addPage(p));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], {
        type: "application/pdf",
      });

      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "merged.pdf";
      a.click();
      URL.revokeObjectURL(a.href);
    } catch (e) {
      alert("Failed to merge PDFs. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 space-y-6 text-black">

      {/* TITLE */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold">Merge PDF Files</h1>
        <p className="text-sm text-gray-600">
          Combine multiple PDFs into one file instantly — no upload, 100% private
        </p>
      </div>

      {/* UPLOAD BOX */}
      <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
        <input
          type="file"
          accept="application/pdf"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
        <p className="font-semibold">Click to upload PDF files</p>
        <p className="text-sm text-gray-500 mt-1">
          or drag & drop multiple PDFs
        </p>
      </label>

      {/* FILE LIST */}
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="font-semibold text-sm">Selected Files</p>

          <div className="space-y-2">
            {files.map((f, i) => (
              <div
                key={i}
                className="flex items-center justify-between border rounded-lg px-3 py-2 bg-gray-50"
              >
                <span className="text-sm truncate">📄 {f.name}</span>
                <button
                  onClick={() => removeFile(i)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ACTION BUTTON */}
      <button
        onClick={merge}
        disabled={files.length < 2 || loading}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        {loading ? "Merging PDFs..." : "Merge & Download PDF"}
      </button>

      {/* TRUST TEXT */}
      <p className="text-xs text-gray-500 text-center">
        🔒 Your files never leave your device. All processing happens in your browser.
      </p>
    </div>
  );
}
