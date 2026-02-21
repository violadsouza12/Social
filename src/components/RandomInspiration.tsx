import { SavedItem, CATEGORY_COLORS, CATEGORY_ICONS } from "../data/mockData";

interface RandomInspirationProps {
  item: SavedItem;
  onClose: () => void;
  onNext: () => void;
}

export function RandomInspiration({ item, onClose, onNext }: RandomInspirationProps) {
  const colors = CATEGORY_COLORS[item.category];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-medium opacity-80">🎲 Random Inspiration</div>
              <h2 className="text-lg font-bold mt-0.5">Today's Pick!</h2>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Thumbnail */}
          <div className="relative rounded-2xl overflow-hidden aspect-video">
            <img
              src={item.thumbnail}
              alt={item.category}
              className="w-full h-full object-cover"
            />
            {item.platform === "instagram" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white text-slate-800 px-5 py-2.5 rounded-full text-sm font-bold shadow-lg hover:scale-105 transition-transform"
                  onClick={(e) => e.stopPropagation()}
                >
                  ▶ Watch Reel
                </a>
              </div>
            )}
          </div>

          {/* Category */}
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
            <span>{CATEGORY_ICONS[item.category]}</span>
            {item.category}
          </span>

          {/* Summary */}
          <div className="flex gap-3">
            <div className="shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-purple-600 font-semibold mb-1">AI Summary</p>
              <p className="text-sm text-slate-700 leading-relaxed">{item.summary}</p>
            </div>
          </div>

          {/* Saved by / Author */}
          <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-3">
            <span>by <strong className="text-slate-600">{item.author}</strong></span>
            <span>{new Date(item.savedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-700 transition-colors"
            >
              Open Original ↗
            </a>
            <button
              onClick={onNext}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-pink-200 transition-all"
            >
              🎲 Next Inspiration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
