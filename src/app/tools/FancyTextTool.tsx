"use client";
import { useState } from "react";

export default function FancyTextTool() {
  const [text, setText] = useState("");

  return (
    <div className="space-y-4">
      <input className="input" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text" />
      {text && (
        <div className="space-y-2">
          <div>𝓕𝓪𝓷𝓬𝔂: {text}</div>
          <div>𝐁𝐨𝐥𝐝: {text}</div>
          <div>𝘔𝘰𝘯𝘰: {text}</div>
        </div>
      )}
    </div>
  );
}
