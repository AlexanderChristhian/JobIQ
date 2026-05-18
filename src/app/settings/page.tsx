"use client";

import { useState } from "react";
import Header from "@/components/header";

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
		setNotifications((prev) =>
			prev.map((n, i) => (i === idx ? { ...n, enabled: !n.enabled } : n)),
		);
	};

	const toggleSource = (idx: number) => {
		setSources((prev) =>
			prev.map((s, i) => (i === idx ? { ...s, enabled: !s.enabled } : s)),
		);
	};

	const handleSave = () => {
		showToast("Settings saved successfully!");
	};

	const handleDangerAction = (action: string) => {
		setConfirmAction(action);
	};

	const confirmDanger = () => {
		if (confirmAction === "reset") {
			setNotifications(
				initialNotifications.map((n) => ({ ...n, enabled: false })),
			);
			setSources(initialSources.map((s) => ({ ...s, enabled: false })));
			showToast("Settings reset.");
		}
		setConfirmAction(null);
	};

	return (
		<div
			className="font-display text-slate-200 min-h-screen flex flex-col overflow-x-clip selection:bg-purple-500 selection:text-white"
			style={{
				backgroundColor: "#0f0518",
				backgroundImage:
					"radial-gradient(circle at 10% 20%, rgba(88, 28, 135, 0.4) 0%, transparent 40%), radial-gradient(circle at 90% 60%, rgba(126, 34, 206, 0.3) 0%, transparent 40%), radial-gradient(circle at 50% 120%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)",
				backgroundAttachment: "fixed",
			}}
		>
			{toast && (
				<div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-xl bg-purple-900/90 border border-purple-500/40 backdrop-blur-xl text-white text-sm font-medium shadow-[0_0_30px_rgba(168,85,247,0.3)]">
					{toast}
				</div>
			)}

			{confirmAction && (
				<div
					className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
					onClick={() => setConfirmAction(null)}
				>
					<div
						className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] p-6 max-w-sm w-full mx-4 border border-red-500/20"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex items-center gap-3 mb-4">
							<span className="material-symbols-outlined text-red-400 text-3xl">
								warning
							</span>
							<h2 className="text-white text-lg font-bold">Confirm Action</h2>
						</div>
						<p className="text-slate-300 text-sm mb-6">
							{confirmAction === "reset"
								? "This will turn off notifications and search platforms for this browser session."
								: "Confirm this action."}
						</p>
						<div className="flex justify-end gap-3">
							<button
								onClick={() => setConfirmAction(null)}
								className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-sm hover:bg-white/10 transition-all"
							>
								Cancel
							</button>
							<button
								onClick={confirmDanger}
								className="px-5 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-all shadow-[0_0_15px_rgba(239,68,68,0.25)]"
							>
								{confirmAction === "reset"
									? "Reset Settings"
									: "Confirm"}
							</button>
						</div>
					</div>
				</div>
			)}

			<Header activePage="settings" />

			<div className="flex-1 flex justify-center py-8 px-4 sm:px-6 lg:px-8">
				<div className="w-full max-w-4xl flex flex-col gap-8">
					<div>
						<h1 className="text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-2 drop-shadow-md">
							Settings
						</h1>
						<p className="text-slate-400 text-lg">
							Manage your account preferences and data sources.
						</p>
					</div>

					<div className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8">
						<h2 className="text-white text-xl font-bold flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
							<span className="material-symbols-outlined text-primary-dark">
								notifications
							</span>
							Notification Preferences
						</h2>
						<div className="space-y-4">
							{notifications.map((item, i) => (
								<div
									key={i}
									className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
								>
									<span className="text-slate-300 text-sm">{item.label}</span>
									<label className="relative inline-flex items-center cursor-pointer">
										<input
											type="checkbox"
											checked={item.enabled}
											onChange={() => toggleNotification(i)}
											className="sr-only peer"
										/>
										<div className="w-9 h-5 bg-white/10 rounded-full peer peer-checked:bg-purple-600 peer-checked:shadow-[0_0_10px_rgba(168,85,247,0.4)] transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
									</label>
								</div>
							))}
						</div>
					</div>

					<div className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8">
						<h2 className="text-white text-xl font-bold flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
							<span className="material-symbols-outlined text-primary-dark">
								storage
							</span>
							Search Platforms
						</h2>
						<div className="space-y-4">
							{sources.map((source, i) => (
								<div
									key={i}
									className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
								>
									<span className="text-slate-300 text-sm">{source.name}</span>
									<label className="relative inline-flex items-center cursor-pointer">
										<input
											type="checkbox"
											checked={source.enabled}
											onChange={() => toggleSource(i)}
											className="sr-only peer"
										/>
										<div className="w-9 h-5 bg-white/10 rounded-full peer peer-checked:bg-purple-600 peer-checked:shadow-[0_0_10px_rgba(168,85,247,0.4)] transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
									</label>
								</div>
							))}
						</div>
					</div>

					<div className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8">
						<h2 className="text-white text-xl font-bold flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
							<span className="material-symbols-outlined text-primary-dark">
								schedule
							</span>
							Recommendation Refresh
						</h2>
						<div className="flex items-center gap-4">
							<span className="text-slate-300 text-sm">
								Refresh recommendation checks:
							</span>
							<select
								value={schedule}
								onChange={(e) => setSchedule(e.target.value)}
								className="rounded-lg px-4 py-2.5 text-sm bg-white/5 border border-white/10 text-slate-300 appearance-none cursor-pointer flex-1 max-w-[200px] focus:outline-none focus:border-primary-dark/50 focus:bg-white/10 transition-all"
							>
								<option className="bg-[#1e1430]" value="Every hour">
									Every hour
								</option>
								<option className="bg-[#1e1430]" value="Every 6 hours">
									Every 6 hours
								</option>
								<option className="bg-[#1e1430]" value="Every 12 hours">
									Every 12 hours
								</option>
								<option className="bg-[#1e1430]" value="Daily">
									Daily
								</option>
							</select>
						</div>
					</div>

					<div className="flex justify-end">
						<button
							onClick={handleSave}
							className="px-8 py-3 rounded-xl bg-primary hover:bg-purple-500 text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center gap-2"
						>
							<span className="material-symbols-outlined text-lg">save</span>
							Save Settings
						</button>
					</div>

					<div className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8 border border-red-500/20">
						<h2 className="text-white text-xl font-bold flex items-center gap-3 mb-4">
							<span className="material-symbols-outlined text-red-400">
								warning
							</span>
							Danger Zone
						</h2>
						<p className="text-slate-400 text-sm mb-4">
							Account safety actions.
						</p>
						<div className="flex gap-4">
							<button
								onClick={() => handleDangerAction("reset")}
								className="px-6 h-10 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-bold hover:bg-red-500/20 transition-all"
							>
								Reset Settings
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
