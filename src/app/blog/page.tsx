// src/app/blog/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toolux Blog – Guides for PDF, Images & Tools",
  description:
    "Read simple guides on compressing PDFs, converting images, creating QR codes and more.",
};

const posts = [
  {
    slug: "compress-pdf-without-losing-quality",
    title: "How to Compress a PDF Without Losing Quality",
    description: "Shrink PDF size without making it blurry or unreadable.",
  },
  {
    slug: "convert-heic-to-jpg",
    title: "Convert HEIC to JPG on Mobile or PC",
    description:
      "Turn iPhone HEIC photos into JPG so you can upload them anywhere.",
  },
  {
    slug: "merge-pdf-on-mobile",
    title: "How to Merge PDF Files on Mobile",
    description: "Combine multiple PDFs into one file using just your browser.",
  },
  {
    slug: "best-free-image-compressor-tools-2025",
    title: "Best Free Image Compressor Tools for 2025",
    description:
      "Understand how image compression works and when to use it.",
  },
  {
    slug: "convert-image-to-pdf-online",
    title: "Convert Image to PDF Online",
    description:
      "Turn your JPG/PNG images into one simple PDF document.",
  },
  {
    slug: "reorder-pdf-pages-without-acrobat",
    title: "How to Reorder PDF Pages Without Adobe Acrobat",
    description:
      "Fix PDFs with pages in the wrong order using free tools.",
  },
  {
    slug: "make-passport-size-photos-at-home",
    title: "How to Make Passport Size Photos at Home",
    description:
      "Create passport-size photos with correct dimensions at home.",
  },
  {
    slug: "create-qr-code-for-url-or-wifi",
    title: "How to Create a QR Code for URL, Text or WiFi",
    description:
      "Generate QR codes to share links, text or WiFi passwords easily.",
  },
  {
    slug: "json-formatter-what-and-why",
    title: "JSON Formatter: What It Is and Why Devs Need It",
    description:
      "Make messy JSON readable and easier to debug.",
  },
  {
    slug: "stylish-text-generator-instagram-bio",
    title: "Stylish Text Generator for Instagram & Bio",
    description:
      "Create fancy text styles for usernames, bios and captions.",
  },
];

export default function BlogIndexPage() {
  return (
    <main className="container" style={{ marginTop: 24, marginBottom: 24 }}>
      <section className="card">
        <h1 className="section-title">Toolux Blog</h1>
        <p className="section-sub" style={{ marginTop: 6 }}>
          Simple guides for everyday PDF, image and text tasks. Learn how to do
          more with the free tools on Toolux.
        </p>

        <div
          style={{
            marginTop: 16,
            display: "grid",
            gap: 12,
          }}
        >
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="drop"
              style={{ textDecoration: "none" }}
            >
              <h2
                className="section-title"
                style={{ fontSize: 15, marginBottom: 4 }}
              >
                {post.title}
              </h2>
              <p className="section-sub" style={{ fontSize: 13 }}>
                {post.description}
              </p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
