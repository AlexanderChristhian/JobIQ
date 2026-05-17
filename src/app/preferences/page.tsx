"use client";

import { useState } from "react";
import data from "@/data/preferences.json";

const prefData = data;

export default function PreferencesPage() {
  const [salaryMin, setSalaryMin] = useState(prefData.salaryExpectation.min);
  const [salaryMax, setSalaryMax] = useState(prefData.salaryExpectation.max);
  const [workModels, setWorkModels] = useState<string[]>(prefData.workModel);
  const [roles, setRoles] = useState<string[]>(prefData.desiredRoles);
  const [keywords, setKeywords] = useState(prefData.keywords.join(", "));
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const toggleWorkModel = (model: string) => {
    setWorkModels(prev =>
      prev.includes(model) ? prev.filter(m => m !== model) : [...prev, model]
    );
  };

  const toggleRole = (role: string) => {
    setRoles(prev =>
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  const handleSave = () => {
    showToast("Preferences saved! AI recommendations will update shortly.");
  };

  const allRoles = ["Product Manager", "Product Lead", "Product Owner", "Product Designer", "Product Marketing Manager", "Associate Product Manager", "Technical Product Manager", "Growth Product Manager"];

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
            <a className="text-primary-dark text-sm font-bold leading-normal drop-shadow-[0_0_8px_rgba(192,132,252,0.4)]" href="/settings">Settings</a>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-white/10 bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">AM</div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl flex flex-col gap-8">
          <div>
            <h1 className="text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-2 drop-shadow-md">Preferences &amp; Settings</h1>
            <p className="text-slate-400 text-lg">Fine-tune your job search criteria for better AI recommendations.</p>
          </div>

          <div className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8">
            <h2 className="text-white text-xl font-bold flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
              <span className="material-symbols-outlined text-primary-dark">work</span>
              Job Requirements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="text-sm font-medium text-slate-400 mb-2 block">Min. Salary (annual)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <input type="number" value={salaryMin} onChange={(e) => setSalaryMin(Number(e.target.value))} className="w-full rounded-lg h-12 bg-white/5 border border-white/10 text-white pl-8 pr-4 focus:outline-none focus:border-primary-dark/50 focus:bg-white/10 transition-all" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-400 mb-2 block">Max. Salary (annual)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <input type="number" value={salaryMax} onChange={(e) => setSalaryMax(Number(e.target.value))} className="w-full rounded-lg h-12 bg-white/5 border border-white/10 text-white pl-8 pr-4 focus:outline-none focus:border-primary-dark/50 focus:bg-white/10 transition-all" />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8">
            <h2 className="text-white text-xl font-bold flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
              <span className="material-symbols-outlined text-primary-dark">business_center</span>
              Work Model
            </h2>
            <div className="flex flex-wrap gap-3">
              {["Remote", "Hybrid", "On-site"].map((model) => (
                <button key={model} onClick={() => toggleWorkModel(model)} className={`px-6 py-3 rounded-xl font-medium text-sm transition-all border ${workModels.includes(model) ? "bg-primary/20 border-primary-dark/60 text-primary-dark shadow-[0_0_15px_rgba(168,85,247,0.2)]" : "bg-white/5 border-white/10 text-slate-400 hover:border-primary-dark/40 hover:text-slate-200"}`}>
                  {model}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8">
            <h2 className="text-white text-xl font-bold flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
              <span className="material-symbols-outlined text-primary-dark">badge</span>
              Desired Roles
            </h2>
            <div className="flex flex-wrap gap-2">
              {allRoles.map((role) => (
                <button key={role} onClick={() => toggleRole(role)} className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${roles.includes(role) ? "bg-primary/20 border-primary-dark/60 text-primary-dark shadow-[0_0_12px_rgba(168,85,247,0.2)]" : "bg-white/5 border-white/10 text-slate-400 hover:border-primary-dark/40 hover:text-slate-200"}`}>
                  <span className={`material-symbols-outlined text-lg ${roles.includes(role) ? "text-primary-dark" : "text-slate-600"}`}>{roles.includes(role) ? "check_box" : "check_box_outline_blank"}</span>
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8">
            <h2 className="text-white text-xl font-bold flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
              <span className="material-symbols-outlined text-primary-dark">manage_search</span>
              Keywords &amp; Filters
            </h2>
            <label className="text-sm font-medium text-slate-400 mb-2 block">Keywords (comma separated)</label>
            <textarea value={keywords} onChange={(e) => setKeywords(e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 text-white p-4 h-24 focus:outline-none focus:border-primary-dark/50 focus:bg-white/10 transition-all resize-none" />
            <p className="text-xs text-slate-500 mt-2">Examples: agile, SaaS, B2B, machine learning, growth, UX</p>
          </div>

          <div className="flex justify-end gap-4">
            <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 font-medium text-sm hover:bg-white/10 transition-all">Reset</button>
            <button onClick={handleSave} className="px-8 py-3 rounded-xl bg-primary hover:bg-purple-500 text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">save</span>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
