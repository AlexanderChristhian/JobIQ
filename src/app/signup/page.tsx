"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthProvider";

export default function SignupPage() {
	const router = useRouter();
	const { user, signup } = useAuth();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		if (user) router.replace("/");
	}, [router, user]);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);
		setError("");
		try {
			await signup(name, email, password);
			router.replace("/");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unable to create account.");
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
					"radial-gradient(circle at 10% 20%, rgba(88, 28, 135, 0.45) 0%, transparent 38%), radial-gradient(circle at 90% 68%, rgba(6, 182, 212, 0.18) 0%, transparent 34%), radial-gradient(circle at 50% 115%, rgba(168, 85, 247, 0.16) 0%, transparent 45%)",
				backgroundAttachment: "fixed",
			}}
		>
			<section className="glass-panel w-full max-w-xl rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.35)] p-6 sm:p-8 md:p-10 border border-white/10">
				<Link href="/login" className="inline-flex items-center gap-3 text-white mb-8">
					<img src="/jobiq.svg" alt="JobIQ" className="size-10" />
					<span className="text-xl font-extrabold tracking-wide">JobIQ</span>
				</Link>

				<div className="mb-8">
					<p className="text-sm font-bold text-primary-dark mb-2">
						New session
					</p>
					<h1 className="text-white text-3xl font-extrabold">
						Create your JobIQ account
					</h1>
					<p className="text-slate-400 mt-2">
						Set up your profile, preferences, and AI-assisted job search in
						one place.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-5">
					<div>
						<label className="text-sm font-medium text-slate-300 mb-2 block">
							Full name
						</label>
						<input
							value={name}
							onChange={(event) => setName(event.target.value)}
							className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary-dark/60 focus:bg-white/10 transition-all"
							placeholder="Your full name"
							autoComplete="name"
						/>
					</div>
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
							autoComplete="new-password"
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
								Creating account...
							</>
						) : (
							<>
								<span className="material-symbols-outlined text-lg">
									person_add
								</span>
								Create account
							</>
						)}
					</button>
				</form>

				<p className="mt-6 text-sm text-slate-400 text-center">
					Already have an account?{" "}
					<Link href="/login" className="text-primary-dark hover:text-white">
						Sign in
					</Link>
				</p>
			</section>
		</main>
	);
}
