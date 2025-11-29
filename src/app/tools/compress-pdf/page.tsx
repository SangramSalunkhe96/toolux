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
      const newBytes = await pdf.save(); // Uint8Array

      // ✅ Cast to ArrayBuffer for BlobPart
      const blob = new Blob([newBytes.buffer as ArrayBuffer], {
        type: "application/pdf",
      });

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
    <main className="container" style={{ marginTop: "20px", marginBottom: "20px" }}>
      <div className="card">
        <h1 className="section-title">Compress PDF</h1>
        <p className="section-sub" style={{ marginTop: "4px" }}>
          Reduce your PDF size with a quick browser-side optimization. For very strong
          compression (images etc.), a future backend/Pro version can be added later.
        </p>

        <div style={{ marginTop: "16px" }}>
          <label className="drop" style={{ cursor: "pointer" }}>
            <div>Select a PDF to compress</div>
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

          {error && (
            <p style={{ marginTop: "8px", fontSize: "13px", color: "#fecaca" }}>
              {error}
            </p>
          )}

          <button
            onClick={handleCompress}
            disabled={isCompressing || !file}
            className="btn btn-primary"
            style={{ marginTop: "14px" }}
          >
            {isCompressing ? "Compressing..." : "Compress & Download"}
          </button>
        </div>
      </div>
    </main>
  );
}
