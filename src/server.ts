import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server as SocketIOServer } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = createServer((req, res) => {
		const parsedUrl = parse(req.url!, true);
		handle(req, res, parsedUrl);
	});

	const io = new SocketIOServer(server, {
		path: "/socket.io",
		cors: { origin: `http://${hostname}:${port}`, methods: ["GET", "POST"] },
	});

	io.on("connection", (socket) => {
		console.log(`[socket] connected: ${socket.id}`);

		const isWizard = socket.handshake.query.role === "wizard";

		if (isWizard) {
			socket.join("jobiq:wizards");
			console.log(`[socket] wizard joined: ${socket.id}`);
			io.emit("wizard:connected", null);
		} else {
			socket.join("jobiq:users");
			console.log(`[socket] user joined: ${socket.id}`);
		}

		socket.on("interview:submit_answer", (payload) => {
			console.log(`[socket] interview:submit_answer from ${socket.id}`);
			io.to("jobiq:wizards").emit("interview:submit_answer", payload);
		});

		socket.on("interview:send_feedback", (payload) => {
			console.log(`[socket] interview:send_feedback from ${socket.id}`);
			io.to("jobiq:users").emit("interview:send_feedback", payload);
		});

		socket.on("tracker:request_suggestion", (payload) => {
			console.log(`[socket] tracker:request_suggestion from ${socket.id}`);
			io.to("jobiq:wizards").emit("tracker:request_suggestion", payload);
		});

		socket.on("tracker:send_suggestion", (payload) => {
			console.log(`[socket] tracker:send_suggestion from ${socket.id}`);
			io.to("jobiq:users").emit("tracker:send_suggestion", payload);
		});

		socket.on("recommendations:request", (payload) => {
			console.log(`[socket] recommendations:request from ${socket.id}`);
			io.to("jobiq:wizards").emit("recommendations:request", payload);
		});

		socket.on("recommendations:send_results", (payload) => {
			console.log(`[socket] recommendations:send_results from ${socket.id}`);
			io.to("jobiq:users").emit("recommendations:send_results", payload);
		});

		socket.on("disconnect", () => {
			console.log(`[socket] disconnected: ${socket.id}`);
			if (isWizard) {
				const wizardRoom = io.sockets.adapter.rooms.get("jobiq:wizards");
				if (!wizardRoom || wizardRoom.size === 0) {
					io.emit("wizard:disconnected", null);
				}
			}
		});
	});

	server.listen(port, () => {
		console.log(`> Wizard of Oz server ready on http://${hostname}:${port}`);
		console.log(
			`> Open http://${hostname}:${port}/wizard for the wizard dashboard`,
		);
	});
});
