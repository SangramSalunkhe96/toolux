// @ts-nocheck
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { tools } from "@/config/tools";

const groupByCategory = (items) => {
  const map = new Map();
  for (const tool of items) {
    if (!map.has(tool.category)) map.set(tool.category, []);
    map.get(tool.category).push(tool);
  }
  return Array.from(map.entries());
};

export default function HomePage() {
  const grouped = groupByCategory(tools);

  // ---------- REACTION GAME STATE ----------
  const [gameState, setGameState] = useState<"idle" | "waiting" | "ready" | "too-early">(
    "idle"
  );
  const [message, setMessage] = useState(
    "Click “Start test” and then wait until the box turns green. Then tap as fast as you can."
  );
  const [lastTime, setLastTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const startTest = () => {
    // reset any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setGameState("waiting");
    setMessage("Wait for green... don’t click yet 👀");

    // random delay 1–3 seconds
    const delay = 1000 + Math.random() * 2000;
    timeoutRef.current = setTimeout(() => {
      startTimeRef.current = Date.now();
      setGameState("ready");
      setMessage("Go! Tap the box NOW 💨");
      timeoutRef.current = null;
    }, delay);
  };

  const handleReactionClick = () => {
    if (gameState === "waiting") {
      // clicked too early
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setGameState("too-early");
      setMessage("Too early! Wait for green next time 😅");
      return;
    }

    if (gameState === "ready" && startTimeRef.current) {
      const now = Date.now();
      const diff = now - startTimeRef.current; // ms

      setLastTime(diff);
      setAttempts((prev) => prev + 1);
      setGameState("idle");

      if (bestTime === null || diff < bestTime) {
        setBestTime(diff);
        setMessage(`🔥 New best: ${diff} ms! Hit “Start test” to try again.`);
      } else {
        setMessage(`Your time: ${diff} ms. Try again and beat your best!`);
      }

      startTimeRef.current = null;
      return;
    }

    // if idle / too-early and user clicks box, just ignore
  };

  return (
    <main>
      {/* HERO */}
      <section className="container" style={{ marginTop: 12 }}>
        <div className="hero-shell">
          <div className="hero-left">
            <div className="hero-badge-row">
              <span className="badge-solid">100% Browser Tools</span>
              <span className="badge-soft">Pro server tools coming soon</span>
            </div>

            <h1 className="hero-title">
              Smart{" "}
              <span className="hero-gradient">PDF, Office & Image tools</span>{" "}
              that respect your privacy.
            </h1>

            <p className="hero-sub">
              Toolux runs core tools directly in your browser — no file uploads. When you
              need pixel-perfect Office conversions, Pro tools will use secure
              server-side conversion.
            </p>

            <div className="hero-actions">
              <a href="#tools" className="btn btn-primary">
                Explore tools
              </a>
              <a href="#why" className="btn">
                Why Toolux?
              </a>
              <span className="hero-small-text">
                Built for students, creators and professionals.
              </span>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div className="hero-card-title">Tool Preview</div>
                  <div className="hero-card-sub">
                    A quick look at what you can do with Toolux:
                  </div>
                </div>
                <span className="badge-solid">Live now</span>
              </div>

              <ul className="hero-tool-list" style={{ marginTop: 10 }}>
                <li>
                  <span className="dot" />
                  Convert PDF ↔ Image entirely on your device.
                </li>
                <li>
                  <span className="dot" />
                  Merge / split PDFs without sending files to servers.
                </li>
                <li>
                  <span className="dot" />
                  Extract text from PDFs and Word docs for quick editing.
                </li>
              </ul>

              <div style={{ marginTop: 12 }}>
                <div className="hero-card-title" style={{ fontSize: 12 }}>
                  Upcoming Pro tools
                  <span className="soon-pill" style={{ marginLeft: 8 }}>
                    soon
                  </span>
                </div>
                <ul className="hero-tool-list upcoming">
                  <li>
                    <span className="dot" style={{ background: "#4b5563" }} />
                    Word → PDF with exact layout
                  </li>
                  <li>
                    <span className="dot" style={{ background: "#4b5563" }} />
                    PPT ↔ PDF with slide design
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS GRID */}
      <section id="tools" className="container" style={{ marginTop: 24 }}>
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2 className="section-title">All Tools</h2>
              <p className="section-sub">
                Browse PDF, Office and Image tools. Core tools run in-browser; Pro tools
                will use secure server conversion based on user interest.
              </p>
            </div>
            <span className="badge-soft">
              {tools.length} tools • more coming soon
            </span>
          </div>

          {grouped.map(([category, catTools]) => (
            <div key={category} style={{ marginTop: 18 }}>
              <h3
                className="section-title"
                style={{ fontSize: 15, marginBottom: 8 }}
              >
                {category}
              </h3>
              <div className="tool-grid">
                {catTools.map((tool) => {
                  const cardClass = tool.pro
                    ? "tool-card tool-card-disabled"
                    : "tool-card";

                  return (
                    <div key={tool.id} className={cardClass}>
                      <div className="tool-card-header">
                        <div className={tool.pro ? "tool-icon dimmed" : "tool-icon"}>
                          <span>{tool.icon}</span>
                        </div>
                        <div>
                          <div className="tool-title">
                            {tool.title}{" "}
                            {tool.pro && (
                              <span
                                style={{
                                  fontSize: 10,
                                  marginLeft: 6,
                                  padding: "2px 6px",
                                  borderRadius: 999,
                                  border: "1px solid #4b5563",
                                  textTransform: "uppercase",
                                  letterSpacing: 0.03,
                                }}
                              >
                                Pro idea
                              </span>
                            )}
                          </div>
                          <div className="tool-sub">{tool.description}</div>
                        </div>
                      </div>

                      <ul className="tool-meta">
                        {tool.meta.map((m) => (
                          <li key={m}>{m}</li>
                        ))}
                        {tool.pro && <li className="soon-tag">Collecting interest</li>}
                      </ul>

                      {tool.pro ? (
                        <Link href={tool.slug} className="tool-cta">
                          Learn more &amp; I’m interested →
                        </Link>
                      ) : (
                        <Link href={tool.slug} className="tool-cta">
                          Open tool →
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MINI GAME – REACTION TEST */}
      <section className="container" style={{ marginTop: 24 }}>
        <div className="card">
          <h2 className="section-title">Take a quick break 🎮</h2>
          <p className="section-sub" style={{ marginTop: 6 }}>
            Test your reaction speed between conversions. No sign-in, just a tiny fun
            widget.
          </p>

          <div className="drop" style={{ marginTop: 14, textAlign: "left" }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
              Toolux Reaction Test
            </div>
            <p
              className="section-sub"
              style={{ fontSize: 12, marginBottom: 10, whiteSpace: "pre-line" }}
            >
              {message}
            </p>

            <div
              onClick={handleReactionClick}
              style={{
                marginTop: 8,
                borderRadius: 14,
                padding: "18px 12px",
                textAlign: "center",
                cursor: gameState === "waiting" || gameState === "ready" ? "pointer" : "default",
                border: "1px solid #2b3140",
                background:
                  gameState === "ready"
                    ? "linear-gradient(135deg, #22c55e, #16a34a)"
                    : gameState === "waiting"
                    ? "linear-gradient(135deg, #1e293b, #020617)"
                    : "#0b0c10",
                transition: "background 0.15s ease-out, transform 0.1s ease-out",
                transform: gameState === "ready" ? "scale(1.01)" : "scale(1)",
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: gameState === "ready" ? "#022c22" : "#e5e7eb",
                }}
              >
                {gameState === "ready"
                  ? "Tap NOW!"
                  : gameState === "waiting"
                  ? "Wait for green..."
                  : "Click “Start test” below"}
              </span>
            </div>

            <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={startTest}
                style={{ fontSize: 12 }}
              >
                Start test
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setGameState("idle");
                  setMessage(
                    "Click “Start test” and then wait until the box turns green. Then tap as fast as you can."
                  );
                  setLastTime(null);
                  setBestTime(null);
                  setAttempts(0);
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                  }
                }}
                style={{ fontSize: 12 }}
              >
                Reset stats
              </button>
            </div>

            <p className="section-sub" style={{ fontSize: 11, marginTop: 8 }}>
              Attempts: <strong>{attempts}</strong>{" "}
              {lastTime !== null && (
                <>
                  • Last: <strong>{lastTime} ms</strong>
                </>
              )}{" "}
              {bestTime !== null && (
                <>
                  • Best: <strong>{bestTime} ms</strong>
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* WHY TOOLUX */}
      <section id="why" className="container" style={{ marginTop: 24 }}>
        <div className="card">
          <h2 className="section-title">Why people trust Toolux</h2>
          <p className="section-sub" style={{ marginTop: 6 }}>
            A mix of offline browser tools + optional Pro conversions when you need
            pixel-perfect office documents.
          </p>

          <div style={{ display: "grid", gap: 16, marginTop: 18 }}>
            <div className="drop">
              <strong>Privacy-first by default</strong>
              <br />
              Core tools never upload your files. Everything happens locally in the
              browser.
            </div>
            <div className="drop">
              <strong>Fast &amp; simple</strong>
              <br />
              No heavy UI, no account, just quick tools that open and work.
            </div>
            <div className="drop">
              <strong>Pro when you need it</strong>
              <br />
              For perfect Office conversions, Pro tools will use a secure backend
              pipeline — and we’ll build the most requested ones first.
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="container"
        style={{ marginTop: 24, marginBottom: 24 }}
      >
        <div className="card">
          <h2 className="section-title">FAQ</h2>

          <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
            <div>
              <strong style={{ fontSize: 13 }}>
                Do you upload my files to a server?
              </strong>
              <p className="section-sub" style={{ marginTop: 4 }}>
                Core tools (PDF ↔ Image, Merge, Split, basic Word tools, Image
                Compressor) run fully in-browser. Pro tools will clearly indicate when a
                secure server is used for conversion.
              </p>
            </div>

            <div>
              <strong style={{ fontSize: 13 }}>Are the tools free?</strong>
              <p className="section-sub" style={{ marginTop: 4 }}>
                Yes, all current tools are free. In future, some Pro features may have
                limits or require sign-in, depending on demand.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
