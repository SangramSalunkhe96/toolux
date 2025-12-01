// @ts-nocheck
"use client";

import { useState, ChangeEvent } from "react";

export default function WordCounterPage() {
  const [text, setText] = useState("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const words = text.trim()
    ? text.trim().split(/\s+/).filter(Boolean).length
    : 0;
  const chars = text.length;
  const lines = text.length ? text.split(/\r\n|\r|\n/).length : 0;

  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">Word & Character Counter</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Paste or type your text below to instantly see the number of words, characters
          and lines. All counting happens in your browser.
        </p>

        <div className="drop" style={{ marginTop: 12, textAlign: "left" }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
            Tool preview
          </div>
          <ul style={{ fontSize: 12, paddingLeft: 18, margin: 0 }}>
            <li>Helps with social media captions, essays and blog posts.</li>
            <li>Shows words, characters and line count in real time.</li>
            <li>No data is sent to any server.</li>
          </ul>
        </div>

        <div style={{ marginTop: 16 }}>
          <textarea
            value={text}
            onChange={handleChange}
            placeholder="Start typing or paste your text here..."
            style={{
              width: "100%",
              minHeight: "180px",
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
              gap: 10,
              fontSize: 12,
            }}
          >
            <span className="pill">Words: {words}</span>
            <span className="pill">Characters: {chars}</span>
            <span className="pill">Lines: {lines}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
