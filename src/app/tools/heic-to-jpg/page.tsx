// @ts-nocheck
"use client";

import { useState, ChangeEvent } from "react";

export default function HeicToJpgPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(
    "This basic version relies on your browser being able to open HEIC files directly."
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
    setError(null);
    setInfo(
      "This basic version relies on your browser being able to open HEIC files directly."
    );
  };

  const handleConvert = async () => {
    if (!file) {
      setError("Please select a HEIC image.");
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
      }).catch(() => {
        throw new Error(
          "Your browser cannot decode HEIC images directly. Full support will come in the Pro version using a dedicated converter."
        );
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported.");
      ctx.drawImage(img, 0, 0);

      const blob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b), "image/jpeg", 0.9)
      );
      URL.revokeObjectURL(url);
      if (!blob) throw new Error("Failed to create JPG.");

      const dlUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = dlUrl;
      a.download = file.name.replace(/\.[^.]+$/, "") + ".jpg";
      a.click();
      URL.revokeObjectURL(dlUrl);

      setInfo("Converted using browser decoding. For better reliability, a Pro version will use a dedicated HEIC decoder later.");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Conversion failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">HEIC to JPG (Basic)</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Try converting HEIC (iPhone) images to JPG using only browser capabilities. On
          some browsers this may not work; a Pro version will handle all files reliably.
        </p>

        <label className="drop" style={{ marginTop: 14, cursor: "pointer" }}>
          <div>Select a HEIC image</div>
          <input
            type="file"
            accept=".heic,image/heic,image/heif"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {file && (
          <p className="section-sub" style={{ marginTop: 8 }}>
            Selected: <span style={{ color: "#e9eef2" }}>{file.name}</span>
          </p>
        )}

        {info && (
          <p className="section-sub" style={{ marginTop: 8, fontSize: 11 }}>
            {info}
          </p>
        )}

        {error && (
          <p style={{ marginTop: 10, color: "#fca5a5", fontSize: 13 }}>{error}</p>
        )}

        <button
          onClick={handleConvert}
          disabled={isProcessing || !file}
          className="btn btn-primary"
          style={{ marginTop: 14 }}
        >
          {isProcessing ? "Converting..." : "Convert to JPG"}
        </button>
      </div>
    </main>
  );
}
