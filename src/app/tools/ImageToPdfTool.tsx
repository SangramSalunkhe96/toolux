"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function ImageToPdfTool() {
  const [images, setImages] = useState<File[]>([]);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const createPdf = async () => {
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

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "images.pdf";
    link.click();
  };

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" multiple onChange={handleFiles} />

      {images.length > 0 && (
        <button
          onClick={createPdf}
          className="px-4 py-2 bg-cyan-500 text-black rounded-lg"
        >
          Convert to PDF
        </button>
      )}
    </div>
  );
}
