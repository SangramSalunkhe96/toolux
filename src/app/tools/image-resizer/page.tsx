// @ts-nocheck
"use client";

import { useState, ChangeEvent } from "react";

export default function ImageResizerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [keepRatio, setKeepRatio] = useState(true);
  const [origSize, setOrigSize] = useState<{ w: number; h: number } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setError(null);
    setOrigSize(null);

    if (f) {
      const img = new Image();
      const url = URL.createObjectURL(f);
      img.onload = () => {
        setOrigSize({ w: img.width, h: img.height });
        setWidth(img.width);
        setHeight(img.height);
        URL.revokeObjectURL(url);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }
  };

  const handleResize = async () => {
    if (!file || !width || !height) {
      setError("Select an image and set both width and height.");
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
      canvas.width = Number(width);
      canvas.height = Number(height);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported.");

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const blob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b), file.type || "image/png", 0.92)
      );
      URL.revokeObjectURL(url);
      if (!blob) throw new Error("Failed to create image.");

      const dlUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = dlUrl;
      a.download = file.name.replace(/\.[^.]+$/, "") + `_resized.${file.type.split("/")[1] || "png"}`;
      a.click();
      URL.revokeObjectURL(dlUrl);
    } catch (err) {
      console.error(err);
      setError("Failed to resize image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const syncWidth = (val: string) => {
    const n = parseInt(val || "0", 10);
    setWidth(val === "" ? "" : n);
    if (keepRatio && origSize && n > 0) {
      const ratio = origSize.h / origSize.w;
      setHeight(Math.round(n * ratio));
    }
  };

  const syncHeight = (val: string) => {
    const n = parseInt(val || "0", 10);
    setHeight(val === "" ? "" : n);
    if (keepRatio && origSize && n > 0) {
      const ratio = origSize.w / origSize.h;
      setWidth(Math.round(n * ratio));
    }
  };

  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">Image Resizer</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Resize an image to specific width and height. Runs entirely in your browser.
        </p>

        <label className="drop" style={{ marginTop: 14, cursor: "pointer" }}>
          <div>Select an image</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>JPG, PNG and more.</div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {origSize && (
          <p className="section-sub" style={{ marginTop: 8 }}>
            Original size: {origSize.w} × {origSize.h}px
          </p>
        )}

        <div
          style={{
            marginTop: 14,
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            alignItems: "center",
          }}
        >
          <div>
            <label style={{ fontSize: 12 }}>Width (px)</label>
            <input
              type="number"
              value={width === "" ? "" : width}
              onChange={(e) => syncWidth(e.target.value)}
              style={{
                width: 100,
                marginTop: 4,
                borderRadius: 10,
                border: "1px solid #2b3140",
                background: "#0b0c10",
                padding: "4px 6px",
                fontSize: 13,
                color: "#e9eef2",
                outline: "none",
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: 12 }}>Height (px)</label>
            <input
              type="number"
              value={height === "" ? "" : height}
              onChange={(e) => syncHeight(e.target.value)}
              style={{
                width: 100,
                marginTop: 4,
                borderRadius: 10,
                border: "1px solid #2b3140",
                background: "#0b0c10",
                padding: "4px 6px",
                fontSize: 13,
                color: "#e9eef2",
                outline: "none",
              }}
            />
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
            <input
              type="checkbox"
              checked={keepRatio}
              onChange={(e) => setKeepRatio(e.target.checked)}
            />
            Keep aspect ratio
          </label>
        </div>

        {error && (
          <p style={{ marginTop: 10, color: "#fca5a5", fontSize: 13 }}>{error}</p>
        )}

        <button
          onClick={handleResize}
          disabled={isProcessing || !file}
          className="btn btn-primary"
          style={{ marginTop: 14 }}
        >
          {isProcessing ? "Resizing..." : "Resize & Download"}
        </button>
      </div>
    </main>
  );
}
