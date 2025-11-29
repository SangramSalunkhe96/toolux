// @ts-nocheck
"use client";

import { useState, ChangeEvent } from "react";
import { Document, Packer, Paragraph } from "docx";

export default function PdfToWordPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
    setError(null);
  };

  const convertPdfToWord = async () => {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    setIsConverting(true);
    setError(null);

    try {
      // Load pdfjs only in the browser and inside the handler (no SSR issues)
      const pdfjsLib = await import("pdfjs-dist/build/pdf");

      if (typeof window !== "undefined") {
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      }

      const arrayBuffer = await file.arrayBuffer();

      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const totalPages = pdf.numPages;

      const extractedText: string[] = [];

      for (let i = 1; i <= totalPages; i++) {
        try {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();

          // Only keep items that actually have a string "str"
          const items = Array.isArray(content.items) ? content.items : [];

          const textParts = items
            .map((item: any) => {
              if (!item || typeof item.str !== "string") return "";
              const trimmed = item.str.trim();
              return trimmed.length ? trimmed : "";
            })
            .filter(Boolean);

          const pageText = textParts.join(" ");

          if (pageText.trim().length > 0) {
            extractedText.push(`Page ${i}\n\n${pageText}\n\n`);
          }
        } catch (pageErr) {
          console.warn(`Failed to read page ${i}`, pageErr);
          // Skip this page and continue with the next one
          continue;
        }
      }

      if (extractedText.length === 0) {
        setError(
          "No readable text found. This PDF may be scanned images. Image-only PDFs are not supported by this text-only converter."
        );
        setIsConverting(false);
        return;
      }

      // Build a Word doc from the text we collected
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: extractedText.map(
              (txt) => new Paragraph({ text: txt })
            ),
          },
        ],
      });

      const blob = await Packer.toBlob(doc);

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, "") + ".docx";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError(
        "Conversion failed for this file. If it contains mostly images or scanned pages, text extraction may not be possible."
      );
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <main className="container" style={{ marginTop: "20px", marginBottom: "20px" }}>
      <div className="card">
        <h1 className="section-title">PDF to Word (Text Only)</h1>
        <p className="section-sub" style={{ marginTop: "4px" }}>
          Extracts text from a PDF into an editable Word (.docx) file. Images, tables and
          complex layouts are skipped. Works fully in your browser — no uploads.
        </p>

        <div style={{ marginTop: "16px" }}>
          <label className="drop" style={{ cursor: "pointer" }}>
            <div>Select a PDF to convert</div>
            <div style={{ fontSize: "12px", marginTop: "4px" }}>
              Best results with text-based PDFs (not scanned images).
            </div>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
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
            onClick={convertPdfToWord}
            disabled={isConverting || !file}
            className="btn btn-primary"
            style={{ marginTop: "14px" }}
          >
            {isConverting ? "Converting..." : "Convert to Word"}
          </button>
        </div>
      </div>
    </main>
  );
}
