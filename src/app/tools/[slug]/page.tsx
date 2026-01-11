import { tools } from "@/data/tools";
import { notFound } from "next/navigation";
import ToolRenderer from "../ToolRenderer";
import Script from "next/script";
import FeedbackSlider from "@/components/FeedbackSlider";
import FeedbackForm from "@/components/FeedbackForm";


export async function generateMetadata({ params }: any) {
  const { slug } = await params; // ✅ IMPORTANT FIX

  const tool = tools.find((t) => t.slug === slug);

  return {
    title: tool
      ? `${tool.name} | Free Online Tool - Toolux`
      : "Free Online Tools - Toolux",
    description:
      tool?.description ||
      "Free online tools for PDF, social media, resume and daily tasks",
  };
}


export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return notFound();

  const related = tools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 4);

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">

      {/* HEADER */}
      <div className="mb-10 text-center">
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

      {/* ✅ SEO CONTENT BLOCK (FOR GOOGLE + USERS) */}
      <section className="mt-14 max-w-3xl mx-auto text-gray-400 text-sm leading-relaxed">

        <h2 className="text-lg font-semibold text-white mb-2">
          About {tool.name}
        </h2>

        <p>
          {tool.description} using Toolux free online tool. This tool works
          directly in your browser without uploading files to any server.
        </p>

        <p className="mt-2">
          Toolux tools are designed for fast, private and easy everyday use.
          You can use this tool on mobile, tablet or desktop without installing
          any software.
        </p>

        <ul className="mt-3 list-disc pl-5 space-y-1">
          <li>100% free to use</li>
          <li>No login or signup required</li>
          <li>Fast processing in browser</li>
          <li>Privacy‑friendly — no file uploads</li>
        </ul>
      </section>

      {/* USER FEEDBACK */}
<div className="mt-16 space-y-8">
  <FeedbackSlider />
  <FeedbackForm />
</div>


      {/* ✅ RELATED TOOLS (BOOST PAGE VIEWS & ADS) */}
      {related.length > 0 && (
        <section className="mt-14">

          <h3 className="text-lg font-semibold text-white mb-4 text-center">
            Try Related Tools
          </h3>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((t) => (
              <a
                key={t.slug}
                href={`/tools/${t.slug}`}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-center hover:bg-white/10 transition"
              >
                <p className="font-medium text-white text-sm">{t.name}</p>
                <p className="text-xs text-gray-400 mt-1">{t.category}</p>
              </a>
            ))}
          </div>

        </section>
      )}

      {/* SEO FAQ SCHEMA */}
      <Script
  src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
  strategy="afterInteractive"
/>

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
              {
                "@type": "Question",
                name: "Are my files uploaded?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. All processing happens inside your browser.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
