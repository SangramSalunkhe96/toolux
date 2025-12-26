"use client";
import { useState } from "react";

export default function QRGeneratorTool() {
  const [text, setText] = useState("");

  return (
    <div className="space-y-4">
      <input className="input" value={text} onChange={e => setText(e.target.value)} placeholder="Text / URL" />
      {text && <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${text}`} />}
    </div>
  );
}
