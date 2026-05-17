import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { SocketProvider } from "@/lib/SocketProvider";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "JobIQ",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="dark">
			<head>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
				/>
			</head>
			<body className={`${manrope.className} antialiased`}>
				<SocketProvider>{children}</SocketProvider>
			</body>
		</html>
	);
}
