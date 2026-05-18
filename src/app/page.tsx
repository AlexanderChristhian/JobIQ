"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useSocket, useSocketListener } from "@/lib/SocketProvider";
import type { RecommendationJob } from "@/lib/wizard-types";
import Header from "@/components/header";

const initialJobs: RecommendationJob[] = [];

type AiStatus = "static" | "loading" | "live" | "mock" | "wizard";

interface RecommendationsApiResponse {
	jobs: RecommendationJob[];
	aiStatus?: "live" | "mock";
	model?: string;
	message?: string;
}

const confidenceStyles: Record<RecommendationJob["confidenceBand"], string> = {
	high: "text-green-400 bg-green-500/10 border-green-500/20",
	medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
	low: "text-red-400 bg-red-500/10 border-red-500/20",
};

const aiStatusLabels: Record<AiStatus, string> = {
	static: "Ready",
	loading: "Analyzing",
	live: "AI personalized",
	mock: "Needs CV",
	wizard: "Advisor review",
};

function formatRiskFlag(flag: string) {
	return flag
		.split("-")
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");
}

function buildJobSearchUrl(job: RecommendationJob) {
	const query = [job.title, job.location, ...job.techStack.slice(0, 3), "jobs"]
		.filter(Boolean)
		.join(" ");
	return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

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
	const [requestedMode, setRequestedMode] = useState<"none" | "ai" | "wizard">(
		"none",
	);
	const [aiStatus, setAiStatus] = useState<AiStatus>("static");
	const [aiMessage, setAiMessage] = useState(
		"Upload your CV to generate recommendations.",
	);

	const showToast = useCallback((msg: string) => {
		setToast(msg);
		setTimeout(() => setToast(null), 2500);
	}, []);

	const requestAiRecommendations = useCallback(async () => {
		setLoading(true);
		setAiStatus("loading");
		setAiMessage("Analyzing profile, preferences, and feedback...");

		try {
			const response = await fetch("/api/ai/recommendations", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ feedback, notes }),
			});

			if (!response.ok) throw new Error("AI request failed.");

			const payload = (await response.json()) as RecommendationsApiResponse;
			setJobs(payload.jobs);
			setAiStatus(payload.aiStatus === "live" ? "live" : "mock");
			setAiMessage(
				payload.aiStatus === "live"
					? `Personalized with ${payload.model ?? "AI"}`
					: payload.message ??
					"Upload your CV to generate personalized recommendations.",
			);
			showToast(
				payload.aiStatus === "live"
					? "Recommendations personalized."
					: payload.message ?? "Upload your CV to continue.",
			);
		} catch (error) {
			setJobs(initialJobs);
			setAiStatus("mock");
			setAiMessage(
				error instanceof Error
					? "Unable to refresh recommendations right now."
					: "Upload your CV to generate recommendations.",
			);
			showToast("Recommendations are unavailable.");
		} finally {
			setLoading(false);
		}
	}, [feedback, notes, showToast]);

	useEffect(() => {
		if (wizardConnected && requestedMode !== "wizard") {
			setRequestedMode("wizard");
			setLoading(true);
			setAiStatus("loading");
			setAiMessage("Preparing updated recommendations...");
			emit("recommendations:request", { timestamp: Date.now() });
			return;
		}

		if (!wizardConnected && requestedMode === "none") {
			setRequestedMode("ai");
			void requestAiRecommendations();
		}
	}, [wizardConnected, emit, requestedMode, requestAiRecommendations]);

	useSocketListener<{ jobs: RecommendationJob[] }>(
		"recommendations:send_results",
		(data) => {
			setJobs(data.jobs);
			setLoading(false);
			setAiStatus("wizard");
			setAiMessage("Recommendations reviewed and updated.");
			showToast("Recommendations updated.");
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

	const handleSaveJob = async (job: RecommendationJob) => {
		try {
			const response = await fetch("/api/saved-jobs", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: job.id,
					title: job.title,
					company: job.company,
					location: job.location,
					workModel: job.workModel,
					salaryRange: job.salaryRange,
					seniority: job.seniority,
					source: job.source,
					postedAt: job.postedAt,
					verified: job.verified,
					matchScore: job.matchScore,
					personalNotes: notes[job.id] || "",
				}),
			});
			if (!response.ok) throw new Error("Unable to save job.");
			showToast("Saved to Jobs.");
		} catch (error) {
			showToast(error instanceof Error ? error.message : "Unable to save job.");
		}
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
				<div className="fixed top-20 right-4 z-[100] px-3 py-1.5 rounded-lg bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-medium flex items-center gap-1.5">
					<span className="size-2 rounded-full bg-green-400 animate-pulse" />
					Advisor online
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
								Role targets and search queries based on your CV review and job
								preferences.
							</p>
						</div>
						<div className="flex flex-wrap items-center gap-3">
							<div
								className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium ${aiStatus === "live" || aiStatus === "wizard" ? "bg-green-500/10 border-green-500/30 text-green-400" : aiStatus === "loading" ? "bg-purple-500/10 border-purple-500/30 text-purple-300" : "bg-white/5 border-white/10 text-slate-400"}`}
								title={aiMessage}
							>
								<span
									className={`size-2 rounded-full ${aiStatus === "loading" ? "bg-purple-400 animate-pulse" : aiStatus === "live" || aiStatus === "wizard" ? "bg-green-400" : "bg-slate-500"}`}
								/>
								{aiStatusLabels[aiStatus]}
							</div>
							<button
								onClick={() => {
									setRequestedMode("ai");
									void requestAiRecommendations();
								}}
								disabled={loading}
								className="flex items-center gap-2 rounded-lg h-10 px-4 bg-primary hover:bg-purple-500 text-white text-sm font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<span className="material-symbols-outlined text-lg">
									auto_awesome
								</span>
								Refresh AI
							</button>
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
										upload_file
									</span>
									<h3 className="text-xl font-bold text-slate-300">
										No recommendations yet
									</h3>
									<p className="text-slate-500 mt-2">
										Upload your CV on the profile page to generate personalized
										role recommendations.
									</p>
									<Link
										href="/profile"
										className="mt-6 inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-primary hover:bg-purple-500 text-white text-sm font-bold transition-all"
									>
										<span className="material-symbols-outlined text-lg">
											arrow_forward
										</span>
										Go to CV review
									</Link>
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
													{job.title[0]}
												</div>
												<div className="min-w-0">
													<h3 className="text-lg font-bold text-white leading-snug tracking-wide">
														{job.title}
													</h3>
													<p className="text-slate-400 text-sm mt-0.5">
														{job.workModel} &bull; {job.location}
													</p>
													<div className="flex items-center gap-2 mt-2 flex-wrap">
														<span className="text-xs font-bold text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full border border-green-500/20 shadow-[0_0_8px_rgba(74,222,128,0.1)]">
															{job.matchScore}% Match
														</span>
														<span
															className={`text-xs font-bold px-2.5 py-1 rounded-full border ${confidenceStyles[job.confidenceBand]}`}
														>
															{job.confidenceBand} confidence
														</span>
														<span
															className={`text-xs font-medium px-2.5 py-1 rounded-full border ${job.verified ? "text-cyan-300 bg-cyan-500/10 border-cyan-500/20" : "text-amber-300 bg-amber-500/10 border-amber-500/20"}`}
														>
															{job.source === "CV analysis"
																? "Search target"
																: job.verified
																	? "Verified"
																	: "Needs review"}
														</span>
														<span className="text-xs text-slate-500">
															{job.salaryRange}
														</span>
														<span className="text-xs text-slate-500">
															{job.source} &bull; {job.postedAt}
														</span>
														{job.riskFlags.map((flag) => (
															<span
																key={flag}
																className="text-xs font-medium text-red-300 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20"
															>
																{formatRiskFlag(flag)}
															</span>
														))}
													</div>
												</div>
											</div>
										</div>

										<p className="text-sm text-slate-200 leading-relaxed mb-2">
											{job.summary}
										</p>
										<p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
											{job.description}
										</p>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
											<div className="rounded-lg bg-green-500/5 border border-green-500/10 p-3">
												<p className="text-xs font-bold text-green-300 mb-2">
													Why it matches
												</p>
												<ul className="space-y-1.5">
													{job.whyMatches.slice(0, 3).map((reason) => (
														<li
															key={reason}
															className="flex gap-2 text-xs text-slate-300 leading-relaxed"
														>
															<span className="material-symbols-outlined text-[15px] text-green-400 mt-0.5">
																check_small
															</span>
															{reason}
														</li>
													))}
												</ul>
											</div>
											<div className="rounded-lg bg-amber-500/5 border border-amber-500/10 p-3">
												<p className="text-xs font-bold text-amber-300 mb-2">
													Potential gaps
												</p>
												<ul className="space-y-1.5">
													{job.potentialGaps.slice(0, 3).map((gap) => (
														<li
															key={gap}
															className="flex gap-2 text-xs text-slate-300 leading-relaxed"
														>
															<span className="material-symbols-outlined text-[15px] text-amber-400 mt-0.5">
																error
															</span>
															{gap}
														</li>
													))}
												</ul>
											</div>
										</div>

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
												<button
													onClick={() => void handleSaveJob(job)}
													className="text-xs text-slate-500 hover:text-primary-dark transition-colors flex items-center gap-1"
												>
													<span className="material-symbols-outlined text-[16px]">
														bookmark_add
													</span>
													Save
												</button>
												<a
													href={buildJobSearchUrl(job)}
													target="_blank"
													rel="noreferrer"
													className="px-4 py-2 rounded-lg bg-primary hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]"
												>
													Search Jobs
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

