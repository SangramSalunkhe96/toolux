import type { Metadata } from "next";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


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
        {/* ---------- FAVICON USING YOUR NEW LOGO ---------- */}
        {/* This is enough for Chrome/desktop to show the logo in the tab */}
        <link rel="icon" href="/toolux-logoa.png"  />

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

      <body className={`${jakarta.className} overflow-x-hidden`}>
        <header className="container py-4 sm:py-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            {/* Left side: logo + name + pill */}
            <div className="flex items-center gap-3 min-w-0">
        <Link href="/" className="logo-link" aria-label="Toolux home">
  <div className="logo-badge animated-logo">
    <div className="logo-ring"></div>
    <span className="logo-text">Tx</span>
  </div>
</Link>



              <div className="flex flex-col">
                <span className="font-semibold tracking-wide truncate">
                  Toolux
                </span>
                <span className="text-[11px] text-[#a6b0bb]">
                  Smart, private web utilities
                </span>
              </div>

              <span className="pill hidden md:inline-flex">
                FREE • NO UPLOADS
              </span>
            </div>

            {/* Right side: nav */}
            <nav className="flex flex-wrap gap-4 text-xs sm:text-sm text-[#a6b0bb]">
              <a href="#tools" className="nav-link">
                Tools
              </a>
              <a href="#team-tools" className="nav-link">Team tools</a>
              <a href="#why" className="nav-link">
                Why Toolux?
              </a>
              <a href="#faq" className="nav-link">
                FAQ
              </a>
              <a href="/blog" className="nav-link">
    Blog
  </a>
            </nav>
          </div>
        </header>

     <script
  dangerouslySetInnerHTML={{
    __html: `
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src='https://embed.tawk.to/69317f1341ab49197b2e6b99/1jbklgps0';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
      })();
    `,
  }}
/>


        {children}


      {/* Floating feedback button */}
  <Link href="/feedback" className="feedback-btn" aria-label="Send feedback">
  💬 Feedback
</Link>


        <footer className="container py-10 text-xs text-[#a6b0bb] flex flex-wrap items-center justify-between gap-3">
          <span>
            © {new Date().getFullYear()} Toolux — Free, privacy-first web tools.
          </span>
          <span className="text-[11px] opacity-80">
            Built with software guy • All processing happens in your browser.
          </span>
        </footer>
      </body>
    </html>
  );
}
