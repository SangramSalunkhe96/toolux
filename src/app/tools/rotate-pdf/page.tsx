// @ts-nocheck
"use client";

import { useState, ChangeEvent } from "react";
import { PDFDocument, degrees } from "pdf-lib";

export default function RotatePdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
    setError(null);
  };

  const handleRotate = async () => {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      const pages = pdfDoc.getPages();
      for (const page of pages) {
        const currentRotation = page.getRotation().angle || 0;
        page.setRotation(degrees((currentRotation + 90) % 360));
      }

      const rotatedBytes = await pdfDoc.save();
      const blob = new Blob([rotatedBytes], { type: "application/pdf" });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, "") + "_rotated.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError("Failed to rotate this PDF. Please try another file.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">Rotate PDF</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Rotate all pages of your PDF 90° clockwise in one click. Everything happens in
          your browser — files are not uploaded to a server.
        </p>

        {/* Tool preview */}
        <div className="drop" style={{ marginTop: 12, textAlign: "left" }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
            Tool preview
          </div>
          <ul style={{ fontSize: 12, paddingLeft: 18, margin: 0 }}>
            <li>Best for: sideways scanned PDFs or landscape slides.</li>
            <li>Rotation: 90° clockwise applied to all pages.</li>
            <li>Limitations: Does not rotate individual pages separately (yet).</li>
          </ul>
        </div>

        <div style={{ marginTop: 16 }}>
          <label className="drop" style={{ cursor: "pointer" }}>
            <div>Select a PDF to rotate</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>
              The rotated file will be downloaded as a new PDF.
            </div>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {file && (
            <p className="section-sub" style={{ marginTop: 10 }}>
              Selected: <span style={{ color: "#e9eef2" }}>{file.name}</span>
            </p>
          )}

          {error && (
            <p style={{ marginTop: 10, color: "#fca5a5", fontSize: 13 }}>{error}</p>
          )}

          <button
            onClick={handleRotate}
            disabled={isProcessing || !file}
            className="btn btn-primary"
            style={{ marginTop: 14 }}
          >
            {isProcessing ? "Rotating..." : "Rotate & Download"}
          </button>
        </div>
      </div>
    </main>
  );
}
