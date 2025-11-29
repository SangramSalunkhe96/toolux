// @ts-nocheck
"use client";

import { useState } from "react";
import JSZip from "jszip";
import { PDFDocument, StandardFonts } from "pdf-lib";

export default function WordToPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function extractTextFromDocx(file: File) {
    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);

    // DOCX main text file
    const docXml = zip.files["word/document.xml"];
    if (!docXml) throw new Error("Invalid DOCX structure");

    const xmlText = await docXml.async("string");

    // Extract <w:t> text tags
    const matches = Array.from(xmlText.matchAll(/<w:t[^>]*>(.*?)<\/w:t>/g));
    const text = matches.map((m) => m[1]).join(" ");

    return text;
  }

  async function convertToPdf() {
    if (!file) {
      setError("Please select a DOCX file.");
      return;
    }

    if (!file.name.endsWith(".docx")) {
      setError("Only .docx files are supported.");
      return;
    }

    setIsConverting(true);
    setError(null);

    try {
      // Extract text from DOCX
      const text = await extractTextFromDocx(file);

      if (!text.trim()) {
        setError("This DOCX contains no readable text.");
        setIsConverting(false);
        return;
      }

      // Create PDF
      const pdf = await PDFDocument.create();
      let page = pdf.addPage();

      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const fontSize = 12;

      const maxWidth = page.getWidth() - 40;
      const maxHeight = page.getHeight() - 40;
      let y = maxHeight;

      const words = text.split(" ");
      let line = "";

      const drawLine = () => {
        page.drawText(line, { x: 20, y, size: fontSize, font });
        y -= 18;
        if (y < 40) {
          page = pdf.addPage();
          y = maxHeight;
        }
      };

      for (const word of words) {
        const testLine = line + word + " ";
        const width = font.widthOfTextAtSize(testLine, fontSize);

        if (width > maxWidth) {
          drawLine();
          line = word + " ";
        } else {
          line = testLine;
        }
      }

      drawLine(); // last line

      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(".docx", "") + ".pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError("Failed to convert this file. Use simple text-only DOCX.");
    }

    setIsConverting(false);
  }

  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">Word to PDF (Text Only)</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
         Converts DOCX text into a simple PDF. Images, tables and layout are not
          preserved.
        </p>

         <div className="drop" style={{ marginTop: 12, textAlign: "left" }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
            Tool preview
          </div>
          <ul style={{ fontSize: 12, paddingLeft: 18, margin: 0 }}>
            <li>Best for: notes, letters, plain text reports.</li>
            <li>Output: single-column PDF with text only.</li>
            <li>Limitations: no images, no complex layouts.</li>
          </ul>
        </div>

        <div style={{ marginTop: 16 }}>
          <label className="drop" style={{ cursor: "pointer" }}>
            <div>Select a DOCX file</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>
              Best for simple text documents.
            </div>
            <input
              type="file"
              accept=".docx"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
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
            onClick={convertToPdf}
            disabled={isConverting || !file}
            className="btn btn-primary"
            style={{ marginTop: 14 }}
          >
            {isConverting ? "Converting..." : "Convert to PDF"}
          </button>
        </div>
      </div>
    </main>
  );
}
