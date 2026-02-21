import { useState } from "react";

export function ArchitectureDiagram() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 px-3 py-2 rounded-lg hover:border-purple-300 hover:text-purple-700 transition-all"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        Architecture
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 overflow-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">System Architecture</h2>
                <p className="text-sm text-slate-500">How WhatsApp connects to your Knowledge Base</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Diagram */}
            <div className="flex flex-col gap-4">
              {/* Row 1: Input */}
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {[
                  { icon: "📱", label: "User", sub: "Sends link via WhatsApp", color: "bg-green-50 border-green-200" },
                  { icon: "💬", label: "WhatsApp", sub: "Twilio / Meta API", color: "bg-emerald-50 border-emerald-200" },
                ].map((node, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`flex flex-col items-center gap-1 border-2 rounded-2xl px-4 py-3 min-w-[110px] ${node.color}`}>
                      <span className="text-2xl">{node.icon}</span>
                      <span className="text-xs font-bold text-slate-700">{node.label}</span>
                      <span className="text-[10px] text-slate-500 text-center">{node.sub}</span>
                    </div>
                    {i === 0 && (
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1 text-green-600">
                          <div className="h-px w-8 bg-green-400" />
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                        <span className="text-[10px] text-slate-400">Webhook</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Arrow down */}
              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-1 text-slate-400">
                  <div className="w-px h-6 bg-slate-300" />
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" />
                  </svg>
                  <span className="text-[10px]">HTTP POST</span>
                </div>
              </div>

              {/* Row 2: Backend */}
              <div className="flex justify-center">
                <div className="border-2 border-blue-200 bg-blue-50 rounded-2xl px-6 py-4 max-w-sm w-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">⚙️</span>
                    <span className="text-sm font-bold text-blue-800">Backend Server</span>
                    <span className="text-[10px] text-blue-500 bg-blue-100 px-2 py-0.5 rounded-full">Python FastAPI</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { step: "1", label: "Parse URL & Platform", icon: "🔍" },
                      { step: "2", label: "Scrape Content (Instaloader / Nitter)", icon: "📥" },
                      { step: "3", label: "AI Auto-Tag & Summarize", icon: "🧠" },
                      { step: "4", label: "Save to Database", icon: "💾" },
                      { step: "5", label: "Send WhatsApp Reply", icon: "📤" },
                    ].map((s) => (
                      <div key={s.step} className="flex items-center gap-2 text-xs">
                        <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center font-bold text-[10px] shrink-0">{s.step}</span>
                        <span>{s.icon}</span>
                        <span className="text-slate-600">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 3: AI + DB side by side */}
              <div className="flex items-start justify-center gap-4 flex-wrap">
                {/* Arrow left branch */}
                <div className="flex flex-col items-center gap-1 mt-6">
                  <div className="flex items-center gap-1 text-violet-400">
                    <div className="h-px w-12 bg-violet-300 border-dashed border-t-2 border-violet-300" />
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-slate-400">AI Call</span>
                </div>

                <div className="border-2 border-violet-200 bg-violet-50 rounded-2xl px-5 py-4 text-center min-w-[140px]">
                  <span className="text-2xl">🧠</span>
                  <p className="text-xs font-bold text-violet-800 mt-1">AI / LLM</p>
                  <p className="text-[10px] text-violet-600 mt-0.5">Gemini / OpenAI</p>
                  <div className="mt-2 space-y-1">
                    <div className="text-[10px] bg-violet-100 text-violet-700 rounded-lg px-2 py-0.5">Auto-Tag</div>
                    <div className="text-[10px] bg-violet-100 text-violet-700 rounded-lg px-2 py-0.5">Summarize</div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-1 mt-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    <div className="h-px w-12 bg-amber-300" />
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-slate-400">Store</span>
                </div>

                <div className="border-2 border-amber-200 bg-amber-50 rounded-2xl px-5 py-4 text-center min-w-[140px]">
                  <span className="text-2xl">🗄️</span>
                  <p className="text-xs font-bold text-amber-800 mt-1">Database</p>
                  <p className="text-[10px] text-amber-600 mt-0.5">Firebase / MongoDB</p>
                  <div className="mt-2 space-y-1">
                    <div className="text-[10px] bg-amber-100 text-amber-700 rounded-lg px-2 py-0.5">Links</div>
                    <div className="text-[10px] bg-amber-100 text-amber-700 rounded-lg px-2 py-0.5">Metadata</div>
                    <div className="text-[10px] bg-amber-100 text-amber-700 rounded-lg px-2 py-0.5">Tags</div>
                  </div>
                </div>
              </div>

              {/* Arrow down */}
              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-1 text-slate-400">
                  <div className="w-px h-6 bg-slate-300" />
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" />
                  </svg>
                  <span className="text-[10px]">REST API</span>
                </div>
              </div>

              {/* Row 4: Dashboard */}
              <div className="flex justify-center">
                <div className="border-2 border-pink-200 bg-pink-50 rounded-2xl px-6 py-4 max-w-sm w-full text-center">
                  <span className="text-2xl">🖥️</span>
                  <p className="text-xs font-bold text-pink-800 mt-1">Social Saver Dashboard</p>
                  <p className="text-[10px] text-pink-600 mt-0.5">React + Vite + Tailwind</p>
                  <div className="flex justify-center gap-2 mt-2 flex-wrap">
                    {["Search", "Filter by Category", "Embed Reels", "AI Summaries"].map((f) => (
                      <span key={f} className="text-[10px] bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-slate-50 rounded-xl p-4 border border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 mb-2">Tech Stack</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: "Bot Interface", value: "Twilio / Meta API", icon: "💬" },
                  { label: "Backend", value: "Python FastAPI", icon: "⚙️" },
                  { label: "AI / LLM", value: "Gemini / OpenAI", icon: "🧠" },
                  { label: "Database", value: "Firebase / MongoDB", icon: "🗄️" },
                ].map((t) => (
                  <div key={t.label} className="bg-white border border-slate-200 rounded-xl p-2 text-center">
                    <div className="text-lg">{t.icon}</div>
                    <div className="text-[10px] font-bold text-slate-700 mt-0.5">{t.label}</div>
                    <div className="text-[10px] text-slate-500">{t.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
