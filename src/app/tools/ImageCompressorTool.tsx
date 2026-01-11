"use client";
import { useState } from "react";

export default function ImageCompressorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (f: File | null) => {
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const compress = async () => {
    if (!file) return;
    setLoading(true);

    const img = new Image();
    img.src = preview!;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = Math.min(1, 1200 / img.width);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = "compressed.jpg";
          a.click();
          setLoading(false);
        },
        "image/jpeg",
        quality
      );
    };
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-xl space-y-6 text-black">

      <div className="text-center">
        <h1 className="text-2xl font-bold">Image Compressor</h1>
        <p className="text-sm text-gray-600">
          Reduce image size without losing much quality
        </p>
      </div>

      <label className="block border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => handleFile(e.target.files?.[0] || null)}
        />
        <p className="font-semibold">Click to upload image</p>
        <p className="text-xs text-gray-500">JPG, PNG supported</p>
      </label>

      {preview && (
        <img
          src={preview}
          className="max-h-64 mx-auto rounded-lg border"
          alt="preview"
        />
      )}

      <div>
        <label className="text-sm font-medium">
          Quality: {(quality * 100).toFixed(0)}%
        </label>
        <input
          type="range"
          min="0.3"
          max="1"
          step="0.05"
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <button
        onClick={compress}
        disabled={!file || loading}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Compressing..." : "Compress & Download"}
      </button>

      <p className="text-xs text-gray-500 text-center">
        🔒 All processing happens in your browser
      </p>
    </div>
  );
}
