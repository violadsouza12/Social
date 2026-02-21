import { useState } from "react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalSaved: number;
  onRandomInspiration: () => void;
}

export function Header({ searchQuery, onSearchChange, totalSaved, onRandomInspiration }: HeaderProps) {
  const [botDemo, setBotDemo] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 shadow-lg shadow-purple-200" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg">💾</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-slate-900 leading-tight">Social Saver</h1>
              <p className="text-xs text-slate-400 leading-tight">Your Knowledge Base</p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder='Search "pasta", "fitness", "coding"...'
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium text-slate-700">{totalSaved}</span>
              <span>saved</span>
            </div>
            <button
              onClick={onRandomInspiration}
              className="flex items-center gap-1.5 text-xs font-medium bg-gradient-to-r from-orange-400 to-pink-500 text-white px-3 py-2 rounded-lg hover:shadow-md hover:shadow-pink-200 transition-all hover:-translate-y-0.5"
              title="Random Inspiration"
            >
              <span>🎲</span>
              <span className="hidden sm:inline">Inspire Me</span>
            </button>
            <button
              onClick={() => setBotDemo(true)}
              className="flex items-center gap-1.5 text-xs font-medium bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-2 rounded-lg hover:shadow-md hover:shadow-green-200 transition-all hover:-translate-y-0.5"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="hidden sm:inline">WhatsApp Bot</span>
            </button>
          </div>
        </div>
      </div>

      {/* WhatsApp Bot Demo Modal */}
      {botDemo && (
        <WhatsAppModal onClose={() => setBotDemo(false)} />
      )}
    </header>
  );
}

function WhatsAppModal({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState([
    { from: "user", text: "Hey!", time: "10:00 AM" },
    { from: "bot", text: "👋 Hi! I'm your *Social Saver Bot*! Send me any Instagram, Twitter or Blog link and I'll save it to your knowledge base.", time: "10:00 AM" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const demoLinks = [
    "https://www.instagram.com/reel/abc123",
    "https://twitter.com/i/status/xyz789",
    "https://medium.com/fitness/morning-routine",
  ];

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const newMessages = [...messages, { from: "user", text, time: "now" }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = "";
      if (text.includes("instagram.com")) {
        reply = "✅ Got it! Saved to your *'Fitness'* bucket 🏋️\n\n📝 *Summary:* Morning stretch routine for better posture.\n🏷️ Tags: #fitness #morningstretch\n\nView it on your dashboard → socialsaver.app/dashboard";
      } else if (text.includes("twitter.com")) {
        reply = "✅ Got it! Saved to your *'Coding'* bucket 💻\n\n📝 *Summary:* 7 essential JavaScript array methods.\n🏷️ Tags: #javascript #coding\n\nView it → socialsaver.app/dashboard";
      } else if (text.includes("medium.com") || text.includes("blog")) {
        reply = "✅ Got it! Saved to your *'Fitness'* bucket 🏋️\n\n📝 *Summary:* Guide to building a productive morning routine.\n🏷️ Tags: #productivity #fitness\n\nView it → socialsaver.app/dashboard";
      } else if (text.toLowerCase().includes("help")) {
        reply = "🤖 *Social Saver Bot Help*\n\nJust send me a link!\n\n📸 Instagram Reels/Posts\n🐦 Twitter/X Threads\n📰 Blog Articles\n\nI'll auto-categorize & summarize using AI 🧠";
      } else {
        reply = "🤔 That doesn't look like a link. Try sending an Instagram, Twitter, or Blog URL!\n\nType *help* for more info.";
      }
      setMessages((prev) => [...prev, { from: "bot", text: reply, time: "now" }]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* WA Header */}
        <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="w-9 h-9 rounded-full bg-green-400 flex items-center justify-center text-lg">🤖</div>
          <div>
            <p className="font-semibold text-sm">Social Saver Bot</p>
            <p className="text-xs text-green-200">● Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="h-72 overflow-y-auto p-3 space-y-2 bg-[#ECE5DD]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-3 py-2 shadow-sm ${msg.from === "user" ? "bg-[#DCF8C6] rounded-tr-sm" : "bg-white rounded-tl-sm"}`}>
                <p className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                <p className="text-[10px] text-slate-400 text-right mt-0.5">{msg.time}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Demos */}
        <div className="px-3 py-2 bg-white border-t border-slate-100">
          <p className="text-[10px] text-slate-400 mb-1.5">Try sending a link:</p>
          <div className="flex gap-1.5 flex-wrap">
            {demoLinks.map((link) => (
              <button
                key={link}
                onClick={() => sendMessage(link)}
                className="text-[10px] bg-slate-100 hover:bg-purple-100 hover:text-purple-700 text-slate-600 px-2 py-1 rounded-lg transition-colors truncate max-w-[140px]"
              >
                {link.replace("https://", "")}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Paste a link or type 'help'..."
            className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <button
            onClick={() => sendMessage(input)}
            className="w-9 h-9 rounded-xl bg-[#25D366] text-white flex items-center justify-center hover:bg-[#128C7E] transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
