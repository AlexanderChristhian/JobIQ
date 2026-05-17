"use client";

import { useState, useEffect } from "react";
import data from "@/data/recommendations.json";
import { useSocket, useSocketListener } from "@/lib/SocketProvider";
import type { RecommendationJob } from "@/lib/wizard-types";
import Header from "@/components/header";

const initialJobs = data.jobs;

export default function DashboardPage() {
	const { wizardConnected, emit } = useSocket();
	const [jobs, setJobs] = useState(initialJobs);
	const [feedback, setFeedback] = useState<
		Record<string, "up" | "down" | null>
	>({});
	const [notes, setNotes] = useState<Record<string, string>>({});
	const [savedNotes, setSavedNotes] = useState<Record<string, string>>({});
	const [toast, setToast] = useState<string | null>(null);
	const [noteToast, setNoteToast] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [requestedOnce, setRequestedOnce] = useState(false);

	const showToast = (msg: string) => {
		setToast(msg);
		setTimeout(() => setToast(null), 2500);
	};

	useEffect(() => {
		if (wizardConnected && !requestedOnce) {
			setRequestedOnce(true);
			setLoading(true);
			emit("recommendations:request", { timestamp: Date.now() });
		}
	}, [wizardConnected, emit, requestedOnce]);

	useSocketListener<{ jobs: RecommendationJob[] }>(
		"recommendations:send_results",
		(data) => {
			setJobs(data.jobs);
			setLoading(false);
			showToast("AI recommendations received!");
		},
	);

	const handleFeedback = (id: string, type: "up" | "down") => {
		setFeedback((prev) => {
			const current = prev[id];
			if (current === type) return { ...prev, [id]: null };
			return { ...prev, [id]: type };
		});
		if (feedback[id] !== type) {
			showToast(
				type === "up"
					? "Thanks for your feedback! We'll find more like this."
					: "Thanks! We'll adjust your recommendations.",
			);
		}
	};

	const handleDismiss = (id: string) => {
		setJobs((prev) => prev.filter((j) => j.id !== id));
		showToast("Job dismissed.");
	};

	const handleSaveNote = (id: string) => {
		setSavedNotes((prev) => ({ ...prev, [id]: notes[id] || "" }));
		setNoteToast("Note saved!");
		setTimeout(() => setNoteToast(null), 2000);
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
				<div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-xl bg-purple-900/90 border border-purple-500/40 backdrop-blur-xl text-white text-sm font-medium shadow-[0_0_30px_rgba(168,85,247,0.3)] animate-in slide-in-from-top-2 transition-all">
					{toast}
				</div>
			)}
			{noteToast && (
				<div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-5 py-2.5 rounded-xl bg-green-900/90 border border-green-500/30 backdrop-blur-xl text-white text-sm font-medium shadow-[0_0_20px_rgba(74,222,128,0.2)]">
					{noteToast}
				</div>
			)}

			{wizardConnected && (
				<div className="fixed top-2 right-4 z-[100] px-3 py-1.5 rounded-lg bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-medium flex items-center gap-1.5">
					<span className="size-2 rounded-full bg-green-400 animate-pulse" />
					Wizard Connected
				</div>
			)}

			<Header activePage="dashboard" />

			<div className="flex-1 flex justify-center py-8 px-4 sm:px-6 lg:px-8">
				<div className="w-full max-w-7xl flex flex-col gap-8">
					<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
						<div>
							<h1 className="text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-2 drop-shadow-md">
								AI Job Recommendations
							</h1>
							<p className="text-slate-400 text-lg">
								Curated for you based on your profile. Tap thumbs up/down to
								train your AI.
							</p>
						</div>
						<div className="flex items-center gap-3">
							<span className="text-sm text-slate-500">Sort by</span>
							<select className="rounded-lg h-10 px-4 bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-dark focus:ring-1 focus:ring-primary-dark/30 cursor-pointer">
								<option>Match Score</option>
								<option>Date Posted</option>
								<option>Salary</option>
							</select>
						</div>
					</div>

					{loading && (
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							{[1, 2, 3, 4].map((i) => (
								<div
									key={i}
									className="glass-panel rounded-xl p-6 md:p-8 animate-pulse"
								>
									<div className="flex items-start gap-4 mb-4">
										<div className="size-14 rounded-xl bg-slate-800" />
										<div className="flex-1 space-y-2">
											<div className="h-5 bg-slate-800 rounded w-3/4" />
											<div className="h-3 bg-slate-800 rounded w-1/2" />
										</div>
									</div>
									<div className="space-y-2">
										<div className="h-3 bg-slate-800 rounded" />
										<div className="h-3 bg-slate-800 rounded w-5/6" />
									</div>
									<div className="flex gap-2 mt-4">
										<div className="h-6 w-16 bg-slate-800 rounded-full" />
										<div className="h-6 w-20 bg-slate-800 rounded-full" />
									</div>
								</div>
							))}
						</div>
					)}

					{!loading && (
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							{jobs.length === 0 && (
								<div className="lg:col-span-2 glass-panel rounded-xl p-16 text-center">
									<span className="material-symbols-outlined text-6xl text-slate-600 mb-4">
										sentiment_dissatisfied
									</span>
									<h3 className="text-xl font-bold text-slate-400">
										No more recommendations
									</h3>
									<p className="text-slate-500 mt-2">
										Check back later or update your profile for new matches.
									</p>
								</div>
							)}

							{jobs.map((job) => (
								<div
									key={job.id}
									className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden group relative"
								>
									<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600 opacity-60"></div>
									<div className="p-6 md:p-8">
										<div className="flex justify-between items-start mb-4">
											<div className="flex items-start gap-4 flex-1 min-w-0">
												<div className="size-14 rounded-xl bg-gradient-to-br from-purple-600/30 to-slate-800/30 border border-white/10 flex items-center justify-center flex-shrink-0 text-xl font-bold text-primary-dark shadow-[0_0_10px_rgba(147,51,234,0.2)]">
													{job.company[0]}
												</div>
												<div className="min-w-0">
													<h3 className="text-lg font-bold text-white leading-snug tracking-wide">
														{job.title}
													</h3>
													<p className="text-slate-400 text-sm mt-0.5">
														{job.company} • {job.location}
													</p>
													<div className="flex items-center gap-2 mt-2 flex-wrap">
														<span className="text-xs font-bold text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full border border-green-500/20 shadow-[0_0_8px_rgba(74,222,128,0.1)]">
															{job.matchScore}% Match
														</span>
														<span className="text-xs text-slate-500">
															{job.salaryRange}
														</span>
														<span className="text-xs text-slate-500">
															{job.postedAt}
														</span>
													</div>
												</div>
											</div>
										</div>

										<p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
											{job.description}
										</p>

										<div className="flex flex-wrap gap-1.5 mb-5">
											{job.techStack.slice(0, 4).map((skill, i) => (
												<span
													key={i}
													className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-slate-300 bg-white/5 border border-white/10 group-hover:border-primary-dark/30 group-hover:bg-purple-500/10 transition-all"
												>
													{skill}
												</span>
											))}
											{job.techStack.length > 4 && (
												<span className="text-xs text-slate-500 px-2 py-1">
													+{job.techStack.length - 4}
												</span>
											)}
										</div>

										<div className="flex items-center justify-between pt-3 border-t border-white/5">
											<div className="flex items-center gap-1">
												<button
													onClick={() => handleFeedback(job.id, "up")}
													className={`p-2 rounded-lg transition-all ${feedback[job.id] === "up" ? "text-green-400 bg-green-500/10 shadow-[0_0_10px_rgba(74,222,128,0.15)]" : "text-slate-500 hover:text-green-400 hover:bg-green-500/10"}`}
												>
													<span className="material-symbols-outlined text-xl">
														{feedback[job.id] === "up"
															? "thumb_up"
															: "thumb_up_off_alt"}
													</span>
												</button>
												<button
													onClick={() => handleFeedback(job.id, "down")}
													className={`p-2 rounded-lg transition-all ${feedback[job.id] === "down" ? "text-red-400 bg-red-500/10 shadow-[0_0_10px_rgba(248,113,113,0.15)]" : "text-slate-500 hover:text-red-400 hover:bg-red-500/10"}`}
												>
													<span className="material-symbols-outlined text-xl">
														{feedback[job.id] === "down"
															? "thumb_down"
															: "thumb_down_off_alt"}
													</span>
												</button>
												<button
													onClick={() => handleDismiss(job.id)}
													className="p-2 rounded-lg text-slate-500 hover:text-amber-400 hover:bg-amber-500/10 transition-all ml-1"
												>
													<span className="material-symbols-outlined text-xl">
														close
													</span>
												</button>
											</div>
											<div className="flex items-center gap-3">
												<button
													onClick={() => handleSaveNote(job.id)}
													className="text-xs text-slate-500 hover:text-primary-dark transition-colors flex items-center gap-1"
												>
													<span className="material-symbols-outlined text-[16px]">
														stylus_note
													</span>
													{savedNotes[job.id] ? "Saved" : "Note"}
												</button>
												<a
													href="#"
													onClick={(e) => {
														e.preventDefault();
														showToast(
															"Opening external application page for " +
																job.title,
														);
													}}
													className="px-4 py-2 rounded-lg bg-primary hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]"
												>
													Apply Externally
												</a>
											</div>
										</div>

										<div className="mt-3">
											<textarea
												placeholder="Personal notes..."
												value={notes[job.id] || ""}
												onChange={(e) =>
													setNotes((prev) => ({
														...prev,
														[job.id]: e.target.value,
													}))
												}
												className="w-full rounded-lg bg-white/5 border border-white/10 text-white text-xs p-3 h-16 resize-none focus:outline-none focus:border-primary-dark/50 focus:bg-white/10 transition-all placeholder:text-slate-600"
											/>
											<div className="flex justify-end mt-1">
												<button
													onClick={() => handleSaveNote(job.id)}
													className="text-xs text-primary-dark hover:text-white transition-colors px-3 py-1 rounded-md hover:bg-primary/20"
												>
													Save Note
												</button>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
