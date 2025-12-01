// @ts-nocheck
"use client";

export const metadata = {
  title: "Protect PDF (Coming Soon) – Toolux",
  description:
    "Planned Pro tool to password protect PDFs and restrict editing and copying. Coming soon to Toolux.",
};

export default function ProtectPdfPage() {
  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">Protect PDF (Coming Soon)</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          This upcoming tool will let you lock PDFs with a password and restrict
          printing or editing. It will use a secure server-side converter so your
          documents stay safe.
        </p>

        <div className="drop" style={{ marginTop: 14, textAlign: "left" }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
            Planned features
          </div>
          <ul style={{ fontSize: 12, paddingLeft: 18, margin: 0 }}>
            <li>Password-protect PDFs (open password).</li>
            <li>Restrict editing, copying and printing.</li>
            <li>Automatic secure deletion after processing.</li>
          </ul>
        </div>

        <p
          className="section-sub"
          style={{ marginTop: 14, fontStyle: "italic", opacity: 0.9 }}
        >
          We’re currently collecting interest and exploring the best, privacy-respecting
          way to implement this via a backend service.
        </p>
      </div>
    </main>
  );
}
