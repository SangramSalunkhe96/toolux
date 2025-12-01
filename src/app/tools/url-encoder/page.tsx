// @ts-nocheck
"use client";

import { useState, ChangeEvent } from "react";

export default function UrlEncoderPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);

  const run = () => {
    try {
      setError(null);
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (err: any) {
      setError("Invalid URL encoding.");
      setOutput("");
    }
  };

  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">URL Encoder / Decoder</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Encode or decode URLs safely for query strings and redirects.
        </p>

        <textarea
          value={input}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
          placeholder="Paste URL or text..."
          style={{
            marginTop: 12,
            width: "100%",
            minHeight: 120,
            borderRadius: 14,
            border: "1px solid #2b3140",
            background: "#0b0c10",
            padding: "10px 12px",
            fontSize: 13,
            color: "#e9eef2",
            resize: "vertical",
            outline: "none",
          }}
        />

        <div style={{ marginTop: 8, fontSize: 12 }}>
          <label style={{ marginRight: 10 }}>
            <input
              type="radio"
              checked={mode === "encode"}
              onChange={() => setMode("encode")}
            />{" "}
            Encode
          </label>
          <label>
            <input
              type="radio"
              checked={mode === "decode"}
              onChange={() => setMode("decode")}
            />{" "}
            Decode
          </label>
        </div>

        <button
          className="btn btn-primary"
          type="button"
          onClick={run}
          style={{ marginTop: 10 }}
        >
          Run
        </button>

        {error && (
          <p style={{ marginTop: 8, color: "#fca5a5", fontSize: 13 }}>{error}</p>
        )}

        <textarea
          readOnly
          value={output}
          style={{
            marginTop: 10,
            width: "100%",
            minHeight: 120,
            borderRadius: 14,
            border: "1px solid #2b3140",
            background: "#020617",
            padding: "10px 12px",
            fontSize: 13,
            color: "#e9eef2",
            resize: "vertical",
            outline: "none",
          }}
        />
      </div>
    </main>
  );
}
