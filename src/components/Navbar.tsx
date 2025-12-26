"use client";
import Link from "next/link";
import { tools } from "@/data/tools";

export default function Navbar() {
  const categories = tools.reduce<Record<string, typeof tools>>((acc, tool) => {
    acc[tool.category] = acc[tool.category] || [];
    acc[tool.category].push(tool);
    return acc;
  }, {});

  return (
    <header className="sticky top-0 bg-white border-b z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
        <Link href="/" className="font-bold text-lg">Toolux</Link>

        <nav className="flex gap-6 text-sm">
          {Object.entries(categories).map(([cat, items]) => (
            <div key={cat} className="relative group">
              <span className="cursor-pointer font-medium">{cat}</span>
              <div className="absolute left-0 top-6 hidden group-hover:block bg-white border shadow-lg rounded-lg p-3 min-w-[260px]">
                {items.map(t => (
                  <Link
                    key={t.slug}
                    href={`/tools/${t.slug}`}
                    className="block px-3 py-2 hover:bg-gray-100 rounded"
                  >
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.description}</div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
