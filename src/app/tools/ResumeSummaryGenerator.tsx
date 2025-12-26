"use client";
import { useState } from "react";

export default function ResumeSummaryGenerator() {
  const [role, setRole] = useState("");
  const [summary, setSummary] = useState("");

  const generate = () => {
    setSummary(
`Motivated ${role} with strong problem‑solving abilities and a passion for learning.
Seeking an opportunity to contribute skills and grow in a professional environment.`
    );
  };

  return (
    <div className="space-y-4">
      <input
        className="tool-input"
        placeholder="Your role (Fresher, Developer, Designer)"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <button className="btn-primary" onClick={generate}>
        Generate Summary
      </button>

      {summary && <textarea className="tool-output" readOnly value={summary} />}
    </div>
  );
}
