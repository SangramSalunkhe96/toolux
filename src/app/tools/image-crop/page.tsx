// @ts-nocheck
"use client";

import { useState, ChangeEvent } from "react";

export default function ImageCropPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [w, setW] = useState<number | "">("");
  const [h, setH] = useState<number | "">("");
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

  const handleCrop = async () => {
    if (!file || w === "" || h === "") {
      setError("Select an image and set X, Y, width and height.");
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
      canvas.width = Number(w);
      canvas.height = Number(h);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported.");

      ctx.drawImage(
        img,
        x,
        y,
        Number(w),
        Number(h),
        0,
        0,
        Number(w),
        Number(h)
      );

      const blob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b), file.type || "image/png", 0.92)
      );
      URL.revokeObjectURL(url);
      if (!blob) throw new Error("Failed to crop image.");

      const dlUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = dlUrl;
      a.download = file.name.replace(/\.[^.]+$/, "") + "_cropped.png";
      a.click();
      URL.revokeObjectURL(dlUrl);
    } catch (err) {
      console.error(err);
      setError("Failed to crop image. Check crop values.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">Image Cropper</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Crop a part of an image by entering X, Y, width and height (in pixels). Simple,
          precise and fully in-browser.
        </p>

        <label className="drop" style={{ marginTop: 14, cursor: "pointer" }}>
          <div>Select an image</div>
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
              style={{ maxWidth: "100%", borderRadius: 10, border: "1px solid #222631" }}
            />
          </div>
        )}

        <div
          style={{
            marginTop: 12,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px,1fr))",
            gap: 10,
          }}
        >
          <div>
            <label style={{ fontSize: 12 }}>X</label>
            <input
              type="number"
              value={x}
              onChange={(e) => setX(parseInt(e.target.value || "0", 10))}
              style={{
                width: "100%",
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
            <label style={{ fontSize: 12 }}>Y</label>
            <input
              type="number"
              value={y}
              onChange={(e) => setY(parseInt(e.target.value || "0", 10))}
              style={{
                width: "100%",
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
            <label style={{ fontSize: 12 }}>Width</label>
            <input
              type="number"
              value={w === "" ? "" : w}
              onChange={(e) =>
                setW(e.target.value === "" ? "" : parseInt(e.target.value, 10))
              }
              style={{
                width: "100%",
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
            <label style={{ fontSize: 12 }}>Height</label>
            <input
              type="number"
              value={h === "" ? "" : h}
              onChange={(e) =>
                setH(e.target.value === "" ? "" : parseInt(e.target.value, 10))
              }
              style={{
                width: "100%",
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
        </div>

        {error && (
          <p style={{ marginTop: 10, color: "#fca5a5", fontSize: 13 }}>{error}</p>
        )}

        <button
          onClick={handleCrop}
          disabled={isProcessing || !file}
          className="btn btn-primary"
          style={{ marginTop: 14 }}
        >
          {isProcessing ? "Cropping..." : "Crop & Download"}
        </button>
      </div>
    </main>
  );
}
