// @ts-nocheck
"use client";

import { useState } from "react";

export default function MetaTagGeneratorPage() {
  const [title, setTitle] = useState("Toolux – Smart Web Tools");
  const [description, setDescription] = useState(
    "Fast, privacy-first tools for PDF, images and documents."
  );
  const [url, setUrl] = useState("https://toolux.in/");
  const [image, setImage] = useState("https://toolux.in/og-image.png");

  const html = `<title>${title}</title>
<meta name="description" content="${description}" />

<!-- Open Graph -->
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${image}" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${image}" />`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(html);
      alert("Meta tags copied!");
    } catch {
      alert("Unable to copy, please copy manually.");
    }
  };

  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">Meta Tag Generator</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Generate SEO and social meta tags for any web page in seconds.
        </p>

        <div
          style={{
            marginTop: 12,
            display: "grid",
            gap: 10,
            gridTemplateColumns: "1.2fr 1fr",
          }}
        >
          <div style={{ display: "grid", gap: 8 }}>
            <div>
              <label style={{ fontSize: 12 }}>Page title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: "100%",
                  marginTop: 4,
                  borderRadius: 10,
                  border: "1px solid #2b3140",
                  background: "#0b0c10",
                  padding: "6px 8px",
                  fontSize: 13,
                  color: "#e9eef2",
                  outline: "none",
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12 }}>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                style={{
                  width: "100%",
                  marginTop: 4,
                  borderRadius: 10,
                  border: "1px solid #2b3140",
                  background: "#0b0c10",
                  padding: "6px 8px",
                  fontSize: 13,
                  color: "#e9eef2",
                  outline: "none",
                  resize: "vertical",
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12 }}>Page URL</label>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{
                  width: "100%",
                  marginTop: 4,
                  borderRadius: 10,
                  border: "1px solid #2b3140",
                  background: "#0b0c10",
                  padding: "6px 8px",
                  fontSize: 13,
                  color: "#e9eef2",
                  outline: "none",
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12 }}>Preview image URL</label>
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                style={{
                  width: "100%",
                  marginTop: 4,
                  borderRadius: 10,
                  border: "1px solid #2b3140",
                  background: "#0b0c10",
                  padding: "6px 8px",
                  fontSize: 13,
                  color: "#e9eef2",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 500 }}>Generated meta tags</label>
            <textarea
              readOnly
              value={html}
              style={{
                width: "100%",
                marginTop: 6,
                minHeight: 220,
                borderRadius: 10,
                border: "1px solid #2b3140",
                background: "#020617",
                padding: "8px 10px",
                fontSize: 12,
                color: "#e9eef2",
                outline: "none",
                fontFamily: "monospace",
                resize: "vertical",
              }}
            />
          </div>
        </div>

        <button
          className="btn btn-primary"
          type="button"
          onClick={copy}
          style={{ marginTop: 10 }}
        >
          Copy meta tags
        </button>
      </div>
    </main>
  );
}
