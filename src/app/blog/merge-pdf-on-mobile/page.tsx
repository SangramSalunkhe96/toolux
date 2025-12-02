import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Merge PDF Files on Mobile – Toolux Blog",
  description:
    "Need to combine multiple PDFs on your phone? Learn how to merge PDFs online using just your browser, no app needed.",
};

export default function Page() {
  return (
    <main className="container" style={{ marginTop: 24, marginBottom: 24 }}>
      <article className="card">
        <h1 className="section-title">
          How to Merge PDF Files on Mobile (No App Needed)
        </h1>
        <p className="section-sub" style={{ marginTop: 6 }}>
          Merging PDFs is one of the most common tasks: combining notes, bills, tickets,
          assignments or reports into a single file. You can do it directly on your
          phone using only the browser.
        </p>

        <section style={{ marginTop: 16 }}>
          <h2 className="section-title" style={{ fontSize: 15 }}>
            Why merge PDFs?
          </h2>
          <ul className="section-sub" style={{ marginTop: 6, paddingLeft: 18 }}>
            <li>Send all pages in one attachment instead of 10 files.</li>
            <li>Submit a single document to portals that accept only one upload.</li>
            <li>Keep things organised – for example, all invoices in a single PDF.</li>
          </ul>
        </section>

        <section style={{ marginTop: 16 }}>
          <h2 className="section-title" style={{ fontSize: 15 }}>
            Merge PDFs in your browser
          </h2>
          <p className="section-sub" style={{ marginTop: 4 }}>
            With a browser tool like{" "}
            <a href="/tools/merge-pdf" className="nav-link">
              Merge PDF
            </a>{" "}
            on Toolux, you can merge on mobile in a few steps:
          </p>
          <ul className="section-sub" style={{ marginTop: 6, paddingLeft: 18 }}>
            <li>1. Open the Merge PDF tool in Chrome or any browser.</li>
            <li>2. Tap “Select files” and pick 2 or more PDFs from your phone.</li>
            <li>3. Arrange them in the order you want.</li>
            <li>4. Tap “Merge” and wait a moment.</li>
            <li>5. Download the combined PDF back to your device.</li>
          </ul>
          <p className="section-sub" style={{ marginTop: 4 }}>
            If the tool works fully in-browser, your files never leave your device, which
            is ideal for private documents.
          </p>
        </section>

        <section style={{ marginTop: 16 }}>
          <h2 className="section-title" style={{ fontSize: 15 }}>
            Tips for mobile merging
          </h2>
          <ul className="section-sub" style={{ marginTop: 6, paddingLeft: 18 }}>
            <li>Use Wi‑Fi when working with large files.</li>
            <li>Rename the merged PDF to something clear like “Project-Report.pdf”.</li>
            <li>
              If needed, combine merging with{" "}
              <a href="/tools/split-pdf" className="nav-link">
                Split PDF
              </a>{" "}
              or{" "}
              <a href="/tools/reorder-pdf" className="nav-link">
                Reorder PDF
              </a>{" "}
              tools to fine-tune your pages.
            </li>
          </ul>
        </section>

        <p className="section-sub" style={{ marginTop: 18 }}>
          Once you know this workflow, you never have to send messy batches of files
          again. Just one clean merged PDF from your phone does the job.
        </p>
      </article>
    </main>
  );
}
