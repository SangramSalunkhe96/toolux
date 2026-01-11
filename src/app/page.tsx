import ToolSearch from "@/components/ToolSearch";
import { tools } from "@/data/tools";
import ToolCard from "@/components/ToolCard";
import Link from "next/link";
import HomeFeedbackSlider from "@/components/HomeFeedbackSlider";
import EmojiFeedbackForm from "@/components/EmojiFeedbackForm";

export default function HomePage() {
  const popularTools = tools.filter((t) => t.popular).slice(0, 6);

  const categories = Array.from(new Set(tools.map((t) => t.category)));

  return (
    <main className="max-w-7xl mx-auto px-6 py-24">

      {/* HERO */}
      <section className="text-center max-w-4xl mx-auto mb-24">
        <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
          Free Online Tools for <span className="text-cyan-400">Creators, Students & Businesses</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Convert PDFs, grow social media, build resumes and more — all tools work directly in your browser with zero uploads.
        </p>
      </section>




      {/* SEARCH */}
      <div className="mb-20">
        <ToolSearch />
      </div>

      {/* 🔥 POPULAR TOOLS (BOOST CLICKS) */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          🔥 Most Used Tools
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="block">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 hover:from-cyan-500/20 hover:to-blue-500/10 transition p-6">
                <p className="text-white font-semibold text-lg">{tool.name}</p>
                <p className="text-gray-400 text-sm mt-1">{tool.description}</p>
                <p className="mt-3 text-cyan-400 text-sm font-medium">
                  Try now →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

          {/* USER FEEDBACK SECTION */}
<section className="mt-24 space-y-10">
  <HomeFeedbackSlider />
</section>

      {/* ✅ CATEGORY SECTIONS (SEO + UX) */}
      {categories.map((cat) => {
        const catTools = tools.filter((t) => t.category === cat);

        return (
          <section key={cat} className="mb-24">

            <h2 className="text-xl font-semibold text-white mb-6">
              {cat}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {catTools.map((tool) => (
                <Link key={tool.slug} href={`/tools/${tool.slug}`} className="block">
                  <ToolCard tool={tool} />
                </Link>
              ))}
            </div>

          </section>
        );
      })}
<section className="mt-24 space-y-10">
        <EmojiFeedbackForm />
</section>
      {/* TRUST SECTION */}
      <section className="mt-24 text-center max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold text-white mb-4">
          🔒 Your Privacy Comes First
        </h3>
        <p className="text-gray-400">
          All tools run inside your browser. We never upload your files to any server.
          No login. No tracking. Just fast and free tools.
        </p>
      </section>

    </main>
  );
}
