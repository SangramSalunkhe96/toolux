"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";

type PageSize = "A4" | "ORIGINAL";
type Orientation = "AUTO" | "PORTRAIT" | "LANDSCAPE";

export default function ImageToPdfTool() {
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [pageSize, setPageSize] = useState<PageSize>("A4");
  const [orientation, setOrientation] = useState<Orientation>("AUTO");
  const [margin, setMargin] = useState(20);

  // ---------- FILE HANDLING ----------
  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    setImages((prev) => [...prev, ...Array.from(files)]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const moveImage = (index: number, dir: "up" | "down") => {
    setImages((prev) => {
      const arr = [...prev];
      const newIndex = dir === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= arr.length) return arr;
      [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
      return arr;
    });
  };

  // ---------- PDF CREATION ----------
  const createPdf = async () => {
    if (images.length === 0) return;
    setLoading(true);
    setProgress(0);

    try {
      const pdfDoc = await PDFDocument.create();

      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const bytes = await img.arrayBuffer();

        const image =
          img.type === "image/png"
            ? await pdfDoc.embedPng(bytes)
            : await pdfDoc.embedJpg(bytes);

        let pageWidth = image.width;
        let pageHeight = image.height;

        // A4 size in points
        if (pageSize === "A4") {
          pageWidth = 595;
          pageHeight = 842;
        }

        // Orientation
        if (orientation !== "AUTO") {
          const isLandscape = pageWidth > pageHeight;
          if (
            (orientation === "LANDSCAPE" && !isLandscape) ||
            (orientation === "PORTRAIT" && isLandscape)
          ) {
            [pageWidth, pageHeight] = [pageHeight, pageWidth];
          }
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        const maxWidth = pageWidth - margin * 2;
        const maxHeight = pageHeight - margin * 2;

        const scale = Math.min(
          maxWidth / image.width,
          maxHeight / image.height
        );

        const imgWidth = image.width * scale;
        const imgHeight = image.height * scale;

        page.drawImage(image, {
          x: (pageWidth - imgWidth) / 2,
          y: (pageHeight - imgHeight) / 2,
          width: imgWidth,
          height: imgHeight,
        });

        setProgress(Math.round(((i + 1) / images.length) * 100));
      }

      const pdfBytes = await pdfDoc.save();

// convert to Uint8Array explicitly
const uint8Array = new Uint8Array(pdfBytes);

const blob = new Blob([uint8Array], { type: "application/pdf" });

const link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download = "images-to-pdf.pdf";
link.click();
URL.revokeObjectURL(link.href);

    } catch (err) {
      console.error(err);
      alert("Failed to create PDF. Try different images.");
    }

    setLoading(false);
  };

  // ---------- UI ----------
  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-xl space-y-6">

      <h1 className="text-2xl font-bold text-center text-gray-900">
        Image to PDF Converter
      </h1>

      {/* UPLOAD */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition"
      >
        <input
          type="file"
          accept="image/*"
          multiple
          hidden
          id="img-upload"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <label htmlFor="img-upload" className="cursor-pointer">
          <p className="font-semibold text-gray-800">
            Click or Drag & Drop Images
          </p>
          <p className="text-sm text-gray-500 mt-1">
            100% private — processed in your browser
          </p>
        </label>
      </div>

      {/* OPTIONS */}
      {images.length > 0 && (
        <div className="grid md:grid-cols-3 gap-4">

          <div>
            <p className="font-semibold text-gray-800 mb-1">Page Size</p>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value as any)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="A4">A4</option>
              <option value="ORIGINAL">Original Image Size</option>
            </select>
          </div>

          <div>
            <p className="font-semibold text-gray-800 mb-1">Orientation</p>
            <select
              value={orientation}
              onChange={(e) => setOrientation(e.target.value as any)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="AUTO">Auto</option>
              <option value="PORTRAIT">Portrait</option>
              <option value="LANDSCAPE">Landscape</option>
            </select>
          </div>

          <div>
            <p className="font-semibold text-gray-800 mb-1">Margin (px)</p>
            <input
              type="number"
              min={0}
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>
      )}

      {/* PREVIEW GRID */}
      {images.length > 0 && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="border rounded-xl p-2 bg-gray-50 flex flex-col"
            >
              <img
                src={URL.createObjectURL(img)}
                className="h-40 object-contain bg-white rounded-md"
              />

              <div className="flex justify-between mt-2 text-sm">
                <button
                  onClick={() => moveImage(i, "up")}
                  className="text-blue-600"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveImage(i, "down")}
                  className="text-blue-600"
                >
                  ↓
                </button>
                <button
                  onClick={() => removeImage(i)}
                  className="text-red-600"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CONVERT */}
      {images.length > 0 && (
        <button
          onClick={createPdf}
          disabled={loading}
          className="mx-auto block bg-blue-600 text-white px-10 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating PDF…" : "Convert to PDF"}
        </button>
      )}

      {/* PROGRESS */}
      {loading && (
        <div className="space-y-2">
          <p className="text-center text-blue-600">{progress}%</p>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-blue-600 h-3 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
