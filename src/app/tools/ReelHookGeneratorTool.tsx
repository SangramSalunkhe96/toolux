"use client";
import { useState } from "react";

const hookCategories: Record<string, string[]> = {
  Viral: [
    "Wait till the end 😱",
    "Nobody talks about this...",
    "This changed everything 🔥",
    "If you see this, don’t skip 👀",
    "This is your sign ✨",
  ],
  Business: [
    "Most people fail because of this...",
    "Do this before starting business ⚠️",
    "One mistake costing lakhs…",
    "If I started again, I’d do this first",
  ],
  Fitness: [
    "Stop doing this in the gym ❌",
    "This exercise changed my body",
    "No one told me this before 😳",
    "Do this for faster results 💪",
  ],
  Trading: [
    "This trade taught me a big lesson 📉",
    "90% traders ignore this rule",
    "One mistake, big loss 😓",
    "Do this before every trade ⚠️",
  ],
};

export default function ReelHookGeneratorTool() {
  const [category, setCategory] = useState("Viral");
  const [hooks, setHooks] = useState<string[]>([]);

  const generate = () => {
    const list = hookCategories[category];
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    setHooks(shuffled.slice(0, 5));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">

        <h1 className="text-2xl font-bold text-center text-gray-900">
          Instagram Reel Hook Generator
        </h1>

        <p className="text-center text-gray-600 text-sm">
          Generate viral opening lines to increase watch time & engagement.
        </p>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded-xl px-4 py-3"
        >
          {Object.keys(hookCategories).map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <button
          onClick={generate}
          className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:opacity-90"
        >
          Generate Viral Hooks 🚀
        </button>
      </div>

      {hooks.length > 0 && (
        <div className="space-y-3">
          {hooks.map((h, i) => (
            <div
              key={i}
              className="bg-black/80 text-white p-4 rounded-xl flex justify-between items-center"
            >
              <span>{h}</span>
              <button
                onClick={() => navigator.clipboard.writeText(h)}
                className="text-cyan-400 text-sm"
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
