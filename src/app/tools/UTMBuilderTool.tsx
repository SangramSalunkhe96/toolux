"use client";
import { useState } from "react";

export default function UTMBuilderTool() {
  const [url, setUrl] = useState("");
  const [utm, setUtm] = useState("");

  const build = () => {
    setUtm(`${url}?utm_source=google&utm_medium=cpc&utm_campaign=toolux`);
  };

  return (
    <div className="space-y-4">
      <input className="input" value={url} onChange={e => setUrl(e.target.value)} placeholder="Base URL" />
      <button onClick={build}>Build UTM</button>
      {utm && <div className="output">{utm}</div>}
    </div>
  );
}
