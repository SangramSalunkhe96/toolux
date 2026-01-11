"use client";
import Link from "next/link";
import Logo from "./Logo";
import { tools } from "@/data/tools";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const categories = Array.from(new Set(tools.map((t) => t.category)));

  return (
    <header className="sticky top-0 z-[999] bg-black/70 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/">
          <Logo />
        </Link>

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">

          {categories.map((cat) => (
            <div
              key={cat}
              className="relative"
              onMouseEnter={() => setOpen(cat)}
              onMouseLeave={() => setOpen(null)}
            >
              {/* CATEGORY TAB */}
              <span className="cursor-pointer text-gray-300 hover:text-white transition">
                {cat}
              </span>

              {/* DROPDOWN PANEL */}
              {open === cat && (
                <div
                  className="
                    absolute
                    left-1/2 -translate-x-1/2
                    top-full
                    pt-4
                    w-[720px]
                    z-[999]
                  "
                  onMouseEnter={() => setOpen(cat)}
                >
                  <div
                    className="
                      rounded-2xl
                      bg-black/95
                      backdrop-blur
                      border border-white/10
                      shadow-2xl
                      p-6
                      pointer-events-auto
                    "
                  >
                    <div className="grid grid-cols-3 gap-4">

                      {tools
                        .filter((t) => t.category === cat)
                        .map((tool) => {
                          const Icon = tool.icon;

                          return (
                            <Link
                              key={tool.slug}
                              href={`/tools/${tool.slug}`}
                              className="
                                flex gap-3 p-3 rounded-xl
                                hover:bg-white/10 transition
                              "
                            >
                              <Icon className="w-5 h-5 text-cyan-400 mt-1 shrink-0" />
                              <div>
                                <div className="text-white text-sm font-medium">
                                  {tool.name}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {tool.description}
                                </div>
                              </div>
                            </Link>
                          );
                        })}

                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
{/* FEEDBACK LINK */}
          <a
            href="#feedback"
            className="text-gray-300 hover:text-white transition"
          >
            Feedback
          </a>
        </nav>
      </div>
    </header>
  );
}
