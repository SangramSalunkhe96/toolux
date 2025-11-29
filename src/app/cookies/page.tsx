export default function Cookies() {
  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">Cookie Policy</h1>

        <p className="section-sub" style={{ marginTop: 10 }}>
          Toolux uses minimal cookies. Most tools run locally and do not require cookies.
        </p>

        <h2 className="section-title" style={{ marginTop: 20 }}>
          Essential Cookies
        </h2>
        <p className="section-sub">
          Used only for preventing fraud and ensuring basic functionality.
        </p>

        <h2 className="section-title" style={{ marginTop: 20 }}>
          Analytics Cookies
        </h2>
        <p className="section-sub">
          Google Analytics may use cookies to measure traffic. No personal data is collected.
        </p>

        <h2 className="section-title" style={{ marginTop: 20 }}>
          Advertising Cookies
        </h2>
        <p className="section-sub">
          Google AdSense may use cookies to offer personalized ads.
        </p>
      </div>
    </main>
  );
}
