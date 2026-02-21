import { useState } from "react";
import { SavedItem, CATEGORY_COLORS, CATEGORY_ICONS } from "../data/mockData";

interface SavedCardProps {
  item: SavedItem;
  highlight?: string;
}

const PLATFORM_ICONS: Record<string, { icon: React.ReactElement; label: string; color: string }> = {
  instagram: {
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    label: "Instagram",
    color: "text-pink-500",
  },
  twitter: {
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    label: "Twitter / X",
    color: "text-slate-800",
  },
  blog: {
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    label: "Blog",
    color: "text-blue-500",
  },
};

function highlight(text: string, query: string) {
  if (!query) return <span>{text}</span>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200 text-yellow-900 rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function formatDate(isoString: string) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatNumber(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(0) + "K";
  return n.toString();
}

export function SavedCard({ item, highlight: query = "" }: SavedCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const colors = CATEGORY_COLORS[item.category];
  const platform = PLATFORM_ICONS[item.platform];

  const handleCopy = () => {
    navigator.clipboard.writeText(item.url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Thumbnail */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={item.thumbnail}
          alt={item.category}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Platform badge */}
        <div className={`absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm ${platform.color}`}>
          {platform.icon}
          <span className="text-xs font-semibold text-slate-700">{platform.label}</span>
        </div>

        {/* Stats overlay */}
        {(item.views || item.likes) && (
          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-2">
            {item.views && (
              <div className="flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                {item.views}
              </div>
            )}
            {item.likes && (
              <div className="flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
                ❤️ {formatNumber(item.likes)}
              </div>
            )}
          </div>
        )}

        {/* Instagram embed hint */}
        {item.platform === "instagram" && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-slate-800 px-4 py-2 rounded-full text-xs font-semibold shadow-lg hover:bg-pink-50 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <span>▶</span> View Reel
            </a>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col gap-3">
        {/* Category + Date */}
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
            <span>{CATEGORY_ICONS[item.category]}</span>
            {item.category}
          </span>
          <span className="text-xs text-slate-400">{formatDate(item.savedAt)}</span>
        </div>

        {/* AI Summary */}
        <div className="flex gap-2">
          <div className="shrink-0 w-5 h-5 rounded-md bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mt-0.5">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {highlight(item.summary, query)}
          </p>
        </div>

        {/* Caption expandable */}
        <div>
          <p className={`text-xs text-slate-500 leading-relaxed ${expanded ? "" : "line-clamp-2"}`}>
            {highlight(item.caption, query)}
          </p>
          {item.caption.length > 100 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-purple-600 hover:text-purple-800 mt-1 font-medium"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-1.5">
          {item.hashtags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[11px] text-purple-600 bg-purple-50 hover:bg-purple-100 px-2 py-0.5 rounded-full cursor-pointer transition-colors">
              {tag}
            </span>
          ))}
          {item.hashtags.length > 3 && (
            <span className="text-[11px] text-slate-400 px-2 py-0.5">
              +{item.hashtags.length - 3} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-50">
          <span className="text-xs text-slate-400 font-medium">
            {item.author}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopy}
              className="text-xs text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              title="Copy link"
            >
              {copied ? (
                <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-purple-600 p-1.5 rounded-lg hover:bg-purple-50 transition-colors"
              title="Open original"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
