"use client";
import { useState } from "react";

export default function YouTubeDescriptionTool() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");

  const generate = () => {
    setResult(`In this video, we explore ${topic}. Watch till the end for tips, insights, and examples.`);
  };

  return (
    <div className="space-y-4">
      <input className="input" value={topic} onChange={e => setTopic(e.target.value)} placeholder="Video topic" />
      <button onClick={generate} className="btn-primary">Generate Description</button>
      {result && <textarea className="output" value={result} readOnly />}
    </div>
  );
}
