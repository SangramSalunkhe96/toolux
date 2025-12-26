"use client";
import { useState } from "react";

export default function InstagramBioGenerator() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const generate = () => {
    setBio(
      `✨ ${name}\n📍 Dream • Create • Inspire\n📩 DM for collab`
    );
  };

  return (
    <div className="space-y-4">
      <input
        className="tool-input"
        placeholder="Your name / niche"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={generate} className="btn-primary">
        Generate Bio
      </button>

      {bio && <textarea className="tool-output" readOnly value={bio} />}
    </div>
  );
}
