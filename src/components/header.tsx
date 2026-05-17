import React from "react";

type ActivePage =
	| "dashboard"
	| "interview"
	| "tracker"
	| "jobs"
	| "profile"
	| "settings"
	| null;

interface HeaderProps {
	activePage?: ActivePage;
	actions?: React.ReactNode;
}

const navItems: { label: string; href: string; page: ActivePage }[] = [
	{ label: "Dashboard", href: "/", page: "dashboard" },
	{ label: "Interview", href: "/interview", page: "interview" },
	{ label: "Tracker", href: "/tracker", page: "tracker" },
	{ label: "Jobs", href: "/saved-jobs", page: "jobs" },
	{ label: "Profile", href: "/profile", page: "profile" },
	{ label: "Settings", href: "/settings", page: "settings" },
];

function Header({ activePage = null, actions }: HeaderProps) {
	return (
		<header className="flex items-center justify-between whitespace-nowrap border-b border-white/10 glass-panel px-10 py-3 sticky top-0 z-50">
			<div className="flex items-center gap-8">
				<a href="/" className="flex items-center gap-4 text-white">
					<img
						src="/jobiq.svg"
						alt="JobIQ"
						className="size-9 drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]"
					/>
					<h2 className="text-white text-lg font-bold leading-tight tracking-wide drop-shadow-sm">
						JobIQ
					</h2>
				</a>
				<label className="hidden lg:flex flex-col min-w-40 h-10! max-w-64">
					<div className="flex w-full flex-1 items-stretch rounded-lg h-full ring-1 ring-white/10 bg-white/5 focus-within:ring-primary-dark/50 transition-all">
						<div className="text-slate-400 flex border-none items-center justify-center pl-4 rounded-l-lg border-r-0">
							<span className="material-symbols-outlined text-lg">search</span>
						</div>
						<input
							className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-transparent focus:border-none h-full placeholder:text-slate-500 px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal"
							placeholder="Search jobs, skills..."
						/>
					</div>
				</label>
			</div>
			<div className="flex flex-1 justify-end gap-8">
				<div className="hidden md:flex items-center gap-9">
					{navItems.map((item) => (
						<a
							key={item.page}
							className={
								activePage === item.page
									? "text-primary-dark text-sm font-bold leading-normal drop-shadow-[0_0_8px_rgba(192,132,252,0.4)]"
									: "text-slate-300 text-sm font-medium leading-normal hover:text-primary-dark hover:drop-shadow-[0_0_5px_rgba(192,132,252,0.5)] transition-all"
							}
							href={item.href}
						>
							{item.label}
						</a>
					))}
				</div>
				<div className="flex items-center gap-4">
					{actions}
					<div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-white/10 bg-linear-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
						AX
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
