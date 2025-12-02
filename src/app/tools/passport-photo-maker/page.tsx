// @ts-nocheck
"use client";

import { useState, ChangeEvent } from "react";

const presets = [
  { id: "india", label: "India – 35 x 45 mm", widthPx: 413, heightPx: 531 },
  { id: "us", label: "USA – 2 x 2 inch", widthPx: 600, heightPx: 600 },
  { id: "eu", label: "EU – 35 x 45 mm", widthPx: 413, heightPx: 531 },
];

export default function PassportPhotoMakerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preset, setPreset] = useState(presets[0]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setError(null);
    setPreviewUrl(null);
    if (f) {
      const url = URL.createObjectURL(f);
      setPreviewUrl(url);
    }
  };

  const handleGenerate = async () => {
    if (!file) {
      setError("Please select a photo first.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const img = new Image();
      const url = URL.createObjectURL(file);

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = url;
      });

      const canvas = document.createElement("canvas");
      canvas.width = preset.widthPx;
      canvas.height = preset.heightPx;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported.");

      // Simple center crop
      const ratio = Math.max(
        preset.widthPx / img.width,
        preset.heightPx / img.height
      );
      const newWidth = img.width * ratio;
      const newHeight = img.height * ratio;
      const offsetX = (preset.widthPx - newWidth) / 2;
      const offsetY = (preset.heightPx - newHeight) / 2;

      ctx.fillStyle = "#ffffff"; // white background
      ctx.fillRect(0, 0, preset.widthPx, preset.heightPx);
      ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);

      const blob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b), "image/jpeg", 0.9)
      );
      URL.revokeObjectURL(url);
      if (!blob) throw new Error("Failed to generate passport photo.");

      const dlUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = dlUrl;
      a.download = "passport-photo.jpg";
      a.click();
      URL.revokeObjectURL(dlUrl);
    } catch (err) {
      console.error(err);
      setError("Failed to generate passport photo.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">Passport Photo Maker</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Turn any photo into a passport-sized image with the correct dimensions. Runs
          fully in your browser.
        </p>

        <label className="drop" style={{ marginTop: 14, cursor: "pointer" }}>
          <div>Select a photo</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>Use a clear front-facing photo.</div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {previewUrl && (
          <div style={{ marginTop: 10, fontSize: 12 }}>
            <div style={{ marginBottom: 6 }}>Preview:</div>
            <img
              src={previewUrl}
              alt="preview"
              style={{
                maxWidth: "100%",
                borderRadius: 10,
                border: "1px solid #222631",
              }}
            />
          </div>
        )}

        <div style={{ marginTop: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 500 }}>Size preset</label>
          <select
            value={preset.id}
            onChange={(e) =>
              setPreset(presets.find((p) => p.id === e.target.value) ?? presets[0])
            }
            style={{
              marginTop: 4,
              borderRadius: 10,
              border: "1px solid #2b3140",
              background: "#0b0c10",
              padding: "6px 8px",
              fontSize: 13,
              color: "#e9eef2",
              outline: "none",
            }}
          >
            {presets.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p style={{ marginTop: 10, color: "#fca5a5", fontSize: 13 }}>{error}</p>
        )}

        <button
          onClick={handleGenerate}
          disabled={isProcessing || !file}
          className="btn btn-primary"
          style={{ marginTop: 14 }}
        >
          {isProcessing ? "Creating..." : "Create passport photo"}
        </button>
      </div>
    </main>
  );
}
