"use client";
import { useEffect, useState } from "react";

type Feedback = {
  name: string;
  message: string;
};

const demoFeedback: Feedback[] = [
  { name: "Amit", message: "Very useful tools, helped me a lot 🙌" },
  { name: "Priya", message: "PDF tools work fast and no upload, amazing!" },
  { name: "Rahul", message: "Best free tools site I found." },
];

export default function FeedbackSlider() {
  const [list, setList] = useState<Feedback[]>(demoFeedback);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("toolux-feedback");
    if (stored) {
      setList([...demoFeedback, ...JSON.parse(stored)]);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % list.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [list.length]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl text-black text-center max-w-xl mx-auto">
      <h3 className="text-lg font-bold mb-4">What Users Say ❤️</h3>

      <div className="min-h-[80px] transition-all">
        <p className="text-gray-700 italic mb-2">
          “{list[index]?.message}”
        </p>
        <p className="text-sm font-semibold text-gray-900">
          — {list[index]?.name}
        </p>
      </div>
    </div>
  );
}
