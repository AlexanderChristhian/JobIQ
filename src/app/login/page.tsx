"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthProvider";

function getNextPath() {
	if (typeof window === "undefined") return "/";
	const next = new URLSearchParams(window.location.search).get("next");
	return next && next.startsWith("/") ? next : "/";
}

export default function LoginPage() {
	const router = useRouter();
	const { user, login } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		if (user) router.replace(getNextPath());
	}, [router, user]);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);
		setError("");
		try {
			await login(email, password);
			router.replace(getNextPath());
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unable to sign in.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<main
			className="min-h-screen text-slate-200 flex items-center justify-center px-4 py-10 selection:bg-purple-500 selection:text-white"
			style={{
				backgroundColor: "#0f0518",
				backgroundImage:
					"radial-gradient(circle at 12% 18%, rgba(88, 28, 135, 0.45) 0%, transparent 38%), radial-gradient(circle at 88% 70%, rgba(37, 99, 235, 0.22) 0%, transparent 36%), radial-gradient(circle at 50% 115%, rgba(168, 85, 247, 0.18) 0%, transparent 45%)",
				backgroundAttachment: "fixed",
			}}
		>
			<div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
				<section className="hidden lg:block">
					<Link href="/" className="inline-flex items-center gap-3 text-white mb-10">
						<img
							src="/jobiq.svg"
							alt="JobIQ"
							className="size-12 drop-shadow-[0_0_12px_rgba(192,132,252,0.55)]"
						/>
						<span className="text-2xl font-extrabold tracking-wide">JobIQ</span>
					</Link>
					<h1 className="text-white text-5xl font-extrabold leading-tight max-w-xl">
						Find better job matches with AI you can inspect.
					</h1>
					<p className="mt-5 text-lg text-slate-400 max-w-lg leading-relaxed">
						Sign in to review recommendations, compare saved jobs, track
						applications, and practice interviews from a fresh session.
					</p>
					<div className="mt-8 grid grid-cols-3 gap-3 max-w-lg">
						{["Explainable matches", "Application tracker", "Interview coach"].map(
							(item) => (
								<div
									key={item}
									className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm font-medium text-slate-300 backdrop-blur"
								>
									{item}
								</div>
							),
						)}
					</div>
				</section>

				<section className="glass-panel rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.35)] p-6 sm:p-8 md:p-10 border border-white/10">
					<div className="lg:hidden flex items-center gap-3 text-white mb-8">
						<img src="/jobiq.svg" alt="JobIQ" className="size-10" />
						<span className="text-xl font-extrabold tracking-wide">JobIQ</span>
					</div>

					<div className="mb-8">
						<p className="text-sm font-bold text-primary-dark mb-2">
							Welcome back
						</p>
						<h2 className="text-white text-3xl font-extrabold">
							Sign in to JobIQ
						</h2>
						<p className="text-slate-400 mt-2">
							Continue your job search with personalized recommendations,
							application tracking, and interview practice.
						</p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-5">
						<div>
							<label className="text-sm font-medium text-slate-300 mb-2 block">
								Email
							</label>
							<input
								type="email"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary-dark/60 focus:bg-white/10 transition-all"
								placeholder="you@example.com"
								autoComplete="email"
							/>
						</div>
						<div>
							<label className="text-sm font-medium text-slate-300 mb-2 block">
								Password
							</label>
							<input
								type="password"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary-dark/60 focus:bg-white/10 transition-all"
								placeholder="At least 6 characters"
								autoComplete="current-password"
							/>
						</div>

						{error && (
							<div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
								{error}
							</div>
						)}

						<button
							type="submit"
							disabled={loading}
							className="w-full h-12 rounded-xl bg-primary hover:bg-purple-500 text-white text-sm font-bold transition-all shadow-[0_0_24px_rgba(168,85,247,0.28)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
						>
							{loading ? (
								<>
									<span className="material-symbols-outlined text-lg animate-spin">
										progress_activity
									</span>
									Signing in...
								</>
							) : (
								<>
									<span className="material-symbols-outlined text-lg">login</span>
									Sign in
								</>
							)}
						</button>
					</form>

					<div className="mt-5">
						<Link
							href="/signup"
							className="h-11 rounded-xl border border-purple-500/30 bg-purple-500/10 text-sm font-medium text-purple-200 hover:bg-purple-500/20 transition-all flex items-center justify-center"
						>
							Create account
						</Link>
					</div>
				</section>
			</div>
		</main>
	);
}
