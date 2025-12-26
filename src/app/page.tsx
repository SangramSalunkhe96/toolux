import ToolSearch from "@/components/ToolSearch";
import { tools } from "@/data/tools";
import ToolCard from "@/components/ToolCard";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-24">
      <section className="text-center max-w-3xl mx-auto mb-24">
        <h1 className="text-5xl font-bold text-white mb-6">
          Smart Tools. Zero Uploads.
        </h1>
        <p className="text-gray-400 text-lg">
          Privacy‑first tools for creators, developers & businesses.
        </p>
      </section>

      <ToolSearch />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`} className="block">
            <ToolCard tool={tool} />
          </Link>
        ))}
      </div>
    </main>
  );
}





