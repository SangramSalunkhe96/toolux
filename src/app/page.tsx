"use client";

import Link from "next/link";

type Tool = {
  id: string;
  title: string;
  description: string;
  icon: string;
  href?: string;
  meta: string[];
  live: boolean;
};

const pdfTools: Tool[] = [
  {
    id: "pdf-to-image",
    title: "PDF to Image",
    description: "Convert PDF pages into high-quality images (PNG/JPG) in your browser.",
    icon: "🖼️",
    href: "/tools/pdf-to-image", // change if your route is different
    meta: ["Browser only", "Multi-page", "No upload"],
    live: true,
  },
  {
    id: "image-to-pdf",
    title: "Image to PDF",
    description: "Turn one or multiple images into a clean, single PDF.",
    icon: "📄",
    href: "/tools/image-to-pdf", // change if your route is different
    meta: ["JPG / PNG", "Multi-image", "No watermark"],
    live: true,
  },
  {
    id: "merge-pdf",
    title: "Merge PDF",
    description: "Combine multiple PDF files into one document in the exact order you want.",
    icon: "➕",
    href: "/tools/merge-pdf",
    meta: ["Multiple files", "Fast merge"],
    live: true,
  },
  {
    id: "split-pdf",
    title: "Split PDF",
    description: "Extract selected pages or ranges into a new PDF.",
    icon: "✂️",
    href: "/tools/split-pdf",
    meta: ["Page ranges", "Lightweight"],
    live: true,
  },
  {
    id: "compress-pdf",
    title: "Compress PDF",
    description: "Reduce PDF size for email & uploads with a quick browser-side optimization.",
    icon: "🪄",
    href: "/tools/compress-pdf",
    meta: ["Smaller size", "Quick"],
    live: true,
  },
  {
    id: "pdf-to-word",
    title: "PDF to Word",
    description: "Basic text extraction from PDF into an editable Word file.",
    icon: "📝",
    href: "/tools/pdf-to-word",
    meta: ["Text only", "Best for simple PDFs"],
    live: false, // mark as coming soon if not ready
  },
  {
    id: "word-to-pdf",
    title: "Word to PDF",
    description: "Convert DOCX documents into a PDF with one click.",
    icon: "📚",
    href: "/tools/word-to-pdf",
    meta: ["DOCX", "Simple export"],
    live: false,
  },
];

