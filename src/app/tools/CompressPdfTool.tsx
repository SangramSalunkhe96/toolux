"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function CompressPdfTool() {
  const [file, setFile] = useState<File | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const compress = async () => {
    if (!file) return;

    const bytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(bytes);
    const compressed = await pdfDoc.save();

    const blob = new Blob([compressed], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "compressed.pdf";
    link.click();
  };

  return (
    <div className="space-y-4">
      <input type="file" accept="application/pdf" onChange={handleFile} />

      {file && (
        <button
          onClick={compress}
          className="px-4 py-2 bg-cyan-500 text-black rounded-lg"
        >
          Compress PDF
        </button>
      )}
    </div>
  );
}
