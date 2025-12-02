import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Create a QR Code for URL, Text or WiFi – Toolux Blog",
  description:
    "Generate QR codes for websites, plain text or WiFi passwords using a simple online QR code generator.",
};

export default function Page() {
  return (
    <main className="container" style={{ marginTop: 24, marginBottom: 24 }}>
      <article className="card">
        <h1 className="section-title">
          How to Create a QR Code for URL, Text or WiFi
        </h1>
        <p className="section-sub" style={{ marginTop: 6 }}>
          QR codes make it easy to share links, messages and WiFi details without
          typing. You&apos;ve seen them on menus, posters, business cards and even
          login screens.
        </p>

        <section style={{ marginTop: 16 }}>
          <h2 className="section-title" style={{ fontSize: 15 }}>
            What can a QR code store?
          </h2>
          <ul className="section-sub" style={{ marginTop: 6, paddingLeft: 18 }}>
            <li>Website URLs.</li>
            <li>Plain text (e.g. a short message).</li>
            <li>Phone numbers or SMS templates.</li>
            <li>WiFi network name + password.</li>
          </ul>
        </section>

        <section style={{ marginTop: 16 }}>
          <h2 className="section-title" style={{ fontSize: 15 }}>
            Create a QR code in your browser
          </h2>
          <p className="section-sub" style={{ marginTop: 4 }}>
            With an online{" "}
            <a href="/tools/qr-code-generator" className="nav-link">
              QR Code Generator
            </a>
            , the steps are:
          </p>
          <ol className="section-sub" style={{ marginTop: 6, paddingLeft: 18 }}>
            <li>Select the type of QR you want – URL, text or WiFi.</li>
            <li>Enter your link or message, or WiFi SSID and password.</li>
            <li>Click “Generate”.</li>
            <li>Download the PNG image of the QR code.</li>
          </ol>
        </section>

        <section style={{ marginTop: 16 }}>
          <h2 className="section-title" style={{ fontSize: 15 }}>
            Tips for reliable scanning
          </h2>
          <ul className="section-sub" style={{ marginTop: 6, paddingLeft: 18 }}>
            <li>Print at a reasonable size; too small is hard to scan.</li>
            <li>Keep good contrast between the QR and background.</li>
            <li>Test with multiple phones before sharing widely.</li>
          </ul>
        </section>

        <p className="section-sub" style={{ marginTop: 18 }}>
          Once you have your QR code, you can place it on posters, slides, business
          cards or digital images. People can scan it in seconds without typing long
          URLs or passwords.
        </p>
      </article>
    </main>
  );
}
