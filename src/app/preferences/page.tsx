"use client";

import { useState } from "react";
import data from "@/data/preferences.json";
import Header from "@/components/header";

const prefData = data;

export default function PreferencesPage() {
	const [salaryMin, setSalaryMin] = useState(prefData.salaryExpectation.min);
	const [salaryMax, setSalaryMax] = useState(prefData.salaryExpectation.max);
	const [workModels, setWorkModels] = useState<string[]>(prefData.workModel);
	const [roles, setRoles] = useState<string[]>(prefData.desiredRoles);
	const [keywords, setKeywords] = useState(prefData.keywords.join(", "));
	const [toast, setToast] = useState<string | null>(null);

	const showToast = (msg: string) => {
		setToast(msg);
		setTimeout(() => setToast(null), 2500);
	};

	const toggleWorkModel = (model: string) => {
		setWorkModels((prev) =>
			prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model],
		);
	};

	const toggleRole = (role: string) => {
		setRoles((prev) =>
			prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
		);
	};

	const handleSave = () => {
		showToast("Preferences saved! AI recommendations will update shortly.");
	};

	const allRoles = [
		"Product Manager",
		"Product Lead",
		"Product Owner",
		"Product Designer",
		"Product Marketing Manager",
		"Associate Product Manager",
		"Technical Product Manager",
		"Growth Product Manager",
	];

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

			<Header activePage="settings" />

			<div className="flex-1 flex justify-center py-8 px-4 sm:px-6 lg:px-8">
				<div className="w-full max-w-4xl flex flex-col gap-8">
					<div>
						<h1 className="text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-2 drop-shadow-md">
							Preferences &amp; Settings
						</h1>
						<p className="text-slate-400 text-lg">
							Fine-tune your job search criteria for better AI recommendations.
						</p>
					</div>

					<div className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8">
						<h2 className="text-white text-xl font-bold flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
							<span className="material-symbols-outlined text-primary-dark">
								work
							</span>
							Job Requirements
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div>
								<label className="text-sm font-medium text-slate-400 mb-2 block">
									Min. Salary (annual)
								</label>
								<div className="relative">
									<span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
										$
									</span>
									<input
										type="number"
										value={salaryMin}
										onChange={(e) => setSalaryMin(Number(e.target.value))}
										className="w-full rounded-lg h-12 bg-white/5 border border-white/10 text-white pl-8 pr-4 focus:outline-none focus:border-primary-dark/50 focus:bg-white/10 transition-all"
									/>
								</div>
							</div>
							<div>
								<label className="text-sm font-medium text-slate-400 mb-2 block">
									Max. Salary (annual)
								</label>
								<div className="relative">
									<span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
										$
									</span>
									<input
										type="number"
										value={salaryMax}
										onChange={(e) => setSalaryMax(Number(e.target.value))}
										className="w-full rounded-lg h-12 bg-white/5 border border-white/10 text-white pl-8 pr-4 focus:outline-none focus:border-primary-dark/50 focus:bg-white/10 transition-all"
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8">
						<h2 className="text-white text-xl font-bold flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
							<span className="material-symbols-outlined text-primary-dark">
								business_center
							</span>
							Work Model
						</h2>
						<div className="flex flex-wrap gap-3">
							{["Remote", "Hybrid", "On-site"].map((model) => (
								<button
									key={model}
									onClick={() => toggleWorkModel(model)}
									className={`px-6 py-3 rounded-xl font-medium text-sm transition-all border ${workModels.includes(model) ? "bg-primary/20 border-primary-dark/60 text-primary-dark shadow-[0_0_15px_rgba(168,85,247,0.2)]" : "bg-white/5 border-white/10 text-slate-400 hover:border-primary-dark/40 hover:text-slate-200"}`}
								>
									{model}
								</button>
							))}
						</div>
					</div>

					<div className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8">
						<h2 className="text-white text-xl font-bold flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
							<span className="material-symbols-outlined text-primary-dark">
								badge
							</span>
							Desired Roles
						</h2>
						<div className="flex flex-wrap gap-2">
							{allRoles.map((role) => (
								<button
									key={role}
									onClick={() => toggleRole(role)}
									className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${roles.includes(role) ? "bg-primary/20 border-primary-dark/60 text-primary-dark shadow-[0_0_12px_rgba(168,85,247,0.2)]" : "bg-white/5 border-white/10 text-slate-400 hover:border-primary-dark/40 hover:text-slate-200"}`}
								>
									<span
										className={`material-symbols-outlined text-lg ${roles.includes(role) ? "text-primary-dark" : "text-slate-600"}`}
									>
										{roles.includes(role)
											? "check_box"
											: "check_box_outline_blank"}
									</span>
									{role}
								</button>
							))}
						</div>
					</div>

					<div className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8">
						<h2 className="text-white text-xl font-bold flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
							<span className="material-symbols-outlined text-primary-dark">
								manage_search
							</span>
							Keywords &amp; Filters
						</h2>
						<label className="text-sm font-medium text-slate-400 mb-2 block">
							Keywords (comma separated)
						</label>
						<textarea
							value={keywords}
							onChange={(e) => setKeywords(e.target.value)}
							className="w-full rounded-lg bg-white/5 border border-white/10 text-white p-4 h-24 focus:outline-none focus:border-primary-dark/50 focus:bg-white/10 transition-all resize-none"
						/>
						<p className="text-xs text-slate-500 mt-2">
							Examples: agile, SaaS, B2B, machine learning, growth, UX
						</p>
					</div>

					<div className="flex justify-end gap-4">
						<button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 font-medium text-sm hover:bg-white/10 transition-all">
							Reset
						</button>
						<button
							onClick={handleSave}
							className="px-8 py-3 rounded-xl bg-primary hover:bg-purple-500 text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center gap-2"
						>
							<span className="material-symbols-outlined text-lg">save</span>
							Save Changes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
