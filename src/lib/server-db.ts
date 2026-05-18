import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export const SESSION_COOKIE = "jobiq_session";

export type ConfidenceBand = "high" | "medium" | "low";

export interface RecommendedRole {
	title: string;
	company: string;
	location: string;
	match: number;
	workModel: string;
	salaryRange: string;
	focus: string;
	whyMatches: string[];
	potentialGaps: string[];
	searchKeywords: string[];
	confidenceBand: ConfidenceBand;
}

export interface CvReview {
	headline: string;
	strengths: string[];
	improvements: string[];
	keywords: string[];
	suggestedSearches: string[];
}

export interface JobPreferences {
	targetRole: string;
	preferredLocation: string;
	workModel: string;
	notes: string;
	salaryMin: number;
	salaryMax: number;
	desiredRoles: string[];
	keywords: string[];
}

export interface SavedJobRecord {
	id: string;
	title: string;
	company: string;
	location: string;
	workModel: string;
	salaryRange: string;
	seniority: string;
	source: string;
	postedAt: string;
	verified: boolean;
	matchScore: number;
	personalNotes: string;
	createdAt: string;
}

export interface UserProfile {
	name: string;
	title: string;
	location: string;
	summary: string;
	experience: Array<{ role: string; company: string; period: string }>;
	skills: string[];
	profileStrength: number;
	missingSkills: string[];
	recommendedRoles: RecommendedRole[];
	cvFileName: string;
	cvUpdatedAt: string;
	jobPreferences: JobPreferences;
	cvReview: CvReview;
}

export interface PublicUser {
	id: string;
	name: string;
	email: string;
	profile: UserProfile;
}

interface UserRecord extends PublicUser {
	passwordHash: string;
	passwordSalt: string;
	createdAt: string;
	savedJobs?: SavedJobRecord[];
}

interface SessionRecord {
	token: string;
	userId: string;
	createdAt: string;
	expiresAt: string;
}

interface Database {
	users: UserRecord[];
	sessions: SessionRecord[];
}

const DB_DIR = path.join(process.cwd(), ".data");
const DB_PATH = path.join(DB_DIR, "jobiq-db.json");
const SESSION_DAYS = 14;

const emptyCvReview: CvReview = {
	headline: "",
	strengths: [],
	improvements: [],
	keywords: [],
	suggestedSearches: [],
};

const emptyJobPreferences: JobPreferences = {
	targetRole: "",
	preferredLocation: "",
	workModel: "Flexible",
	notes: "",
	salaryMin: 0,
	salaryMax: 0,
	desiredRoles: [],
	keywords: [],
};

function normalizeEmail(email: string) {
	return email.trim().toLowerCase();
}

function createProfile(name: string): UserProfile {
	return {
		name,
		title: "",
		location: "",
		summary: "",
		experience: [],
		skills: [],
		profileStrength: 20,
		missingSkills: ["Add current role", "Add key skills", "Upload CV"],
		recommendedRoles: [],
		cvFileName: "",
		cvUpdatedAt: "",
		jobPreferences: { ...emptyJobPreferences },
		cvReview: { ...emptyCvReview },
	};
}

function clamp(value: number, min: number, max: number) {
	return Math.min(max, Math.max(min, value));
}

function cleanString(value: unknown) {
	return typeof value === "string" ? value.trim() : "";
}

function cleanStringArray(value: unknown, limit = 16) {
	if (!Array.isArray(value)) return [];
	return Array.from(
		new Set(
			value
				.map((item) => cleanString(item))
				.filter(Boolean)
				.slice(0, limit),
		),
	);
}

function toConfidenceBand(value: unknown): ConfidenceBand {
	return value === "high" || value === "medium" || value === "low"
		? value
		: "medium";
}

