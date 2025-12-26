"use client";
import { useState } from "react";

export default function ColdEmailGenerator() {
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");

  const generate = () => {
    setEmail(
`Hello ${company} Team,

I hope you are doing well. I’m reaching out to explore potential opportunities to collaborate and add value to your organization.

I would love to connect and discuss further.

Best regards,
[Your Name]`
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
        Generate Email
      </button>

      {email && <textarea className="tool-output" readOnly value={email} />}
    </div>
  );
}
