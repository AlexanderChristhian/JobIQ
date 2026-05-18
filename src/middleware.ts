import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE = "jobiq_session";
const publicPaths = ["/login", "/signup", "/wizard"];

export function middleware(request: NextRequest) {
	const { pathname, search } = request.nextUrl;
	const isPublicPath = publicPaths.some(
		(path) => pathname === path || pathname.startsWith(`${path}/`),
	);
	const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

	if (!hasSession && !isPublicPath) {
		const loginUrl = new URL("/login", request.url);
		loginUrl.searchParams.set("next", `${pathname}${search}`);
		return NextResponse.redirect(loginUrl);
	}

	if (hasSession && (pathname === "/login" || pathname === "/signup")) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|jobiq.svg|.*\\..*).*)",
	],
};

