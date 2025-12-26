"use client";
import { useState } from "react";

export default function InstagramReelDownloader() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleDownload = () => {
    if (!url.includes("instagram.com")) {
      setMessage("Please enter a valid Instagram Reel URL");
      return;
    }

    setMessage(
      "Due to Instagram restrictions, direct download requires server API. UI ready for backend integration."
    );
  };

  return (
    <div className="space-y-4">
      <input
        className="tool-input"
        placeholder="Paste Instagram Reel URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button className="btn-primary" onClick={handleDownload}>
        Download Reel
      </button>

      {message && <p className="text-sm text-gray-400">{message}</p>}
    </div>
  );
}
