import { Tool } from "@/data/tools";

const categoryColorMap: Record<string, string> = {
  "Social Media": "text-pink-400",
  "Business Tools": "text-green-400",
  "Career Tools": "text-green-400",
  "Developer Tools": "text-purple-400",
  "Text Tools": "text-blue-400",
  "Document Tools": "text-cyan-400",
};

export default function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  const iconColor =
    categoryColorMap[tool.category] || "text-gray-400";

  return (
    <div
      className="
        group
        flex items-start gap-3
        rounded-xl
        p-4
        bg-white/5
        border border-white/10
        cursor-pointer
        transition
        hover:bg-white/10
        hover:border-white/20
      "
    >
      <Icon
        className={`w-6 h-6 ${iconColor} transition-transform group-hover:scale-110`}
      />

      <div>
        <h3 className="font-semibold text-white">
          {tool.name}
        </h3>
        <p className="text-sm text-gray-400">
          {tool.description}
        </p>
      </div>
    </div>
  );
}
