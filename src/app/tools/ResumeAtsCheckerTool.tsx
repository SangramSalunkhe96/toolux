"use client";
import { useState } from "react";

const keywords = [
  "experience","skills","projects","education","certification",
  "team","leadership","development","analysis","management",
];

export default function ResumeAtsCheckerTool() {
  const [text, setText] = useState("");
  const [score, setScore] = useState<number | null>(null);

  const check = () => {
    let hits = 0;
    keywords.forEach((k) => {
      if (text.toLowerCase().includes(k)) hits++;
    });

    const final = Math.min(100, Math.round((hits / keywords.length) * 100));
    setScore(final);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-xl space-y-6 text-black">

      <div className="text-center">
        <h1 className="text-2xl font-bold">Resume ATS Score Checker</h1>
        <p className="text-sm text-gray-600">
          Check how ATS‑friendly your resume text is
        </p>
      </div>

      <textarea
        placeholder="Paste your resume text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full min-h-[180px] border rounded-xl p-4"
      />

      <button
        onClick={check}
        className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700"
      >
        Check ATS Score
      </button>

      {score !== null && (
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold">Your ATS Score</p>
          <div className="text-4xl font-bold text-blue-600">{score}%</div>
          <p className="text-sm text-gray-600">
            Add more skills, projects and keywords to improve score
          </p>
        </div>
      )}
    </div>
  );
}
