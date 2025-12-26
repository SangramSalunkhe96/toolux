"use client";
import { useState } from "react";

const templates = {
  Casual: [
    "Just vibing with {topic} ✨",
    "{topic} kind of day 😎",
    "Can’t get enough of {topic}",
  ],
  Professional: [
    "Exploring the impact of {topic}.",
    "{topic} — insights that matter.",
    "A closer look at {topic}.",
  ],
  Funny: [
    "{topic} but make it dramatic 😂",
    "Me pretending I understand {topic}",
    "{topic}? Say no more 😆",
  ],
};

export default function InstagramCaptionTool() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<keyof typeof templates>("Casual");
  const [result, setResult] = useState("");

  const generate = () => {
    if (!topic) return;
    const list = templates[tone];
    const caption =
      list[Math.floor(Math.random() * list.length)].replace(
        "{topic}",
        topic
      );
    setResult(caption);
  };

  return (
    <div className="space-y-6">
      <textarea
        placeholder="Enter topic (e.g. Travel, Startup life)"
        value={topic}
        onChange={e => setTopic(e.target.value)}
        className="w-full rounded-xl bg-black/50 border border-white/10 p-4 text-white"
      />

      <select
        value={tone}
        onChange={e => setTone(e.target.value as any)}
        className="w-full rounded-xl bg-black/50 border border-white/10 p-3 text-white"
      >
        <option>Casual</option>
        <option>Professional</option>
        <option>Funny</option>
      </select>

      <button
        onClick={generate}
        className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-semibold"
      >
        Generate Caption
      </button>

      {result && (
        <div className="rounded-xl bg-black/40 border border-white/10 p-4">
          <p>{result}</p>
          <button
            onClick={() => navigator.clipboard.writeText(result)}
            className="mt-3 text-sm text-cyan-400"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
