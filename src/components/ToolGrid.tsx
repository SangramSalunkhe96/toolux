import ToolCard from "./ToolCard";
import { Tool } from "@/data/tools";

export default function ToolGrid({ title, tools }: { title: string; tools: Tool[] }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(t => <ToolCard key={t.slug} tool={t} />)}
      </div>
    </section>
  );
}
