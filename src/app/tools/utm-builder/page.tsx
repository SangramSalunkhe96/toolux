// @ts-nocheck
"use client";

import { useState } from "react";

export default function UtmBuilderPage() {
  const [baseUrl, setBaseUrl] = useState("https://toolux.in/");
  const [source, setSource] = useState("newsletter");
  const [medium, setMedium] = useState("email");
  const [campaign, setCampaign] = useState("launch");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");

  const buildUrl = () => {
    if (!baseUrl.trim()) return "";
    const url = new URL(baseUrl.trim());
    url.searchParams.set("utm_source", source);
    url.searchParams.set("utm_medium", medium);
    url.searchParams.set("utm_campaign", campaign);
    if (term) url.searchParams.set("utm_term", term);
    if (content) url.searchParams.set("utm_content", content);
    return url.toString();
  };

  const result = (() => {
    try {
      return buildUrl();
    } catch {
      return "";
    }
  })();

  const copy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      alert("UTM link copied!");
    } catch {
      alert("Unable to copy, please copy manually.");
    }
  };

  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">UTM Link Builder</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Create Google Analytics friendly tracking links for campaigns.
        </p>

        <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
          <div>
            <label style={{ fontSize: 12 }}>Base URL</label>
            <input
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://example.com/page"
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

          <div
            style={{
              display: "grid",
              gap: 8,
              gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
            }}
          >
            <div>
              <label style={{ fontSize: 12 }}>utm_source</label>
              <input
                value={source}
                onChange={(e) => setSource(e.target.value)}
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
              <label style={{ fontSize: 12 }}>utm_medium</label>
              <input
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
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
              <label style={{ fontSize: 12 }}>utm_campaign</label>
              <input
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
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
              <label style={{ fontSize: 12 }}>utm_term (optional)</label>
              <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
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
              <label style={{ fontSize: 12 }}>utm_content (optional)</label>
              <input
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
            <label style={{ fontSize: 12, fontWeight: 500 }}>Resulting URL</label>
            <textarea
              readOnly
              value={result}
              style={{
                width: "100%",
                marginTop: 6,
                minHeight: 80,
                borderRadius: 10,
                border: "1px solid #2b3140",
                background: "#020617",
                padding: "8px 10px",
                fontSize: 12,
                color: "#e9eef2",
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>
        </div>

        <button
          className="btn btn-primary"
          type="button"
          onClick={copy}
          disabled={!result}
          style={{ marginTop: 10 }}
        >
          Copy link
        </button>
      </div>
    </main>
  );
}
