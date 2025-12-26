"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function ImageToPdfTool() {
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages(Array.from(e.target.files));
  };

  const createPdf = async () => {
    if (images.length === 0) return;
    setLoading(true);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const img of images) {
        const bytes = await img.arrayBuffer();
        const image =
          img.type === "image/png"
            ? await pdfDoc.embedPng(bytes)
            : await pdfDoc.embedJpg(bytes);

        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      }

      const pdfBytes = await pdfDoc.save({ useObjectStreams: false });

      // 🔥 TypeScript-safe Blob creation
      const blob = new Blob([new Uint8Array([...pdfBytes])], {
        type: "application/pdf",
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "images.pdf";
      link.click();
    } catch (err) {
      console.error(err);
      alert("Failed to convert images. Try different pictures!");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        className="tool-input"
      />

      {images.length > 0 && (
        <button
          onClick={createPdf}
          disabled={loading}
          className="btn-primary disabled:opacity-50"
        >
          {loading ? "Processing…" : "Convert to PDF"}
        </button>
      )}
    </div>
  );
}
