// src/app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toolux – Smart Web Tools (PDF, Images & More)",
  description:
    "Toolux offers fast, private, in-browser tools like PDF ↔ Image conversion. No uploads, no login, fully free.",
  metadataBase: new URL("https://toolux.in"), // change if domain different
  openGraph: {
    title: "Toolux – Smart Web Tools (PDF, Images & More)",
    description:
      "Fast, privacy-first online tools for PDFs, images and office files. Runs in your browser.",
    url: "https://toolux.in",
    siteName: "Toolux",
    type: "website",
  },
  alternates: {
    canonical: "https://toolux.in",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* ---------- GOOGLE ANALYTICS (GA4) ---------- */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-95LNSG1FC3"
          strategy="afterInteractive"
        />
        <Script
          id="ga4-init"
          strategy="afterInteractive"
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
        <Script
          id="adsense-script"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=pub-2775890182147722"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />

        {/* ---------- HEADER ---------- */}
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
            <a href="/#tools" className="nav-link">
              Tools
            </a>
            <a href="/#why" className="nav-link">
              Why Toolux?
            </a>
            <a href="/#faq" className="nav-link">
              FAQ
            </a>
          </nav>
        </header>

        {/* ---------- PAGE CONTENT ---------- */}
        {children}

        {/* ---------- FOOTER ---------- */}
       <footer className="container py-10 text-xs text-[#a6b0bb] flex flex-wrap items-center justify-between gap-3">
  <span>
    © {new Date().getFullYear()} Toolux — Free, privacy-first web tools.
  </span>

  <div className="flex gap-4 text-[11px] opacity-80">
    <a href="/privacy-policy" className="nav-link">Privacy</a>
    <a href="/terms" className="nav-link">Terms</a>
    <a href="/cookies" className="nav-link">Cookies</a>
    <a href="/disclaimer" className="nav-link">Disclaimer</a>
    <a href="/about" className="nav-link">About</a>
    <a href="/contact" className="nav-link">Contact</a>
  </div>
</footer>

      </body>
    </html>
  );
}
