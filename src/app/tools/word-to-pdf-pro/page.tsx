// @ts-nocheck
"use client";

import ProInterest from "@/components/ProInterest";

export default function WordToPdfProPage() {
  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">Word to PDF Pro</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Planned Pro version: converts DOC/DOCX to PDF while preserving exact layout,
          fonts, images and tables. Ideal for resumes, invoices, certificates and
          official documents.
        </p>

        {/* Tool preview */}
        <div className="drop" style={{ marginTop: 12, textAlign: "left" }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
            What this Pro tool would do
          </div>
          <ul style={{ fontSize: 12, paddingLeft: 18, margin: 0 }}>
            <li>Preserve Word layout 1:1 in the PDF.</li>
            <li>Supports images, tables, shapes, headers/footers.</li>
            <li>Uses a secure backend converter instead of browser-only logic.</li>
          </ul>
        </div>

        {/* ⭐ Interest widget */}
        <ProInterest toolId="word-to-pdf-pro" />

        <p
          className="section-sub"
          style={{ marginTop: 12, fontStyle: "italic", opacity: 0.9 }}
        >
          For now, you can use the basic{" "}
          <a href="/tools/word-to-pdf" className="nav-link">
            Word to PDF (Text Only)
          </a>{" "}
          tool for simple text documents.
        </p>
      </div>
    </main>
  );
}
