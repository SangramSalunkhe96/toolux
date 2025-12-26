"use client";
import { tools } from "@/data/tools";
import Link from "next/link";
import { useState } from "react";

export default function ToolSearch() {
  const [q, setQ] = useState("");

  const results = tools.filter(t =>
    t.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto mb-16">
      <input
        placeholder="Search tools..."
        value={q}
        onChange={e => setQ(e.target.value)}
        className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3 text-white outline-none"
      />

      {q && (
        <div className="mt-4 rounded-xl bg-black/80 border border-white/10">
          {results.map(tool => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="block px-4 py-2 hover:bg-white/10"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
