import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Reorder PDF Pages Without Adobe Acrobat – Toolux Blog",
  description:
    "Got a PDF where pages are in the wrong order? Learn how to reorder PDF pages for free using an online tool.",
};

export default function Page() {
  return (
    <main className="container" style={{ marginTop: 24, marginBottom: 24 }}>
      <article className="card">
        <h1 className="section-title">
          How to Reorder PDF Pages Without Adobe Acrobat
        </h1>
        <p className="section-sub" style={{ marginTop: 6 }}>
          Scanned documents and exported PDFs often end up with pages in the wrong
          sequence. Instead of editing the source file, you can simply reorder the pages
          in the PDF itself.
        </p>

        <section style={{ marginTop: 16 }}>
          <h2 className="section-title" style={{ fontSize: 15 }}>
            When do you need to reorder pages?
          </h2>
          <ul className="section-sub" style={{ marginTop: 6, paddingLeft: 18 }}>
            <li>You scanned pages in the wrong order.</li>
            <li>You want a cover page at the very front.</li>
            <li>You accidentally inserted some pages in the middle.</li>
          </ul>
        </section>

        <section style={{ marginTop: 16 }}>
          <h2 className="section-title" style={{ fontSize: 15 }}>
            Drag-and-drop reordering in your browser
          </h2>
          <p className="section-sub" style={{ marginTop: 4 }}>
            With a tool like{" "}
            <a href="/tools/reorder-pdf" className="nav-link">
              Reorder PDF
            </a>{" "}
            on Toolux, you can rearrange pages like this:
          </p>
          <ul className="section-sub" style={{ marginTop: 6, paddingLeft: 18 }}>
            <li>1. Open the Reorder PDF tool.</li>
            <li>2. Select your PDF file.</li>
            <li>3. Wait while page thumbnails are generated.</li>
            <li>4. Drag pages to new positions until the order looks right.</li>
            <li>5. Click “Apply” and download the updated PDF.</li>
          </ul>
        </section>

        <section style={{ marginTop: 16 }}>
          <h2 className="section-title" style={{ fontSize: 15 }}>
            Advanced: use a custom page order
          </h2>
          <p className="section-sub" style={{ marginTop: 4 }}>
            Some tools allow typing a custom order like:
          </p>
          <ul className="section-sub" style={{ marginTop: 6, paddingLeft: 18 }}>
            <li>
              <code>2,1,3,4</code> – swap the first two pages.
            </li>
            <li>
              <code>1,3,2,4</code> – move page 3 before page 2.
            </li>
            <li>
              <code>1,1,2,3</code> – duplicate the cover page.
            </li>
          </ul>
        </section>

        <p className="section-sub" style={{ marginTop: 18 }}>
          Combine reordering with other PDF tools like{" "}
          <a href="/tools/merge-pdf" className="nav-link">
            Merge PDF
          </a>{" "}
          and{" "}
          <a href="/tools/split-pdf" className="nav-link">
            Split PDF
          </a>{" "}
          to fully clean up and organise your documents.
        </p>
      </article>
    </main>
  );
}
