// src/components/PdfToImage.tsx
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

type ImgFormat = "image/png" | "image/jpeg";
type Rendered = { name: string; url: string };

let pdfjsLib: any = null;

// Simple PDF check
const looksLikePdf = (f: File) => {
  const t = (f.type || "").toLowerCase();
  if (t.includes("pdf")) return true;
  return /\.pdf$/i.test(f.name || "");
};

const PdfToImage: React.FC = () => {
  const [items, setItems] = useState<Rendered[]>([]);
  const [progress, setProgress] = useState(0);
  const [scale, setScale] = useState(1.5);
  const [format, setFormat] = useState<ImgFormat>("image/png");
  const [ready, setReady] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // 1) Load PDF.js UMD build from CDN and configure worker
  useEffect(() => {
    let mounted = true;

    if (typeof window === "undefined") return;

    // If already loaded (SPA navigation), reuse
    const existing = (window as any).pdfjsLib;
    if (existing) {
      pdfjsLib = existing;
      try {
        existing.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js";
      } catch (e) {
        console.warn("Failed to set workerSrc on existing pdfjsLib:", e);
      }
      setReady(true);
      setErr(null);
      return;
    }

    const script = document.createElement("script");
    // ✅ v2 UMD build: this URL DOES exist
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js";
    script.async = true;

    script.onload = () => {
      if (!mounted) return;
      const lib = (window as any).pdfjsLib;
      if (!lib) {
        console.error("pdfjsLib global not found after script load");
        setErr("Failed to load PDF engine.");
        setReady(false);
        return;
      }

      try {
        lib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js";
      } catch (e) {
        console.error("Failed to set PDF.js workerSrc:", e);
      }

      pdfjsLib = lib;
      setReady(true);
      setErr(null);
    };

    script.onerror = () => {
      if (!mounted) return;
      console.error("Failed to load PDF.js script from CDN");
      setErr("Failed to load PDF engine from CDN.");
      setReady(false);
    };

    document.head.appendChild(script);

    return () => {
      mounted = false;
      // keep script in <head> so it stays cached if component unmounts
    };
  }, []);

  // 2) Prevent browser from navigating on global drag/drop
  useEffect(() => {
    const prevent = (e: DragEvent | Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener("dragover", prevent);
    window.addEventListener("drop", prevent);
    return () => {
      window.removeEventListener("dragover", prevent);
      window.removeEventListener("drop", prevent);
    };
  }, []);

  // 3) Cleanup blob URLs when component unmounts or items change
  useEffect(() => {
    return () => {
      items.forEach((it) => URL.revokeObjectURL(it.url));
    };
  }, [items]);

  const toBlob = (canvas: HTMLCanvasElement, type: ImgFormat, quality = 0.92) =>
    new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Canvas toBlob failed"))),
        type,
        quality
      );
    });

  const renderPdf = useCallback(
    async (file: File) => {
      setErr(null);

      if (!ready || !pdfjsLib) {
        setErr("PDF engine is still loading. Please wait a moment and try again.");
        return;
      }
      if (!looksLikePdf(file)) {
        setErr("That doesn’t look like a PDF file.");
        return;
      }

      setItems([]);
      setProgress(0);

      try {
        const buf = await file.arrayBuffer();
        const pdf = await (pdfjsLib as any).getDocument({ data: buf }).promise;
        const total = pdf.numPages;
        const outputs: Rendered[] = [];

        for (let i = 1; i <= total; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) throw new Error("2D context unavailable");

          canvas.width = Math.ceil(viewport.width);
          canvas.height = Math.ceil(viewport.height);

          await page.render({ canvasContext: ctx, viewport }).promise;

          const blob = await toBlob(canvas, format, 0.92);
          const url = URL.createObjectURL(blob);

          outputs.push({
            name: `page-${i}.${format === "image/jpeg" ? "jpg" : "png"}`,
            url,
          });

          setProgress(Math.round((i / total) * 100));
        }

        setItems(outputs);
      } catch (e: any) {
        console.error(e);
        setErr(e?.message || "Failed to read or render PDF.");
      }
    },
    [format, scale, ready]
  );

  const onFiles = useCallback(
    async (fileList: FileList) => {
      const file = Array.from(fileList)[0];
      if (!file) return;

      await renderPdf(file);

      // Reset input so choosing the same file again still triggers onChange
      if (inputRef.current) inputRef.current.value = "";
    },
    [renderPdf]
  );

  // Drop zone handlers (for our box only)
  const prevent = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    prevent(e);
    if (!ready) {
      setErr("PDF engine is still loading. Please try again in a moment.");
      return;
    }
    if (e.dataTransfer?.files) onFiles(e.dataTransfer.files);
  };

  return (
    <div className="grid gap-3">
      <div
        className={`drop cursor-pointer rounded border border-dashed p-6 text-center ${
          !ready ? "opacity-60 pointer-events-none" : ""
        }`}
        onClick={() => ready && inputRef.current?.click()}
        onDragEnter={prevent}
        onDragOver={prevent}
        onDragLeave={prevent}
        onDrop={handleDrop}
      >
        Drop a PDF here or <u>click to select</u>.
        {!ready && (
          <div className="mt-2 text-xs opacity-70">Loading PDF engine…</div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept=".pdf,application/pdf"
        onChange={(e) => e.target.files && onFiles(e.target.files)}
      />

      <div className="flex gap-3 items-center flex-wrap">
        <label className="flex items-center gap-2">
          Scale
          <input
            className="text-black px-2 py-1 rounded"
            type="number"
            min={0.5}
            max={4}
            step={0.1}
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value) || 1.5)}
          />
        </label>

        <label className="flex items-center gap-2">
          Format
          <select
            className="text-black px-2 py-1 rounded"
            value={format}
            onChange={(e) => setFormat(e.target.value as ImgFormat)}
          >
            <option value="image/png">PNG</option>
            <option value="image/jpeg">JPEG</option>
          </select>
        </label>

        <progress value={progress} max={100} className="w-full h-3" />
      </div>

      {err && (
        <div className="text-sm text-red-400 bg-red-950/30 border border-red-800 rounded p-2">
          {err}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((it) => (
          <a
            key={it.name}
            href={it.url}
            download={it.name}
            className="block border border-[#222631] rounded-lg overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={it.url} alt={it.name} className="w-full h-full object-cover" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default PdfToImage;
