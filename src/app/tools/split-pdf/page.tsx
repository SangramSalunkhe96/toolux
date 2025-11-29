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

      const newBytes = await newPdf.save(); // Uint8Array

      // ✅ Fix: use ArrayBuffer for BlobPart
      const blob = new Blob([newBytes.buffer as ArrayBuffer], {
        type: "application/pdf",
      });

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
    <main className="container" style={{ marginTop: "20px", marginBottom: "20px" }}>
      <div className="card">
        <h1 className="section-title">Split PDF</h1>
        <p className="section-sub" style={{ marginTop: "4px" }}>
          Extract specific pages from a PDF into a new file using a simple page range,
          like <code>1-3</code>.
        </p>

        <div style={{ marginTop: "16px" }}>
          <label className="drop" style={{ cursor: "pointer" }}>
            <div>Select a PDF to split</div>
            <div style={{ fontSize: "12px", marginTop: "4px" }}>
              Click to choose a file from your device
            </div>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          {file && (
            <p className="section-sub" style={{ marginTop: "10px" }}>
              Selected: <span style={{ color: "#e9eef2" }}>{file.name}</span>
            </p>
          )}

          <div style={{ marginTop: "12px" }}>
            <label style={{ fontSize: "13px", fontWeight: 500 }}>
              Page range (e.g. 1-3)
            </label>
            <input
              type="text"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              style={{
                marginTop: "6px",
                width: "100%",
                borderRadius: "10px",
                border: "1px solid #2b3140",
                background: "#0b0c10",
                padding: "8px 10px",
                fontSize: "13px",
                color: "#e9eef2",
                outline: "none",
              }}
            />
          </div>

          {error && (
            <p style={{ marginTop: "8px", fontSize: "13px", color: "#fecaca" }}>
              {error}
            </p>
          )}

          <button
            onClick={handleSplit}
            disabled={isSplitting || !file}
            className="btn btn-primary"
            style={{ marginTop: "14px" }}
          >
            {isSplitting ? "Splitting..." : "Split & Download"}
          </button>
        </div>
      </div>
    </main>
  );
}
