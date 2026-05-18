"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "@/components/header";
import type { SavedJobData } from "@/lib/types";

function buildSearchUrl(job: SavedJobData) {
	const query = [job.title, job.location, job.workModel, "jobs"]
		.filter(Boolean)
		.join(" ");
	return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

export default function SavedJobsPage() {
	const [jobs, setJobs] = useState<SavedJobData[]>([]);
	const [compareIds, setCompareIds] = useState<string[]>([]);
	const [notes, setNotes] = useState<Record<string, string>>({});
	const [loading, setLoading] = useState(true);
	const [toast, setToast] = useState<string | null>(null);

	const compareJobs = useMemo(
		() => jobs.filter((job) => compareIds.includes(job.id)),
		[jobs, compareIds],
	);

	const showToast = (msg: string) => {
		setToast(msg);
		setTimeout(() => setToast(null), 2500);
	};

	const loadSavedJobs = useCallback(async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/saved-jobs", { cache: "no-store" });
			const payload = (await response.json()) as { savedJobs?: SavedJobData[] };
			if (!response.ok) throw new Error("Unable to load saved jobs.");
			const loadedJobs = payload.savedJobs ?? [];
			setJobs(loadedJobs);
			setNotes(
				Object.fromEntries(
					loadedJobs.map((job) => [job.id, job.personalNotes ?? ""]),
				),
			);
		} catch (error) {
			showToast(
				error instanceof Error ? error.message : "Unable to load saved jobs.",
			);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		void loadSavedJobs();
	}, [loadSavedJobs]);

	const toggleCompare = (id: string) => {
		setCompareIds((prev) => {
			if (prev.includes(id)) return prev.filter((item) => item !== id);
			if (prev.length >= 3) {
				showToast("You can compare up to 3 jobs at a time.");
				return prev;
			}
			return [...prev, id];
		});
	};

	const handleDelete = async (id: string) => {
		const response = await fetch(`/api/saved-jobs?id=${encodeURIComponent(id)}`, {
			method: "DELETE",
		});
		if (!response.ok) {
			showToast("Unable to remove job.");
			return;
		}
		setJobs((prev) => prev.filter((job) => job.id !== id));
		setCompareIds((prev) => prev.filter((item) => item !== id));
		showToast("Job removed.");
	};

	const handleSaveNote = async (id: string) => {
		const response = await fetch("/api/saved-jobs", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id, personalNotes: notes[id] ?? "" }),
		});
		if (!response.ok) {
			showToast("Unable to save note.");
			return;
		}
		setJobs((prev) =>
			prev.map((job) =>
				job.id === id ? { ...job, personalNotes: notes[id] ?? "" } : job,
			),
		);
		showToast("Note saved.");
	};

	return (
		<div
			className="font-display text-slate-200 min-h-screen flex flex-col overflow-x-clip selection:bg-purple-500 selection:text-white"
			style={{
				backgroundColor: "#0f0518",
				backgroundImage:
					"radial-gradient(circle at 10% 20%, rgba(88, 28, 135, 0.4) 0%, transparent 40%), radial-gradient(circle at 90% 60%, rgba(6, 182, 212, 0.16) 0%, transparent 38%), radial-gradient(circle at 50% 120%, rgba(168, 85, 247, 0.18) 0%, transparent 50%)",
				backgroundAttachment: "fixed",
			}}
		>
			{toast && (
				<div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-xl bg-purple-900/90 border border-purple-500/40 backdrop-blur-xl text-white text-sm font-medium shadow-[0_0_30px_rgba(168,85,247,0.3)]">
					{toast}
				</div>
			)}

			<Header activePage="jobs" />

			<div className="flex-1 flex justify-center py-8 px-4 sm:px-6 lg:px-8">
				<div className="w-full max-w-7xl flex flex-col gap-8">
					<div>
						<h1 className="text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-2 drop-shadow-md">
							Saved Jobs
						</h1>
						<p className="text-slate-400 text-lg">
							Save recommendations, compare fit, and keep notes in your account.
						</p>
					</div>

					{compareJobs.length > 0 && (
						<section className="glass-panel rounded-xl p-5 border border-primary-dark/30">
							<div className="flex items-center justify-between gap-4 mb-4">
								<h2 className="text-white font-bold">
									Comparing {compareJobs.length} job
									{compareJobs.length > 1 ? "s" : ""}
								</h2>
								<button
									onClick={() => setCompareIds([])}
									className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-sm hover:bg-white/10 transition-all"
								>
									Clear
								</button>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
								{compareJobs.map((job) => (
									<div
										key={job.id}
										className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
									>
										<p className="font-bold text-white text-sm">{job.title}</p>
										<p className="text-xs text-slate-500 mt-1">
											{job.location} &bull; {job.workModel}
										</p>
										<p className="text-xs text-green-400 mt-2">
											{job.matchScore}% match
										</p>
									</div>
								))}
							</div>
						</section>
					)}

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{!loading && jobs.length === 0 && (
							<div className="lg:col-span-2 glass-panel rounded-xl p-12 text-center border border-white/10">
								<span className="material-symbols-outlined text-5xl text-slate-600 mb-4">
									bookmark
								</span>
								<h2 className="text-white text-xl font-bold">
									No saved jobs yet
								</h2>
								<p className="text-slate-500 mt-2 max-w-md mx-auto">
									Save roles from your dashboard recommendations to compare them
									here.
								</p>
							</div>
						)}

						{loading && (
							<div className="lg:col-span-2 glass-panel rounded-xl p-12 text-center border border-white/10">
								<span className="material-symbols-outlined text-4xl text-primary-dark animate-spin mb-3">
									progress_activity
								</span>
								<p className="text-slate-300">Loading saved jobs...</p>
							</div>
						)}

						{jobs.map((job) => {
							const checked = compareIds.includes(job.id);
							return (
								<div
									key={job.id}
									className={`glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden transition-all ${checked ? "ring-2 ring-primary-dark/60" : "ring-0"}`}
								>
									<div className="p-6 md:p-8">
										<div className="flex items-start justify-between gap-4 mb-4">
											<div className="flex items-start gap-4 flex-1 min-w-0">
												<div className="size-14 rounded-xl bg-gradient-to-br from-purple-600/30 to-slate-800/30 border border-white/10 flex items-center justify-center flex-shrink-0 text-xl font-bold text-primary-dark">
													{job.title.charAt(0)}
												</div>
												<div className="min-w-0">
													<h3 className="text-lg font-bold text-white leading-snug">
														{job.title}
													</h3>
													<p className="text-slate-400 text-sm">
														{job.workModel} &bull; {job.location}
													</p>
													<div className="flex items-center gap-2 mt-2 flex-wrap">
														<span className="text-xs font-bold text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full border border-green-500/20">
															{job.matchScore}% Match
														</span>
														<span className="text-xs text-slate-500">
															{job.salaryRange}
														</span>
														<span className="text-xs text-slate-500">
															{job.source}
														</span>
													</div>
												</div>
											</div>
											<button
												onClick={() => toggleCompare(job.id)}
												className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${checked ? "bg-primary/20 border-primary-dark/60 text-primary-dark" : "bg-white/5 border-white/10 text-slate-400 hover:border-primary-dark/40"}`}
											>
												<span className="material-symbols-outlined text-lg">
													{checked ? "check_box" : "check_box_outline_blank"}
												</span>
												Compare
											</button>
										</div>

										<textarea
											placeholder="Personal notes about this job..."
											value={notes[job.id] || ""}
											onChange={(event) =>
												setNotes((prev) => ({
													...prev,
													[job.id]: event.target.value,
												}))
											}
											className="w-full rounded-lg bg-white/5 border border-white/10 text-white text-xs p-3 h-16 resize-none focus:outline-none focus:border-primary-dark/50 focus:bg-white/10 transition-all placeholder:text-slate-600"
										/>

										<div className="flex items-center justify-between pt-3 mt-3 border-t border-white/5">
											<button
												onClick={() => void handleDelete(job.id)}
												className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-red-500/10"
											>
												<span className="material-symbols-outlined text-lg">
													delete
												</span>
												Remove
											</button>
											<div className="flex gap-2">
												<button
													onClick={() => void handleSaveNote(job.id)}
													className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-medium hover:bg-white/10 transition-all"
												>
													Save Note
												</button>
												<a
													href={buildSearchUrl(job)}
													target="_blank"
													rel="noreferrer"
													className="px-4 py-2 rounded-lg bg-primary hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]"
												>
													Search Jobs
												</a>
											</div>
										</div>
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
