"use client";

import { useState } from "react";

const initialNotifications = [
  { label: "New job recommendations", enabled: true },
  { label: "Application status updates", enabled: true },
  { label: "Interview reminders", enabled: true },
  { label: "Weekly digest email", enabled: false },
];

const initialSources = [
  { name: "LinkedIn", enabled: true },
  { name: "Glints", enabled: true },
  { name: "Kalibrr", enabled: true },
  { name: "JobStreet", enabled: true },
  { name: "Indeed", enabled: true },
];

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [sources, setSources] = useState(initialSources);
  const [schedule, setSchedule] = useState("Every 6 hours");
  const [toast, setToast] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const toggleNotification = (idx: number) => {
    setNotifications(prev => prev.map((n, i) => i === idx ? { ...n, enabled: !n.enabled } : n));
  };

  const toggleSource = (idx: number) => {
    setSources(prev => prev.map((s, i) => i === idx ? { ...s, enabled: !s.enabled } : s));
  };

  const handleSave = () => {
    showToast("Settings saved successfully!");
  };

  const handleDangerAction = (action: string) => {
    setConfirmAction(action);
  };

  const confirmDanger = () => {
    if (confirmAction === "reset") {
      setNotifications(initialNotifications.map(n => ({ ...n, enabled: false })));
      setSources(initialSources.map(s => ({ ...s, enabled: false })));
      showToast("All data has been reset to defaults.");
    } else if (confirmAction === "delete") {
      showToast("Account deletion request submitted (simulated).");
    }
    setConfirmAction(null);
  };

  return (
    <div className="font-display text-slate-200 min-h-screen flex flex-col overflow-x-hidden selection:bg-purple-500 selection:text-white" style={{ backgroundColor: "#0f0518", backgroundImage: "radial-gradient(circle at 10% 20%, rgba(88, 28, 135, 0.4) 0%, transparent 40%), radial-gradient(circle at 90% 60%, rgba(126, 34, 206, 0.3) 0%, transparent 40%), radial-gradient(circle at 50% 120%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)", backgroundAttachment: "fixed" }}>
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-xl bg-purple-900/90 border border-purple-500/40 backdrop-blur-xl text-white text-sm font-medium shadow-[0_0_30px_rgba(168,85,247,0.3)]">
          {toast}
        </div>
      )}

      {confirmAction && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setConfirmAction(null)}>
          <div className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] p-6 max-w-sm w-full mx-4 border border-red-500/20" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-red-400 text-3xl">warning</span>
              <h2 className="text-white text-lg font-bold">Confirm Action</h2>
            </div>
            <p className="text-slate-300 text-sm mb-6">
              {confirmAction === "reset" ? "This will reset all your settings and saved data. This action cannot be undone." : "This will permanently delete your account and all associated data. This action cannot be undone."}
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setConfirmAction(null)} className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-sm hover:bg-white/10 transition-all">Cancel</button>
              <button onClick={confirmDanger} className="px-5 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-all shadow-[0_0_15px_rgba(239,68,68,0.25)]">
                {confirmAction === "reset" ? "Reset Everything" : "Delete Account"}
              </button>
            </div>
          </div>
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
            <h1 className="text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-2 drop-shadow-md">Settings</h1>
            <p className="text-slate-400 text-lg">Manage your account preferences and data sources.</p>
          </div>

          <div className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8">
            <h2 className="text-white text-xl font-bold flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
              <span className="material-symbols-outlined text-primary-dark">notifications</span>
              Notification Preferences
            </h2>
            <div className="space-y-4">
              {notifications.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <span className="text-slate-300 text-sm">{item.label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={item.enabled} onChange={() => toggleNotification(i)} className="sr-only peer" />
                    <div className="w-9 h-5 bg-white/10 rounded-full peer peer-checked:bg-purple-600 peer-checked:shadow-[0_0_10px_rgba(168,85,247,0.4)] transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8">
            <h2 className="text-white text-xl font-bold flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
              <span className="material-symbols-outlined text-primary-dark">storage</span>
              Data Sources
            </h2>
            <div className="space-y-4">
              {sources.map((source, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <span className="text-slate-300 text-sm">{source.name}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={source.enabled} onChange={() => toggleSource(i)} className="sr-only peer" />
                    <div className="w-9 h-5 bg-white/10 rounded-full peer peer-checked:bg-purple-600 peer-checked:shadow-[0_0_10px_rgba(168,85,247,0.4)] transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8">
            <h2 className="text-white text-xl font-bold flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
              <span className="material-symbols-outlined text-primary-dark">schedule</span>
              Scraping Schedule
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-slate-300 text-sm">Check for new jobs every:</span>
              <select value={schedule} onChange={(e) => setSchedule(e.target.value)} className="rounded-lg px-4 py-2.5 text-sm bg-white/5 border border-white/10 text-slate-300 appearance-none cursor-pointer flex-1 max-w-[200px] focus:outline-none focus:border-primary-dark/50 focus:bg-white/10 transition-all">
                <option className="bg-[#1e1430]" value="Every hour">Every hour</option>
                <option className="bg-[#1e1430]" value="Every 6 hours">Every 6 hours</option>
                <option className="bg-[#1e1430]" value="Every 12 hours">Every 12 hours</option>
                <option className="bg-[#1e1430]" value="Daily">Daily</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={handleSave} className="px-8 py-3 rounded-xl bg-primary hover:bg-purple-500 text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">save</span>
              Save Settings
            </button>
          </div>

          <div className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8 border border-red-500/20">
            <h2 className="text-white text-xl font-bold flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-red-400">warning</span>
              Danger Zone
            </h2>
            <p className="text-slate-400 text-sm mb-4">Irreversible actions that affect your account data.</p>
            <div className="flex gap-4">
              <button onClick={() => handleDangerAction("reset")} className="px-6 h-10 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-bold hover:bg-red-500/20 transition-all">Reset All Data</button>
              <button onClick={() => handleDangerAction("delete")} className="px-6 h-10 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-bold hover:bg-red-500/20 transition-all">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
