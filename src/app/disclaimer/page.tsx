export default function Disclaimer() {
  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">Disclaimer</h1>

        <p className="section-sub" style={{ marginTop: 10 }}>
          Toolux provides tools “as is” for convenience. We do not guarantee 100% accurate
          document conversions or compatibility with every file type.
        </p>

        <h2 className="section-title" style={{ marginTop: 20 }}>
          No Professional Advice
        </h2>
        <p className="section-sub">
          Output generated on Toolux is not professional advice and should not replace
          official document tools for legal or sensitive work.
        </p>

        <h2 className="section-title" style={{ marginTop: 20 }}>
          File Responsibility
        </h2>
        <p className="section-sub">
          You are responsible for ensuring your documents do not contain malware,
          copyrighted material, or illegal content.
        </p>
      </div>
    </main>
  );
}
