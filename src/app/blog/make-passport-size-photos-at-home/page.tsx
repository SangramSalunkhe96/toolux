import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Make Passport Size Photos at Home – Toolux Blog",
  description:
    "Learn how to create passport-size photos at home using an online tool with correct dimensions for India, US and more.",
};

export default function Page() {
  return (
    <main className="container" style={{ marginTop: 24, marginBottom: 24 }}>
      <article className="card">
        <h1 className="section-title">
          How to Make Passport Size Photos at Home (Free &amp; Online)
        </h1>
        <p className="section-sub" style={{ marginTop: 6 }}>
          Photo studios often charge a premium for passport photos. With a decent camera
          and the right tool, you can generate passport-size images at home for free.
        </p>

        <section style={{ marginTop: 16 }}>
          <h2 className="section-title" style={{ fontSize: 15 }}>
            What you need
          </h2>
          <ul className="section-sub" style={{ marginTop: 6, paddingLeft: 18 }}>
            <li>A smartphone camera or entry-level camera.</li>
            <li>A plain background (white or light colour).</li>
            <li>
              An online{" "}
              <a href="/tools/passport-photo-maker" className="nav-link">
                Passport Photo Maker
              </a>
              .
            </li>
          </ul>
        </section>

        <section style={{ marginTop: 16 }}>
          <h2 className="section-title" style={{ fontSize: 15 }}>
            Steps to create a passport photo
          </h2>
          <ol className="section-sub" style={{ marginTop: 6, paddingLeft: 18 }}>
            <li>Ask someone to take a straight, front-facing photo of you.</li>
            <li>Make sure your face is centred and well-lit.</li>
            <li>Upload the image to the Passport Photo Maker tool.</li>
            <li>Select the correct preset (India, US, EU etc.).</li>
            <li>Download the generated passport-size JPEG.</li>
          </ol>
        </section>

        <section style={{ marginTop: 16 }}>
          <h2 className="section-title" style={{ fontSize: 15 }}>
            Common presets and sizes
          </h2>
          <ul className="section-sub" style={{ marginTop: 6, paddingLeft: 18 }}>
            <li>India: 35 x 45 mm.</li>
            <li>USA: 2 x 2 inches.</li>
            <li>EU: usually 35 x 45 mm (check local rules).</li>
          </ul>
        </section>

        <p className="section-sub" style={{ marginTop: 18 }}>
          Once you have a digital passport photo, you can print multiple copies on
          photo paper or use it directly for online applications that accept image
          uploads.
        </p>
      </article>
    </main>
  );
}
