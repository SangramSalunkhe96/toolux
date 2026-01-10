"use client";
import { useState } from "react";

const captionBank = {
  Viral: [
    "Everyone starts small, but {topic} changes everything 🚀",
    "This is your sign to start with {topic} today 💥",
    "Stop scrolling. This is about {topic}.",
    "{topic} is not luck, it’s discipline.",
  ],
  Professional: [
    "Sharing insights on {topic} and its real impact.",
    "Let’s talk about how {topic} shapes growth.",
    "Understanding {topic} for long‑term success.",
  ],
  Funny: [
    "Me pretending I understand {topic} 😂",
    "{topic}? Bro I’m just trying to survive 😭",
    "Started with {topic}, now I need motivation again 😆",
  ],
  Trading: [
    "Risk is part of the game, but {topic} needs strategy 📈",
    "No emotions, only discipline in {topic}.",
    "Learning patience through {topic} every day.",
    "{topic} taught me profits come to the patient.",
  ],
};

const hashtagBank = {
  Trading:
    "#trading #stockmarket #forex #daytrader #investing #finance #marketlife #cryptotrading",
  Default:
    "#motivation #selfgrowth #mindset #goals #success #reels #instagood",
};

const topicPresets = [
  "Stock Market",
  "Forex Trading",
  "Startup Life",
  "Fitness Journey",
  "Solo Travel",
  "Coding Projects",
  "Crypto Trading",
  "Business Growth",
];

export default function InstagramCaptionTool() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<keyof typeof captionBank>("Viral");
  const [captions, setCaptions] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState("");

  const generate = () => {
    if (!topic) return;

    const list = captionBank[tone];
    const results = Array.from({ length: 5 }).map(() =>
      list[Math.floor(Math.random() * list.length)].replace("{topic}", topic)
    );

    setCaptions(results);
    setHashtags(tone === "Trading" ? hashtagBank.Trading : hashtagBank.Default);
  };

  const copyAll = () => {
    const text = captions.join("\n\n") + "\n\n" + hashtags;
    navigator.clipboard.writeText(text);
    alert("Copied all captions!");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-xl space-y-6">

      <h1 className="text-2xl font-bold text-center">
        Instagram Caption Generator (Viral + Trading)
      </h1>

      <p className="text-sm text-gray-600 text-center">
        Generate viral captions and hashtags for Instagram & Reels.
      </p>

      {/* TOPIC */}
      <div>
        <label className="text-sm font-medium block mb-1">Topic</label>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Stock Trading, Gym, Startup"
          className="w-full-insta border rounded-lg px-4 py-2"
        />

        <div className="flex flex-wrap gap-2 mt-2">
          {topicPresets.map((t) => (
            <button
              key={t}
              onClick={() => setTopic(t)}
              className="text-xs px-3 py-1 rounded-full border bg-gray-50 hover:bg-gray-100"
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* TONE */}
      <div>
        <label className="text-sm font-medium block mb-1">Tone</label>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value as any)}
          className="w-full-insta-one border rounded-lg px-4 py-2"
        >
          <option>Viral</option>
          <option>Professional</option>
          <option>Funny</option>
          <option>Trading</option>
        </select>
      </div>

      {/* GENERATE BUTTON */}
      <button
        onClick={generate}
        className="w-full-insta-one bg-gradient-to-r from-pink-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
      >
        Generate Captions
      </button>

      {/* RESULTS */}
      {captions.length > 0 && (
        <div className="space-y-4">

          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Generated Captions</h3>
            <button
              onClick={copyAll}
              className="px-4 py-1 rounded-full text-sm bg-blue-600 text-white hover:bg-blue-700"
            >
              Copy All
            </button>
          </div>

          {/* CAPTION CARDS */}
          {captions.map((c, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-indigo-50 to-pink-50 border p-4 rounded-xl relative"
            >
              <p className="text-sm text-gray-900 font-medium">{c}</p>

              <button
                onClick={() => navigator.clipboard.writeText(c)}
                className="absolute top-2 right-2 text-xs px-3 py-1 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Copy
              </button>
            </div>
          ))}

          {/* HASHTAGS */}
          <div className="bg-gray-100 p-4 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">Suggested Hashtags</p>
            <p className="text-sm text-gray-800 break-words">{hashtags}</p>

            <button
              onClick={() => navigator.clipboard.writeText(hashtags)}
              className="mt-2 px-4 py-1 rounded-full bg-green-600 text-white text-sm hover:bg-green-700"
            >
              Copy Hashtags
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
