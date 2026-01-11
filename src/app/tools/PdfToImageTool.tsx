"use client";
import { useEffect, useState } from "react";
import JSZip from "jszip";

declare global {
  interface Window {
    pdfjsLib: any;
  }
}

export default function PdfToImageTool() {
  const [ready, setReady] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  // OPTIONS
  const [rangeType, setRangeType] = useState<"all" | "custom">("all");
  const [fromPage, setFromPage] = useState(1);
  const [toPage, setToPage] = useState(1);
  const [quality, setQuality] = useState<"low" | "medium" | "high">("medium");

  // LOAD PDF.JS FROM CDN
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js";
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
      setReady(true);
    };
    document.body.appendChild(script);
  }, []);

  const getScale = () => {
    if (quality === "low") return 1.2;
    if (quality === "high") return 3;
    return 2; // medium
  };

  const getJpegQuality = () => {
    if (quality === "low") return 0.6;
    if (quality === "high") return 0.95;
    return 0.8;
  };

  // ONLY STORE FILE — NO CONVERSION YET
  const handleSelect = (f: File) => {
    setFile(f);
    setImages([]);
    setError("");
  };

  const convertPdf = async () => {
    if (!ready || !file) return;

    setLoading(true);
    setImages([]);
    setError("");
    setProgress(0);

    try {
      const buffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data: buffer }).promise;

      const start =
        rangeType === "all" ? 1 : Math.max(1, Number(fromPage));
      const end =
        rangeType === "all"
          ? pdf.numPages
          : Math.min(pdf.numPages, Number(toPage));

      const imgs: string[] = [];
      const total = end - start + 1;
      let done = 0;

      for (let i = start; i <= end; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: getScale() });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas error");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: ctx, viewport }).promise;

        const img = canvas.toDataURL("image/jpeg", getJpegQuality());
        imgs.push(img);

        done++;
        setProgress(Math.round((done / total) * 100));
      }

      setImages(imgs);
    } catch (e) {
      console.error(e);
      setError("PDF conversion failed. Please try another file.");
    }

    setLoading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files[0]) {
      handleSelect(e.dataTransfer.files[0]);
    }
  };

  const downloadZip = async () => {
    const zip = new JSZip();
    images.forEach((img, i) => {
      zip.file(`page-${i + 1}.jpg`, img.split(",")[1], { base64: true });
    });

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "pdf-images.zip";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 bg-white p-6 rounded-2xl shadow-xl space-y-6">

      <h1 className="text-2xl font-bold text-center text-gray-900">
        PDF to Image Converter
      </h1>

      {!ready && (
        <p className="text-center text-gray-500">Loading PDF engine…</p>
      )}

      {/* UPLOAD */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition"
      >
        <input
          type="file"
          accept="application/pdf"
          hidden
          id="pdf-upload"
          onChange={(e) => e.target.files && handleSelect(e.target.files[0])}
        />
        <label htmlFor="pdf-upload" className="cursor-pointer">
          <p className="font-semibold text-gray-800">
            Click or Drag & Drop PDF here
          </p>
          {file && (
            <p className="text-sm text-green-600 mt-1">
              Selected: {file.name}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Files never leave your device
          </p>
        </label>
      </div>

      {/* OPTIONS */}
      <div className="grid md:grid-cols-3 gap-4">

        {/* PAGE RANGE */}
        <div className="space-y-2">
          <p className="font-semibold text-gray-800">Page Range</p>
          <select
            value={rangeType}
            onChange={(e) => setRangeType(e.target.value as any)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="all">All Pages</option>
            <option value="custom">From – To</option>
          </select>

          {rangeType === "custom" && (
            <div className="flex gap-2">
              <input
                type="number"
                min={1}
                value={fromPage}
                onChange={(e) => setFromPage(Number(e.target.value))}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="From"
              />
              <input
                type="number"
                min={1}
                value={toPage}
                onChange={(e) => setToPage(Number(e.target.value))}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="To"
              />
            </div>
          )}
        </div>

        {/* QUALITY */}
        <div className="space-y-2">
          <p className="font-semibold text-gray-800">Image Quality</p>
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value as any)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="low">Low (small size)</option>
            <option value="medium">Medium</option>
            <option value="high">High (best quality)</option>
          </select>
        </div>

        {/* INFO */}
        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
          <p>✔ No upload</p>
          <p>✔ Works offline</p>
          <p>✔ Safe for documents</p>
        </div>
      </div>

      {/* CONVERT BUTTON */}
      <button
        disabled={!file || loading}
        onClick={convertPdf}
        className="mx-auto block bg-blue-600 text-white px-10 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        Convert PDF
      </button>

      {/* PROGRESS */}
      {loading && (
        <div className="space-y-2">
          <p className="text-center text-blue-600">
            Converting… {progress}%
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-blue-600 h-3 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {error && (
        <p className="text-center text-red-600 font-medium">{error}</p>
      )}

      {/* ZIP */}
      {images.length > 0 && (
        <button
          onClick={downloadZip}
          className="mx-auto block bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
        >
          Download All Pages (ZIP)
        </button>
      )}

      {/* PREVIEW */}
      {images.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Preview Pages
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((src, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center p-3"
              >
                <img
                  src={src}
                  className="w-full object-contain border rounded-md bg-gray-100"
                />

                <p className="mt-2 text-sm text-gray-700 font-medium">
                  Page {i + 1}
                </p>

                <a
                  href={src}
                  download={`page-${i + 1}.jpg`}
                  className="mt-2 w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
