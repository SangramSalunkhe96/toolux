"use client";
import { useState } from "react";

export default function OfferLetterGenerator() {
  const [company, setCompany] = useState("");
  const [letter, setLetter] = useState("");

  const generate = () => {
    setLetter(
`Dear Candidate,

We are pleased to offer you a position at ${company}.
Your skills and experience will be a valuable asset to our team.

Welcome aboard!

Regards,
HR Team`
    );
  };

  return (
    <div className="space-y-4">
      <input
        className="tool-input"
        placeholder="Company name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <button className="btn-primary" onClick={generate}>
        Generate Offer Letter
      </button>

      {letter && <textarea className="tool-output" readOnly value={letter} />}
    </div>
  );
}
