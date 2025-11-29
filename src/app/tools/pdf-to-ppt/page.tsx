// @ts-nocheck
"use client";

import ProInterest from "@/components/ProInterest";

export default function PdfToPptProPage() {
  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">PDF to PPT Pro</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Planned Pro tool: turn PDFs into editable PPTX slides. Useful when you receive
          a PDF deck and want to edit it in PowerPoint again.
        </p>

        <div className="drop" style={{ marginTop: 12, textAlign: "left" }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
            What this Pro tool would do
          </div>
          <ul style={{ fontSize: 12, paddingLeft: 18, margin: 0 }}>
            <li>Try to reconstruct slides from PDF pages.</li>
            <li>Keep text as editable as possible.</li>
            <li>Use a server-based converter for best accuracy.</li>
          </ul>
        </div>

        <ProInterest toolId="pdf-to-ppt-pro" />
      </div>
    </main>
  );
}
