// @ts-nocheck
"use client";

import { useState, ChangeEvent } from "react";

export default function CaseConverterPage() {
  const [text, setText] = useState("");

  const transform = (mode: "upper" | "lower" | "sentence" | "title") => {
    let t = text;
    if (mode === "upper") t = t.toUpperCase();
    if (mode === "lower") t = t.toLowerCase();
    if (mode === "sentence") {
      t = t
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    }
    if (mode === "title") {
      t = t
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase());
    }
    setText(t);
  };

  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">Case Converter</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Convert your text to UPPERCASE, lowercase, Sentence case or Title Case.
        </p>

        <textarea
          value={text}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          style={{
            marginTop: 12,
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

        <div
          style={{
            marginTop: 10,
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <button className="btn" type="button" onClick={() => transform("upper")}>
            UPPERCASE
          </button>
          <button className="btn" type="button" onClick={() => transform("lower")}>
            lowercase
          </button>
          <button className="btn" type="button" onClick={() => transform("sentence")}>
            Sentence case
          </button>
          <button className="btn" type="button" onClick={() => transform("title")}>
            Title Case
          </button>
        </div>
      </div>
    </main>
  );
}
