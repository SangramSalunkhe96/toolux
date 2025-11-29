export default function PrivacyPolicy() {
  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">Privacy Policy</h1>
        <p className="section-sub" style={{ marginTop: 10 }}>
          Last updated: {new Date().getFullYear()}
        </p>

        <p className="section-sub" style={{ marginTop: 16 }}>
          At <strong>Toolux</strong>, accessible at <strong>toolux.in</strong>, your
          privacy is extremely important to us. Toolux is designed as a
          privacy-first platform — most of our tools run directly in your browser
          and do <strong>not upload your files to any server</strong>.
        </p>

        <h2 className="section-title" style={{ marginTop: 20 }}>
          Information We Do NOT Collect
        </h2>
        <p className="section-sub">
          • We do not store your files.<br />
          • We do not read or save your documents.<br />
          • We do notRequire account creation.<br />
          • We do not track personal data.
        </p>

        <h2 className="section-title" style={{ marginTop: 20 }}>
          Local Processing
        </h2>
        <p className="section-sub">
          Most tools (PDF ↔ Image, Merge, Split, Word to PDF text-only processing and
          Image Compressor) work directly inside your browser using local JavaScript
          processing. This means your files never leave your device.
        </p>

        <h2 className="section-title" style={{ marginTop: 20 }}>
          Pro Tools
        </h2>
        <p className="section-sub">
          Future Pro tools may require temporary server-side processing for accurate
          Office conversions (Word → PDF exact layout, PPT → PDF, PDF → PPT, etc.).
          These tools will be clearly marked, and files will be deleted automatically
          after processing.
        </p>

        <h2 className="section-title" style={{ marginTop: 20 }}>
          Cookies & Analytics
        </h2>
        <p className="section-sub">
          We use Google Analytics to understand basic usage patterns. This data is
          aggregated and does not identify individual users.
        </p>

        <h2 className="section-title" style={{ marginTop: 20 }}>
          Advertising
        </h2>
        <p className="section-sub">
          Toolux uses Google AdSense. Google may use cookies to deliver personalized
          ads. You can opt out of personalized advertising any time by adjusting
          Google Ad settings.
        </p>

        <h2 className="section-title" style={{ marginTop: 20 }}>
          Contact Us
        </h2>
        <p className="section-sub">If you have questions, email us at:  
          <strong> support@toolux.in </strong></p>
      </div>
    </main>
  );
}
