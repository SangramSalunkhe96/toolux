"use client";
import { useState } from "react";

export default function BioGeneratorTool() {
  const [name, setName] = useState("");
  const [result, setResult] = useState("");

  const generate = () => {
    setResult(`🚀 ${name} | Creator | Dreamer | Always Learning`);
  };

  return (
    <div className="space-y-4">
      <input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
      <button onClick={generate} className="btn-primary">Generate Bio</button>
      {result && <div className="output">{result}</div>}
    </div>
  );
}