function normalizeProfile(
	profile: Partial<UserProfile> | undefined,
	fallbackName: string,
): UserProfile {
	const raw = profile ?? {};
	const rawPreferences = raw.jobPreferences ?? emptyJobPreferences;
	const rawReview = raw.cvReview ?? emptyCvReview;
	const experience = Array.isArray(raw.experience) ? raw.experience : [];
	const recommendedRoles = Array.isArray(raw.recommendedRoles)
		? raw.recommendedRoles
		: [];

	return {
		name: cleanString(raw.name) || fallbackName,
		title: cleanString(raw.title),
		location: cleanString(raw.location),
		summary: cleanString(raw.summary),
		experience: experience
			.map((item) => ({
				role: cleanString(item?.role),
				company: cleanString(item?.company),
				period: cleanString(item?.period),
			}))
			.filter((item) => item.role || item.company || item.period)
			.slice(0, 8),
		skills: cleanStringArray(raw.skills, 24),
		profileStrength: clamp(Number(raw.profileStrength) || 20, 0, 100),
		missingSkills: cleanStringArray(raw.missingSkills, 8),
		recommendedRoles: recommendedRoles
			.map((role, index) => ({
				title: cleanString(role?.title) || `Recommended role ${index + 1}`,
				company: cleanString(role?.company) || "Role search",
				location: cleanString(role?.location) || "Flexible",
				match: clamp(Number(role?.match) || 0, 0, 100),
				workModel: cleanString(role?.workModel) || "Flexible",
				salaryRange:
					cleanString(role?.salaryRange) || "Research salary before applying",
				focus: cleanString(role?.focus),
				whyMatches: cleanStringArray(role?.whyMatches, 6),
				potentialGaps: cleanStringArray(role?.potentialGaps, 6),
				searchKeywords: cleanStringArray(role?.searchKeywords, 8),
				confidenceBand: toConfidenceBand(role?.confidenceBand),
			}))
			.filter((role) => role.title)
			.slice(0, 8),
		cvFileName: cleanString(raw.cvFileName),
		cvUpdatedAt: cleanString(raw.cvUpdatedAt),
		jobPreferences: {
			targetRole: cleanString(rawPreferences.targetRole),
			preferredLocation: cleanString(rawPreferences.preferredLocation),
			workModel: cleanString(rawPreferences.workModel) || "Flexible",
			notes: cleanString(rawPreferences.notes),
			salaryMin: Math.max(0, Number(rawPreferences.salaryMin) || 0),
			salaryMax: Math.max(0, Number(rawPreferences.salaryMax) || 0),
			desiredRoles: cleanStringArray(rawPreferences.desiredRoles, 12),
			keywords: cleanStringArray(rawPreferences.keywords, 24),
		},
		cvReview: {
			headline: cleanString(rawReview.headline),
			strengths: cleanStringArray(rawReview.strengths, 8),
			improvements: cleanStringArray(rawReview.improvements, 8),
			keywords: cleanStringArray(rawReview.keywords, 16),
			suggestedSearches: cleanStringArray(rawReview.suggestedSearches, 8),
		},
	};
}

function toPublicUser(user: UserRecord): PublicUser {
	return {
		id: user.id,
		name: user.name,
		email: user.email,
		profile: normalizeProfile(user.profile, user.name),
	};
}

async function ensureDatabase() {
	await mkdir(DB_DIR, { recursive: true });
	try {
		await readFile(DB_PATH, "utf8");
	} catch {
		await writeFile(
			DB_PATH,
			JSON.stringify({ users: [], sessions: [] } satisfies Database, null, 2),
		);
	}
}

async function readDatabase(): Promise<Database> {
	await ensureDatabase();
	const raw = await readFile(DB_PATH, "utf8");
	const parsed = JSON.parse(raw) as Database;
	const now = Date.now();
	return {
		users: parsed.users ?? [],
		sessions: (parsed.sessions ?? []).filter(
			(session) => new Date(session.expiresAt).getTime() > now,
		),
	};
}

async function writeDatabase(database: Database) {
	await mkdir(DB_DIR, { recursive: true });
	await writeFile(DB_PATH, JSON.stringify(database, null, 2));
}

function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
	const hash = scryptSync(password, salt, 64).toString("hex");
	return { salt, hash };
}

function verifyPassword(password: string, salt: string, storedHash: string) {
	const candidate = Buffer.from(hashPassword(password, salt).hash, "hex");
	const stored = Buffer.from(storedHash, "hex");
	return candidate.length === stored.length && timingSafeEqual(candidate, stored);
}

