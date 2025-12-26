"use client";
import { useState } from "react";

export default function WordCounterTool() {
  const [text, setText] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        className="w-full rounded-xl bg-black/50 border border-white/10 p-4 text-white"
        placeholder="Start typing..."
      />

      <div className="flex gap-6 text-sm text-gray-300">
        <span>Words: {words}</span>
        <span>Characters: {chars}</span>
        <span>No spaces: {charsNoSpace}</span>
      </div>
    </div>
  );
}
