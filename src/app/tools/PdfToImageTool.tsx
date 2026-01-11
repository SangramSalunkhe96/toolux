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
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  // ✅ Load pdf.js from CDN (no webpack, no canvas error, privacy safe)
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

  const handleFile = async (file: File) => {
    if (!ready) return;

    setLoading(true);
    setImages([]);
    setError("");
    setProgress(0);

    try {
      const buffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data: buffer }).promise;

      const imgs: string[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas error");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: ctx, viewport }).promise;

        imgs.push(canvas.toDataURL("image/png"));
        setProgress(Math.round((i / pdf.numPages) * 100));
      }

      setImages(imgs);
    } catch (e) {
      console.error(e);
      setError("PDF conversion failed. Please try another file.");
    }

    setLoading(false);
  };

  const downloadZip = async () => {
    const zip = new JSZip();
    images.forEach((img, i) => {
      zip.file(`page-${i + 1}.png`, img.split(",")[1], { base64: true });
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
      <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
        <input
          type="file"
          accept="application/pdf"
          hidden
          onChange={(e) => e.target.files && handleFile(e.target.files[0])}
        />
        <p className="font-semibold text-gray-800">Click to upload PDF</p>
        <p className="text-sm text-gray-500 mt-1">
          100% private — files never leave your device
        </p>
      </label>

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

      {/* ZIP BUTTON */}
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
                  download={`page-${i + 1}.png`}
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