export async function createUser(
	name: string,
	email: string,
	password: string,
) {
	const cleanName = name.trim();
	const cleanEmail = normalizeEmail(email);

	if (!cleanName || !cleanEmail || password.length < 6) {
		throw new Error("Use a name, email, and 6+ character password.");
	}

	const database = await readDatabase();
	if (database.users.some((user) => user.email === cleanEmail)) {
		throw new Error("An account with that email already exists.");
	}

	const { salt, hash } = hashPassword(password);
	const user: UserRecord = {
		id: randomBytes(12).toString("hex"),
		name: cleanName,
		email: cleanEmail,
		passwordSalt: salt,
		passwordHash: hash,
		createdAt: new Date().toISOString(),
		profile: createProfile(cleanName),
	};

	database.users.push(user);
	await writeDatabase(database);
	return toPublicUser(user);
}

export async function authenticateUser(email: string, password: string) {
	const cleanEmail = normalizeEmail(email);
	const database = await readDatabase();
	const user = database.users.find((candidate) => candidate.email === cleanEmail);

	if (!user || !verifyPassword(password, user.passwordSalt, user.passwordHash)) {
		throw new Error("We could not find an account with those details.");
	}

	return toPublicUser(user);
}

export async function createSession(userId: string) {
	const database = await readDatabase();
	const token = randomBytes(32).toString("hex");
	const createdAt = new Date();
	const expiresAt = new Date(
		createdAt.getTime() + SESSION_DAYS * 24 * 60 * 60 * 1000,
	);

	database.sessions.push({
		token,
		userId,
		createdAt: createdAt.toISOString(),
		expiresAt: expiresAt.toISOString(),
	});
	await writeDatabase(database);
	return { token, expiresAt };
}

export async function getUserBySession(token?: string) {
	if (!token) return null;
	const database = await readDatabase();
	const session = database.sessions.find((item) => item.token === token);
	if (!session) return null;
	const user = database.users.find((candidate) => candidate.id === session.userId);
	return user ? toPublicUser(user) : null;
}

export async function deleteSession(token?: string) {
	if (!token) return;
	const database = await readDatabase();
	await writeDatabase({
		...database,
		sessions: database.sessions.filter((session) => session.token !== token),
	});
}

export async function updateUserProfile(
	userId: string,
	updates: Partial<Pick<UserProfile, "title" | "location" | "skills">>,
) {
	const database = await readDatabase();
	const user = database.users.find((candidate) => candidate.id === userId);
	if (!user) throw new Error("User not found.");

	const currentProfile = normalizeProfile(user.profile, user.name);
	const title = updates.title?.trim() ?? currentProfile.title;
	const location = updates.location?.trim() ?? currentProfile.location;
	const skills = updates.skills ?? currentProfile.skills;
	const hasCv =
		Boolean(currentProfile.cvUpdatedAt) ||
		currentProfile.experience.length > 0 ||
		currentProfile.recommendedRoles.length > 0;
	const completed = [title, location, skills.length > 0, hasCv].filter(
		Boolean,
	).length;

	user.profile = {
		...currentProfile,
		title,
		location,
		skills,
		profileStrength: Math.min(
			95,
			Math.max(currentProfile.profileStrength, 20 + completed * 18),
		),
		missingSkills: [
			!title ? "Add current role" : "",
			!location ? "Add location" : "",
			skills.length === 0 ? "Add key skills" : "",
			!hasCv ? "Upload CV" : "",
		].filter(Boolean),
	};

	await writeDatabase(database);
	return toPublicUser(user);
}

export async function updateUserProfileFromCv(
	userId: string,
	updates: {
		title: string;
		location: string;
		summary: string;
		experience: UserProfile["experience"];
		skills: string[];
		profileStrength: number;
		missingSkills: string[];
		recommendedRoles: RecommendedRole[];
		cvFileName: string;
		jobPreferences: Partial<JobPreferences>;
		cvReview: CvReview;
	},
) {
	const database = await readDatabase();
	const user = database.users.find((candidate) => candidate.id === userId);
	if (!user) throw new Error("User not found.");

	const currentProfile = normalizeProfile(user.profile, user.name);
	const nextProfile = normalizeProfile(
		{
			...currentProfile,
			title: updates.title || currentProfile.title,
			location: updates.location || currentProfile.location,
			summary: updates.summary || currentProfile.summary,
			experience: updates.experience,
			skills: updates.skills,
			profileStrength: updates.profileStrength,
			missingSkills: updates.missingSkills,
			recommendedRoles: updates.recommendedRoles,
			cvFileName: updates.cvFileName,
			cvUpdatedAt: new Date().toISOString(),
			jobPreferences: {
				...currentProfile.jobPreferences,
				...updates.jobPreferences,
			},
			cvReview: updates.cvReview,
		},
		user.name,
	);

	user.profile = {
		...nextProfile,
		profileStrength: clamp(Math.max(nextProfile.profileStrength, 75), 35, 98),
		missingSkills:
			nextProfile.missingSkills.length > 0
				? nextProfile.missingSkills
				: ["Review target role", "Add preferred location"],
	};

	await writeDatabase(database);
	return toPublicUser(user);
}

