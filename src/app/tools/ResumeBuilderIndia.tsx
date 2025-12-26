"use client";
import { useState } from "react";

export default function ResumeBuilderIndia() {
  const [name, setName] = useState("");
  const [resume, setResume] = useState("");

  const generate = () => {
    setResume(
`Name: ${name}
Location: India

Career Objective:
A dedicated individual seeking an entry‑level position to apply skills and grow professionally.

Education:
Bachelor’s Degree

Skills:
Communication, Problem Solving, Teamwork`
    );
  };

  return (
    <div className="space-y-4">
      <input
        className="tool-input"
        placeholder="Your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button className="btn-primary" onClick={generate}>
        Generate Resume
      </button>

      {resume && <textarea className="tool-output" readOnly value={resume} />}
    </div>
  );
}
