"use client";
import { useState } from "react";

export default function JSONFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const format = () => {
    try {
      setOutput(JSON.stringify(JSON.parse(input), null, 2));
    } catch {
      setOutput("Invalid JSON");
    }
  };

  return (
    <div className="space-y-4">
      <textarea className="input" value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={format}>Format JSON</button>
      {output && <pre className="output">{output}</pre>}
    </div>
  );
}
