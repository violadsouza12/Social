import { Category, CATEGORY_COLORS, CATEGORY_ICONS, SavedItem } from "../data/mockData";

interface StatsBarProps {
  items: SavedItem[];
  selectedCategory: Category | "All";
  onCategoryChange: (cat: Category | "All") => void;
  selectedPlatform: string;
  onPlatformChange: (p: string) => void;
}

export function StatsBar({ items, selectedCategory, onCategoryChange, selectedPlatform, onPlatformChange }: StatsBarProps) {
  const categories = ["All", "Fitness", "Coding", "Food", "Travel", "Design", "Finance", "Motivation", "Music"] as const;
  const platforms = ["All", "instagram", "twitter", "blog"];
  const platformLabels: Record<string, string> = { All: "All Platforms", instagram: "Instagram", twitter: "Twitter / X", blog: "Blog" };
  const platformIcons: Record<string, string> = { All: "🌐", instagram: "📸", twitter: "🐦", blog: "📰" };

  const countByCategory = (cat: string) =>
    cat === "All" ? items.length : items.filter((i) => i.category === cat).length;

  return (
    <div className="bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
        {/* Category chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const count = countByCategory(cat);
            const colors = cat !== "All" ? CATEGORY_COLORS[cat as Category] : null;
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat as Category | "All")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                  isActive
                    ? colors
                      ? `${colors.bg} ${colors.text} ${colors.border} shadow-sm`
                      : "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700"
                }`}
              >
                {cat !== "All" && <span>{CATEGORY_ICONS[cat as Category]}</span>}
                {cat}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? "bg-white/40 text-current"
                    : "bg-slate-100 text-slate-400"
                }`}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Platform + Sort row */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1 bg-slate-50 rounded-xl p-1 border border-slate-200">
            {platforms.map((p) => (
              <button
                key={p}
                onClick={() => onPlatformChange(p)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedPlatform === p
                    ? "bg-white text-slate-800 shadow-sm border border-slate-200"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <span>{platformIcons[p]}</span>
                <span>{platformLabels[p]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
