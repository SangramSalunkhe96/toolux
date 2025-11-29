// @ts-nocheck
"use client";

import { useEffect, useState } from "react";

type ProInterestProps = {
  toolId: string;        // e.g. "word-to-pdf-pro"
  title?: string;
};

export default function ProInterest({ toolId, title }: ProInterestProps) {
  const storageKey = `toolux_pro_interest_${toolId}`;
  const [localCount, setLocalCount] = useState<number>(0);
  const [hasVoted, setHasVoted] = useState(false);

  // Load user's previous clicks from localStorage (optional, just for UI)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const raw = window.localStorage.getItem(storageKey);
    const parsed = raw ? parseInt(raw, 10) : 0;
    if (!Number.isNaN(parsed)) {
      setLocalCount(parsed);
      setHasVoted(parsed > 0);
    }
  }, [storageKey]);

  const handleClick = () => {
    if (typeof window === "undefined") return;

    // Update local “vote” count (per user)
    setLocalCount((prev) => {
      const next = prev + 1;
      window.localStorage.setItem(storageKey, String(next));
      return next;
    });
    setHasVoted(true);

    // Fire GA4 event – you already have gtag loaded in layout.tsx
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "pro_tool_interest", {
        event_category: "Pro Tools",
        event_label: toolId,
        tool_id: toolId,
      });
    }
  };

  return (
    <div
      className="drop"
      style={{
        marginTop: 12,
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 600 }}>
        {title ?? "Interested in this Pro tool?"}
      </div>

      <button
        type="button"
        onClick={handleClick}
        className="btn btn-primary"
        style={{ fontSize: 12, paddingInline: 14, paddingBlock: 6, width: "fit-content" }}
      >
        {hasVoted ? "Thanks! Interest recorded ✅" : "I’d use this Pro tool"}
      </button>

      <p
        className="section-sub"
        style={{ fontSize: 11, marginTop: 2, opacity: 0.9 }}
      >
        Your click sends an anonymous interest signal. We’ll use this to decide which
        Pro tools (Word → PDF, PPT → PDF, PDF → PPT) to build and prioritize first.
        <br />
        <span style={{ fontSize: 10, opacity: 0.8 }}>
          Your local clicks: {localCount}
        </span>
      </p>
    </div>
  );
}
