"use client";

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import type { PublicUser } from "@/lib/server-db";

interface AuthContextValue {
	user: PublicUser | null;
	loading: boolean;
	login: (email: string, password: string) => Promise<void>;
	signup: (name: string, email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	refreshUser: () => Promise<void>;
	setUser: (user: PublicUser | null) => void;
}

const publicRoutes = ["/login", "/signup", "/wizard"];

const AuthContext = createContext<AuthContextValue>({
	user: null,
	loading: true,
	login: async () => {},
	signup: async () => {},
	logout: async () => {},
	refreshUser: async () => {},
	setUser: () => {},
});

async function parseAuthResponse(response: Response) {
	const payload = (await response.json().catch(() => ({}))) as {
		user?: PublicUser | null;
		message?: string;
	};

	if (!response.ok || !payload.user) {
		throw new Error(payload.message ?? "Authentication failed.");
	}

	return payload.user;
}

function AuthSplash() {
	return (
		<div
			className="min-h-screen flex items-center justify-center text-slate-200"
			style={{
				backgroundColor: "#0f0518",
				backgroundImage:
					"radial-gradient(circle at 10% 20%, rgba(88, 28, 135, 0.4) 0%, transparent 40%), radial-gradient(circle at 90% 60%, rgba(126, 34, 206, 0.3) 0%, transparent 40%)",
			}}
		>
			<div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
				<span className="material-symbols-outlined animate-spin text-primary-dark">
					progress_activity
				</span>
				<span className="text-sm text-slate-300">Loading JobIQ...</span>
			</div>
		</div>
	);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();
	const [user, setUser] = useState<PublicUser | null>(null);
	const [loading, setLoading] = useState(true);

	const refreshUser = useCallback(async () => {
		const response = await fetch("/api/auth/me", { cache: "no-store" });
		if (!response.ok) {
			setUser(null);
			return;
		}

		const payload = (await response.json()) as { user: PublicUser | null };
		setUser(payload.user ?? null);
	}, []);

	useEffect(() => {
		refreshUser().finally(() => setLoading(false));
	}, [refreshUser]);

	useEffect(() => {
		if (loading) return;
		const isPublicRoute = publicRoutes.some(
			(route) => pathname === route || pathname.startsWith(`${route}/`),
		);
		if (!user && !isPublicRoute) {
			router.replace(`/login?next=${encodeURIComponent(pathname)}`);
		}
	}, [loading, pathname, router, user]);

	const login = useCallback(async (email: string, password: string) => {
		const response = await fetch("/api/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});
		setUser(await parseAuthResponse(response));
	}, []);

	const signup = useCallback(
		async (name: string, email: string, password: string) => {
			const response = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, password }),
			});
			setUser(await parseAuthResponse(response));
		},
		[],
	);

	const logout = useCallback(async () => {
		await fetch("/api/auth/logout", { method: "POST" });
		setUser(null);
		router.replace("/login");
	}, [router]);

	const value = useMemo(
		() => ({ user, loading, login, signup, logout, refreshUser, setUser }),
		[user, loading, login, signup, logout, refreshUser],
	);

	const isPublicRoute = publicRoutes.some(
		(route) => pathname === route || pathname.startsWith(`${route}/`),
	);
	if (loading || (!user && !isPublicRoute)) {
		return <AuthSplash />;
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}

