"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import { useAuth } from "@/lib/AuthProvider";

export default function PreferencesPage() {
	const { user, setUser } = useAuth();
	const preferences = user?.profile.jobPreferences;
	const [salaryMin, setSalaryMin] = useState(0);
	const [salaryMax, setSalaryMax] = useState(0);
	const [workModel, setWorkModel] = useState("Flexible");
	const [targetRole, setTargetRole] = useState("");
	const [preferredLocation, setPreferredLocation] = useState("");
	const [roles, setRoles] = useState("");
	const [keywords, setKeywords] = useState("");
	const [notes, setNotes] = useState("");
	const [saving, setSaving] = useState(false);
	const [toast, setToast] = useState<string | null>(null);

	useEffect(() => {
		if (!preferences) return;
		setSalaryMin(preferences.salaryMin);
		setSalaryMax(preferences.salaryMax);
		setWorkModel(preferences.workModel || "Flexible");
		setTargetRole(preferences.targetRole);
		setPreferredLocation(preferences.preferredLocation);
		setRoles(preferences.desiredRoles.join(", "));
		setKeywords(preferences.keywords.join(", "));
		setNotes(preferences.notes);
	}, [preferences]);

	const showToast = (msg: string) => {
		setToast(msg);
		setTimeout(() => setToast(null), 2500);
	};

	const savePreferences = async () => {
		setSaving(true);
		try {
			const response = await fetch("/api/preferences", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					salaryMin,
					salaryMax,
					workModel,
					targetRole,
					preferredLocation,
					desiredRoles: roles,
					keywords,
					notes,
				}),
			});
			const payload = (await response.json().catch(() => ({}))) as {
				user?: typeof user;
				message?: string;
			};
			if (!response.ok || !payload.user) {
				throw new Error(payload.message ?? "Unable to save preferences.");
			}

			setUser(payload.user);
			showToast("Preferences saved.");
		} catch (error) {
			showToast(
				error instanceof Error ? error.message : "Unable to save preferences.",
			);
		} finally {
			setSaving(false);
		}
	};

	const resetForm = () => {
		setSalaryMin(0);
		setSalaryMax(0);
		setWorkModel("Flexible");
		setTargetRole("");
		setPreferredLocation("");
		setRoles("");
		setKeywords("");
		setNotes("");
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

			<Header activePage="preferences" />

			<div className="flex-1 flex justify-center py-8 px-4 sm:px-6 lg:px-8">
				<div className="w-full max-w-5xl flex flex-col gap-8">
					<div>
						<h1 className="text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-2 drop-shadow-md">
							Job Preferences
						</h1>
						<p className="text-slate-400 text-lg">
							These preferences are saved to your account and used by AI
							recommendations.
						</p>
					</div>

					<section className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8">
						<h2 className="text-white text-xl font-bold flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
							<span className="material-symbols-outlined text-primary-dark">
								work
							</span>
							Search Direction
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
							<div>
								<label className="text-sm font-medium text-slate-400 mb-2 block">
									Target role
								</label>
								<input
									value={targetRole}
									onChange={(event) => setTargetRole(event.target.value)}
									className="w-full rounded-lg h-12 bg-white/5 border border-white/10 text-white px-4 focus:outline-none focus:border-primary-dark/50"
									placeholder="Frontend Developer"
								/>
							</div>
							<div>
								<label className="text-sm font-medium text-slate-400 mb-2 block">
									Preferred location
								</label>
								<input
									value={preferredLocation}
									onChange={(event) => setPreferredLocation(event.target.value)}
									className="w-full rounded-lg h-12 bg-white/5 border border-white/10 text-white px-4 focus:outline-none focus:border-primary-dark/50"
									placeholder="Jakarta, Remote"
								/>
							</div>
							<div>
								<label className="text-sm font-medium text-slate-400 mb-2 block">
									Work model
								</label>
								<select
									value={workModel}
									onChange={(event) => setWorkModel(event.target.value)}
									className="w-full rounded-lg h-12 bg-white/5 border border-white/10 text-white px-4 focus:outline-none focus:border-primary-dark/50"
								>
									<option>Flexible</option>
									<option>Remote</option>
									<option>Hybrid</option>
									<option>On-site</option>
								</select>
							</div>
						</div>
					</section>

					<section className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8">
						<h2 className="text-white text-xl font-bold flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
							<span className="material-symbols-outlined text-primary-dark">
								tune
							</span>
							Filters
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							<div>
								<label className="text-sm font-medium text-slate-400 mb-2 block">
									Min. salary
								</label>
								<input
									type="number"
									min={0}
									value={salaryMin}
									onChange={(event) => setSalaryMin(Number(event.target.value))}
									className="w-full rounded-lg h-12 bg-white/5 border border-white/10 text-white px-4 focus:outline-none focus:border-primary-dark/50"
								/>
							</div>
							<div>
								<label className="text-sm font-medium text-slate-400 mb-2 block">
									Max. salary
								</label>
								<input
									type="number"
									min={0}
									value={salaryMax}
									onChange={(event) => setSalaryMax(Number(event.target.value))}
									className="w-full rounded-lg h-12 bg-white/5 border border-white/10 text-white px-4 focus:outline-none focus:border-primary-dark/50"
								/>
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
							<div>
								<label className="text-sm font-medium text-slate-400 mb-2 block">
									Desired roles
								</label>
								<textarea
									value={roles}
									onChange={(event) => setRoles(event.target.value)}
									className="w-full rounded-lg bg-white/5 border border-white/10 text-white p-4 h-28 focus:outline-none focus:border-primary-dark/50 resize-none"
									placeholder="Frontend Engineer, UI Engineer, React Developer"
								/>
							</div>
							<div>
								<label className="text-sm font-medium text-slate-400 mb-2 block">
									Keywords
								</label>
								<textarea
									value={keywords}
									onChange={(event) => setKeywords(event.target.value)}
									className="w-full rounded-lg bg-white/5 border border-white/10 text-white p-4 h-28 focus:outline-none focus:border-primary-dark/50 resize-none"
									placeholder="React, TypeScript, design systems"
								/>
							</div>
						</div>
						<label className="text-sm font-medium text-slate-400 mb-2 block mt-5">
							Additional notes
						</label>
						<textarea
							value={notes}
							onChange={(event) => setNotes(event.target.value)}
							className="w-full rounded-lg bg-white/5 border border-white/10 text-white p-4 h-24 focus:outline-none focus:border-primary-dark/50 resize-none"
							placeholder="Industries, schedule, constraints, or goals."
						/>
					</section>

					<div className="flex justify-end gap-4">
						<button
							onClick={resetForm}
							className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 font-medium text-sm hover:bg-white/10 transition-all"
						>
							Reset Form
						</button>
						<button
							onClick={savePreferences}
							disabled={saving}
							className="px-8 py-3 rounded-xl bg-primary hover:bg-purple-500 text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(168,85,247,0.25)] disabled:opacity-50 flex items-center gap-2"
						>
							<span className="material-symbols-outlined text-lg">save</span>
							{saving ? "Saving..." : "Save Preferences"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
