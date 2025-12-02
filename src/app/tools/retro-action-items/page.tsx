// src/app/tools/retro-action-items/page.tsx
// @ts-nocheck
"use client";

import { useState, useEffect } from "react";

interface ActionItem {
  id: string;
  text: string;
  owner: string;
  status: "open" | "done";
}

const STORAGE_KEY = "toolux-retro-actions-v1";

export default function RetroActionItemsPage() {
  const [items, setItems] = useState<ActionItem[]>([]);
  const [text, setText] = useState("");
  const [owner, setOwner] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setItems(parsed);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = () => {
    const t = text.trim();
    if (!t) return;
    const newItem: ActionItem = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
      text: t,
      owner: owner.trim(),
      status: "open",
    };
    setItems((prev) => [newItem, ...prev]);
    setText("");
  };

  const toggleStatus = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: i.status === "open" ? "done" : "open" } : i))
    );
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const exportMarkdown = () => {
    if (!items.length) {
      alert("No action items to export.");
      return;
    }
    const lines: string[] = [];
    lines.push("# Retro action items", "");
    items.forEach((i) => {
      const status = i.status === "done" ? "[x]" : "[ ]";
      const owner = i.owner ? ` — _${i.owner}_` : "";
      lines.push(`- ${status} ${i.text}${owner}`);
    });
    const text = lines.join("\n");
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Action items copied as Markdown."))
      .catch(() => alert("Could not copy, please paste manually."));
  };

  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <section className="card">
        <h1 className="section-title">Retro Action Item Tracker</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Turn retro discussions into clear action items. Track them locally and export
          to Jira, Notion or Confluence.
        </p>

        {/* Input row */}
        <div
          style={{
            marginTop: 14,
            display: "grid",
            gap: 8,
            gridTemplateColumns: "minmax(0,2fr) minmax(0,1fr) auto",
          }}
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write an action item…"
            style={{
              borderRadius: 10,
              border: "1px solid #2b3140",
              background: "#0b0c10",
              padding: "6px 8px",
              fontSize: 13,
              color: "#e9eef2",
              outline: "none",
            }}
          />
          <input
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="Owner (optional)"
            style={{
              borderRadius: 10,
              border: "1px solid #2b3140",
              background: "#0b0c10",
              padding: "6px 8px",
              fontSize: 13,
              color: "#e9eef2",
              outline: "none",
            }}
          />
          <button
            type="button"
            onClick={addItem}
            disabled={!text.trim()}
            className="btn btn-primary"
          >
            Add
          </button>
        </div>

        {/* Actions */}
        <div style={{ marginTop: 10, display: "flex", gap: 8, fontSize: 12 }}>
          <button type="button" className="btn" onClick={exportMarkdown}>
            📋 Export as Markdown
          </button>
        </div>

        {/* List */}
        <div style={{ marginTop: 14, display: "grid", gap: 8 }}>
          {items.length === 0 && (
            <p className="section-sub" style={{ fontSize: 12, opacity: 0.7 }}>
              No action items yet. Add some from your latest retro.
            </p>
          )}

          {items.map((item) => (
            <div
              key={item.id}
              style={{
                borderRadius: 10,
                border: "1px solid #273041",
                background:
                  item.status === "done"
                    ? "linear-gradient(135deg,#052817,#020617)"
                    : "linear-gradient(135deg,#111827,#020617)",
                padding: "6px 8px",
                display: "flex",
                justifyContent: "space-between",
                gap: 8,
                alignItems: "center",
                fontSize: 13,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span
                  style={{
                    textDecoration: item.status === "done" ? "line-through" : "none",
                    opacity: item.status === "done" ? 0.75 : 1,
                  }}
                >
                  {item.text}
                </span>
                {item.owner && (
                  <span style={{ fontSize: 11, opacity: 0.8 }}>Owner: {item.owner}</span>
                )}
              </div>

              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <button
                  type="button"
                  onClick={() => toggleStatus(item.id)}
                  className="btn"
                  style={{ fontSize: 11, padding: "3px 8px" }}
                >
                  {item.status === "open" ? "Mark done" : "Reopen"}
                </button>
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#6b7280",
                    cursor: "pointer",
                    fontSize: 11,
                  }}
                  aria-label="Delete"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="section-sub" style={{ marginTop: 10, fontSize: 11 }}>
          Tip: pair this with the{" "}
          <a href="/tools/sprint-retro" className="nav-link">
            Sprint Retro Board
          </a>{" "}
          to collect feedback and then turn it into clear actions.
        </p>
      </section>
    </main>
  );
}
