"use client";

import { useState } from "react";
import { useSocket, useSocketListener } from "@/lib/SocketProvider";
import type {
	InterviewSubmitPayload,
	InterviewFeedback,
	InterviewFeedbackItem,
	TrackerSuggestionPayload,
	TrackerSuggestion,
	RecommendationsRequestPayload,
	RecommendationsResults,
	RecommendationJob,
} from "@/lib/wizard-types";

type TabId = "interview" | "tracker" | "recommendations";

interface IncomingInterview extends InterviewSubmitPayload {
	id: string;
	receivedAt: string;
}

interface IncomingTrackerRequest extends TrackerSuggestionPayload {
	id: string;
	receivedAt: string;
}

const defaultFeedbackItems: InterviewFeedbackItem[] = [
	{ id: "clarity", label: "Clarity", score: 75 },
	{ id: "relevance", label: "Relevance", score: 82 },
	{ id: "confidence", label: "Confidence", score: 68 },
	{ id: "structure", label: "Structure", score: 70 },
];

const trackerTemplates = [
	"Send a follow-up email emphasizing your recent project impact.",
	"Prepare for behavioral questions about team leadership.",
	"Research the company's latest product launch before the interview.",
	"Ask about their engineering culture and mentorship opportunities.",
	"Highlight your experience with cross-functional collaboration.",
	"Negotiate equity — compare market rates for this seniority level.",
];

