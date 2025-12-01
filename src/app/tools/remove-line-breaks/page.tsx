// @ts-nocheck
"use client";

import { useState, ChangeEvent } from "react";

export default function RemoveLineBreaksPage() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"space" | "nothing">("space");

  const output =
    mode === "space"
      ? input.replace(/\r?\n+/g, " ")
      : input.replace(/\r?\n+/g, "");

  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">Remove Line Breaks</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Clean unnecessary line breaks from text. Replace them with spaces or remove
          them entirely.
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
            <label style={{ fontSize: 12, fontWeight: 500 }}>Input</label>
            <textarea
              value={input}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setInput(e.target.value)
              }
              placeholder="Paste your text with line breaks..."
              style={{
                marginTop: 6,
                width: "100%",
                minHeight: 150,
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
                minHeight: 150,
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

        <div style={{ marginTop: 10, fontSize: 12 }}>
          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="radio"
              checked={mode === "space"}
              onChange={() => setMode("space")}
            />
            Replace line breaks with a space
          </label>
          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="radio"
              checked={mode === "nothing"}
              onChange={() => setMode("nothing")}
            />
            Remove line breaks completely
          </label>
        </div>
      </div>
    </main>
  );
}