export default function HomePage() {
  return (
    <main>
      {/* ---------- HERO ---------- */}
      <section className="container" style={{ marginTop: "12px" }}>
        <div className="hero-shell">
          {/* Left side */}
          <div className="hero-left">
            <div className="hero-badge-row">
              <span className="badge-solid">100% Browser-Only</span>
              <span className="badge-soft">No file uploads • No login</span>
            </div>

            <h1 className="hero-title">
              Smart{" "}
              <span className="hero-gradient">
                PDF & Image tools
              </span>{" "}
              that never leave your device.
            </h1>

            <p className="hero-sub">
              Toolux runs everything directly in your browser — fast, private and free.  
              Convert, merge, split or compress your documents without sending them to
              any server.
            </p>

            <div className="hero-actions">
              <a href="#tools" className="btn btn-primary">
                Explore tools
              </a>
              <a href="#why" className="btn">
                Why Toolux?
              </a>
              <span className="hero-small-text">
                Built for everyday creators, students & professionals.
              </span>
            </div>
          </div>

          {/* Right side preview card */}
          <div className="hero-right">
            <div className="hero-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div className="hero-card-title">Instant tools preview</div>
                  <div className="hero-card-sub">
                    A quick look at what you can do with Toolux:
                  </div>
                </div>
                <span className="badge-solid">Live</span>
              </div>

              <ul className="hero-tool-list" style={{ marginTop: "10px" }}>
                <li>
                  <span className="dot" />
                  PDF ↔ Image conversion (no quality loss)
                </li>
                <li>
                  <span className="dot" />
                  Merge & split PDFs in seconds
                </li>
                <li>
                  <span className="dot" />
                  All operations stay on your device
                </li>
              </ul>

              <div style={{ marginTop: "12px" }}>
                <div className="hero-card-title" style={{ fontSize: "12px" }}>
                  Upcoming tools
                  <span className="soon-pill" style={{ marginLeft: "8px" }}>
                    soon
                  </span>
                </div>
                <ul className="hero-tool-list upcoming">
                  <li>
                    <span className="dot" style={{ background: "#4b5563" }} />
                    PDF ↔ Word
                  </li>
                  <li>
                    <span className="dot" style={{ background: "#4b5563" }} />
                    More image utilities
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- TOOLS GRID ---------- */}
      <section id="tools" className="container" style={{ marginTop: "24px" }}>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
            <div>
              <h2 className="section-title">PDF & Image tools</h2>
              <p className="section-sub">
                Fast, privacy-first utilities for your daily work. Click any tool to start —
                no signup required.
              </p>
            </div>
            <span className="badge-soft">More tools coming soon</span>
          </div>

          <div className="tool-grid" style={{ marginTop: "18px" }}>
            {pdfTools.map((tool) => {
              const cardClass = tool.live
                ? "tool-card"
                : "tool-card tool-card-disabled";

              return (
                <div key={tool.id} className={cardClass}>
                  <div className="tool-card-header">
                    <div className={tool.live ? "tool-icon" : "tool-icon dimmed"}>
                      <span>{tool.icon}</span>
                    </div>
                    <div>
                      <div className="tool-title">{tool.title}</div>
                      <div className="tool-sub">{tool.description}</div>
                    </div>
                  </div>

                  <ul className="tool-meta">
                    {tool.meta.map((metaItem) => (
                      <li key={metaItem}>{metaItem}</li>
                    ))}
                    {!tool.live && (
                      <li className="soon-tag">Coming soon</li>
                    )}
                  </ul>

                  {tool.live && tool.href ? (
                    <Link href={tool.href} className="tool-cta">
                      Open tool →
                    </Link>
                  ) : (
                    <button className="tool-cta" disabled>
                      Coming soon
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- WHY TOOLUX ---------- */}
      <section id="why" className="container" style={{ marginTop: "24px" }}>
        <div className="card">
          <h2 className="section-title">Why people trust Toolux</h2>
          <p className="section-sub" style={{ marginTop: "6px" }}>
            A simple stack: everything runs inside your browser, with no hidden uploads
            or background syncing.
          </p>

          <div
            style={{
              display: "grid",
              gap: "16px",
              marginTop: "18px",
            }}
          >
            <div className="drop">
              <strong>Privacy-first by design</strong>
              <br />
              Files never leave your device. No servers, no storage, no account needed.
            </div>
            <div className="drop">
              <strong>Built for speed</strong>
              <br />
              Open a tool and start — no ads pop-ups in your face, no heavy UI, no lag.
            </div>
            <div className="drop">
              <strong>Made by a developer, not a corporation</strong>
              <br />
              Toolux is crafted with care, continuously improved and tuned for real usage.
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="container" style={{ marginTop: "24px", marginBottom: "24px" }}>
        <div className="card">
          <h2 className="section-title">FAQ</h2>

          <div style={{ marginTop: "12px", display: "grid", gap: "12px" }}>
            <div>
              <strong style={{ fontSize: "13px" }}>Do you upload my files anywhere?</strong>
              <p className="section-sub" style={{ marginTop: "4px" }}>
                No. Everything is done using in-browser JavaScript/WebAssembly. When you close
                the tab, the files are gone.
              </p>
            </div>

            <div>
              <strong style={{ fontSize: "13px" }}>Is Toolux completely free?</strong>
              <p className="section-sub" style={{ marginTop: "4px" }}>
                Yes. All current tools are free to use. In future, optional pro features
                might be added — but the core tools stay free.
              </p>
            </div>

            <div>
              <strong style={{ fontSize: "13px" }}>Which devices does it work on?</strong>
              <p className="section-sub" style={{ marginTop: "4px" }}>
                Any modern browser — Chrome, Edge, Firefox, Brave, on desktop or laptop.  
                Mobile support is improving as we optimise the UI.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
