"use client";
import { useState } from "react";

export default function YouTubeTitleTool() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");

  const generate = () => {
    const titles = [
      `Top 5 Things About ${topic}`,
      `${topic} Explained in 5 Minutes`,
      `Why ${topic} is Trending Right Now`,
    ];
    setResult(titles[Math.floor(Math.random() * titles.length)]);
  };

  return (
    <div className="space-y-4">
      <input className="input" value={topic} onChange={e => setTopic(e.target.value)} placeholder="Video topic" />
      <button onClick={generate} className="btn-primary">Generate Title</button>
      {result && <div className="output">{result}</div>}
    </div>
  );
}
