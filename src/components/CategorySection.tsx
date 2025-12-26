import ToolCard from "./ToolCard";
import { Tool } from "@/data/tools";

export default function CategorySection({
  title,
  tools,
}: {
  title: string;
  tools: Tool[];
}) {
  return (
    <section className="mb-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(tool => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}