export default function WizardPage() {
	const { connected, emit } = useSocket();
	const [activeTab, setActiveTab] = useState<TabId>("interview");

	const [interviewQueue, setInterviewQueue] = useState<IncomingInterview[]>([]);
	const [selectedInterview, setSelectedInterview] =
		useState<IncomingInterview | null>(null);
	const [feedbackItems, setFeedbackItems] =
		useState<InterviewFeedbackItem[]>(defaultFeedbackItems);
	const [feedbackSuggestion, setFeedbackSuggestion] = useState(
		"Try to include a specific metric or outcome in your response. Quantified results make answers more impactful.",
	);
	const [feedbackSent, setFeedbackSent] = useState(false);

	const [trackerQueue, setTrackerQueue] = useState<IncomingTrackerRequest[]>(
		[],
	);
	const [selectedTracker, setSelectedTracker] =
		useState<IncomingTrackerRequest | null>(null);
	const [trackerSuggestion, setTrackerSuggestion] = useState("");
	const [trackerSent, setTrackerSent] = useState(false);

	const [recsQueue, setRecsQueue] = useState<RecommendationsRequestPayload[]>(
		[],
	);
	const [editingJobs, setEditingJobs] = useState<RecommendationJob[]>([]);
	const [recsSent, setRecsSent] = useState(false);

	useSocketListener<InterviewSubmitPayload>(
		"interview:submit_answer",
		(payload) => {
			const incoming: IncomingInterview = {
				...payload,
				id: `iv_${Date.now()}`,
				receivedAt: new Date().toLocaleTimeString(),
			};
			setInterviewQueue((prev) => [incoming, ...prev]);
			if (!selectedInterview) setSelectedInterview(incoming);
			setFeedbackSent(false);
		},
	);

	useSocketListener<TrackerSuggestionPayload>(
		"tracker:request_suggestion",
		(payload) => {
			const incoming: IncomingTrackerRequest = {
				...payload,
				id: `tr_${Date.now()}`,
				receivedAt: new Date().toLocaleTimeString(),
			};
			setTrackerQueue((prev) => [incoming, ...prev]);
			if (!selectedTracker) setSelectedTracker(incoming);
			setTrackerSent(false);
		},
	);

	useSocketListener<RecommendationsRequestPayload>(
		"recommendations:request",
		(payload) => {
			setRecsQueue((prev) => [payload, ...prev]);
			if (editingJobs.length === 0) {
				setEditingJobs([]);
			}
			setRecsSent(false);
		},
	);

	const sendInterviewFeedback = () => {
		if (!selectedInterview) return;
		const payload: InterviewFeedback = {
			feedback: feedbackItems,
			suggestion: feedbackSuggestion,
		};
		emit("interview:send_feedback", payload);
		setFeedbackSent(true);
	};

	const sendTrackerSuggestion = () => {
		if (!selectedTracker || !trackerSuggestion.trim()) return;
		const payload: TrackerSuggestion = {
			cardId: selectedTracker.cardId,
			suggestion: trackerSuggestion,
		};
		emit("tracker:send_suggestion", payload);
		setTrackerSent(true);
	};

	const sendRecommendations = () => {
		if (editingJobs.length === 0) return;
		const payload: RecommendationsResults = { jobs: editingJobs };
		emit("recommendations:send_results", payload);
		setRecsSent(true);
	};

	const addJobCard = () => {
		const newJob: RecommendationJob = {
			id: `job_${Date.now()}`,
			title: "",
			company: "",
			location: "",
			workModel: "Remote",
			salaryRange: "",
			seniority: "Mid",
			techStack: [],
			source: "Manual",
			postedAt: "Just now",
			verified: false,
			riskFlags: [],
			matchScore: 80,
			confidenceBand: "medium",
			whyMatches: [],
			potentialGaps: [],
			summary: "",
			description: "",
			responsibilities: [],
			qualifications: [],
		};
		setEditingJobs((prev) => [...prev, newJob]);
	};

	const updateJob = (index: number, field: string, value: unknown) => {
		setEditingJobs((prev) =>
			prev.map((j, i) => (i === index ? { ...j, [field]: value } : j)),
		);
	};

	const removeJob = (index: number) => {
		setEditingJobs((prev) => prev.filter((_, i) => i !== index));
	};

	const interviewCount = interviewQueue.length;
	const trackerCount = trackerQueue.length;
	const recsCount = recsQueue.length;

	const tabs: { id: TabId; label: string; count: number; icon: string }[] = [
		{
			id: "interview",
			label: "Interview",
			count: interviewCount,
			icon: "quiz",
		},
		{
			id: "tracker",
			label: "Tracker",
			count: trackerCount,
			icon: "track_changes",
		},
		{
			id: "recommendations",
			label: "Recommendations",
			count: recsCount,
			icon: "auto_awesome",
		},
	];

	return (
		<div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
			<header className="border-b border-slate-800 bg-slate-900 px-6 py-4 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<span className="material-symbols-outlined text-3xl text-purple-400">
						auto_fix_high
					</span>
					<div>
						<h1 className="text-xl font-bold text-white">
							Wizard of Oz Control Panel
						</h1>
						<p className="text-xs text-slate-400">
							Respond to user actions in real-time
						</p>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<div
						className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${connected ? "bg-green-900/30 text-green-400 border border-green-500/30" : "bg-red-900/30 text-red-400 border border-red-500/30"}`}
					>
						<span
							className={`size-2 rounded-full ${connected ? "bg-green-400 animate-pulse" : "bg-red-400"}`}
						/>
						{connected ? "Connected" : "Disconnected"}
					</div>
				</div>
			</header>

			<div className="flex flex-1">
				<nav className="w-56 border-r border-slate-800 bg-slate-900/50 p-3 flex flex-col gap-1">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? "bg-purple-600/20 text-purple-300 border border-purple-500/30" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent"}`}
						>
							<span className="material-symbols-outlined text-lg">
								{tab.icon}
							</span>
							{tab.label}
							{tab.count > 0 && (
								<span className="ml-auto bg-purple-600/40 text-purple-300 text-xs font-bold px-2 py-0.5 rounded-full">
									{tab.count}
								</span>
							)}
						</button>
					))}
				</nav>

				<main className="flex-1 p-6 overflow-auto">
					{activeTab === "interview" && (
						<div className="flex gap-6 h-full">
							<div className="w-72 flex flex-col gap-2">
								<h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
									Incoming Answers
								</h3>
								{interviewQueue.length === 0 && (
									<div className="text-slate-600 text-sm text-center py-12">
										<span className="material-symbols-outlined text-4xl mb-2 block">
											hourglass_empty
										</span>
										Waiting for user answers...
									</div>
								)}
								{interviewQueue.map((item) => (
									<button
										key={item.id}
										onClick={() => {
											setSelectedInterview(item);
											setFeedbackSent(false);
										}}
										className={`text-left p-3 rounded-lg border transition-all ${selectedInterview?.id === item.id ? "border-purple-500/50 bg-purple-900/20" : "border-slate-800 bg-slate-900/50 hover:border-slate-700"}`}
									>
										<p className="text-xs text-slate-500 mb-1">
											Q{item.questionIndex + 1} &middot; {item.receivedAt}
										</p>
										<p className="text-sm text-slate-300 line-clamp-2">
											{item.answer.slice(0, 80)}...
										</p>
									</button>
								))}
							</div>

							<div className="flex-1 border-l border-slate-800 pl-6">
								{selectedInterview ? (
									<div className="space-y-6">
										<div>
											<h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
												User&apos;s Answer
											</h3>
											<div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
												<p className="text-xs text-slate-500 mb-1">
													Question {selectedInterview.questionIndex + 1}
												</p>
												<p className="text-purple-300 font-medium mb-3">
													&ldquo;{selectedInterview.question}&rdquo;
												</p>
												<p className="text-slate-200 whitespace-pre-wrap">
													{selectedInterview.answer}
												</p>
											</div>
										</div>

										<div>
											<h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
												Feedback Scores
											</h3>
											<div className="grid grid-cols-2 gap-4">
												{feedbackItems.map((item) => (
													<div key={item.id} className="space-y-1.5">
														<div className="flex justify-between items-center">
															<label className="text-sm text-slate-300">
																{item.label}
															</label>
															<span className="text-sm font-bold text-purple-300">
																{item.score}%
															</span>
														</div>
														<input
															type="range"
															min={0}
															max={100}
															value={item.score}
															onChange={(e) =>
																setFeedbackItems((prev) =>
																	prev.map((f) =>
																		f.id === item.id
																			? { ...f, score: Number(e.target.value) }
																			: f,
																	),
																)
															}
															className="w-full accent-purple-500"
														/>
													</div>
												))}
											</div>
										</div>

										<div>
											<h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
												AI Suggestion
											</h3>
											<textarea
												value={feedbackSuggestion}
												onChange={(e) => setFeedbackSuggestion(e.target.value)}
												className="w-full rounded-lg bg-slate-900 border border-slate-800 text-white p-3 h-24 resize-none focus:outline-none focus:border-purple-500/50"
												placeholder="Write a suggestion for the user..."
											/>
										</div>

										<button
											onClick={sendInterviewFeedback}
											disabled={feedbackSent}
											className={`px-6 py-3 rounded-lg font-bold text-sm transition-all ${feedbackSent ? "bg-green-600/20 text-green-400 border border-green-500/30 cursor-default" : "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]"}`}
										>
											{feedbackSent ? (
												<span className="flex items-center gap-2">
													<span className="material-symbols-outlined text-lg">
														check_circle
													</span>
													Feedback Sent!
												</span>
											) : (
												<span className="flex items-center gap-2">
													<span className="material-symbols-outlined text-lg">
														send
													</span>
													Send Feedback to User
												</span>
											)}
										</button>
									</div>
								) : (
									<div className="flex flex-col items-center justify-center h-64 text-slate-600">
										<span className="material-symbols-outlined text-5xl mb-3">
											inquiry
										</span>
										<p>Select an incoming answer to respond</p>
									</div>
								)}
							</div>
						</div>
					)}

					{activeTab === "tracker" && (
						<div className="flex gap-6 h-full">
							<div className="w-72 flex flex-col gap-2">
								<h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
									Requests
								</h3>
								{trackerQueue.length === 0 && (
									<div className="text-slate-600 text-sm text-center py-12">
										<span className="material-symbols-outlined text-4xl mb-2 block">
											hourglass_empty
										</span>
										Waiting for tracker requests...
									</div>
								)}
								{trackerQueue.map((item) => (
									<button
										key={item.id}
										onClick={() => {
											setSelectedTracker(item);
											setTrackerSent(false);
										}}
										className={`text-left p-3 rounded-lg border transition-all ${selectedTracker?.id === item.id ? "border-purple-500/50 bg-purple-900/20" : "border-slate-800 bg-slate-900/50 hover:border-slate-700"}`}
									>
										<p className="text-xs text-slate-500 mb-1">
											{item.receivedAt}
										</p>
										<p className="text-sm text-slate-300 font-medium">
											{item.title}
										</p>
										<p className="text-xs text-slate-500">
											{item.company} &middot; {item.stage}
										</p>
									</button>
								))}
							</div>

							<div className="flex-1 border-l border-slate-800 pl-6">
								{selectedTracker ? (
									<div className="space-y-6">
										<div>
											<h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
												Request Context
											</h3>
											<div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
												<p className="text-white font-medium">
													{selectedTracker.title}
												</p>
												<p className="text-slate-400 text-sm">
													{selectedTracker.company} &middot; Stage:{" "}
													{selectedTracker.stage}
												</p>
											</div>
										</div>

										<div>
											<h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
												Quick Templates
											</h3>
											<div className="flex flex-wrap gap-2">
												{trackerTemplates.map((tpl, i) => (
													<button
														key={i}
														onClick={() => setTrackerSuggestion(tpl)}
														className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:border-purple-500/50 hover:text-purple-300 transition-all"
													>
														{tpl.slice(0, 40)}...
													</button>
												))}
											</div>
										</div>

										<div>
											<h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
												Custom Suggestion
											</h3>
											<textarea
												value={trackerSuggestion}
												onChange={(e) => setTrackerSuggestion(e.target.value)}
												className="w-full rounded-lg bg-slate-900 border border-slate-800 text-white p-3 h-24 resize-none focus:outline-none focus:border-purple-500/50"
												placeholder="Type or select a suggestion..."
											/>
										</div>

										<button
											onClick={sendTrackerSuggestion}
											disabled={trackerSent || !trackerSuggestion.trim()}
											className={`px-6 py-3 rounded-lg font-bold text-sm transition-all ${trackerSent ? "bg-green-600/20 text-green-400 border border-green-500/30 cursor-default" : "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] disabled:opacity-40 disabled:cursor-not-allowed"}`}
										>
											{trackerSent ? (
												<span className="flex items-center gap-2">
													<span className="material-symbols-outlined text-lg">
														check_circle
													</span>
													Suggestion Sent!
												</span>
											) : (
												<span className="flex items-center gap-2">
													<span className="material-symbols-outlined text-lg">
														send
													</span>
													Send Suggestion
												</span>
											)}
										</button>
									</div>
								) : (
									<div className="flex flex-col items-center justify-center h-64 text-slate-600">
										<span className="material-symbols-outlined text-5xl mb-3">
											track_changes
										</span>
										<p>Select a tracker request to respond</p>
									</div>
								)}
							</div>
						</div>
					)}

					{activeTab === "recommendations" && (
						<div className="space-y-6">
							<div className="flex items-center justify-between">
								<div>
									<h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
										Job Recommendations Builder
									</h3>
									<p className="text-xs text-slate-600 mt-1">
										{recsQueue.length} request
										{recsQueue.length !== 1 ? "s" : ""} received
									</p>
								</div>
								<button
									onClick={addJobCard}
									className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold transition-all"
								>
									<span className="material-symbols-outlined text-lg">add</span>
									Add Job Card
								</button>
							</div>

							{editingJobs.length === 0 && (
								<div className="flex flex-col items-center justify-center py-16 text-slate-600">
									<span className="material-symbols-outlined text-5xl mb-3">
										work
									</span>
									<p>
										No job cards yet. Click &quot;Add Job Card&quot; to create
										one.
									</p>
								</div>
							)}

							{editingJobs.map((job, index) => (
								<div
									key={job.id}
									className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4"
								>
									<div className="flex items-center justify-between">
										<h4 className="text-white font-bold">
											Job Card #{index + 1}
										</h4>
										<button
											onClick={() => removeJob(index)}
											className="text-red-400 hover:text-red-300 transition-colors"
										>
											<span className="material-symbols-outlined">delete</span>
										</button>
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="text-xs text-slate-500 block mb-1">
												Title
											</label>
											<input
												value={job.title}
												onChange={(e) =>
													updateJob(index, "title", e.target.value)
												}
												className="w-full rounded-lg bg-slate-800 border border-slate-700 text-white p-2 text-sm focus:outline-none focus:border-purple-500/50"
												placeholder="Senior Product Designer"
											/>
										</div>
										<div>
											<label className="text-xs text-slate-500 block mb-1">
												Company
											</label>
											<input
												value={job.company}
												onChange={(e) =>
													updateJob(index, "company", e.target.value)
												}
												className="w-full rounded-lg bg-slate-800 border border-slate-700 text-white p-2 text-sm focus:outline-none focus:border-purple-500/50"
												placeholder="Company name"
											/>
										</div>
										<div>
											<label className="text-xs text-slate-500 block mb-1">
												Location
											</label>
											<input
												value={job.location}
												onChange={(e) =>
													updateJob(index, "location", e.target.value)
												}
												className="w-full rounded-lg bg-slate-800 border border-slate-700 text-white p-2 text-sm focus:outline-none focus:border-purple-500/50"
												placeholder="San Francisco, CA"
											/>
										</div>
										<div>
											<label className="text-xs text-slate-500 block mb-1">
												Salary Range
											</label>
											<input
												value={job.salaryRange}
												onChange={(e) =>
													updateJob(index, "salaryRange", e.target.value)
												}
												className="w-full rounded-lg bg-slate-800 border border-slate-700 text-white p-2 text-sm focus:outline-none focus:border-purple-500/50"
												placeholder="$140k - $180k"
											/>
										</div>
										<div>
											<label className="text-xs text-slate-500 block mb-1">
												Seniority
											</label>
											<select
												value={job.seniority}
												onChange={(e) =>
													updateJob(index, "seniority", e.target.value)
												}
												className="w-full rounded-lg bg-slate-800 border border-slate-700 text-white p-2 text-sm focus:outline-none focus:border-purple-500/50 cursor-pointer"
											>
												<option>Junior</option>
												<option>Mid</option>
												<option>Senior</option>
												<option>Lead</option>
												<option>Staff</option>
											</select>
										</div>
										<div>
											<label className="text-xs text-slate-500 block mb-1">
												Work Model
											</label>
											<select
												value={job.workModel}
												onChange={(e) =>
													updateJob(index, "workModel", e.target.value)
												}
												className="w-full rounded-lg bg-slate-800 border border-slate-700 text-white p-2 text-sm focus:outline-none focus:border-purple-500/50 cursor-pointer"
											>
												<option>Remote</option>
												<option>Hybrid</option>
												<option>On-site</option>
											</select>
										</div>
										<div>
											<label className="text-xs text-slate-500 block mb-1">
												Match Score ({job.matchScore}%)
											</label>
											<input
												type="range"
												min={0}
												max={100}
												value={job.matchScore}
												onChange={(e) =>
													updateJob(index, "matchScore", Number(e.target.value))
												}
												className="w-full accent-purple-500"
											/>
										</div>
										<div>
											<label className="text-xs text-slate-500 block mb-1">
												Confidence Band
											</label>
											<select
												value={job.confidenceBand}
												onChange={(e) =>
													updateJob(index, "confidenceBand", e.target.value)
												}
												className="w-full rounded-lg bg-slate-800 border border-slate-700 text-white p-2 text-sm focus:outline-none focus:border-purple-500/50 cursor-pointer"
											>
												<option value="high">High</option>
												<option value="medium">Medium</option>
												<option value="low">Low</option>
											</select>
										</div>
									</div>
									<div>
										<label className="text-xs text-slate-500 block mb-1">
											Tech Stack (comma-separated)
										</label>
										<input
											value={job.techStack.join(", ")}
											onChange={(e) =>
												updateJob(
													index,
													"techStack",
													e.target.value
														.split(",")
														.map((s: string) => s.trim())
														.filter(Boolean),
												)
											}
											className="w-full rounded-lg bg-slate-800 border border-slate-700 text-white p-2 text-sm focus:outline-none focus:border-purple-500/50"
											placeholder="Skill, tool, keyword"
										/>
									</div>
									<div>
										<label className="text-xs text-slate-500 block mb-1">
											Description
										</label>
										<textarea
											value={job.description}
											onChange={(e) =>
												updateJob(index, "description", e.target.value)
											}
											className="w-full rounded-lg bg-slate-800 border border-slate-700 text-white p-2 text-sm h-20 resize-none focus:outline-none focus:border-purple-500/50"
											placeholder="Job description..."
										/>
									</div>
									<div>
										<label className="text-xs text-slate-500 block mb-1">
											AI Summary (why it matches)
										</label>
										<textarea
											value={job.summary}
											onChange={(e) =>
												updateJob(index, "summary", e.target.value)
											}
											className="w-full rounded-lg bg-slate-800 border border-slate-700 text-white p-2 text-sm h-20 resize-none focus:outline-none focus:border-purple-500/50"
											placeholder="Explain why this job matches the user..."
										/>
									</div>
								</div>
							))}

							{editingJobs.length > 0 && (
								<button
									onClick={sendRecommendations}
									disabled={recsSent}
									className={`px-6 py-3 rounded-lg font-bold text-sm transition-all ${recsSent ? "bg-green-600/20 text-green-400 border border-green-500/30 cursor-default" : "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]"}`}
								>
									{recsSent ? (
										<span className="flex items-center gap-2">
											<span className="material-symbols-outlined text-lg">
												check_circle
											</span>
											Recommendations Sent! ({editingJobs.length} jobs)
										</span>
									) : (
										<span className="flex items-center gap-2">
											<span className="material-symbols-outlined text-lg">
												send
											</span>
											Send {editingJobs.length} Recommendation
											{editingJobs.length !== 1 ? "s" : ""} to User
										</span>
									)}
								</button>
							)}
						</div>
					)}
				</main>
			</div>
		</div>
	);
}
