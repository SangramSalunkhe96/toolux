"use client";
import { useState } from "react";

const hashtagSets: Record<string, string[]> = {
  Reels: [
    "#reels", "#reelsinstagram", "#reelitfeelit", "#viralreels", "#explorepage",
    "#trendingreels", "#instareels", "#contentcreator", "#reelsvideo", "#foryou",
  ],
  Trading: [
    "#trading", "#stockmarket", "#forex", "#daytrader", "#investing",
    "#marketlife", "#tradinglife", "#cryptotrading", "#financialfreedom",
  ],
  Business: [
    "#entrepreneur", "#startup", "#businesslife", "#hustle", "#successmindset",
    "#smallbusiness", "#founderlife", "#growthmindset",
  ],
  Travel: [
    "#travelgram", "#wanderlust", "#explore", "#trip", "#vacation",
    "#travelreels", "#travelphotography", "#naturelovers",
  ],
  Fitness: [
    "#fitness", "#gymlife", "#workout", "#fitlife", "#healthylifestyle",
    "#motivation", "#fitnessreels", "#gymmotivation",
  ],
  Tech: [
    "#techlife", "#coding", "#developer", "#programming", "#startuptech",
    "#innovation", "#webdevelopment", "#ai",
  ],
};

export default function InstagramHashtagTool() {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("Reels");
  const [hashtags, setHashtags] = useState("");

  const generate = () => {
    if (!topic) return;

    const topicTag = `#${topic.replace(/\s+/g, "")}`;
    const baseTags = hashtagSets[category] || [];
    const viralTags = ["#viral", "#trending", "#explore", "#instagood", "#fyp"];

    const finalTags = [
      topicTag,
      ...baseTags,
      ...viralTags,
    ];

    setHashtags(finalTags.join(" "));
  };

  const copyAll = () => {
    navigator.clipboard.writeText(hashtags);
    alert("Hashtags copied!");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-xl space-y-5">

      <h1 className="text-2xl font-bold text-center">
        Instagram Hashtag Generator
      </h1>

      <p className="text-sm text-gray-600 text-center">
        Generate trending hashtags to increase reach on Reels & Posts.
      </p>

      {/* TOPIC */}
      <div>
        <label className="text-sm font-medium block mb-1">Topic</label>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Stock Trading, Gym, Travel"
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      {/* CATEGORY */}
      <div>
        <label className="text-sm font-medium block mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full-insta-one border rounded-lg px-4 py-2"
        >
          {Object.keys(hashtagSets).map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* GENERATE */}
      <button
        onClick={generate}
        className="w-full-insta-one bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:opacity-90"
      >
        Generate Hashtags
      </button>

      {/* RESULT */}
      {hashtags && (
        <div className="bg-gray-100 p-4 rounded-xl space-y-2 border">

          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-800">Generated Hashtags</p>
            <button
              onClick={copyAll}
              className="px-4 py-1 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700"
            >
              Copy All
            </button>
          </div>

          <textarea
            value={hashtags}
            readOnly
            className="w-full-insta min-h-[120px] rounded-lg border px-3 py-2 text-sm text-gray-800"
          />
        </div>
      )}
    </div>
  );
}
