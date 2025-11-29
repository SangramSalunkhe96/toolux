"use client";

import Link from "next/link";

export default function HomeClient() {

  const pdfTools = [
    {
      name: "Merge PDF",
      slug: "merge-pdf",
      description: "Combine multiple PDFs into one file.",
    },
    {
      name: "Split PDF",
      slug: "split-pdf",
      description: "Extract pages from an existing PDF.",
    },
    {
      name: "Compress PDF",
      slug: "compress-pdf",
      description: "Reduce PDF file size instantly.",
    },
    {
      name: "PDF to JPG",
      slug: "pdf-to-jpg",
      description: "Convert PDF pages to JPG images.",
    },
    {
      name: "JPG to PDF",
      slug: "jpg-to-pdf",
      description: "Convert JPG images into a clean PDF.",
    },
    {
      name: "PDF to Word",
      slug: "pdf-to-word",
      description: "Extract text & convert PDF to Word (basic).",
    },
    {
      name: "Word to PDF",
      slug: "word-to-pdf",
      description: "Turn DOCX into PDF (simple version).",
    },
  ];

  return (
    <main>
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="container py-16 text-center">
        <h1 className="text-3xl font-bold md:text-4xl tracking-tight">
          Smart PDF & Image Tools — Fast • Secure • No Uploads
        </h1>
        <p className="mt-4 text-sm md:text-base text-[#a6b0bb] max-w-2xl mx-auto">
          Toolux provides 100% privacy-focused web tools. Everything runs directly in
          your browser — your files never leave your device.
        </p>

        <a
          href="#tools"
          className="inline-block mt-6 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
        >
          Explore Tools ↓
        </a>
      </section>

      {/* ---------------- TOOL BLOCK SECTION ---------------- */}
      <section id="tools" className="container py-12">
        <h2 className="text-2xl font-bold mb-6">PDF Tools</h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {pdfTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="rounded-2xl border border-[#e1e6ec] bg-white p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition group"
            >
              <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600">
                {tool.name}
              </h3>
              <p className="mt-2 text-sm text-[#8d98a5]">{tool.description}</p>
              <span className="mt-3 inline-block text-[13px] font-medium text-blue-600 group-hover:underline">
                Open Tool →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- WHY TOOLUX SECTION ---------------- */}
      <section id="why" className="container py-16">
        <h2 className="text-2xl font-bold mb-5">Why Toolux?</h2>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="p-5 border rounded-2xl bg-white shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-2">Privacy-First</h3>
            <p className="text-sm text-[#8d98a5] leading-relaxed">
              All operations run on your device. No servers. No uploads. No tracking of files.
            </p>
          </div>
          <div className="p-5 border rounded-2xl bg-white shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-2">Fast & Lightweight</h3>
            <p className="text-sm text-[#8d98a5] leading-relaxed">
              Tools execute instantly without waiting or processing queues.
            </p>
          </div>
          <div className="p-5 border rounded-2xl bg-white shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-2">Completely Free</h3>
            <p className="text-sm text-[#8d98a5] leading-relaxed">
              No paywalls, no logins — everything is free and unlimited.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ SECTION ---------------- */}
      <section id="faq" className="container py-16">
        <h2 className="text-2xl font-bold mb-5">FAQ</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-slate-900">
              Do you upload my files to a server?
            </h3>
            <p className="text-sm text-[#8d98a5] mt-1">
              No. Everything is processed inside your browser using WebAssembly/JS libraries.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Are the tools completely free?
            </h3>
            <p className="text-sm text-[#8d98a5] mt-1">
              Yes. Every tool on Toolux is free forever.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              What browsers are supported?
            </h3>
            <p className="text-sm text-[#8d98a5] mt-1">
              Chrome, Edge, Firefox, Brave — all modern browsers work perfectly.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
