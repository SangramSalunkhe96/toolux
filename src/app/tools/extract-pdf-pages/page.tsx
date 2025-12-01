// @ts-nocheck
"use client";

import { useState, ChangeEvent } from "react";
import { PDFDocument } from "pdf-lib";

export default function ExtractPdfPagesPage() {
  const [file, setFile] = useState<File | null>(null);
  const [range, setRange] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
    setError(null);
  };

  const handleExtract = async () => {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    if (!range.trim()) {
      setError("Enter page range, e.g. 2-4 or 1,3,5.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const buf = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buf);
      const totalPages = pdfDoc.getPageCount();

      const pagesToKeep = new Set<number>();

      range.split(",").forEach((part) => {
        const t = part.trim();
        if (!t) return;
        if (t.includes("-")) {
          const [startStr, endStr] = t.split("-");
          const start = parseInt(startStr, 10);
          const end = parseInt(endStr, 10);
          if (!isNaN(start) && !isNaN(end)) {
            for (let i = start; i <= end; i++) {
              if (i >= 1 && i <= totalPages) pagesToKeep.add(i - 1);
            }
          }
        } else {
          const page = parseInt(t, 10);
          if (!isNaN(page) && page >= 1 && page <= totalPages) {
            pagesToKeep.add(page - 1);
          }
        }
      });

      if (!pagesToKeep.size) {
        throw new Error("No valid pages in range.");
      }

      const newPdf = await PDFDocument.create();
      const indices = Array.from(pagesToKeep).sort((a, b) => a - b);
      const copied = await newPdf.copyPages(pdfDoc, indices);
      copied.forEach((p) => newPdf.addPage(p));

      const bytes = await newPdf.save();
      const blob = new Blob([bytes], { type: "application/pdf" });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, "") + "_extracted.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError("Failed to extract pages. Check your range and try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">Extract PDF Pages</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Select which pages you want to keep, like <code>2-4</code> or{" "}
          <code>1,3,5</code>. The tool creates a new PDF with only those pages.
        </p>

        <label className="drop" style={{ marginTop: 14, cursor: "pointer" }}>
          <div>Select a PDF</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>Processed only in your browser.</div>
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {file && (
          <p className="section-sub" style={{ marginTop: 8 }}>
            Selected: <span style={{ color: "#e9eef2" }}>{file.name}</span>
          </p>
        )}

        <div style={{ marginTop: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 500 }}>
            Page range (e.g. 2-4 or 1,3,5)
          </label>
          <input
            type="text"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            placeholder="e.g. 2-4,7"
            style={{
              width: "100%",
              marginTop: 6,
              borderRadius: 10,
              border: "1px solid #2b3140",
              background: "#0b0c10",
              padding: "6px 8px",
              fontSize: 13,
              color: "#e9eef2",
              outline: "none",
            }}
          />
        </div>

        {error && (
          <p style={{ marginTop: 10, color: "#fca5a5", fontSize: 13 }}>{error}</p>
        )}

        <button
          onClick={handleExtract}
          disabled={isProcessing || !file}
          className="btn btn-primary"
          style={{ marginTop: 14 }}
        >
          {isProcessing ? "Extracting..." : "Extract & Download"}
        </button>
      </div>
    </main>
  );
}
