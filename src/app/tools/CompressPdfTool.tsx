"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function CompressPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const compress = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const bytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(bytes);

      const pdfBytes = await pdfDoc.save({ useObjectStreams: false });

const byteArray = Array.from(pdfBytes);
const blob = new Blob([new Uint8Array(byteArray)], {
  type: "application/pdf",
});

const link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download = "compressed.pdf";
link.click();

    } catch (err) {
      console.error("Compression failed:", err);
      alert("Failed to compress PDF. Try a different file!");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFile}
        className="tool-input"
      />

      {file && (
        <button
          onClick={compress}
          disabled={loading}
          className="btn-primary disabled:opacity-50"
        >
          {loading ? "Compressing..." : "Compress PDF"}
        </button>
      )}
    </div>
  );
}
