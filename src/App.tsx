import { useState, useMemo } from "react";
import { mockData, Category, SavedItem } from "./data/mockData";
import { Header } from "./components/Header";
import { HeroStats } from "./components/HeroStats";
import { StatsBar } from "./components/StatsBar";
import { SavedCard } from "./components/SavedCard";
import { RandomInspiration } from "./components/RandomInspiration";
import { ArchitectureDiagram } from "./components/ArchitectureDiagram";

export function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [sortBy, setSortBy] = useState<"newest" | "popular">("newest");
  const [randomItem, setRandomItem] = useState<SavedItem | null>(null);
  const [randomIndex, setRandomIndex] = useState(0);

  const filteredItems = useMemo(() => {
    let items = [...mockData];

    // Filter by category
    if (selectedCategory !== "All") {
      items = items.filter((i) => i.category === selectedCategory);
    }

    // Filter by platform
    if (selectedPlatform !== "All") {
      items = items.filter((i) => i.platform === selectedPlatform);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (i) =>
          i.summary.toLowerCase().includes(q) ||
          i.caption.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q) ||
          i.author.toLowerCase().includes(q) ||
          i.hashtags.some((h) => h.toLowerCase().includes(q)) ||
          i.platform.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === "popular") {
      items = items.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    } else {
      items = items.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
    }

    return items;
  }, [searchQuery, selectedCategory, selectedPlatform, sortBy]);

  const handleRandomInspiration = () => {
    const idx = Math.floor(Math.random() * mockData.length);
    setRandomIndex(idx);
    setRandomItem(mockData[idx]);
  };

  const handleNextRandom = () => {
    const nextIdx = (randomIndex + 1) % mockData.length;
    setRandomIndex(nextIdx);
    setRandomItem(mockData[nextIdx]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalSaved={mockData.length}
        onRandomInspiration={handleRandomInspiration}
      />

      <HeroStats items={mockData} />

      <StatsBar
        items={mockData}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedPlatform={selectedPlatform}
        onPlatformChange={setSelectedPlatform}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-slate-500">
              {searchQuery || selectedCategory !== "All" || selectedPlatform !== "All" ? (
                <>
                  <span className="font-semibold text-slate-900">{filteredItems.length}</span> result{filteredItems.length !== 1 ? "s" : ""}
                  {searchQuery && <> for <span className="text-purple-600 font-medium">"{searchQuery}"</span></>}
                </>
              ) : (
                <>
                  Showing <span className="font-semibold text-slate-900">all {filteredItems.length}</span> saved items
                </>
              )}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ArchitectureDiagram />
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1">
              <button
                onClick={() => setSortBy("newest")}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${sortBy === "newest" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-700"}`}
              >
                Newest
              </button>
              <button
                onClick={() => setSortBy("popular")}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${sortBy === "popular" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-700"}`}
              >
                Popular
              </button>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredItems.map((item) => (
              <SavedCard key={item.id} item={item} highlight={searchQuery} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No results found</h3>
            <p className="text-sm text-slate-400 mb-6">
              Try searching for something different, or clear your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedPlatform("All");
              }}
              className="text-sm font-medium bg-purple-600 text-white px-5 py-2.5 rounded-xl hover:bg-purple-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 flex items-center justify-center">
                <span className="text-sm">💾</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Social Saver</p>
                <p className="text-xs text-slate-400">Turn your saves into a knowledge base</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Bot
              </span>
              <span>🧠 AI-Powered</span>
              <span>Built for Hackathon 2025</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Random Inspiration Modal */}
      {randomItem && (
        <RandomInspiration
          item={randomItem}
          onClose={() => setRandomItem(null)}
          onNext={handleNextRandom}
        />
      )}
    </div>
  );
}
