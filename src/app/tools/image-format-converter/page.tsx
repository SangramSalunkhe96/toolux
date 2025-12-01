// @ts-nocheck
"use client";

import { useState, ChangeEvent } from "react";

const formats = [
  { value: "image/jpeg", label: "JPG" },
  { value: "image/png", label: "PNG" },
  { value: "image/webp", label: "WebP" },
];

export default function ImageFormatConverterPage() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [target, setTarget] = useState("image/jpeg");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
    setError(null);
  };

  const handleConvert = async () => {
    if (!files || files.length === 0) {
      setError("Select at least one image.");
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
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas not supported.");
        ctx.drawImage(img, 0, 0);

        const blob: Blob | null = await new Promise((resolve) =>
          canvas.toBlob((b) => resolve(b), target, 0.92)
        );
        URL.revokeObjectURL(url);
        if (!blob) continue;

        const ext =
          target === "image/png" ? "png" : target === "image/webp" ? "webp" : "jpg";
        const dlUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = dlUrl;
        a.download = file.name.replace(/\.[^.]+$/, "") + "_converted." + ext;
        a.click();
        URL.revokeObjectURL(dlUrl);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to convert one or more images.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">JPG / PNG / WebP Converter</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Convert images between JPG, PNG and WebP formats entirely in your browser.
        </p>

        <label className="drop" style={{ marginTop: 14, cursor: "pointer" }}>
          <div>Select one or more images</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>They will be converted locally.</div>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {files && (
          <p className="section-sub" style={{ marginTop: 8 }}>
            Selected: <span style={{ color: "#e9eef2" }}>{files.length} file(s)</span>
          </p>
        )}

        <div style={{ marginTop: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 500 }}>Target format</label>
          <select
            value={target}
            onChange={(e) => setTarget(e.target.value)}
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
            {formats.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p style={{ marginTop: 10, color: "#fca5a5", fontSize: 13 }}>{error}</p>
        )}

        <button
          onClick={handleConvert}
          disabled={isProcessing || !files || files.length === 0}
          className="btn btn-primary"
          style={{ marginTop: 14 }}
        >
          {isProcessing ? "Converting..." : "Convert & Download"}
        </button>
      </div>
    </main>
  );
}
