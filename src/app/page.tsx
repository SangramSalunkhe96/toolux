import PdfToImage from "@/components/PdfToImage";
import ImageToPdf from "@/components/ImageToPdf";

export default function HomePage() {
  return (
    <main className="container space-y-10 pb-16">
      {/* HERO */}
      <section className="hero-shell">
        <div className="hero-left">
          <div className="hero-badge-row">
            <span className="badge-solid">New</span>
            <span className="badge-soft">No login • No watermark • 100% browser</span>
          </div>

          <h1 className="hero-title">
            Convert, combine & clean PDF and images
            <span className="hero-gradient"> — privately in your browser.</span>
          </h1>

          <p className="hero-sub">
            Toolux is your all-in-one toolbox for PDFs and images. Fast,
            free and privacy-first. Start with our converters today — more
            tools are coming soon.
          </p>

          <div className="hero-actions">
            <a href="#pdf2img" className="btn btn-primary">
              PDF → Image
            </a>
            <a href="#img2pdf" className="btn">
              Image → PDF
            </a>
            <span className="hero-small-text">
              No files are uploaded to any server.
            </span>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-card">
            <p className="hero-card-title">Today&apos;s quick tools</p>
            <ul className="hero-tool-list">
              <li>
                <span className="dot" /> PDF → PNG / JPEG
              </li>
              <li>
                <span className="dot" /> Merge images → single PDF
              </li>
            </ul>
            <p className="hero-card-sub">Upcoming tools</p>
            <ul className="hero-tool-list upcoming">
              <li>
                <span className="soon-pill">Soon</span> Compress PDF
              </li>
              <li>
                <span className="soon-pill">Soon</span> Merge PDFs
              </li>
              <li>
                <span className="soon-pill">Soon</span> Image compressor
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ALL TOOLS GRID */}
      <section id="tools" className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="section-title">Toolux toolbox</h2>
            <p className="section-sub">
              Start with these two fully working tools. The layout already
              supports many more tools in future.
            </p>
          </div>
        </div>

        <div className="tool-grid">
          {/* CARD: PDF → IMAGE */}
          <article className="tool-card" id="card-pdf2img">
            <div className="tool-card-header">
              <div className="tool-icon">📄</div>
              <div>
                <h3 className="tool-title">PDF → Image (PNG / JPEG)</h3>
                <p className="tool-sub">
                  Convert each PDF page into high-quality images. Perfect for
                  presentations, thumbnails, or quick previews.
                </p>
              </div>
            </div>
            <ul className="tool-meta">
              <li>Multi-page support</li>
              <li>Choose PNG or JPEG</li>
              <li>Adjust render scale</li>
            </ul>
            <a href="#pdf2img" className="tool-cta">
              Open tool
            </a>
          </article>

          {/* CARD: IMAGE → PDF */}
          <article className="tool-card" id="card-img2pdf">
            <div className="tool-card-header">
              <div className="tool-icon">🖼️</div>
              <div>
                <h3 className="tool-title">Image → PDF (merge)</h3>
                <p className="tool-sub">
                  Combine multiple images into a clean single PDF — control
                  page size and how images fit.
                </p>
              </div>
            </div>
            <ul className="tool-meta">
              <li>A4 / US Letter</li>
              <li>Contain / cover fit</li>
              <li>Drag-and-drop support</li>
            </ul>
            <a href="#img2pdf" className="tool-cta">
              Open tool
            </a>
          </article>

          {/* CARD: COMING SOON */}
          <article className="tool-card tool-card-disabled">
            <div className="tool-card-header">
              <div className="tool-icon dimmed">🧰</div>
              <div>
                <h3 className="tool-title flex items-center gap-2">
                  More tools coming
                  <span className="soon-tag">Soon</span>
                </h3>
                <p className="tool-sub">
                  Compress PDF, Merge PDF, Split PDF, Image optimizer and
                  more — already planned in this layout.
                </p>
              </div>
            </div>
            <ul className="tool-meta">
              <li>Same design system</li>
              <li>No login, no ads (initially)</li>
              <li>Focus on speed & privacy</li>
            </ul>
            <button className="tool-cta" disabled>
              Coming soon
            </button>
          </article>
        </div>
      </section>

      {/* ACTUAL WORKING TOOLS SECTIONS */}
      <section id="pdf2img" className="card space-y-3">
        <h2 className="text-lg font-medium">PDF → Image (PNG / JPEG)</h2>
        <PdfToImage />
      </section>

      <section id="img2pdf" className="card space-y-3">
        <h2 className="text-lg font-medium">Image → PDF (Merge)</h2>
        <ImageToPdf />
      </section>

      {/* WHY TOOLUX */}
      <section id="why" className="card space-y-3">
        <h2 className="section-title">Why use Toolux instead of random sites?</h2>
        <ul className="list-disc pl-5 text-sm text-[#a6b0bb] space-y-1">
          <li>Everything runs in your browser — files never leave your device.</li>
          <li>No login, no account, no watermark on output.</li>
          <li>Clean UI focused on speed, not ads or pop-ups.</li>
          <li>Built with TypeScript & Next.js for future-proof growth.</li>
        </ul>
      </section>

      {/* FAQ */}
      <section id="faq" className="card space-y-3">
        <h2 className="section-title">FAQ</h2>
        <div className="space-y-2 text-sm text-[#a6b0bb]">
          <p>
            <strong>Q: Are my PDFs or images uploaded anywhere?</strong>
            <br />
            A: No. All conversions happen directly in your browser using
            JavaScript libraries. Nothing is sent to any server.
          </p>
          <p>
            <strong>Q: Is Toolux free?</strong>
            <br />
            A: Yes. Current tools are 100% free. In future, if we add premium
            features, core tools will remain free.
          </p>
          <p>
            <strong>Q: Can I use this on office laptop?</strong>
            <br />
            A: Yes, as long as your browser can run JavaScript. It works on
            Chrome, Edge, Brave, Firefox, etc.
          </p>
        </div>
      </section>
    </main>
  );
}
