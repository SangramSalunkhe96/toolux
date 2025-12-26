"use client";

import { useState } from "react";

export default function PdfToImageTool() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setImages([]);
    setError(null);

    try {
     // Correct import for latest versions
const pdfjsLib = await import("pdfjs-dist");



// Correct worker path using version
pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;


      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      const renderedImages: string[] = [];

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) continue;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

       await page.render({
  canvasContext: context,
  viewport,
  canvas, // <-- REQUIRED IN PDF.js v5.x
}).promise;


        const imgData = canvas.toDataURL("image/png");
        renderedImages.push(imgData);
      }

      setImages([...renderedImages]); // force UI update
    } catch (err) {
      console.error(err);
      setError("Failed to render PDF. Please try another file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* FILE INPUT */}
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFile}
        className="tool-input"
      />

      {/* LOADING */}
      {loading && (
        <p className="text-sm text-gray-400">Rendering PDF pages…</p>
      )}

      {/* ERROR */}
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      {/* THUMBNAIL PREVIEW */}
      {images.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {images.map((src, index) => (
            <div
              key={index}
              className="rounded-xl bg-black/40 border border-white/20 p-3"
            >
              <img
                src={src}
                alt={`PDF Page ${index + 1}`}
                className="w-full h-auto rounded-lg"
              />

              <a
                href={src}
                download={`page-${index + 1}.png`}
                className="block mt-2 text-center text-sm text-cyan-400 hover:underline"
              >
                Download Page {index + 1}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
