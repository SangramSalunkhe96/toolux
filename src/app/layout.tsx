import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toolux – Smart Web Tools (PDF, Images & More)",
  description:
    "Toolux offers fast, private, in-browser tools like PDF ↔ Image conversion. No uploads, no login, fully free.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ---------- GOOGLE ANALYTICS (GA4) ---------- */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-95LNSG1FC3"
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-95LNSG1FC3');
            `,
          }}
        />

        {/* ---------- GOOGLE ADSENSE (AUTO ADS) ---------- */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=pub-2775890182147722"
          crossOrigin="anonymous"
        ></script>
      </head>

      <body>
        <header className="container flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            {/* Simple original logo – not copied from anywhere */}
            <div className="logo-badge">
              <span className="logo-dot" />
              <span className="logo-text">Tx</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold tracking-wide">Toolux</span>
              <span className="text-[11px] text-[#a6b0bb]">
                Smart, private web utilities
              </span>
            </div>
            <span className="pill">FREE • NO UPLOADS</span>
          </div>

          <nav className="flex items-center gap-5 text-sm text-[#a6b0bb]">
            <a href="#tools" className="nav-link">Tools</a>
            <a href="#why" className="nav-link">Why Toolux?</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </nav>
        </header>

        {children}

        <footer className="container py-10 text-xs text-[#a6b0bb] flex flex-wrap items-center justify-between gap-3">
          <span>
            © {new Date().getFullYear()} Toolux — Free, privacy-first web tools.
          </span>
          <span className="text-[11px] opacity-80">
            Built with Next.js • All processing happens in your browser.
          </span>
        </footer>
      </body>
    </html>
  );
}
