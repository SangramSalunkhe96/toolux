// @ts-nocheck
"use client";

import { useState, ChangeEvent } from "react";

function decodeBase64Url(str: string) {
  try {
    str = str.replace(/-/g, "+").replace(/_/g, "/");
    const padded = str + "===".slice((str.length + 3) % 4);
    const decoded = atob(padded);
    return decodeURIComponent(
      decoded
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch {
    return "";
  }
}

export default function JwtDecoderPage() {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [error, setError] = useState<string | null>(null);

  const decode = () => {
    if (!token.trim()) {
      setError("Paste a JWT token first.");
      return;
    }
    setError(null);
    const parts = token.split(".");
    if (parts.length < 2) {
      setError("Invalid token. It should contain at least header and payload.");
      setHeader("");
      setPayload("");
      return;
    }
    const [h, p] = parts;
    const hStr = decodeBase64Url(h);
    const pStr = decodeBase64Url(p);
    setHeader(hStr || "Invalid header");
    setPayload(pStr || "Invalid payload");
  };

  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">JWT Decoder</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Decode JSON Web Tokens (JWT) safely in your browser. No data is sent anywhere.
        </p>

        <textarea
          value={token}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setToken(e.target.value)}
          placeholder="Paste your JWT here..."
          style={{
            marginTop: 12,
            width: "100%",
            minHeight: 120,
            borderRadius: 12,
            border: "1px solid #2b3140",
            background: "#0b0c10",
            padding: "8px 10px",
            fontSize: 13,
            color: "#e9eef2",
            outline: "none",
            resize: "vertical",
          }}
        />

        <button
          className="btn btn-primary"
          type="button"
          onClick={decode}
          style={{ marginTop: 10 }}
        >
          Decode token
        </button>

        {error && (
          <p style={{ marginTop: 8, color: "#fca5a5", fontSize: 13 }}>{error}</p>
        )}

        <div
          style={{
            marginTop: 14,
            display: "grid",
            gap: 10,
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <div>
            <label style={{ fontSize: 12, fontWeight: 500 }}>Header</label>
            <textarea
              readOnly
              value={header}
              style={{
                marginTop: 4,
                width: "100%",
                minHeight: 120,
                borderRadius: 10,
                border: "1px solid #2b3140",
                background: "#020617",
                padding: "8px 10px",
                fontSize: 12,
                color: "#e9eef2",
                outline: "none",
                resize: "vertical",
                fontFamily: "monospace",
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500 }}>Payload</label>
            <textarea
              readOnly
              value={payload}
              style={{
                marginTop: 4,
                width: "100%",
                minHeight: 120,
                borderRadius: 10,
                border: "1px solid #2b3140",
                background: "#020617",
                padding: "8px 10px",
                fontSize: 12,
                color: "#e9eef2",
                outline: "none",
                resize: "vertical",
                fontFamily: "monospace",
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
