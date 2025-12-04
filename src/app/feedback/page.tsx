// src/app/feedback/page.tsx
"use client";

import { useState } from "react";

export default function FeedbackPage() {
  const [tool, setTool] = useState("General / Website");
  const [type, setType] = useState("Bug");
  const [severity, setSeverity] = useState("Medium");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const tools = [
    "General / Website",
    "PDF Tools",
    "Image Tools",
    "Text Tools",
    "Developer Tools",
    "Team Tools (Retro / Standup)",
    "Other",
  ];

  const types = ["Bug", "Feature Request", "UI Issue", "Performance Issue", "Other"];
  const severities = ["Low", "Medium", "High", "Critical"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      alert("Please enter your feedback or bug details.");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tool,
          type,
          severity,
          email,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to send feedback.");
      }

      setStatus("success");
      setMessage("");
      // keep other fields if they want to send multiple
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <main className="container" style={{ marginTop: 28, marginBottom: 28 }}>
      <section className="card" style={{ maxWidth: 680, margin: "0 auto" }}>
        <h1 className="section-title">Send Feedback / Report a Bug</h1>
        <p className="section-sub" style={{ marginTop: 6 }}>
          Found a bug or have an idea? This form sends your message directly to{" "}
          <strong>snstudio@toolux.in</strong>.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ marginTop: 20, display: "grid", gap: 16 }}
        >
          {/* Tool */}
          <div>
            <label className="form-label">Which tool or area?</label>
            <select
              className="form-input"
              value={tool}
              onChange={(e) => setTool(e.target.value)}
            >
              {tools.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Type + severity */}
          <div
            style={{
              display: "grid",
              gap: 16,
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            }}
          >
            <div>
              <label className="form-label">Issue type</label>
              <select
                className="form-input"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {types.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Severity</label>
              <select
                className="form-input"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
              >
                {severities.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Email optional */}
          <div>
            <label className="form-label">
              Your email (optional, only if you want a reply)
            </label>
            <input
              className="form-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Message */}
          <div>
            <label className="form-label">Describe the issue / feedback</label>
            <textarea
              className="form-input"
              style={{ height: 130, resize: "vertical" }}
              placeholder="Steps to reproduce, what you expected, browser/device, etc."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* Buttons + status */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Send feedback"}
            </button>

            {status === "success" && (
              <span style={{ fontSize: 12, color: "#4ade80" }}>
                ✅ Feedback sent successfully. Thank you!
              </span>
            )}

            {status === "error" && (
              <span style={{ fontSize: 12, color: "#f97373" }}>
                ❌ {error || "Failed to send. Please try again."}
              </span>
            )}
          </div>

          <p className="section-sub" style={{ fontSize: 11, opacity: 0.7 }}>
            We only use this information to debug issues and improve Toolux. No accounts,
            no tracking.
          </p>
        </form>
      </section>
    </main>
  );
}
