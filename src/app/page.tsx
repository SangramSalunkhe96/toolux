// @ts-nocheck
"use client";

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
