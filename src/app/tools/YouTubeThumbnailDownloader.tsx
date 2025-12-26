"use client";
import { useState } from "react";

export default function YouTubeThumbnailDownloader() {
  const [url, setUrl] = useState("");
  const [thumb, setThumb] = useState("");

  const generate = () => {
    const id = url.split("v=")[1]?.split("&")[0];
    if (!id) return;
    setThumb(`https://img.youtube.com/vi/${id}/maxresdefault.jpg`);
  };

  return (
    <div className="space-y-4">
      <input className="tool-input" placeholder="YouTube video URL" value={url} onChange={(e)=>setUrl(e.target.value)} />
      <button className="btn-primary" onClick={generate}>Get Thumbnail</button>

      {thumb && (
        <a href={thumb} download>
          <img src={thumb} className="rounded-xl border border-white/20" />
        </a>
      )}
    </div>
  );
}
