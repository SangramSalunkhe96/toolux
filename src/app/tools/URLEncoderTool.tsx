"use client";
import { useState } from "react";

export default function URLEncoderTool() {
  const [text, setText] = useState("");

  return (
    <div className="space-y-4">
      <textarea className="input" value={text} onChange={e => setText(e.target.value)} />
      <div className="flex gap-3">
        <button onClick={() => setText(encodeURIComponent(text))}>Encode</button>
        <button onClick={() => setText(decodeURIComponent(text))}>Decode</button>
      </div>
    </div>
  );
}
