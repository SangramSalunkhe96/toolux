// src/components/ImageToPdf.tsx
"use client";

import React, { useCallback, useRef, useState } from "react";

type PageSize = "a4" | "letter";
type FitMode = "contain" | "cover";

type Item = {
  file: File;
  dataUrl: string;
  width: number;
  height: number;
};

const ImageToPdf: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [fit, setFit] = useState<FitMode>("contain");
  const [progress, setProgress] = useState<number>(0);

  const dropRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const readFileAsDataUrl = (file: File) =>
    new Promise<Item>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = String(reader.result);
        const img = new Image();
        img.onload = () =>
          resolve({
            file,
            dataUrl,
            width: img.naturalWidth,
            height: img.naturalHeight,
          });
        img.onerror = reject;
        img.src = dataUrl;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const onFiles = useCallback(async (fileList: FileList) => {
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (!files.length) return;

    setProgress(0);
    const results: Item[] = [];
    for (let i = 0; i < files.length; i++) {
      const it = await readFileAsDataUrl(files[i]);
      results.push(it);
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }
    setItems((prev) => [...prev, ...results]);
  }, []);

  const pageFormat = (size: PageSize) => {
    // jsPDF units: points
    // A4 portrait ≈ 595.28 x 841.89, Letter portrait = 612 x 792
    return size === "a4" ? [595.28, 841.89] : [612, 792];
  };

  const fitRect = (
    imgW: number,
    imgH: number,
    boxW: number,
    boxH: number,
    mode: FitMode
  ) => {
    const scaleContain = Math.min(boxW / imgW, boxH / imgH);
    const scaleCover = Math.max(boxW / imgW, boxH / imgH);
    const s = mode === "cover" ? scaleCover : scaleContain;
    const w = imgW * s;
    const h = imgH * s;
    const x = (boxW - w) / 2;
    const y = (boxH - h) / 2;
    return { x, y, w, h };
  };

  const makePdf = useCallback(async () => {
    if (!items.length) return;
    setProgress(0);

    // dynamic import to avoid SSR issues
    const { jsPDF } = await import("jspdf");

    const [pw, ph] = pageFormat(pageSize);
    const doc = new jsPDF({ orientation: "p", unit: "pt", format: [pw, ph] });

    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (i > 0) doc.addPage([pw, ph], "p");

      const { x, y, w, h } = fitRect(it.width, it.height, pw, ph, fit);
      const fmt = it.dataUrl.startsWith("data:image/png") ? "PNG" : "JPEG";

      doc.addImage(it.dataUrl, fmt as any, x, y, w, h, undefined, "FAST");
      setProgress(Math.round(((i + 1) / items.length) * 100));
    }

    doc.save("images.pdf");
  }, [fit, items, pageSize]);

  // Inline React DnD handlers (no refCapture; no addEventListener needed)
  const prevent = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    prevent(e);
    if (e.dataTransfer?.files) onFiles(e.dataTransfer.files);
  };

  return (
    <div className="grid gap-3">
      <div
        ref={dropRef}
        className="drop cursor-pointer rounded border border-dashed p-6 text-center"
        onClick={() => inputRef.current?.click()}
        onDragEnter={prevent}
        onDragOver={prevent}
        onDragLeave={prevent}
        onDrop={handleDrop}
      >
        Drop images (PNG/JPG/WebP) here or <u>click to select</u>.
      </div>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        multiple
        onChange={(e) => e.target.files && onFiles(e.target.files)}
      />

      <div className="flex gap-3 items-center flex-wrap">
        <label className="flex items-center gap-2">
          Page Size
          <select
            className="text-black px-2 py-1 rounded"
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value as PageSize)}
          >
            <option value="a4">A4</option>
            <option value="letter">US Letter</option>
          </select>
        </label>

        <label className="flex items-center gap-2">
          Fit
          <select
            className="text-black px-2 py-1 rounded"
            value={fit}
            onChange={(e) => setFit(e.target.value as FitMode)}
          >
            <option value="contain">Contain</option>
            <option value="cover">Cover</option>
          </select>
        </label>

        <button
          onClick={makePdf}
          className="btn btn-primary"
          disabled={!items.length}
          title={!items.length ? "Add images first" : "Create PDF"}
        >
          Create PDF
        </button>

        <progress value={progress} max={100} className="w-full h-3" />
      </div>

      <ol className="text-sm text-[#a6b0bb] list-decimal pl-5">
        {items.map((it: any, i: any) => (
          <li key={i}>{it.file.name}</li>
        ))}
      </ol>
    </div>
  );
};

export default ImageToPdf;