// @ts-nocheck
"use client";

import ProInterest from "@/components/ProInterest";

export default function PptToPdfProPage() {
  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">PPT to PDF Pro</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Planned Pro tool: convert PowerPoint slides to PDF while preserving slide
          design, animations (flattened) and layout.
        </p>

        <div className="drop" style={{ marginTop: 12, textAlign: "left" }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
            What this Pro tool would do
          </div>
          <ul style={{ fontSize: 12, paddingLeft: 18, margin: 0 }}>
            <li>Export each slide as a PDF page with the same design.</li>
            <li>Keep fonts, colours and backgrounds intact.</li>
            <li>Perfect for sharing decks without editing access.</li>
          </ul>
        </div>

        <ProInterest toolId="ppt-to-pdf-pro" />
      </div>
    </main>
  );
}
