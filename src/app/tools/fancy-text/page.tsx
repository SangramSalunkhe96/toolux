// @ts-nocheck
"use client";

import { useState, ChangeEvent } from "react";

const styles = [
  (t: string) => t.toUpperCase(),
  (t: string) => t.toLowerCase(),
  (t: string) => "★ " + t + " ★",
  (t: string) => t.split("").join(" "),
  (t: string) => t.replace(/[a-z]/g, (c) => c.toUpperCase() + "͟"),
];

export default function FancyTextPage() {
  const [input, setInput] = useState("Toolux");
  const outputs = styles.map((fn) => fn(input));

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch {
      alert("Unable to copy, please copy manually.");
    }
  };

  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">Fancy Text Generator</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Create stylish text for Instagram bios, usernames and captions.
        </p>

        <input
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          placeholder="Enter your text..."
          style={{
            width: "100%",
            marginTop: 12,
            borderRadius: 12,
            border: "1px solid #2b3140",
            background: "#0b0c10",
            padding: "8px 10px",
            fontSize: 14,
            color: "#e9eef2",
            outline: "none",
          }}
        />

        <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
          {outputs.map((text, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                borderRadius: 12,
                border: "1px solid #222633",
                padding: "6px 10px",
                fontSize: 14,
              }}
            >
              <span>{text}</span>
              <button className="btn" type="button" onClick={() => copy(text)}>
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
