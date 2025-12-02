import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convert HEIC to JPG on Mobile or PC – Toolux Blog",
  description:
    "Stuck with HEIC images from your iPhone? Learn how to convert HEIC to JPG on Android, Windows and online, for free.",
};

export default function Page() {
  return (
    <main className="container" style={{ marginTop: 24, marginBottom: 24 }}>
      <article className="card">
        <h1 className="section-title">
          Convert HEIC to JPG on Mobile or PC (Fast &amp; Free)
        </h1>
        <p className="section-sub" style={{ marginTop: 6 }}>
          iPhones save photos as <strong>.heic</strong> to reduce file size. That&apos;s
          great for storage, but not every website or app supports it. Many upload forms
          still expect JPG.
        </p>

        <section style={{ marginTop: 16 }}>
          <h2 className="section-title" style={{ fontSize: 15 }}>
            What is HEIC?
          </h2>
          <p className="section-sub" style={{ marginTop: 4 }}>
            HEIC is Apple&apos;s high-efficiency image format. You get:
          </p>
          <ul className="section-sub" style={{ marginTop: 6, paddingLeft: 18 }}>
            <li>Smaller files compared to JPG.</li>
            <li>Good quality at the same size.</li>
          </ul>
          <p className="section-sub" style={{ marginTop: 4 }}>
            The downside: older apps, some Windows tools and online forms may not open
            HEIC images correctly.
          </p>
        </section>

        <section style={{ marginTop: 16 }}>
          <h2 className="section-title" style={{ fontSize: 15 }}>
            Change iPhone settings for future photos
          </h2>
          <p className="section-sub" style={{ marginTop: 4 }}>
            To save all new photos as JPG:
          </p>
          <ul className="section-sub" style={{ marginTop: 6, paddingLeft: 18 }}>
            <li>1. Open Settings → Camera → Formats.</li>
            <li>2. Choose “Most Compatible” instead of “High Efficiency”.</li>
          </ul>
          <p className="section-sub" style={{ marginTop: 4 }}>
            This does not change old HEIC photos. For those, you still need to convert.
          </p>
        </section>

        <section style={{ marginTop: 16 }}>
          <h2 className="section-title" style={{ fontSize: 15 }}>
            Convert HEIC to JPG in your browser
          </h2>
          <p className="section-sub" style={{ marginTop: 4 }}>
            The easiest method is using an online{" "}
            <a href="/tools/heic-to-jpg" className="nav-link">
              HEIC to JPG converter
            </a>
            :
          </p>
          <ul className="section-sub" style={{ marginTop: 6, paddingLeft: 18 }}>
            <li>1. Open the converter in your browser (mobile or desktop).</li>
            <li>2. Tap “Select HEIC” and choose one or more photos.</li>
            <li>3. Wait while they are converted to JPG.</li>
            <li>4. Download the JPG files and use them anywhere.</li>
          </ul>
        </section>

        <section style={{ marginTop: 16 }}>
          <h2 className="section-title" style={{ fontSize: 15 }}>
            Option: Use Windows photos app
          </h2>
          <p className="section-sub" style={{ marginTop: 4 }}>
            On Windows 10/11 you can install “HEIF Image Extensions” from Microsoft
            Store. Then:
          </p>
          <ul className="section-sub" style={{ marginTop: 6, paddingLeft: 18 }}>
            <li>Open the HEIC image in Photos.</li>
            <li>Use “Save as” and pick JPG.</li>
          </ul>
        </section>

        <p className="section-sub" style={{ marginTop: 18 }}>
          For everyday use, converting HEIC to JPG once is enough. After that, compress
          or resize those JPGs with tools like{" "}
          <a href="/tools/image-compressor" className="nav-link">
            Image Compressor
          </a>{" "}
          before uploading to forms or sharing on social media.
        </p>
      </article>
    </main>
  );
}
