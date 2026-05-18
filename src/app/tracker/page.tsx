"use client";

import { useState } from "react";
import Header from "@/components/header";
import { useSocket, useSocketListener } from "@/lib/SocketProvider";
import type { TrackerSuggestion } from "@/lib/wizard-types";

interface TrackerSuggestionApiResponse extends TrackerSuggestion {
	aiStatus?: "live" | "mock";
	model?: string;
	message?: string;
}

type Stage = "applied" | "screening" | "interviewing" | "offer";

const stageLabels: Record<Stage, string> = {
	applied: "Applied",
	screening: "Screening",
	interviewing: "Interview",
	offer: "Offer",
};

const stageColors: Record<Stage, string> = {
	applied: "bg-blue-500/20 text-blue-400 border-blue-500/30",
	screening: "bg-amber-500/20 text-amber-400 border-amber-500/30",
	interviewing: "bg-purple-500/20 text-purple-400 border-purple-500/30",
	offer: "bg-green-500/20 text-green-400 border-green-500/30",
};

interface ApplicationItem {
	id: string;
	title: string;
	company: string;
	location: string;
	timeAgo: string;
	aiSuggestion?: string;
	actionLabel?: string;
	interviewers?: number;
	reminderSet?: boolean;
	stage: Stage;
}

export default function TrackerPage() {
	const { wizardConnected, emit } = useSocket();
	const [expanded, setExpanded] = useState<string | null>(null);
	const [showForm, setShowForm] = useState(false);
	const [toast, setToast] = useState<string | null>(null);
	const [applications, setApplications] = useState<ApplicationItem[]>([]);
	const [newApp, setNewApp] = useState({
		company: "",
		role: "",
		stage: "applied" as Stage,
	});
	const [loadingSuggestion, setLoadingSuggestion] = useState<string | null>(
		null,
	);

	const showToast = (msg: string) => {
		setToast(msg);
		setTimeout(() => setToast(null), 2500);
	};

	const toggleExpand = (id: string) => {
		setExpanded((prev) => (prev === id ? null : id));
	};

	useSocketListener<TrackerSuggestion>("tracker:send_suggestion", (data) => {
		setApplications((prev) =>
			prev.map((app) =>
				app.id === data.cardId
					? { ...app, aiSuggestion: data.suggestion }
					: app,
			),
		);
		setLoadingSuggestion(null);
		showToast("AI suggestion received!");
	});

	const handleAddApplication = () => {
		if (!newApp.company.trim() || !newApp.role.trim()) return;
		const app = {
			id: `tr_${Date.now()}`,
			title: newApp.role,
			company: newApp.company,
			location: "",
			timeAgo: "Just now",
			stage: newApp.stage,
		};
		setApplications((prev) => [app, ...prev]);
		setShowForm(false);
		setNewApp({ company: "", role: "", stage: "applied" });
		showToast("Application added to tracker!");
	};

	const handleGetSuggestion = async (app: (typeof applications)[0]) => {
		if (wizardConnected) {
			setLoadingSuggestion(app.id);
			emit("tracker:request_suggestion", {
				cardId: app.id,
				title: app.title,
				company: app.company,
				stage: app.stage,
			});
			showToast("Requesting AI suggestion...");
			return;
		}

		setLoadingSuggestion(app.id);
		try {
			const response = await fetch("/api/ai/tracker-suggestion", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					cardId: app.id,
					title: app.title,
					company: app.company,
					stage: app.stage,
					currentSuggestion: app.aiSuggestion ?? "",
				}),
			});

			if (!response.ok) throw new Error("AI tracker request failed.");

			const data = (await response.json()) as TrackerSuggestionApiResponse;
			setApplications((prev) =>
				prev.map((a) =>
					a.id === app.id ? { ...a, aiSuggestion: data.suggestion } : a,
				),
			);
			showToast(
				data.aiStatus === "live"
					? "AI suggestion generated!"
					: "Suggestion generated.",
			);
		} catch {
			showToast("AI suggestion is unavailable right now.");
		} finally {
			setLoadingSuggestion(null);
		}
	};

	const handleReminder = (id: string) => {
		setApplications((prev) =>
			prev.map((app) =>
				app.id === id ? { ...app, reminderSet: !app.reminderSet } : app,
			),
		);
		showToast("Reminder updated.");
	};

	const updateStage = (id: string, stage: Stage) => {
		setApplications((prev) =>
			prev.map((app) => (app.id === id ? { ...app, stage } : app)),
		);
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

			{wizardConnected && (
				<div className="fixed top-2 right-4 z-[100] px-3 py-1.5 rounded-lg bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-medium flex items-center gap-1.5">
					<span className="size-2 rounded-full bg-green-400 animate-pulse" />
					Advisor online
				</div>
			)}

			<Header activePage="tracker" />

			{showForm && (
				<div
					className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
					onClick={() => setShowForm(false)}
				>
					<div
						className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] p-6 max-w-md w-full mx-4 border border-white/10"
						onClick={(e) => e.stopPropagation()}
					>
						<h2 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
							<span className="material-symbols-outlined text-primary-dark">
								add_circle
							</span>
							New Application
						</h2>
						<div className="space-y-4">
							<div>
								<label className="text-sm text-slate-400 mb-1.5 block">
									Company
								</label>
								<input
									type="text"
									value={newApp.company}
									onChange={(e) =>
										setNewApp((prev) => ({ ...prev, company: e.target.value }))
									}
									className="w-full rounded-lg h-12 bg-white/5 border border-white/10 text-white px-4 focus:outline-none focus:border-primary-dark/50 focus:bg-white/10 transition-all"
									placeholder="Company name"
								/>
							</div>
							<div>
								<label className="text-sm text-slate-400 mb-1.5 block">
									Role
								</label>
								<input
									type="text"
									value={newApp.role}
									onChange={(e) =>
										setNewApp((prev) => ({ ...prev, role: e.target.value }))
									}
									className="w-full rounded-lg h-12 bg-white/5 border border-white/10 text-white px-4 focus:outline-none focus:border-primary-dark/50 focus:bg-white/10 transition-all"
									placeholder="Role title"
								/>
							</div>
							<div>
								<label className="text-sm text-slate-400 mb-1.5 block">
									Stage
								</label>
								<select
									value={newApp.stage}
									onChange={(e) =>
										setNewApp((prev) => ({
											...prev,
											stage: e.target.value as Stage,
										}))
									}
									className="w-full rounded-lg h-12 bg-white/5 border border-white/10 text-white px-4 focus:outline-none focus:border-primary-dark/50 focus:bg-white/10 transition-all cursor-pointer"
								>
									<option value="applied">Applied</option>
									<option value="screening">Screening</option>
									<option value="interviewing">Interview</option>
									<option value="offer">Offer</option>
								</select>
							</div>
						</div>
						<div className="flex justify-end gap-3 mt-6">
							<button
								onClick={() => setShowForm(false)}
								className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-sm hover:bg-white/10 transition-all"
							>
								Cancel
							</button>
							<button
								onClick={handleAddApplication}
								className="px-5 py-2.5 rounded-lg bg-primary hover:bg-purple-500 text-white text-sm font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.25)]"
							>
								Add Application
							</button>
						</div>
					</div>
				</div>
			)}

			<div className="flex-1 flex justify-center py-8 px-4 sm:px-6 lg:px-8">
				<div className="w-full max-w-7xl flex flex-col gap-8">
					<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
						<div>
							<h1 className="text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-2 drop-shadow-md">
								Application Tracker
							</h1>
							<p className="text-slate-400 text-lg">
								{applications.length} active application
								{applications.length !== 1 ? "s" : ""}
							</p>
						</div>
						<button
							onClick={() => setShowForm(true)}
							className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary hover:bg-purple-500 text-white text-sm font-bold transition-all shadow-[0_0_20px_rgba(168,85,247,0.25)] self-start"
						>
							<span className="material-symbols-outlined text-lg">add</span>
							New Application
						</button>
					</div>

					<div className="grid grid-cols-1 gap-4">
						{applications.length === 0 && (
							<div className="glass-panel rounded-xl p-12 text-center border border-white/10">
								<span className="material-symbols-outlined text-5xl text-slate-600 mb-4">
									track_changes
								</span>
								<h2 className="text-white text-xl font-bold">
									No applications yet
								</h2>
								<p className="text-slate-500 mt-2 max-w-md mx-auto">
									Add your first application to start tracking stages, reminders,
									and next actions.
								</p>
							</div>
						)}
						{applications.map((app) => {
							const isExpanded = expanded === app.id;
							return (
								<div
									key={app.id}
									className={`glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-300 cursor-pointer ${isExpanded ? "ring-1 ring-primary-dark/40" : "hover:ring-1 hover:ring-white/10"}`}
									onClick={() => toggleExpand(app.id)}
								>
									<div className="p-5 md:p-6">
										<div className="flex items-start justify-between gap-4">
											<div className="flex items-start gap-4 min-w-0">
												<div className="size-12 rounded-xl bg-gradient-to-br from-purple-600/30 to-slate-800/30 border border-white/10 flex items-center justify-center flex-shrink-0 text-lg font-bold text-primary-dark">
													{app.company[0]}
												</div>
												<div className="min-w-0">
													<h3 className="text-white font-bold text-lg leading-snug">
														{app.title}
													</h3>
													<p className="text-slate-400 text-sm">
														{app.company}
														{app.location ? ` • ${app.location}` : ""}
													</p>
													<div className="flex items-center gap-3 mt-2">
														<span
															className={`text-xs font-medium px-2.5 py-1 rounded-full border ${stageColors[app.stage] || stageColors.applied}`}
														>
															{stageLabels[app.stage]}
														</span>
														<span className="text-xs text-slate-500">
															{app.timeAgo}
														</span>
													</div>
													{app.aiSuggestion && (
														<div className="mt-2 flex items-start gap-2 text-xs text-purple-300 bg-purple-500/10 px-3 py-2 rounded-lg border border-purple-500/20">
															<span className="material-symbols-outlined text-[16px] text-primary-dark flex-shrink-0">
																auto_awesome
															</span>
															{app.aiSuggestion}
														</div>
													)}
													{loadingSuggestion === app.id && (
														<div className="mt-2 flex items-center gap-2 text-xs text-purple-300 bg-purple-500/10 px-3 py-2 rounded-lg border border-purple-500/20">
															<span className="material-symbols-outlined text-[16px] animate-spin">
																progress_activity
															</span>
															Waiting for AI suggestion...
														</div>
													)}
													{app.reminderSet && (
														<div className="mt-2 flex items-center gap-2 text-xs text-cyan-300 bg-cyan-500/10 px-3 py-2 rounded-lg border border-cyan-500/20">
															<span className="material-symbols-outlined text-[16px]">
																notifications
															</span>
															Follow-up reminder active
														</div>
													)}
												</div>
											</div>
											<span
												className={`material-symbols-outlined text-slate-500 transition-transform ${isExpanded ? "rotate-180" : ""}`}
											>
												expand_more
											</span>
										</div>

										{isExpanded && (
											<div className="mt-4 pt-4 border-t border-white/5 space-y-4">
												<div>
													<label className="text-xs text-slate-500 mb-1.5 block font-medium">
														Notes
													</label>
													<textarea
														placeholder="Add notes about this application..."
														className="w-full rounded-lg bg-white/5 border border-white/10 text-white text-sm p-3 h-24 resize-none focus:outline-none focus:border-primary-dark/50 focus:bg-white/10 transition-all placeholder:text-slate-600"
														onClick={(e) => e.stopPropagation()}
													/>
												</div>
												<div className="flex items-center gap-3">
													<button
														onClick={(e) => {
															e.stopPropagation();
															handleReminder(app.id);
														}}
														className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-medium hover:bg-white/10 transition-all"
													>
														<span className="material-symbols-outlined text-lg">
															notifications
														</span>
														{app.reminderSet ? "Clear Reminder" : "Set Reminder"}
													</button>
													<button
														onClick={(e) => {
															e.stopPropagation();
															handleGetSuggestion(app);
														}}
														className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary/20 border border-primary-dark/40 text-primary-dark text-xs font-medium hover:bg-primary/30 transition-all"
													>
														<span className="material-symbols-outlined text-lg">
															auto_awesome
														</span>
														{app.aiSuggestion
															? "Get New Suggestion"
															: "Get AI Suggestion"}
													</button>
													<select
														value={app.stage}
														onClick={(e) => e.stopPropagation()}
														onChange={(e) =>
															updateStage(app.id, e.target.value as Stage)
														}
														className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-medium hover:bg-white/10 transition-all"
													>
														<option value="applied">Applied</option>
														<option value="screening">Screening</option>
														<option value="interviewing">Interview</option>
														<option value="offer">Offer</option>
													</select>
												</div>
											</div>
										)}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
