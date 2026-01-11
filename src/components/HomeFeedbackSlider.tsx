"use client";
import { useEffect, useState } from "react";

type Feedback = {
  rating: number;
  message: string;
  name?: string;
};

const demo: Feedback[] = [
  { rating: 5, message: "Perfect for daily work 🔥", name: "Rahul" },
  { rating: 5, message: "PDF tools are super fast", name: "Priya" },
  { rating: 4, message: "Very useful website", name: "Amit" },
  { rating: 5, message: "No upload feature is amazing", name: "Sneha" },
];

export default function HomeFeedbackSlider() {
  const [list, setList] = useState<Feedback[]>(demo);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("toolux-feedback");
    if (stored) setList([...demo, ...JSON.parse(stored)]);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % list.length);
    }, 3500);
    return () => clearInterval(t);
  }, [list.length]);

  const f = list[index];
  const initials = f.name
    ? f.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <section className="mt-28 text-center">
      <h2 className="text-2xl font-bold text-white mb-6">
        ❤️ Loved by Users
      </h2>

      <p className="text-sm text-gray-400 mb-10">
        Based on 120+ user reviews
      </p>

      <div className="max-w-3xl mx-auto space-y-5 transition-all duration-500">

        {/* MESSAGE */}
        <p className="text-xl italic text-white/90">
          “{f.message}”
        </p>

        {/* STARS */}
        <div className="flex justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={i < f.rating ? "text-yellow-400" : "text-gray-600"}
            >
              ★
            </span>
          ))}
        </div>

        {/* USER */}
        <div className="flex items-center justify-center gap-3 mt-2">

          {/* AVATAR */}
          <div className="w-9 h-9 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-semibold">
            {initials}
          </div>

          <div className="text-sm text-gray-400">
            {f.name || "Anonymous"}
          </div>
        </div>

      </div>
    </section>
  );
}
