"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function PdfUnlockTool() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const unlock = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const newBytes = await pdf.save();

      const blob = new Blob([new Uint8Array(newBytes)], {
        type: "application/pdf",
      });

      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "unlocked.pdf";
      a.click();
      URL.revokeObjectURL(a.href);
    } catch {
      alert("Unable to unlock this PDF.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-xl space-y-6 text-black">

      <div className="text-center">
        <h1 className="text-2xl font-bold">Unlock PDF</h1>
        <p className="text-sm text-gray-600">
          Remove password from your PDF (browser only)
        </p>
      </div>

      <label className="block border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
        <input
          type="file"
          accept="application/pdf"
          hidden
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <p className="font-semibold">Upload locked PDF</p>
        <p className="text-xs text-gray-500">No upload to server</p>
      </label>

      {file && (
        <p className="text-sm text-center text-gray-700">
          📄 {file.name}
        </p>
      )}

      <button
        onClick={unlock}
        disabled={!file || loading}
        className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Unlocking..." : "Unlock & Download PDF"}
      </button>

      <p className="text-xs text-gray-500 text-center">
        🔐 Works only for owner‑protected PDFs
      </p>
    </div>
  );
}
