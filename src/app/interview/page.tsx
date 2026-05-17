"use client";

import { useState } from "react";

const feedbackItems = [
  { id: "clarity", label: "Clarity", base: 75 },
  { id: "relevance", label: "Relevance", base: 82 },
  { id: "confidence", label: "Confidence", base: 68 },
  { id: "structure", label: "Structure", base: 70 },
];

const checklistItems = [
  { id: "research", label: "Research the company and role" },
  { id: "stories", label: "Prepare 3 STAR stories" },
  { id: "questions", label: "Prepare 2-3 follow-up questions" },
  { id: "tech", label: "Review technical concepts" },
  { id: "fit", label: "Review behavioral fit" },
  { id: "resume", label: "Re-read your resume" },
];

const sampleQuestions = [
  "Tell me about yourself",
  "Why are you interested in this role?",
  "Describe a time you led a cross-functional team",
  "How do you prioritize competing deadlines?",
  "What's your biggest professional achievement?",
];

export default function InterviewPage() {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState(() => feedbackItems.map(f => ({ ...f, score: f.base })));
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [micActive, setMicActive] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleSubmitAnswer = () => {
    if (!answer.trim()) return;
    setSubmitted(true);
    const newFeedback = feedback.map(f => ({
      ...f,
      score: Math.min(100, f.score + Math.floor(Math.random() * 15 - 5)),
    }));
    setTimeout(() => setFeedback(newFeedback), 800);
    setTimeout(() => showToast("AI analysis complete! See your feedback below."), 1200);
  };

  const toggleCheck = (id: string) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMic = () => {
    setMicActive(prev => !prev);
    if (!micActive) {
      showToast("Mic activated (simulated) — speak your answer.");
    } else {
      showToast("Mic deactivated.");
    }
  };

  const nextQuestion = () => {
    setCurrentQuestion(prev => (prev + 1) % sampleQuestions.length);
    setAnswer("");
    setSubmitted(false);
    setFeedback(feedbackItems.map(f => ({ ...f, score: f.base })));
  };

  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="font-display text-slate-200 min-h-screen flex flex-col overflow-x-hidden selection:bg-purple-500 selection:text-white" style={{ backgroundColor: "#0f0518", backgroundImage: "radial-gradient(circle at 10% 20%, rgba(88, 28, 135, 0.4) 0%, transparent 40%), radial-gradient(circle at 90% 60%, rgba(126, 34, 206, 0.3) 0%, transparent 40%), radial-gradient(circle at 50% 120%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)", backgroundAttachment: "fixed" }}>
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-xl bg-purple-900/90 border border-purple-500/40 backdrop-blur-xl text-white text-sm font-medium shadow-[0_0_30px_rgba(168,85,247,0.3)]">
          {toast}
        </div>
      )}

      <header className="flex items-center justify-between whitespace-nowrap border-b border-white/10 glass-panel px-10 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-white">
            <div className="size-8 text-primary-dark drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]">
              <span className="material-symbols-outlined text-3xl">radar</span>
            </div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-wide drop-shadow-sm">JobIQ</h2>
          </div>
          <label className="hidden lg:flex flex-col min-w-40 !h-10 max-w-64">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full ring-1 ring-white/10 bg-white/5 focus-within:ring-primary-dark/50 transition-all">
              <div className="text-slate-400 flex border-none items-center justify-center pl-4 rounded-l-lg border-r-0">
                <span className="material-symbols-outlined text-lg">search</span>
              </div>
              <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-transparent focus:border-none h-full placeholder:text-slate-500 px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal" placeholder="Search jobs, skills..." />
            </div>
          </label>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="hidden md:flex items-center gap-9">
            <a className="text-slate-300 text-sm font-medium leading-normal hover:text-primary-dark hover:drop-shadow-[0_0_5px_rgba(192,132,252,0.5)] transition-all" href="/">Dashboard</a>
            <a className="text-slate-300 text-sm font-medium leading-normal hover:text-primary-dark hover:drop-shadow-[0_0_5px_rgba(192,132,252,0.5)] transition-all" href="/saved-jobs">Jobs</a>
            <a className="text-slate-300 text-sm font-medium leading-normal hover:text-primary-dark hover:drop-shadow-[0_0_5px_rgba(192,132,252,0.5)] transition-all" href="/profile">Profile</a>
            <a className="text-slate-300 text-sm font-medium leading-normal hover:text-primary-dark hover:drop-shadow-[0_0_5px_rgba(192,132,252,0.5)] transition-all" href="/settings">Settings</a>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-white/10 bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">AM</div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div>
              <h1 className="text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-2 drop-shadow-md">Mock Interview</h1>
              <p className="text-slate-400 text-lg">Practice answering interview questions and get instant AI feedback.</p>
            </div>

            <div className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary-dark">quiz</span>
                  <span className="text-sm text-slate-500">Question {currentQuestion + 1} of {sampleQuestions.length}</span>
                </div>
                <button onClick={nextQuestion} className="flex items-center gap-1 text-sm text-primary-dark hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-lg">shuffle</span>
                  Next Question
                </button>
              </div>

              <div className="mb-6 p-5 rounded-xl bg-gradient-to-r from-purple-900/30 to-indigo-900/20 border border-purple-500/20">
                <p className="text-white text-lg font-bold leading-relaxed">&ldquo;{sampleQuestions[currentQuestion]}&rdquo;</p>
              </div>

              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here... (or use the mic to record)"
                className="w-full rounded-lg bg-white/5 border border-white/10 text-white p-4 h-36 focus:outline-none focus:border-primary-dark/50 focus:bg-white/10 transition-all resize-none text-sm leading-relaxed placeholder:text-slate-600"
              />

              <div className="flex items-center justify-between mt-4">
                <button onClick={toggleMic} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all border ${micActive ? "bg-red-500/20 border-red-500/60 text-red-400 shadow-[0_0_15px_rgba(248,113,113,0.2)]" : "bg-white/5 border-white/10 text-slate-400 hover:border-primary-dark/40"}`}>
                  <span className="material-symbols-outlined text-lg">{micActive ? "mic" : "mic_off"}</span>
                  {micActive ? "Recording..." : "Use Mic"}
                </button>
                <button onClick={handleSubmitAnswer} disabled={!answer.trim()} className="px-6 py-2.5 rounded-lg bg-primary hover:bg-purple-500 text-white text-sm font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.25)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">auto_awesome</span>
                  Analyze Answer
                </button>
              </div>
            </div>

            {submitted && (
              <div className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8">
                <h2 className="text-white text-xl font-bold flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                  <span className="material-symbols-outlined text-primary-dark">insights</span>
                  AI Feedback
                </h2>
                <div className="space-y-5">
                  {feedback.map((f) => (
                    <div key={f.id}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-300">{f.label}</span>
                        <span className={`text-sm font-bold ${f.score >= 80 ? "text-green-400" : f.score >= 60 ? "text-amber-400" : "text-red-400"}`}>{f.score}%</span>
                      </div>
                      <div className="w-full bg-slate-800/50 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-2.5 rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${f.score}%`,
                            background: f.score >= 80
                              ? "linear-gradient(90deg, #22c55e, #4ade80)"
                              : f.score >= 60
                              ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                              : "linear-gradient(90deg, #ef4444, #f87171)",
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-900/30 to-indigo-900/20 border border-purple-500/20">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary-dark">tips_and_updates</span>
                    <div>
                      <p className="text-sm font-bold text-white mb-1">AI Suggestion</p>
                      <p className="text-sm text-slate-300">Try to include a specific metric or outcome in your response. Quantified results make answers more impactful.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-5 sticky top-28">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                <h2 className="text-white text-base font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-dark">checklist</span>
                  Prep Checklist
                </h2>
                <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded">{checkedCount}/{checklistItems.length}</span>
              </div>
              <div className="space-y-2.5">
                {checklistItems.map((item) => (
                  <button key={item.id} onClick={() => toggleCheck(item.id)} className="w-full flex items-center gap-3 p-2.5 rounded-lg text-left hover:bg-white/5 transition-all group">
                    <span className={`material-symbols-outlined text-lg flex-shrink-0 transition-all ${checked[item.id] ? "text-green-400" : "text-slate-600 group-hover:text-slate-400"}`}>
                      {checked[item.id] ? "check_circle" : "radio_button_unchecked"}
                    </span>
                    <span className={`text-sm transition-all ${checked[item.id] ? "text-slate-500 line-through" : "text-slate-300 group-hover:text-white"}`}>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-5">
              <h2 className="text-white text-base font-bold flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
                <span className="material-symbols-outlined text-primary-dark">schedule</span>
                Quick Tips
              </h2>
              <ul className="space-y-3">
                {["Use the STAR method", "Keep responses under 2 minutes", "Include measurable results", "Practice with the mic feature"].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                    <span className="material-symbols-outlined text-lg text-primary-dark flex-shrink-0">check_small</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
