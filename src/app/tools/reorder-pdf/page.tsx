// @ts-nocheck
"use client";

import { useState, ChangeEvent } from "react";
import { PDFDocument } from "pdf-lib";

export default function ReorderPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [order, setOrder] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
    setError(null);
  };

  const handleReorder = async () => {
    if (!file) {
      setError("Please select a PDF file first.");
    } else if (!order.trim()) {
      setError("Enter page order like: 3,1,2");
    } else {
      setIsProcessing(true);
      setError(null);

      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const totalPages = pdfDoc.getPageCount();

        const indices = order
          .split(",")
          .map((n) => parseInt(n.trim(), 10) - 1)
          .filter((n) => !isNaN(n));

        if (!indices.length) {
          throw new Error("Invalid order format.");
        }

        for (const idx of indices) {
          if (idx < 0 || idx >= totalPages) {
            throw new Error("Page order contains out-of-range page.");
          }
        }

        const newPdf = await PDFDocument.create();
        const copiedPages = await newPdf.copyPages(pdfDoc, indices);
        copiedPages.forEach((p) => newPdf.addPage(p));

        const bytes = await newPdf.save();
        const blob = new Blob([bytes], { type: "application/pdf" });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name.replace(/\.pdf$/i, "") + "_reordered.pdf";
        a.click();
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error(err);
        setError("Failed to reorder pages. Check your order and try again.");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">Reorder PDF Pages</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Change the order of pages in your PDF by entering a custom sequence, like
          <code> 3,1,2,4 </code>. Everything runs in your browser.
        </p>

        <label className="drop" style={{ marginTop: 14, cursor: "pointer" }}>
          <div>Select a PDF</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>No upload, processed locally.</div>
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
            Page order (example: 3,1,2,4)
          </label>
          <input
            type="text"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            placeholder="e.g. 2,1,3,4"
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
          onClick={handleReorder}
          disabled={isProcessing || !file}
          className="btn btn-primary"
          style={{ marginTop: 14 }}
        >
          {isProcessing ? "Reordering..." : "Reorder & Download"}
        </button>
      </div>
    </main>
  );
}
