// src/app/tools/daily-standup/page.tsx
// @ts-nocheck
"use client";

import { useState } from "react";

export default function DailyStandupPage() {
  const [yesterday, setYesterday] = useState("");
  const [today, setToday] = useState("");
  const [blockers, setBlockers] = useState("");

  const summary = `# Daily stand-up

**Yesterday**
${yesterday || "-"}

**Today**
${today || "-"}

**Blockers**
${blockers || "-"}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      alert("Stand-up summary copied!");
    } catch {
      alert("Could not copy. Please copy manually.");
    }
  };

  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <section className="card">
        <h1 className="section-title">Daily Stand-up Notes</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Capture “Yesterday / Today / Blockers” quickly and export as Markdown for
          Jira, Slack or email.
        </p>

        <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500 }}>Yesterday</label>
            <textarea
              rows={3}
              value={yesterday}
              onChange={(e) => setYesterday(e.target.value)}
              placeholder="What did you complete yesterday?"
              style={{
                marginTop: 4,
                width: "100%",
                borderRadius: 10,
                border: "1px solid #2b3140",
                background: "#0b0c10",
                padding: "8px 10px",
                fontSize: 13,
                color: "#e9eef2",
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 500 }}>Today</label>
            <textarea
              rows={3}
              value={today}
              onChange={(e) => setToday(e.target.value)}
              placeholder="What will you work on today?"
              style={{
                marginTop: 4,
                width: "100%",
                borderRadius: 10,
                border: "1px solid #2b3140",
                background: "#0b0c10",
                padding: "8px 10px",
                fontSize: 13,
                color: "#e9eef2",
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 500 }}>Blockers</label>
            <textarea
              rows={3}
              value={blockers}
              onChange={(e) => setBlockers(e.target.value)}
              placeholder="Anything blocking your work?"
              style={{
                marginTop: 4,
                width: "100%",
                borderRadius: 10,
                border: "1px solid #2b3140",
                background: "#0b0c10",
                padding: "8px 10px",
                fontSize: 13,
                color: "#e9eef2",
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 500 }}>Preview (Markdown)</label>
          <textarea
            readOnly
            value={summary}
            style={{
              marginTop: 4,
              width: "100%",
              minHeight: 140,
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

        <button
          type="button"
          className="btn btn-primary"
          style={{ marginTop: 10 }}
          onClick={copy}
        >
          Copy summary
        </button>

        <p className="section-sub" style={{ marginTop: 10, fontSize: 11 }}>
          Tip: open this during your stand-up, type bullets and paste the summary into
          Slack, Teams or Jira.
        </p>
      </section>
    </main>
  );
}
