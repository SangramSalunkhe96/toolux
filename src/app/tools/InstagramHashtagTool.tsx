"use client";
import { useState } from "react";

export default function InstagramHashtagTool() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");

  const generate = () => {
    if (!topic) return;
    const tags = [
      `#${topic.replace(/\s+/g, "")}`,
      "#instagood",
      "#viral",
      "#reels",
      "#explorepage",
      "#trending",
    ];
    setResult(tags.join(" "));
  };

  return (
    <div className="space-y-4">
      <input
        value={topic}
        onChange={e => setTopic(e.target.value)}
        placeholder="Enter topic (e.g. travel)"
        className="w-full
    rounded-xl
    bg-black/40
    text-white
    placeholder-gray-400
    border
    border-white/20
    px-4
    py-3
    outline-none
    focus:border-cyan-400
    focus:ring-2
    focus:ring-cyan-400/20
  "
      />
      <button onClick={generate} className="btn-primary">Generate Hashtags</button>
      {result && <textarea className="w-full
    min-h-[100px]
    rounded-xl
    bg-black/50
    text-white
    placeholder-gray-400
    border
    border-white/20
    px-4
    py-3
    outline-none
  " value={result} readOnly />}
    </div>
  );
}
