// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import QRCode from "qrcode";

export default function QrGeneratorPage() {
  const [text, setText] = useState("https://toolux.in/");
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    try {
      if (!text.trim()) {
        setDataUrl(null);
        return;
      }
      const url = await QRCode.toDataURL(text.trim(), {
        margin: 2,
        width: 220,
      });
      setDataUrl(url);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to generate QR code.");
      setDataUrl(null);
    }
  };

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const download = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "toolux_qr.png";
    a.click();
  };

  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">QR Code Generator</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Create QR codes for links or text and download them as PNG images.
        </p>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter URL or text"
          style={{
            marginTop: 12,
            width: "100%",
            borderRadius: 10,
            border: "1px solid #2b3140",
            background: "#0b0c10",
            padding: "8px 10px",
            fontSize: 13,
            color: "#e9eef2",
            outline: "none",
          }}
        />

        <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
          <button className="btn btn-primary" type="button" onClick={generate}>
            Generate
          </button>
          <button
            className="btn"
            type="button"
            onClick={download}
            disabled={!dataUrl}
          >
            Download PNG
          </button>
        </div>

        {error && (
          <p style={{ marginTop: 8, color: "#fca5a5", fontSize: 13 }}>{error}</p>
        )}

        {dataUrl && (
          <div style={{ marginTop: 14 }}>
            <img
              src={dataUrl}
              alt="QR code"
              style={{ width: 220, height: 220, borderRadius: 12, border: "1px solid #222631" }}
            />
          </div>
        )}
      </div>
    </main>
  );
}
