"use client";

import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
	useRef,
} from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextValue {
	connected: boolean;
	wizardConnected: boolean;
	emit: (event: string, payload: unknown) => void;
	on: (event: string, handler: (...args: unknown[]) => void) => void;
	off: (event: string, handler: (...args: unknown[]) => void) => void;
}

const SocketContext = createContext<SocketContextValue>({
	connected: false,
	wizardConnected: false,
	emit: () => {},
	on: () => {},
	off: () => {},
});

function createSocket(): Socket {
	const isWizard =
		typeof window !== "undefined" &&
		window.location.pathname.startsWith("/wizard");
	return io({
		path: "/socket.io",
		query: isWizard ? { role: "wizard" } : {},
		transports: ["websocket", "polling"],
		autoConnect: true,
	});
}

export function SocketProvider({ children }: { children: React.ReactNode }) {
	const [connected, setConnected] = useState(false);
	const [wizardConnected, setWizardConnected] = useState(false);
	const socketRef = useRef<Socket | null>(null);

	if (!socketRef.current && typeof window !== "undefined") {
		socketRef.current = createSocket();
	}

	useEffect(() => {
		const socket = socketRef.current;
		if (!socket) return;

		socket.on("connect", () => setConnected(true));
		socket.on("disconnect", () => setConnected(false));
		socket.on("wizard:connected", () => setWizardConnected(true));
		socket.on("wizard:disconnected", () => setWizardConnected(false));

		return () => {
			socket.off("connect");
			socket.off("disconnect");
			socket.off("wizard:connected");
			socket.off("wizard:disconnected");
			socket.disconnect();
			socketRef.current = null;
		};
	}, []);

	const emit = useCallback((event: string, payload: unknown) => {
		socketRef.current?.emit(event, payload);
	}, []);

	const on = useCallback(
		(event: string, handler: (...args: unknown[]) => void) => {
			socketRef.current?.on(event, handler);
		},
		[],
	);

	const off = useCallback(
		(event: string, handler: (...args: unknown[]) => void) => {
			socketRef.current?.off(event, handler);
		},
		[],
	);

	return (
		<SocketContext.Provider
			value={{ connected, wizardConnected, emit, on, off }}
		>
			{children}
		</SocketContext.Provider>
	);
}

export function useSocket() {
	return useContext(SocketContext);
}

export function useSocketListener<T>(
	event: string,
	handler: (data: T) => void,
) {
	const { on, off } = useSocket();
	const handlerRef = useRef(handler);
	handlerRef.current = handler;

	useEffect(() => {
		const stableHandler = (...args: unknown[]) => {
			handlerRef.current(args[0] as T);
		};
		on(event, stableHandler);
		return () => {
			off(event, stableHandler);
		};
	}, [event, on, off]);
}
