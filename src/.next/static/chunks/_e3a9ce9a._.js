(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/data/saved-jobs.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"savedJobs\":[{\"id\":\"sv_001\",\"title\":\"Senior UX Designer\",\"company\":\"TechFlow\",\"location\":\"San Francisco\",\"workModel\":\"On-site\",\"salaryRange\":\"$140k - $160k\",\"seniority\":\"Senior\",\"source\":\"LinkedIn\",\"postedAt\":\"1d ago\",\"verified\":true,\"matchScore\":98,\"personalNotes\":\"Great benefits package and close to gym.\",\"coverImage\":\"blue-tech\"},{\"id\":\"sv_002\",\"title\":\"Product Designer\",\"company\":\"GreenScale\",\"location\":\"Remote\",\"workModel\":\"Remote\",\"salaryRange\":\"$130k - $150k\",\"seniority\":\"Senior\",\"source\":\"Kalibrr\",\"postedAt\":\"3d ago\",\"verified\":true,\"matchScore\":85,\"personalNotes\":\"Really like their sustainability mission.\",\"coverImage\":\"green-organic\"},{\"id\":\"sv_003\",\"title\":\"Lead Frontend Engineer\",\"company\":\"Nebula Systems\",\"location\":\"New York\",\"workModel\":\"Hybrid\",\"salaryRange\":\"$160k - $190k\",\"seniority\":\"Lead\",\"source\":\"JobStreet\",\"postedAt\":\"1w ago\",\"verified\":false,\"matchScore\":72,\"personalNotes\":\"\",\"coverImage\":\"indigo-geometric\"},{\"id\":\"sv_004\",\"title\":\"UX Researcher\",\"company\":\"Solaris Tech\",\"location\":\"Austin\",\"workModel\":\"On-site\",\"salaryRange\":\"$110k - $130k\",\"seniority\":\"Mid\",\"source\":\"LinkedIn\",\"postedAt\":\"2w ago\",\"verified\":false,\"matchScore\":65,\"personalNotes\":\"Referral from Mike.\",\"coverImage\":\"orange-energetic\"}]}"));}),
"[project]/app/saved-jobs/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SavedJobsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.18_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.18_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$saved$2d$jobs$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/data/saved-jobs.json (json)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const initialJobs = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$saved$2d$jobs$2e$json__$28$json$29$__["default"].savedJobs;
function SavedJobsPage() {
    _s();
    const [jobs, setJobs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialJobs);
    const [compareIds, setCompareIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [notes, setNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [savedNotes, setSavedNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [toast, setToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const showToast = (msg)=>{
        setToast(msg);
        setTimeout(()=>setToast(null), 2500);
    };
    const toggleCompare = (id)=>{
        setCompareIds((prev)=>{
            if (prev.includes(id)) return prev.filter((i)=>i !== id);
            if (prev.length >= 3) {
                showToast("You can compare up to 3 jobs at a time.");
                return prev;
            }
            return [
                ...prev,
                id
            ];
        });
    };
    const handleDelete = (id)=>{
        setJobs((prev)=>prev.filter((j)=>j.id !== id));
        setCompareIds((prev)=>prev.filter((i)=>i !== id));
        showToast("Job removed from saved list.");
    };
    const handleSaveNote = (id)=>{
        setSavedNotes((prev)=>({
                ...prev,
                [id]: notes[id] || ""
            }));
        showToast("Note saved!");
    };
    const handleApply = (title)=>{
        showToast('Redirecting to application page for "'.concat(title, '"...'));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "font-display text-slate-200 min-h-screen flex flex-col overflow-x-hidden selection:bg-purple-500 selection:text-white",
        style: {
            backgroundColor: "#0f0518",
            backgroundImage: "radial-gradient(circle at 10% 20%, rgba(88, 28, 135, 0.4) 0%, transparent 40%), radial-gradient(circle at 90% 60%, rgba(126, 34, 206, 0.3) 0%, transparent 40%), radial-gradient(circle at 50% 120%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)",
            backgroundAttachment: "fixed"
        },
        children: [
            toast && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-xl bg-purple-900/90 border border-purple-500/40 backdrop-blur-xl text-white text-sm font-medium shadow-[0_0_30px_rgba(168,85,247,0.3)]",
                children: toast
            }, void 0, false, {
                fileName: "[project]/app/saved-jobs/page.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex items-center justify-between whitespace-nowrap border-b border-white/10 glass-panel px-10 py-3 sticky top-0 z-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4 text-white",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "size-8 text-primary-dark drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "material-symbols-outlined text-3xl",
                                            children: "radar"
                                        }, void 0, false, {
                                            fileName: "[project]/app/saved-jobs/page.tsx",
                                            lineNumber: 58,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/saved-jobs/page.tsx",
                                        lineNumber: 57,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-white text-lg font-bold leading-tight tracking-wide drop-shadow-sm",
                                        children: "JobIQ"
                                    }, void 0, false, {
                                        fileName: "[project]/app/saved-jobs/page.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/saved-jobs/page.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "hidden lg:flex flex-col min-w-40 !h-10 max-w-64",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex w-full flex-1 items-stretch rounded-lg h-full ring-1 ring-white/10 bg-white/5 focus-within:ring-primary-dark/50 transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-slate-400 flex border-none items-center justify-center pl-4 rounded-l-lg border-r-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-lg",
                                                children: "search"
                                            }, void 0, false, {
                                                fileName: "[project]/app/saved-jobs/page.tsx",
                                                lineNumber: 65,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/saved-jobs/page.tsx",
                                            lineNumber: 64,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: "form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-transparent focus:border-none h-full placeholder:text-slate-500 px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal",
                                            placeholder: "Search jobs, skills..."
                                        }, void 0, false, {
                                            fileName: "[project]/app/saved-jobs/page.tsx",
                                            lineNumber: 67,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/saved-jobs/page.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/saved-jobs/page.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/saved-jobs/page.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-1 justify-end gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden md:flex items-center gap-9",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        className: "text-slate-300 text-sm font-medium leading-normal hover:text-primary-dark hover:drop-shadow-[0_0_5px_rgba(192,132,252,0.5)] transition-all",
                                        href: "/",
                                        children: "Dashboard"
                                    }, void 0, false, {
                                        fileName: "[project]/app/saved-jobs/page.tsx",
                                        lineNumber: 73,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        className: "text-primary-dark text-sm font-bold leading-normal drop-shadow-[0_0_8px_rgba(192,132,252,0.4)]",
                                        href: "/saved-jobs",
                                        children: "Jobs"
                                    }, void 0, false, {
                                        fileName: "[project]/app/saved-jobs/page.tsx",
                                        lineNumber: 74,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        className: "text-slate-300 text-sm font-medium leading-normal hover:text-primary-dark hover:drop-shadow-[0_0_5px_rgba(192,132,252,0.5)] transition-all",
                                        href: "/profile",
                                        children: "Profile"
                                    }, void 0, false, {
                                        fileName: "[project]/app/saved-jobs/page.tsx",
                                        lineNumber: 75,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        className: "text-slate-300 text-sm font-medium leading-normal hover:text-primary-dark hover:drop-shadow-[0_0_5px_rgba(192,132,252,0.5)] transition-all",
                                        href: "/settings",
                                        children: "Settings"
                                    }, void 0, false, {
                                        fileName: "[project]/app/saved-jobs/page.tsx",
                                        lineNumber: 76,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/saved-jobs/page.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-white/10 bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold",
                                    children: "AM"
                                }, void 0, false, {
                                    fileName: "[project]/app/saved-jobs/page.tsx",
                                    lineNumber: 79,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/saved-jobs/page.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/saved-jobs/page.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/saved-jobs/page.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex justify-center py-8 px-4 sm:px-6 lg:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-7xl flex flex-col gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-2 drop-shadow-md",
                                    children: "Saved Jobs"
                                }, void 0, false, {
                                    fileName: "[project]/app/saved-jobs/page.tsx",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-slate-400 text-lg",
                                    children: "Track and compare up to 3 jobs side-by-side."
                                }, void 0, false, {
                                    fileName: "[project]/app/saved-jobs/page.tsx",
                                    lineNumber: 88,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/saved-jobs/page.tsx",
                            lineNumber: 86,
                            columnNumber: 11
                        }, this),
                        compareIds.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-4 md:p-6 border border-primary-dark/30 bg-purple-900/20 relative overflow-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-gradient-to-r from-purple-600/10 to-transparent pointer-events-none"
                                }, void 0, false, {
                                    fileName: "[project]/app/saved-jobs/page.tsx",
                                    lineNumber: 93,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between relative z-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "material-symbols-outlined text-primary-dark",
                                                    children: "compare_arrows"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/saved-jobs/page.tsx",
                                                    lineNumber: 96,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-white font-bold",
                                                    children: [
                                                        compareIds.length,
                                                        " job",
                                                        compareIds.length > 1 ? "s" : "",
                                                        " selected"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/saved-jobs/page.tsx",
                                                    lineNumber: 97,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-slate-500",
                                                    children: "Click Compare to see a side-by-side view"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/saved-jobs/page.tsx",
                                                    lineNumber: 98,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/saved-jobs/page.tsx",
                                            lineNumber: 95,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>showToast("Comparison view opened!"),
                                                    className: "px-5 py-2 rounded-lg bg-primary hover:bg-purple-500 text-white text-sm font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.25)]",
                                                    children: "Compare"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/saved-jobs/page.tsx",
                                                    lineNumber: 101,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setCompareIds([]),
                                                    className: "px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-sm hover:bg-white/10 transition-all",
                                                    children: "Clear"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/saved-jobs/page.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/saved-jobs/page.tsx",
                                            lineNumber: 100,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/saved-jobs/page.tsx",
                                    lineNumber: 94,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/saved-jobs/page.tsx",
                            lineNumber: 92,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
                            children: jobs.map((job)=>{
                                const checked = compareIds.includes(job.id);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden transition-all ".concat(checked ? "ring-2 ring-primary-dark/60" : "ring-0"),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-6 md:p-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start justify-between gap-4 mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start gap-4 flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "size-14 rounded-xl bg-gradient-to-br from-purple-600/30 to-slate-800/30 border border-white/10 flex items-center justify-center flex-shrink-0 text-xl font-bold text-primary-dark",
                                                                children: job.company.charAt(0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/saved-jobs/page.tsx",
                                                                lineNumber: 116,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        className: "text-lg font-bold text-white leading-snug",
                                                                        children: job.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/saved-jobs/page.tsx",
                                                                        lineNumber: 120,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-slate-400 text-sm",
                                                                        children: [
                                                                            job.company,
                                                                            " • ",
                                                                            job.location
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/saved-jobs/page.tsx",
                                                                        lineNumber: 121,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2 mt-2 flex-wrap",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs font-bold text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full border border-green-500/20",
                                                                                children: [
                                                                                    job.matchScore,
                                                                                    "% Match"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/saved-jobs/page.tsx",
                                                                                lineNumber: 123,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs text-slate-500",
                                                                                children: job.salaryRange
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/saved-jobs/page.tsx",
                                                                                lineNumber: 124,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs text-slate-500",
                                                                                children: job.workModel
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/saved-jobs/page.tsx",
                                                                                lineNumber: 125,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs text-slate-500",
                                                                                children: job.postedAt
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/saved-jobs/page.tsx",
                                                                                lineNumber: 126,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/saved-jobs/page.tsx",
                                                                        lineNumber: 122,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/saved-jobs/page.tsx",
                                                                lineNumber: 119,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/saved-jobs/page.tsx",
                                                        lineNumber: 115,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>toggleCompare(job.id),
                                                        className: "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ".concat(checked ? "bg-primary/20 border-primary-dark/60 text-primary-dark" : "bg-white/5 border-white/10 text-slate-400 hover:border-primary-dark/40"),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "material-symbols-outlined text-lg",
                                                                children: checked ? "check_box" : "check_box_outline_blank"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/saved-jobs/page.tsx",
                                                                lineNumber: 131,
                                                                columnNumber: 25
                                                            }, this),
                                                            "Compare"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/saved-jobs/page.tsx",
                                                        lineNumber: 130,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/saved-jobs/page.tsx",
                                                lineNumber: 114,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        placeholder: "Personal notes about this job...",
                                                        value: notes[job.id] || "",
                                                        onChange: (e)=>setNotes((prev)=>({
                                                                    ...prev,
                                                                    [job.id]: e.target.value
                                                                })),
                                                        className: "w-full rounded-lg bg-white/5 border border-white/10 text-white text-xs p-3 h-16 resize-none focus:outline-none focus:border-primary-dark/50 focus:bg-white/10 transition-all placeholder:text-slate-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/saved-jobs/page.tsx",
                                                        lineNumber: 137,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-end mt-1",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleSaveNote(job.id),
                                                            className: "text-xs text-primary-dark hover:text-white transition-colors px-3 py-1 rounded-md hover:bg-primary/20",
                                                            children: savedNotes[job.id] ? "Update Note" : "Save Note"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/saved-jobs/page.tsx",
                                                            lineNumber: 144,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/saved-jobs/page.tsx",
                                                        lineNumber: 143,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/saved-jobs/page.tsx",
                                                lineNumber: 136,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between pt-3 border-t border-white/5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleDelete(job.id),
                                                        className: "flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-red-500/10",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "material-symbols-outlined text-lg",
                                                                children: "delete"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/saved-jobs/page.tsx",
                                                                lineNumber: 150,
                                                                columnNumber: 25
                                                            }, this),
                                                            "Remove"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/saved-jobs/page.tsx",
                                                        lineNumber: 149,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>showToast('Cover letter draft generated for "'.concat(job.title, '".')),
                                                                className: "px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-medium hover:bg-white/10 transition-all",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "material-symbols-outlined text-[16px] align-middle mr-1",
                                                                        children: "description"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/saved-jobs/page.tsx",
                                                                        lineNumber: 155,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    "Cover Letter"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/saved-jobs/page.tsx",
                                                                lineNumber: 154,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleApply(job.title),
                                                                className: "px-4 py-2 rounded-lg bg-primary hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]",
                                                                children: "Apply Now"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/saved-jobs/page.tsx",
                                                                lineNumber: 158,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/saved-jobs/page.tsx",
                                                        lineNumber: 153,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/saved-jobs/page.tsx",
                                                lineNumber: 148,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/saved-jobs/page.tsx",
                                        lineNumber: 113,
                                        columnNumber: 19
                                    }, this)
                                }, job.id, false, {
                                    fileName: "[project]/app/saved-jobs/page.tsx",
                                    lineNumber: 112,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/saved-jobs/page.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/saved-jobs/page.tsx",
                    lineNumber: 85,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/saved-jobs/page.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/saved-jobs/page.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_s(SavedJobsPage, "i8SnjqrXDGRRVRmQSMAtGjFpfxo=");
_c = SavedJobsPage;
var _c;
__turbopack_context__.k.register(_c, "SavedJobsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/.pnpm/next@15.5.18_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.18_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.5.18_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/.pnpm/next@15.5.18_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.18_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.5.18_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=_e3a9ce9a._.js.map