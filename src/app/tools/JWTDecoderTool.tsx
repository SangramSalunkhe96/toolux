"use client";
import { useState } from "react";

export default function JWTDecoderTool() {
  const [token, setToken] = useState("");
  const [result, setResult] = useState("");

  const decode = () => {
    try {
      const payload = token.split(".")[1];
      setResult(atob(payload));
    } catch {
      setResult("Invalid token");
    }
  };

  return (
    <div className="space-y-4">
      <textarea className="input" value={token} onChange={e => setToken(e.target.value)} />
      <button onClick={decode}>Decode</button>
      {result && <pre className="output">{result}</pre>}
    </div>
  );
}
