"use client";
import { useState } from "react";

export default function MetaTagGeneratorTool() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div className="space-y-4">
      <input className="input" placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <textarea className="input" placeholder="Description" onChange={e => setDesc(e.target.value)} />
      {(title || desc) && (
        <pre className="output">
{`<title>${title}</title>
<meta name="description" content="${desc}" />`}
        </pre>
      )}
    </div>
  );
}
