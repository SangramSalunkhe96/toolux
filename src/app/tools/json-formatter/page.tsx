// @ts-nocheck
"use client";

import { useState, ChangeEvent } from "react";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err: any) {
      setError("Invalid JSON. " + (err.message || ""));
      setOutput("");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (err: any) {
      setError("Invalid JSON. " + (err.message || ""));
      setOutput("");
    }
  };

  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">JSON Formatter</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Format and minify JSON directly in your browser. Great for debugging APIs.
        </p>

        <div
          style={{
            marginTop: 12,
            display: "grid",
            gap: 10,
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <div>
            <label style={{ fontSize: 12, fontWeight: 500 }}>Input JSON</label>
            <textarea
              value={input}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setInput(e.target.value)
              }
              style={{
                marginTop: 6,
                width: "100%",
                minHeight: 180,
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
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500 }}>Output</label>
            <textarea
              readOnly
              value={output}
              style={{
                marginTop: 6,
                width: "100%",
                minHeight: 180,
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
        </div>

        {error && (
          <p style={{ marginTop: 8, color: "#fca5a5", fontSize: 13 }}>{error}</p>
        )}

        <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className="btn btn-primary" type="button" onClick={format}>
            Format
          </button>
          <button className="btn" type="button" onClick={minify}>
            Minify
          </button>
        </div>
      </div>
    </main>
  );
}
