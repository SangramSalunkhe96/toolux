// @ts-nocheck
"use client";

import { useState, useEffect } from "react";

type ColumnId = "wentWell" | "toImprove" | "ideas";

interface RetroItem {
  id: string;
  text: string;
  column: ColumnId;
  createdAt: number;
}

const STORAGE_KEY = "toolux-retro-board-v1";

const columnLabels: Record<ColumnId, string> = {
  wentWell: "✅ Went well",
  toImprove: "⚠️ To improve",
  ideas: "💡 Ideas / Experiments",
};

export default function SprintRetroPage() {
  const [items, setItems] = useState<RetroItem[]>([]);
  const [draftText, setDraftText] = useState("");
  const [draftColumn, setDraftColumn] = useState<ColumnId>("wentWell");

  // Load from localStorage on first render
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setItems(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem = () => {
    const text = draftText.trim();
    if (!text) return;
    const newItem: RetroItem = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
      text,
      column: draftColumn,
      createdAt: Date.now(),
    };
    setItems((prev) => [newItem, ...prev]);
    setDraftText("");
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearAll = () => {
    if (!confirm("Clear all retro notes from this device?")) return;
    setItems([]);
  };

  const shuffleAll = () => {
    // Simple Fisher–Yates shuffle
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setItems(arr);
  };

  const exportText = () => {
    if (!items.length) {
      alert("No notes to export yet.");
      return;
    }

    const lines: string[] = [];
    lines.push("# Sprint Retrospective");
    lines.push("");

    (["wentWell", "toImprove", "ideas"] as ColumnId[]).forEach((col) => {
      const colItems = items.filter((i) => i.column === col);
      if (!colItems.length) return;
      lines.push(`## ${columnLabels[col]}`);
      colItems.forEach((i) => lines.push(`- ${i.text}`));
      lines.push("");
    });

    const text = lines.join("\n");
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Retro exported to clipboard as Markdown."))
      .catch(() => alert("Could not copy. Please paste manually from the textarea."));

    // Optional: also open a small window with the text
    console.log(text);
  };

  const itemsByColumn: Record<ColumnId, RetroItem[]> = {
    wentWell: items.filter((i) => i.column === "wentWell"),
    toImprove: items.filter((i) => i.column === "toImprove"),
    ideas: items.filter((i) => i.column === "ideas"),
  };

  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <section className="card">
        <h1 className="section-title">Sprint Retrospective Board</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Collect anonymous notes about what went well, what could be improved and new
          ideas. Everything stays on this device only.
        </p>

        {/* Input row */}
        <div
          style={{
            marginTop: 14,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <textarea
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            placeholder="Write a note (no names needed, it's anonymous)…"
            rows={2}
            style={{
              width: "100%",
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
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 8,
              }}
            >
              <label style={{ fontSize: 12 }}>Column</label>
              <select
                value={draftColumn}
                onChange={(e) => setDraftColumn(e.target.value as ColumnId)}
                style={{
                  borderRadius: 999,
                  border: "1px solid #2b3140",
                  background: "#020617",
                  padding: "4px 8px",
                  fontSize: 12,
                  color: "#e9eef2",
                  outline: "none",
                }}
              >
                <option value="wentWell">Went well</option>
                <option value="toImprove">To improve</option>
                <option value="ideas">Ideas / experiments</option>
              </select>
            </div>

            <button
              type="button"
              onClick={addItem}
              disabled={!draftText.trim()}
              className="btn btn-primary"
            >
              Add note
            </button>
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            marginTop: 12,
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            fontSize: 12,
          }}
        >
          <button type="button" className="btn" onClick={shuffleAll}>
            🔀 Shuffle notes
          </button>
          <button type="button" className="btn" onClick={exportText}>
            📋 Export as Markdown
          </button>
          <button
            type="button"
            className="btn"
            onClick={clearAll}
            style={{ marginLeft: "auto" }}
          >
            🧹 Clear all (local)
          </button>
        </div>

        {/* Board */}
        <div
          style={{
            marginTop: 16,
            display: "grid",
            gap: 10,
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          }}
        >
          {(["wentWell", "toImprove", "ideas"] as ColumnId[]).map((col) => (
            <div
              key={col}
              style={{
                borderRadius: 14,
                border: "1px solid #222633",
                background:
                  col === "wentWell"
                    ? "linear-gradient(145deg,#04151b,#020617)"
                    : col === "toImprove"
                    ? "linear-gradient(145deg,#1b1214,#020617)"
                    : "linear-gradient(145deg,#14151f,#020617)",
                padding: 10,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{columnLabels[col]}</span>
                <span
                  style={{
                    fontSize: 11,
                    opacity: 0.7,
                  }}
                >
                  {itemsByColumn[col].length} notes
                </span>
              </div>

              <div style={{ display: "grid", gap: 6 }}>
                {itemsByColumn[col].length === 0 && (
                  <p
                    className="section-sub"
                    style={{ fontSize: 11, opacity: 0.6 }}
                  >
                    No notes yet. Add one above.
                  </p>
                )}

                {itemsByColumn[col].map((item) => (
                  <div
                    key={item.id}
                    style={{
                      borderRadius: 10,
                      background: "rgba(12,17,27,0.9)",
                      border: "1px solid #283042",
                      padding: "6px 8px",
                      fontSize: 12,
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <span style={{ whiteSpace: "pre-wrap" }}>{item.text}</span>
                    <button
                      type="button"
                      onClick={() => deleteItem(item.id)}
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: 11,
                      }}
                      aria-label="Delete note"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="section-sub" style={{ marginTop: 14, fontSize: 11 }}>
          Tip: open this page on a shared screen in your retro. Teammates can speak
          their notes out loud and you type them in, or let them take turns using the
          keyboard. No names, just honest feedback.
        </p>
      </section>
    </main>
  );
}
