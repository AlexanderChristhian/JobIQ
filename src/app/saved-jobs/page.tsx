"use client";

import { useState } from "react";
import data from "@/data/saved-jobs.json";
import Header from "@/components/header";

const initialJobs = data.savedJobs;

export default function SavedJobsPage() {
	const [jobs, setJobs] = useState(initialJobs);
	const [compareIds, setCompareIds] = useState<number[]>([]);
	const [notes, setNotes] = useState<Record<number, string>>({});
	const [savedNotes, setSavedNotes] = useState<Record<number, string>>({});
	const [toast, setToast] = useState<string | null>(null);

	const showToast = (msg: string) => {
		setToast(msg);
		setTimeout(() => setToast(null), 2500);
	};

	const toggleCompare = (id: number) => {
		setCompareIds((prev) => {
			if (prev.includes(id)) return prev.filter((i) => i !== id);
			if (prev.length >= 3) {
				showToast("You can compare up to 3 jobs at a time.");
				return prev;
			}
			return [...prev, id];
		});
	};

	const handleDelete = (id: number) => {
		setJobs((prev) => prev.filter((j) => j.id !== id));
		setCompareIds((prev) => prev.filter((i) => i !== id));
		showToast("Job removed from saved list.");
	};

	const handleSaveNote = (id: number) => {
		setSavedNotes((prev) => ({ ...prev, [id]: notes[id] || "" }));
		showToast("Note saved!");
	};

	const handleApply = (title: string) => {
		showToast(`Redirecting to application page for "${title}"...`);
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

			<Header activePage="jobs" />

			<div className="flex-1 flex justify-center py-8 px-4 sm:px-6 lg:px-8">
				<div className="w-full max-w-7xl flex flex-col gap-8">
					<div>
						<h1 className="text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-2 drop-shadow-md">
							Saved Jobs
						</h1>
						<p className="text-slate-400 text-lg">
							Track and compare up to 3 jobs side-by-side.
						</p>
					</div>

					{compareIds.length > 0 && (
						<div className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-4 md:p-6 border border-primary-dark/30 bg-purple-900/20 relative overflow-hidden">
							<div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-transparent pointer-events-none"></div>
							<div className="flex items-center justify-between relative z-10">
								<div className="flex items-center gap-3">
									<span className="material-symbols-outlined text-primary-dark">
										compare_arrows
									</span>
									<span className="text-white font-bold">
										{compareIds.length} job{compareIds.length > 1 ? "s" : ""}{" "}
										selected
									</span>
									<span className="text-xs text-slate-500">
										Click Compare to see a side-by-side view
									</span>
								</div>
								<div className="flex gap-3">
									<button
										onClick={() => showToast("Comparison view opened!")}
										className="px-5 py-2 rounded-lg bg-primary hover:bg-purple-500 text-white text-sm font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.25)]"
									>
										Compare
									</button>
									<button
										onClick={() => setCompareIds([])}
										className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-sm hover:bg-white/10 transition-all"
									>
										Clear
									</button>
								</div>
							</div>
						</div>
					)}

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
													{job.company.charAt(0)}
												</div>
												<div className="min-w-0">
													<h3 className="text-lg font-bold text-white leading-snug">
														{job.title}
													</h3>
													<p className="text-slate-400 text-sm">
														{job.company} • {job.location}
													</p>
													<div className="flex items-center gap-2 mt-2 flex-wrap">
														<span className="text-xs font-bold text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full border border-green-500/20">
															{job.matchScore}% Match
														</span>
														<span className="text-xs text-slate-500">
															{job.salaryRange}
														</span>
														<span className="text-xs text-slate-500">
															{job.workModel}
														</span>
														<span className="text-xs text-slate-500">
															{job.postedAt}
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

										<div className="mb-3">
											<textarea
												placeholder="Personal notes about this job..."
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
													{savedNotes[job.id] ? "Update Note" : "Save Note"}
												</button>
											</div>
										</div>

										<div className="flex items-center justify-between pt-3 border-t border-white/5">
											<button
												onClick={() => handleDelete(job.id)}
												className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-red-500/10"
											>
												<span className="material-symbols-outlined text-lg">
													delete
												</span>
												Remove
											</button>
											<div className="flex gap-2">
												<button
													onClick={() =>
														showToast(
															`Cover letter draft generated for "${job.title}".`,
														)
													}
													className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-medium hover:bg-white/10 transition-all"
												>
													<span className="material-symbols-outlined text-[16px] align-middle mr-1">
														description
													</span>
													Cover Letter
												</button>
												<button
													onClick={() => handleApply(job.title)}
													className="px-4 py-2 rounded-lg bg-primary hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]"
												>
													Apply Now
												</button>
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
