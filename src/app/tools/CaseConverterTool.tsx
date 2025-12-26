"use client";
import { useState } from "react";

export default function CaseConverterTool() {
  const [text, setText] = useState("");

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        className="w-full rounded-xl bg-black/50 border border-white/10 p-4 text-white"
        placeholder="Enter text"
      />

      <div className="flex gap-3 flex-wrap">
        <button onClick={() => setText(text.toUpperCase())}>UPPERCASE</button>
        <button onClick={() => setText(text.toLowerCase())}>lowercase</button>
        <button
          onClick={() =>
            setText(
              text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
            )
          }
        >
          Sentence case
        </button>
      </div>
    </div>
  );
}
