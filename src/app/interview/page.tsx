"use client";

import { useCallback, useState } from "react";
import Header from "@/components/header";
import { useSocket, useSocketListener } from "@/lib/SocketProvider";
import type { InterviewFeedback } from "@/lib/wizard-types";

interface InterviewApiResponse extends InterviewFeedback {
	aiStatus?: "live" | "mock";
	model?: string;
	message?: string;
}

const questions = [
	"Tell me about yourself",
	"Why are you interested in this role?",
	"Describe a time you handled competing deadlines.",
	"Tell me about a project you are proud of.",
	"What would you improve in your current skill set?",
];

const checklistItems = [
	"Research the company and role",
	"Prepare 3 STAR stories",
	"Prepare 2-3 follow-up questions",
	"Review technical concepts",
	"Re-read your CV",
];

export default function InterviewPage() {
	const { wizardConnected, emit } = useSocket();
	const [questionIndex, setQuestionIndex] = useState(0);
	const [answer, setAnswer] = useState("");
	const [feedback, setFeedback] = useState<InterviewFeedback | null>(null);
	const [checked, setChecked] = useState<Record<string, boolean>>({});
	const [loading, setLoading] = useState(false);
	const [toast, setToast] = useState<string | null>(null);
	const [error, setError] = useState("");

	const showToast = (msg: string) => {
		setToast(msg);
		setTimeout(() => setToast(null), 2500);
	};

	// Listen for wizard feedback via Socket.IO
	useSocketListener<InterviewFeedback>("interview:send_feedback", (data) => {
		setFeedback(data);
		setLoading(false);
		showToast("Feedback received from advisor.");
	});

	const analyzeAnswer = useCallback(async () => {
		if (!answer.trim()) return;
		setLoading(true);
		setError("");
		setFeedback(null);

		// When wizard is connected, send via socket and wait for response
		if (wizardConnected) {
			emit("interview:submit_answer", {
				answer,
				questionIndex,
				question: questions[questionIndex],
			});
			showToast("Answer sent to advisor for review...");
			return; // loading stays true until wizard responds via socket listener
		}

		// Fallback to AI API when no wizard
		try {
			const response = await fetch("/api/ai/interview-feedback", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					answer,
					questionIndex,
					question: questions[questionIndex],
				}),
			});
			const payload = (await response.json().catch(() => ({}))) as
				| InterviewApiResponse
				| { message?: string };
			if (!response.ok || !("feedback" in payload)) {
				throw new Error(payload.message ?? "AI feedback is unavailable.");
			}

			setFeedback(payload);
			showToast("AI feedback ready.");
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "AI feedback is unavailable.",
			);
			showToast("AI feedback is unavailable.");
		} finally {
			setLoading(false);
		}
	}, [answer, questionIndex, wizardConnected, emit]);

	const nextQuestion = () => {
		setQuestionIndex((prev) => (prev + 1) % questions.length);
		setAnswer("");
		setFeedback(null);
		setError("");
	};

	const checkedCount = Object.values(checked).filter(Boolean).length;

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

			{wizardConnected && (
				<div className="fixed top-2 right-4 z-[100] px-3 py-1.5 rounded-lg bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-medium flex items-center gap-1.5">
					<span className="size-2 rounded-full bg-green-400 animate-pulse" />
					Advisor online
				</div>
			)}

			<Header activePage="interview" />

			<div className="flex-1 flex justify-center py-8 px-4 sm:px-6 lg:px-8">
				<div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8">
					<div className="lg:col-span-8 flex flex-col gap-8">
						<div>
							<h1 className="text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-2 drop-shadow-md">
								Interview Practice
							</h1>
							<p className="text-slate-400 text-lg">
								Practice written answers and get AI feedback tied to the
								question.
							</p>
						</div>

						<section className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8">
							<div className="flex items-center justify-between mb-6">
								<div className="flex items-center gap-3">
									<span className="material-symbols-outlined text-primary-dark">
										quiz
									</span>
									<span className="text-sm text-slate-500">
										Question {questionIndex + 1} of {questions.length}
									</span>
								</div>
								<button
									onClick={nextQuestion}
									className="flex items-center gap-1 text-sm text-primary-dark hover:text-white transition-colors"
								>
									<span className="material-symbols-outlined text-lg">
										shuffle
									</span>
									Next Question
								</button>
							</div>

							<div className="mb-6 p-5 rounded-xl bg-gradient-to-r from-purple-900/30 to-cyan-900/20 border border-purple-500/20">
								<p className="text-white text-lg font-bold leading-relaxed">
									&ldquo;{questions[questionIndex]}&rdquo;
								</p>
							</div>

							<textarea
								value={answer}
								onChange={(event) => setAnswer(event.target.value)}
								placeholder="Type your answer here..."
								className="w-full rounded-lg bg-white/5 border border-white/10 text-white p-4 h-36 focus:outline-none focus:border-primary-dark/50 focus:bg-white/10 transition-all resize-none text-sm leading-relaxed placeholder:text-slate-600"
							/>

							{error && (
								<div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
									{error}
								</div>
							)}

							<div className="flex justify-end mt-4">
								<button
									onClick={analyzeAnswer}
									disabled={!answer.trim() || loading}
									className="px-6 py-2.5 rounded-lg bg-primary hover:bg-purple-500 text-white text-sm font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.25)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
								>
									{loading ? (
										<>
											<span className="material-symbols-outlined text-lg animate-spin">
												progress_activity
											</span>
											Analyzing...
										</>
									) : (
										<>
											<span className="material-symbols-outlined text-lg">
												auto_awesome
											</span>
											Analyze Answer
										</>
									)}
								</button>
							</div>
						</section>

						{feedback && (
							<section className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8">
								<h2 className="text-white text-xl font-bold flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
									<span className="material-symbols-outlined text-primary-dark">
										insights
									</span>
									AI Feedback
								</h2>
								<div className="space-y-5">
									{feedback.feedback.map((item) => (
										<div key={item.id}>
											<div className="flex justify-between items-center mb-2">
												<span className="text-sm font-medium text-slate-300">
													{item.label}
												</span>
												<span
													className={`text-sm font-bold ${item.score >= 80 ? "text-green-400" : item.score >= 60 ? "text-amber-400" : "text-red-400"}`}
												>
													{item.score}%
												</span>
											</div>
											<div className="w-full bg-slate-800/50 rounded-full h-2.5 overflow-hidden">
												<div
													className="h-2.5 rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-purple-600 to-cyan-500"
													style={{ width: `${item.score}%` }}
												/>
											</div>
										</div>
									))}
								</div>
								<div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-900/30 to-cyan-900/20 border border-purple-500/20">
									<div className="flex items-start gap-3">
										<span className="material-symbols-outlined text-primary-dark">
											tips_and_updates
										</span>
										<div>
											<p className="text-sm font-bold text-white mb-1">
												Suggestion
											</p>
											<p className="text-sm text-slate-300">
												{feedback.suggestion}
											</p>
										</div>
									</div>
								</div>
							</section>
						)}
					</div>

					<aside className="lg:col-span-4 flex flex-col gap-6">
						<section className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-5 sticky top-28">
							<div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
								<h2 className="text-white text-base font-bold flex items-center gap-2">
									<span className="material-symbols-outlined text-primary-dark">
										checklist
									</span>
									Prep Checklist
								</h2>
								<span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded">
									{checkedCount}/{checklistItems.length}
								</span>
							</div>
							<div className="space-y-2.5">
								{checklistItems.map((item) => (
									<button
										key={item}
										onClick={() =>
											setChecked((prev) => ({ ...prev, [item]: !prev[item] }))
										}
										className="w-full flex items-center gap-3 p-2.5 rounded-lg text-left hover:bg-white/5 transition-all group"
									>
										<span
											className={`material-symbols-outlined text-lg flex-shrink-0 ${checked[item] ? "text-green-400" : "text-slate-600 group-hover:text-slate-400"}`}
										>
											{checked[item]
												? "check_circle"
												: "radio_button_unchecked"}
										</span>
										<span
											className={`text-sm ${checked[item] ? "text-slate-500 line-through" : "text-slate-300 group-hover:text-white"}`}
										>
											{item}
										</span>
									</button>
								))}
							</div>
						</section>
					</aside>
				</div>
			</div>
		</div>
	);
}
