"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Header from "@/components/header";
import { useAuth } from "@/lib/AuthProvider";

type UploadState = "idle" | "processing" | "success" | "error";

export default function ProfilePage() {
	const { user, setUser } = useAuth();
	const profile = user?.profile;
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [uploadState, setUploadState] = useState<UploadState>("idle");
	const [uploadMessage, setUploadMessage] = useState("");
	const [fileName, setFileName] = useState("");
	const [editing, setEditing] = useState(false);
	const [saving, setSaving] = useState(false);
	const [toast, setToast] = useState<string | null>(null);
	const [title, setTitle] = useState("");
	const [location, setLocation] = useState("");
	const [skills, setSkills] = useState("");
	const [targetRole, setTargetRole] = useState("");
	const [preferredLocation, setPreferredLocation] = useState("");
	const [workModel, setWorkModel] = useState("Flexible");
	const [notes, setNotes] = useState("");

	useEffect(() => {
		setTitle(profile?.title ?? "");
		setLocation(profile?.location ?? "");
		setSkills(profile?.skills.join(", ") ?? "");
		setTargetRole(profile?.jobPreferences.targetRole ?? "");
		setPreferredLocation(profile?.jobPreferences.preferredLocation ?? "");
		setWorkModel(profile?.jobPreferences.workModel ?? "Flexible");
		setNotes(profile?.jobPreferences.notes ?? "");
		if (profile?.cvFileName) setFileName(profile.cvFileName);
	}, [profile]);

	const initials = useMemo(() => {
		const name = profile?.name ?? user?.name ?? "JobIQ";
		return name
			.split(" ")
			.filter(Boolean)
			.slice(0, 2)
			.map((part) => part[0])
			.join("")
			.toUpperCase();
	}, [profile?.name, user?.name]);

	const showToast = (msg: string) => {
		setToast(msg);
		setTimeout(() => setToast(null), 2500);
	};

	const saveProfile = async () => {
		setSaving(true);
		try {
			const response = await fetch("/api/profile", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ title, location, skills }),
			});

			const payload = (await response.json().catch(() => ({}))) as {
				user?: typeof user;
				message?: string;
			};
			if (!response.ok || !payload.user) {
				throw new Error(payload.message ?? "Unable to save profile.");
			}

			setUser(payload.user);
			setEditing(false);
			showToast("Profile saved.");
		} catch (error) {
			showToast(error instanceof Error ? error.message : "Unable to save profile.");
		} finally {
			setSaving(false);
		}
	};

	const reviewCv = async (file: File) => {
		const ext = file.name.split(".").pop()?.toLowerCase();
		if (!ext || !["pdf", "docx", "txt", "md"].includes(ext)) {
			setUploadState("error");
			setUploadMessage("Use a PDF, DOCX, TXT, or Markdown CV file.");
			return;
		}

		setFileName(file.name);
		setUploadState("processing");
		setUploadMessage("AI is reviewing your CV...");

		const formData = new FormData();
		formData.append("cv", file);
		formData.append("targetRole", targetRole);
		formData.append("preferredLocation", preferredLocation);
		formData.append("workModel", workModel);
		formData.append("notes", notes);

		try {
			const response = await fetch("/api/ai/cv-review", {
				method: "POST",
				body: formData,
			});
			const payload = (await response.json().catch(() => ({}))) as {
				user?: typeof user;
				message?: string;
				model?: string;
			};

			if (!response.ok || !payload.user) {
				throw new Error(payload.message ?? "Unable to review this CV.");
			}

			setUser(payload.user);
			setUploadState("success");
			setUploadMessage(
				`AI review complete${payload.model ? ` with ${payload.model}` : ""}. Recommendations are ready.`,
			);
			showToast("CV reviewed and recommendations updated.");
		} catch (error) {
			setUploadState("error");
			setUploadMessage(
				error instanceof Error ? error.message : "Unable to review this CV.",
			);
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) void reviewCv(file);
		event.target.value = "";
	};

	const handleDrop = (event: React.DragEvent) => {
		event.preventDefault();
		const file = event.dataTransfer.files?.[0];
		if (file) void reviewCv(file);
	};

	const handleDragOver = (event: React.DragEvent) => event.preventDefault();

	if (!profile) return null;

	const hasExperience = profile.experience.length > 0;
	const hasSkills = profile.skills.length > 0;
	const hasReview = Boolean(profile.cvReview.headline);
	const hasRecommendations = profile.recommendedRoles.length > 0;

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

			<Header
				activePage="profile"
				actions={
					<button
						onClick={() => fileInputRef.current?.click()}
						disabled={uploadState === "processing"}
						className="hidden sm:flex min-w-[104px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-purple-500 text-white text-sm font-bold leading-normal transition-all shadow-[0_0_20px_rgba(168,85,247,0.25)] disabled:opacity-50"
					>
						<span className="material-symbols-outlined text-lg">
							upload_file
						</span>
						<span className="truncate">Upload CV</span>
					</button>
				}
			/>

			<div className="flex-1 flex justify-center py-8 px-4 sm:px-6 lg:px-8">
				<div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8">
					<div className="lg:col-span-8 flex flex-col gap-8">
						<div>
							<h1 className="text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-2 drop-shadow-md">
								Profile &amp; CV Review
							</h1>
							<p className="text-slate-400 text-lg">
								Upload a CV and add your target role so JobIQ can build your
								recommendations from real candidate data.
							</p>
						</div>

						<section className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8">
							<div className="flex items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
								<h2 className="text-white text-xl md:text-2xl font-bold flex items-center gap-3">
									<span className="material-symbols-outlined text-primary-dark">
										psychology
									</span>
									AI CV Review
								</h2>
								{profile.cvUpdatedAt && (
									<span className="text-xs text-slate-500">
										Last reviewed{" "}
										{new Date(profile.cvUpdatedAt).toLocaleDateString()}
									</span>
								)}
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
								<div>
									<label className="text-xs font-medium text-slate-400 mb-1.5 block">
										Target role
									</label>
									<input
										value={targetRole}
										onChange={(event) => setTargetRole(event.target.value)}
										className="w-full h-11 rounded-lg bg-white/5 border border-white/10 px-3 text-white text-sm focus:outline-none focus:border-primary-dark/50"
										placeholder="Frontend Developer"
									/>
								</div>
								<div>
									<label className="text-xs font-medium text-slate-400 mb-1.5 block">
										Preferred location
									</label>
									<input
										value={preferredLocation}
										onChange={(event) =>
											setPreferredLocation(event.target.value)
										}
										className="w-full h-11 rounded-lg bg-white/5 border border-white/10 px-3 text-white text-sm focus:outline-none focus:border-primary-dark/50"
										placeholder="Jakarta, Remote"
									/>
								</div>
								<div>
									<label className="text-xs font-medium text-slate-400 mb-1.5 block">
										Work model
									</label>
									<select
										value={workModel}
										onChange={(event) => setWorkModel(event.target.value)}
										className="w-full h-11 rounded-lg bg-white/5 border border-white/10 px-3 text-white text-sm focus:outline-none focus:border-primary-dark/50"
									>
										<option>Flexible</option>
										<option>Remote</option>
										<option>Hybrid</option>
										<option>On-site</option>
									</select>
								</div>
							</div>

							<label className="text-xs font-medium text-slate-400 mb-1.5 block">
								Additional goals
							</label>
							<textarea
								value={notes}
								onChange={(event) => setNotes(event.target.value)}
								className="w-full h-24 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white text-sm focus:outline-none focus:border-primary-dark/50 resize-none mb-5"
								placeholder="Industries, seniority, salary expectations, or skills you want to use more."
							/>

							<div
								onDrop={handleDrop}
								onDragOver={handleDragOver}
								onClick={() => fileInputRef.current?.click()}
								className={`upload-zone rounded-xl p-8 cursor-pointer group relative overflow-hidden ${uploadState === "error" ? "!border-red-500/60 !bg-red-500/5" : ""}`}
							>
								<input
									ref={fileInputRef}
									type="file"
									accept=".pdf,.docx,.txt,.md"
									onChange={handleFileChange}
									className="hidden"
								/>
								<div className="flex flex-col items-center justify-center gap-4 text-center py-10 relative z-10">
									{uploadState === "processing" ? (
										<>
											<div className="size-20 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 mb-2 animate-pulse border border-purple-500/40">
												<span className="material-symbols-outlined text-4xl">
													auto_awesome
												</span>
											</div>
											<h3 className="text-white text-xl font-bold tracking-wide">
												Reviewing {fileName}...
											</h3>
											<div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mt-2">
												<div
													className="h-full bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full animate-pulse"
													style={{ width: "72%" }}
												/>
											</div>
											<p className="text-purple-300 text-sm">{uploadMessage}</p>
										</>
									) : uploadState === "success" ? (
										<>
											<div className="size-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mb-2 border border-green-500/40">
												<span className="material-symbols-outlined text-4xl">
													check_circle
												</span>
											</div>
											<h3 className="text-white text-xl font-bold tracking-wide">
												{fileName} reviewed
											</h3>
											<p className="text-green-400 text-sm">{uploadMessage}</p>
											<Link
												href="/"
												className="mt-2 inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-primary hover:bg-purple-500 text-white text-sm font-bold transition-all"
											>
												<span className="material-symbols-outlined text-lg">
													arrow_forward
												</span>
												View recommendations
											</Link>
										</>
									) : uploadState === "error" ? (
										<>
											<div className="size-20 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 mb-2 border border-red-500/40">
												<span className="material-symbols-outlined text-4xl">
													error
												</span>
											</div>
											<h3 className="text-white text-xl font-bold tracking-wide">
												Review failed
											</h3>
											<p className="text-red-400 text-sm max-w-md">
												{uploadMessage}
											</p>
										</>
									) : (
										<>
											<div className="size-20 rounded-full bg-white/5 flex items-center justify-center text-primary-dark mb-2 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.3)] border border-white/10">
												<span className="material-symbols-outlined text-4xl">
													cloud_upload
												</span>
											</div>
											<h3 className="text-white text-xl font-bold tracking-wide">
												Upload CV for AI review
											</h3>
											<p className="text-slate-400 max-w-sm">
												PDF, DOCX, TXT, or Markdown files up to 8 MB.
											</p>
											<button className="mt-4 flex items-center justify-center rounded-lg h-10 px-8 bg-white/10 hover:bg-primary hover:text-white text-slate-200 text-sm font-bold transition-all border border-white/10">
												Select file
											</button>
										</>
									)}
								</div>
							</div>
						</section>

						{hasReview && (
							<section className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8">
								<h2 className="text-white text-xl font-bold flex items-center gap-3 mb-4">
									<span className="material-symbols-outlined text-primary-dark">
										rule
									</span>
									CV Review Result
								</h2>
								<p className="text-slate-300 leading-relaxed mb-6">
									{profile.cvReview.headline}
								</p>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="rounded-lg bg-green-500/5 border border-green-500/10 p-4">
										<p className="text-sm font-bold text-green-300 mb-3">
											Strengths
										</p>
										<ul className="space-y-2">
											{profile.cvReview.strengths.map((item) => (
												<li
													key={item}
													className="flex gap-2 text-sm text-slate-300 leading-relaxed"
												>
													<span className="material-symbols-outlined text-[16px] text-green-400 mt-0.5">
														check_small
													</span>
													{item}
												</li>
											))}
										</ul>
									</div>
									<div className="rounded-lg bg-amber-500/5 border border-amber-500/10 p-4">
										<p className="text-sm font-bold text-amber-300 mb-3">
											Improvements
										</p>
										<ul className="space-y-2">
											{profile.cvReview.improvements.map((item) => (
												<li
													key={item}
													className="flex gap-2 text-sm text-slate-300 leading-relaxed"
												>
													<span className="material-symbols-outlined text-[16px] text-amber-400 mt-0.5">
														error
													</span>
													{item}
												</li>
											))}
										</ul>
									</div>
								</div>
								{profile.cvReview.keywords.length > 0 && (
									<div className="mt-5 flex flex-wrap gap-2">
										{profile.cvReview.keywords.map((keyword) => (
											<span
												key={keyword}
												className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium text-purple-200 glass-tag"
											>
												{keyword}
											</span>
										))}
									</div>
								)}
							</section>
						)}

						<section className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8 relative">
							<div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
								<h2 className="text-white text-2xl font-bold flex items-center gap-3">
									<span className="material-symbols-outlined text-primary-dark">
										person_search
									</span>
									Profile Summary
								</h2>
								<button
									onClick={() => setEditing((prev) => !prev)}
									className="text-primary-dark text-sm font-medium hover:text-purple-300 transition-colors"
								>
									{editing ? "Cancel" : "Edit Profile"}
								</button>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								<div className="flex flex-col gap-8">
									<div className="flex items-start gap-5">
										<div className="size-20 rounded-full flex-shrink-0 ring-2 ring-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)] bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center text-white text-2xl font-bold">
											{initials}
										</div>
										<div>
											<h3 className="text-xl font-bold text-white tracking-wide">
												{profile.name}
											</h3>
											<p className="text-primary-dark font-medium">
												{profile.title || "Add your current role"}
											</p>
											<div className="flex items-center gap-2 mt-2 text-sm text-slate-400">
												<span className="material-symbols-outlined text-[18px]">
													location_on
												</span>
												{profile.location || "Add location"}
											</div>
										</div>
									</div>

									{profile.summary && (
										<p className="text-sm text-slate-300 leading-relaxed">
											{profile.summary}
										</p>
									)}

									{editing && (
										<div className="space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
											<div>
												<label className="text-xs font-medium text-slate-400 mb-1.5 block">
													Current role
												</label>
												<input
													value={title}
													onChange={(event) => setTitle(event.target.value)}
													className="w-full h-11 rounded-lg bg-white/5 border border-white/10 px-3 text-white text-sm focus:outline-none focus:border-primary-dark/50"
													placeholder="Current role"
												/>
											</div>
											<div>
												<label className="text-xs font-medium text-slate-400 mb-1.5 block">
													Location
												</label>
												<input
													value={location}
													onChange={(event) => setLocation(event.target.value)}
													className="w-full h-11 rounded-lg bg-white/5 border border-white/10 px-3 text-white text-sm focus:outline-none focus:border-primary-dark/50"
													placeholder="City, country"
												/>
											</div>
											<div>
												<label className="text-xs font-medium text-slate-400 mb-1.5 block">
													Key skills
												</label>
												<textarea
													value={skills}
													onChange={(event) => setSkills(event.target.value)}
													className="w-full h-24 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white text-sm focus:outline-none focus:border-primary-dark/50 resize-none"
													placeholder="React, SQL, research"
												/>
											</div>
											<button
												onClick={saveProfile}
												disabled={saving}
												className="h-10 px-5 rounded-lg bg-primary hover:bg-purple-500 text-white text-sm font-bold transition-all disabled:opacity-50"
											>
												{saving ? "Saving..." : "Save Profile"}
											</button>
										</div>
									)}

									<div className="space-y-5">
										<h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
											Experience
										</h4>
										{hasExperience ? (
											<div className="pl-4 border-l-2 border-white/10 space-y-8 ml-2">
												{profile.experience.map((exp, i) => (
													<div key={`${exp.company}-${i}`} className="relative">
														<div className="absolute -left-[23px] top-1.5 size-3.5 rounded-full bg-purple-600 ring-4 ring-[#1e1430]" />
														<h5 className="text-base font-bold text-white">
															{exp.role}
														</h5>
														<p className="text-sm text-slate-300">
															{exp.company}
														</p>
														<p className="text-xs text-slate-500 mt-1">
															{exp.period}
														</p>
													</div>
												))}
											</div>
										) : (
											<p className="text-sm text-slate-500">
												CV experience will appear after AI review.
											</p>
										)}
									</div>
								</div>

								<div className="flex flex-col gap-6">
									<div>
										<h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
											Key Skills
										</h4>
										{hasSkills ? (
											<div className="flex flex-wrap gap-2">
												{profile.skills.map((skill) => (
													<span
														key={skill}
														className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium text-purple-200 glass-tag"
													>
														{skill}
													</span>
												))}
											</div>
										) : (
											<p className="text-sm text-slate-500">
												Skills will be extracted from your CV review.
											</p>
										)}
									</div>
									<div className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 rounded-xl p-5 border border-purple-500/20 shadow-inner mt-4">
										<div className="flex items-start gap-3">
											<span className="material-symbols-outlined text-primary-dark mt-0.5">
												tips_and_updates
											</span>
											<div>
												<p className="text-sm font-bold text-white mb-1">
													Profile guidance
												</p>
												<p className="text-sm text-slate-300 leading-relaxed font-light">
													{profile.profileStrength >= 75
														? "Your CV has enough detail for personalized role recommendations."
														: "Upload your CV and add a target role to improve recommendation quality."}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>

					<div className="lg:col-span-4 flex flex-col gap-6">
						<aside className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden sticky top-28 border border-white/10">
							<div className="p-5 border-b border-white/10 bg-white/5 flex items-center gap-3">
								<div className="size-8 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center text-white">
									<span className="material-symbols-outlined text-lg">
										psychology
									</span>
								</div>
								<h2 className="text-white text-lg font-bold tracking-wide">
									Career Insights
								</h2>
							</div>
							<div className="p-5 flex flex-col gap-8">
								<div>
									<div className="flex justify-between items-end mb-2">
										<span className="text-sm font-medium text-slate-400">
											Profile Strength
										</span>
										<span className="text-xl font-bold text-primary-dark">
											{profile.profileStrength}%
										</span>
									</div>
									<div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
										<div
											className="bg-gradient-to-r from-purple-600 to-cyan-500 h-2 rounded-full"
											style={{ width: `${profile.profileStrength}%` }}
										/>
									</div>
								</div>

								<div>
									<h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
										<span className="material-symbols-outlined text-amber-500 text-lg">
											warning
										</span>
										Next Steps
									</h3>
									<div className="flex flex-col gap-2">
										{profile.missingSkills.map((item) => (
											<div
												key={item}
												className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5"
											>
												<span className="material-symbols-outlined text-slate-500">
													add_circle
												</span>
												<span className="text-sm font-medium text-slate-300">
													{item}
												</span>
											</div>
										))}
									</div>
								</div>

								<div>
									<div className="flex items-center justify-between gap-3 mb-3">
										<h3 className="text-sm font-bold text-white flex items-center gap-2">
											<span className="material-symbols-outlined text-primary-dark text-lg">
												work
											</span>
											Recommended Roles
										</h3>
										{hasRecommendations && (
											<Link
												href="/"
												className="text-xs text-primary-dark hover:text-white"
											>
												Dashboard
											</Link>
										)}
									</div>
									{hasRecommendations ? (
										<div className="space-y-3">
											{profile.recommendedRoles.map((role) => (
												<div
													key={`${role.title}-${role.match}`}
													className="p-3 rounded-lg border border-white/5 bg-white/[0.02]"
												>
													<div className="flex justify-between items-start gap-3 mb-1">
														<span className="text-sm font-bold text-slate-200">
															{role.title}
														</span>
														<span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20 shrink-0">
															{role.match}%
														</span>
													</div>
													<p className="text-xs text-slate-500">
														{role.workModel} &bull; {role.location}
													</p>
												</div>
											))}
										</div>
									) : (
										<p className="text-sm text-slate-500">
											Role recommendations will appear after AI reviews your CV.
										</p>
									)}
								</div>
							</div>
						</aside>
					</div>
				</div>
			</div>
		</div>
	);
}