export async function updateUserPreferences(
	userId: string,
	updates: Partial<JobPreferences>,
) {
	const database = await readDatabase();
	const user = database.users.find((candidate) => candidate.id === userId);
	if (!user) throw new Error("User not found.");

	const currentProfile = normalizeProfile(user.profile, user.name);
	user.profile = normalizeProfile(
		{
			...currentProfile,
			jobPreferences: {
				...currentProfile.jobPreferences,
				...updates,
				desiredRoles: updates.desiredRoles ?? currentProfile.jobPreferences.desiredRoles,
				keywords: updates.keywords ?? currentProfile.jobPreferences.keywords,
			},
		},
		user.name,
	);

	await writeDatabase(database);
	return toPublicUser(user);
}

function normalizeSavedJob(job: Partial<SavedJobRecord>): SavedJobRecord | null {
	const id = cleanString(job.id);
	const title = cleanString(job.title);
	if (!id || !title) return null;

	return {
		id,
		title,
		company: cleanString(job.company) || "Role search",
		location: cleanString(job.location) || "Flexible",
		workModel: cleanString(job.workModel) || "Flexible",
		salaryRange: cleanString(job.salaryRange) || "Research salary before applying",
		seniority: cleanString(job.seniority) || "Based on CV",
		source: cleanString(job.source) || "CV analysis",
		postedAt: cleanString(job.postedAt) || "Personalized now",
		verified: Boolean(job.verified),
		matchScore: clamp(Number(job.matchScore) || 0, 0, 100),
		personalNotes: cleanString(job.personalNotes),
		createdAt: cleanString(job.createdAt) || new Date().toISOString(),
	};
}

export async function listSavedJobs(userId: string) {
	const database = await readDatabase();
	const user = database.users.find((candidate) => candidate.id === userId);
	if (!user) throw new Error("User not found.");

	return (user.savedJobs ?? [])
		.map((job) => normalizeSavedJob(job))
		.filter((job): job is SavedJobRecord => Boolean(job));
}

export async function saveUserJob(
	userId: string,
	job: Partial<SavedJobRecord>,
) {
	const database = await readDatabase();
	const user = database.users.find((candidate) => candidate.id === userId);
	if (!user) throw new Error("User not found.");

	const normalized = normalizeSavedJob({
		...job,
		createdAt: cleanString(job.createdAt) || new Date().toISOString(),
	});
	if (!normalized) throw new Error("Job title is required.");

	const existing = (user.savedJobs ?? [])
		.map((item) => normalizeSavedJob(item))
		.filter((item): item is SavedJobRecord => Boolean(item));
	user.savedJobs = [
		normalized,
		...existing.filter((item) => item.id !== normalized.id),
	].slice(0, 50);

	await writeDatabase(database);
	return user.savedJobs;
}

export async function updateSavedJobNote(
	userId: string,
	jobId: string,
	personalNotes: string,
) {
	const database = await readDatabase();
	const user = database.users.find((candidate) => candidate.id === userId);
	if (!user) throw new Error("User not found.");

	user.savedJobs = (user.savedJobs ?? [])
		.map((job) => normalizeSavedJob(job))
		.filter((job): job is SavedJobRecord => Boolean(job))
		.map((job) =>
			job.id === jobId ? { ...job, personalNotes: personalNotes.trim() } : job,
		);

	await writeDatabase(database);
	return user.savedJobs;
}

export async function deleteSavedJob(userId: string, jobId: string) {
	const database = await readDatabase();
	const user = database.users.find((candidate) => candidate.id === userId);
	if (!user) throw new Error("User not found.");

	user.savedJobs = (user.savedJobs ?? [])
		.map((job) => normalizeSavedJob(job))
		.filter((job): job is SavedJobRecord => Boolean(job))
		.filter((job) => job.id !== jobId);

	await writeDatabase(database);
	return user.savedJobs;
}
