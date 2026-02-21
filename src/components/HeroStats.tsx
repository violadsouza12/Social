import { SavedItem, CATEGORY_ICONS, Category } from "../data/mockData";

interface HeroStatsProps {
  items: SavedItem[];
}

export function HeroStats({ items }: HeroStatsProps) {
  const totalSaved = items.length;
  const platforms = {
    instagram: items.filter((i) => i.platform === "instagram").length,
    twitter: items.filter((i) => i.platform === "twitter").length,
    blog: items.filter((i) => i.platform === "blog").length,
  };

  const categoryCounts = items.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Title */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30">
                🤖 AI-Powered Knowledge Base
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-3">
              Your Instagram Saves,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                Finally Useful
              </span>
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed max-w-md">
              Forward any Instagram Reel, Tweet, or Blog link to your WhatsApp Bot.
              AI auto-categorizes, summarizes, and saves it to your personal searchable dashboard.
            </p>
            <div className="flex items-center gap-3 mt-5 flex-wrap">
              <div className="flex items-center gap-2 bg-[#25D366]/20 border border-[#25D366]/30 rounded-xl px-3 py-2">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="text-xs font-medium text-[#25D366]">WhatsApp Bot Active</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <svg className="w-3.5 h-3.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                AI-powered tagging & summarization
              </div>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="text-3xl font-bold">{totalSaved}</div>
              <div className="text-sm text-slate-300 mt-0.5">Items Saved</div>
              <div className="flex gap-2 mt-2 flex-wrap">
                <span className="text-[10px] bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full">📸 {platforms.instagram} Reels</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">🐦 {platforms.twitter} Tweets</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">📰 {platforms.blog} Blogs</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="text-2xl">{CATEGORY_ICONS[topCategory?.[0] as Category] || "🏆"}</div>
              <div className="text-3xl font-bold mt-1">{topCategory?.[0]}</div>
              <div className="text-sm text-slate-300 mt-0.5">Top Category</div>
              <div className="text-[10px] text-slate-400 mt-1">{topCategory?.[1]} saves in this bucket</div>
            </div>
            <div className="col-span-2 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="text-xs text-slate-400 mb-2 font-medium">Category Breakdown</div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(categoryCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([cat, count]) => (
                    <div key={cat} className="flex items-center gap-1.5">
                      <span className="text-sm">{CATEGORY_ICONS[cat as Category]}</span>
                      <span className="text-xs text-white">{count}</span>
                      <span className="text-[10px] text-slate-400">{cat}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
