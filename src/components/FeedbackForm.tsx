"use client";
import { useState } from "react";

const ratings = [
  { label: "Excellent", emoji: "😍" },
  { label: "Good", emoji: "😊" },
  { label: "Okay", emoji: "🙂" },
  { label: "Bad", emoji: "😐" },
];

export default function EmojiFeedbackForm() {
  const [rating, setRating] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);

  const submit = () => {
    if (!rating) return alert("Please select your experience");

    const old = JSON.parse(localStorage.getItem("toolux-feedback") || "[]");

    const feedback = {
      rating,
      message: message || "No comment",
      name: name || "Anonymous",
    };

    localStorage.setItem(
      "toolux-feedback",
      JSON.stringify([...old, feedback])
    );

    setDone(true);
    setRating(null);
    setMessage("");
    setName("");
  };

  if (done) {
    return (
      <div
        id="feedback"
        className="bg-green-500/10 border border-green-500/30 text-green-400 p-6 rounded-2xl text-center max-w-xl mx-auto"
      >
        ✅ Thanks for your feedback!
      </div>
    );
  }

  return (
    <div
      id="feedback"
      className="bg-white text-black p-6 rounded-2xl shadow-xl max-w-xl mx-auto space-y-5"
    >
      <h3 className="text-lg font-bold text-center">
        How was your experience?
      </h3>

      {/* EMOJI SELECT */}
      <div className="flex justify-center gap-6 text-3xl">
        {ratings.map((r) => (
          <button
            key={r.label}
            onClick={() => setRating(r.label)}
            className={`transition transform ${
              rating === r.label
                ? "scale-125"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            {r.emoji}
          </button>
        ))}
      </div>

      {/* NAME */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name (optional)"
        className="w-full border rounded-lg px-4 py-2"
      />

      {/* MESSAGE */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Optional comment..."
        className="w-full border rounded-lg px-4 py-2 min-h-[80px]"
      />

      <button
        onClick={submit}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Submit Feedback
      </button>
    </div>
  );
}
