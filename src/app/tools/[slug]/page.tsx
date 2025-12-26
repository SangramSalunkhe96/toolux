import { tools } from "@/data/tools";
import { notFound } from "next/navigation";
import ToolRenderer from "../ToolRenderer";
import Script from "next/script";

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">
          {tool.name}
        </h1>
        <p className="text-gray-400">
          {tool.description}
        </p>
      </div>

      {/* TOOL UI */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
        <ToolRenderer slug={slug} />
      </div>

      {/* SEO FAQ SCHEMA */}
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is this tool free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, this tool is completely free to use online.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need to sign up?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No signup or login is required.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
