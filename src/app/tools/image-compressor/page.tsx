// @ts-nocheck
"use client";

import { useState, ChangeEvent } from "react";

export default function ImageCompressorPage() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [quality, setQuality] = useState(0.7); // 0–1
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
    setError(null);
  };

  const canvasToBlob = (canvas: HTMLCanvasElement, q: number): Promise<Blob> =>
    new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Failed to create blob"));
          resolve(blob);
        },
        "image/jpeg",
        q
      );
    });

  const handleCompress = async () => {
    if (!files || files.length === 0) {
      setError("Please select at least one image.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      for (const file of Array.from(files)) {
        const img = new Image();
        const url = URL.createObjectURL(file);

        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = reject;
          img.src = url;
        });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          URL.revokeObjectURL(url);
          continue;
        }

        // Keep original size (you can also downscale if you want)
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const blob = await canvasToBlob(canvas, quality);
        URL.revokeObjectURL(url);

        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = `compressed_${file.name.replace(/\.[^.]+$/, ".jpg")}`;
        a.click();
        URL.revokeObjectURL(downloadUrl);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while compressing images.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">Image Compressor</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Compress JPG/PNG images in your browser with adjustable quality. No uploads,
          everything happens locally.
        </p>

        {/* Tool preview */}
        <div className="drop" style={{ marginTop: 12, textAlign: "left" }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
            Tool preview
          </div>
          <ul style={{ fontSize: 12, paddingLeft: 18, margin: 0 }}>
            <li>Best for: reducing image size for email, web, forms.</li>
            <li>Output: compressed JPEG files.</li>
            <li>Limitations: does not change resolution by default.</li>
          </ul>
        </div>

        <div style={{ marginTop: 16 }}>
          <label className="drop" style={{ cursor: "pointer" }}>
            <div>Select one or more images</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>
              JPG, PNG and other common formats are supported.
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {files && files.length > 0 && (
            <p className="section-sub" style={{ marginTop: 10 }}>
              Selected:{" "}
              <span style={{ color: "#e9eef2" }}>{files.length} image(s)</span>
            </p>
          )}

          <div style={{ marginTop: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 500 }}>
              Quality ({Math.round(quality * 100)}%)
            </label>
            <input
              type="range"
              min={0.2}
              max={1}
              step={0.05}
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              style={{ width: "100%", marginTop: 6 }}
            />
            <p className="section-sub" style={{ marginTop: 4 }}>
              Lower quality = smaller file size. 70–80% works well for most photos.
            </p>
          </div>

          {error && (
            <p style={{ marginTop: 10, color: "#fca5a5", fontSize: 13 }}>{error}</p>
          )}

          <button
            onClick={handleCompress}
            disabled={isProcessing || !files || files.length === 0}
            className="btn btn-primary"
            style={{ marginTop: 14 }}
          >
            {isProcessing ? "Compressing..." : "Compress & Download"}
          </button>
        </div>
      </div>
    </main>
  );
}
