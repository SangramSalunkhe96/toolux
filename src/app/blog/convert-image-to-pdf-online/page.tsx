import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convert Image to PDF Online – Toolux Blog",
  description:
    "Learn how to convert JPG or PNG images into a single PDF file online. No app, no watermark, free to use.",
};

export default function Page() {
  return (
    <main className="container" style={{ marginTop: 24, marginBottom: 24 }}>
      <article className="card">
        <h1 className="section-title">Convert Image to PDF Online (Simple &amp; Free)</h1>
        <p className="section-sub" style={{ marginTop: 6 }}>
          Photos of notes, receipts or ID cards are often easier to handle as a single
          PDF. Instead of printing and scanning, you can convert images to PDF in a few
          taps.
        </p>

        <section style={{ marginTop: 16 }}>
          <h2 className="section-title" style={{ fontSize: 15 }}>
            Why convert images to PDF?
          </h2>
          <ul className="section-sub" style={{ marginTop: 6, paddingLeft: 18 }}>
            <li>PDFs are accepted more often on forms and portals.</li>
            <li>Multiple photos can be combined into one document.</li>
            <li>It&apos;s easier to print or share a single PDF than many images.</li>
          </ul>
        </section>

        <section style={{ marginTop: 16 }}>
          <h2 className="section-title" style={{ fontSize: 15 }}>
            Convert JPG/PNG to PDF in your browser
          </h2>
          <p className="section-sub" style={{ marginTop: 4 }}>
            With a browser tool like{" "}
            <a href="/tools/image-to-pdf" className="nav-link">
              Image to PDF
            </a>{" "}
            on Toolux, the process is:
          </p>
          <ul className="section-sub" style={{ marginTop: 6, paddingLeft: 18 }}>
            <li>1. Open the Image to PDF tool.</li>
            <li>2. Click “Select images” and choose one or more JPG/PNG files.</li>
            <li>3. Arrange them in the desired order if needed.</li>
            <li>4. Click “Convert to PDF”.</li>
            <li>5. Download the generated PDF document.</li>
          </ul>
          <p className="section-sub" style={{ marginTop: 4 }}>
            Tools that run in-browser keep your images local, which is important for
            sensitive files like IDs and certificates.
          </p>
        </section>

        <section style={{ marginTop: 16 }}>
          <h2 className="section-title" style={{ fontSize: 15 }}>
            Tips for better results
          </h2>
          <ul className="section-sub" style={{ marginTop: 6, paddingLeft: 18 }}>
            <li>Crop images to remove unnecessary background before converting.</li>
            <li>Use good lighting so text is readable and not too dark.</li>
            <li>Rename the final PDF to something descriptive (e.g. “Receipts-2025.pdf”).</li>
          </ul>
        </section>

        <p className="section-sub" style={{ marginTop: 18 }}>
          Once you get used to converting images to PDF, you won&apos;t miss the old
          “print and scan” workflow. It&apos;s faster, cheaper and much more convenient.
        </p>
      </article>
    </main>
  );
}
