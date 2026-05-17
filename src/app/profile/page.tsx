"use client";

import { useState, useRef } from "react";
import data from "@/data/profile.json";

const profileData = data.profile;

type UploadState = "idle" | "processing" | "success" | "error";

export default function ProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadMessage, setUploadMessage] = useState("");
  const [fileName, setFileName] = useState("");

  const simulateUpload = (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !["pdf", "docx"].includes(ext)) {
      setUploadState("error");
      setUploadMessage("We could not read this file. Please upload PDF or DOCX.");
      return;
    }
    setFileName(file.name);
    setUploadState("processing");
    setUploadMessage("Reading your CV...");
    setTimeout(() => {
      setUploadMessage("Extracting skills and experience...");
    }, 1200);
    setTimeout(() => {
      setUploadState("success");
      setUploadMessage("CV analyzed successfully! Your profile has been updated.");
    }, 2800);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) simulateUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) simulateUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  return (
    <div className="font-display text-slate-200 min-h-screen flex flex-col overflow-x-hidden selection:bg-purple-500 selection:text-white" style={{ backgroundColor: "#0f0518", backgroundImage: "radial-gradient(circle at 10% 20%, rgba(88, 28, 135, 0.4) 0%, transparent 40%), radial-gradient(circle at 90% 60%, rgba(126, 34, 206, 0.3) 0%, transparent 40%), radial-gradient(circle at 50% 120%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)", backgroundAttachment: "fixed" }}>
      <header className="flex items-center justify-between whitespace-nowrap border-b border-white/10 glass-panel px-10 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-white">
            <div className="size-8 text-primary-dark drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]">
              <span className="material-symbols-outlined text-3xl">radar</span>
            </div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-wide drop-shadow-sm">JobIQ</h2>
          </div>
          <label className="hidden lg:flex flex-col min-w-40 !h-10 max-w-64">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full ring-1 ring-white/10 bg-white/5 focus-within:ring-primary-dark/50 transition-all">
              <div className="text-slate-400 flex border-none items-center justify-center pl-4 rounded-l-lg border-r-0">
                <span className="material-symbols-outlined text-lg">search</span>
              </div>
              <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-transparent focus:border-none h-full placeholder:text-slate-500 px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal" placeholder="Search jobs, skills..." />
            </div>
          </label>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="hidden md:flex items-center gap-9">
            <a className="text-slate-300 text-sm font-medium leading-normal hover:text-primary-dark hover:drop-shadow-[0_0_5px_rgba(192,132,252,0.5)] transition-all" href="/">Dashboard</a>
            <a className="text-slate-300 text-sm font-medium leading-normal hover:text-primary-dark hover:drop-shadow-[0_0_5px_rgba(192,132,252,0.5)] transition-all" href="/saved-jobs">Jobs</a>
            <a className="text-primary-dark text-sm font-bold leading-normal drop-shadow-[0_0_8px_rgba(192,132,252,0.4)]" href="/profile">Profile</a>
            <a className="text-slate-300 text-sm font-medium leading-normal hover:text-primary-dark hover:drop-shadow-[0_0_5px_rgba(192,132,252,0.5)] transition-all" href="/settings">Settings</a>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => fileInputRef.current?.click()} className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-purple-500 text-white text-sm font-bold leading-normal tracking-[0.015em] transition-all shadow-[0_0_20px_rgba(168,85,247,0.25)]">
              <span className="truncate">Upload CV</span>
            </button>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-white/10 bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">AM</div>
          </div>
        </div>
      </header>
      <div className="flex-1 flex justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div>
              <h1 className="text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-2 drop-shadow-md">Profile &amp; CV Upload</h1>
              <p className="text-slate-400 text-lg">Keep your profile updated to get the best AI-powered job matches.</p>
            </div>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              className={`upload-zone rounded-xl p-8 cursor-pointer group shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] relative overflow-hidden ${uploadState === "error" ? "!border-red-500/60 !bg-red-500/5" : ""}`}
            >
              <input ref={fileInputRef} type="file" accept=".pdf,.docx" onChange={handleFileChange} className="hidden" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <div className="flex flex-col items-center justify-center gap-4 text-center py-12 relative z-10">

                {uploadState === "idle" && (
                  <>
                    <div className="size-20 rounded-full bg-white/5 flex items-center justify-center text-primary-dark mb-2 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.3)] border border-white/10">
                      <span className="material-symbols-outlined text-4xl drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">cloud_upload</span>
                    </div>
                    <h3 className="text-white text-xl font-bold tracking-wide">Upload your CV</h3>
                    <p className="text-slate-400 max-w-sm">Drag &amp; drop your PDF or DOCX file here, or click to browse from your computer.</p>
                    <button className="mt-6 flex items-center justify-center rounded-lg h-10 px-8 bg-white/10 hover:bg-primary hover:text-white text-slate-200 text-sm font-bold transition-all border border-white/10 hover:border-primary hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]">Select File</button>
                  </>
                )}

                {uploadState === "processing" && (
                  <>
                    <div className="size-20 rounded-full bg-purple-500/20 flex items-center justify-center text-primary-dark mb-2 animate-pulse border border-purple-500/40">
                      <span className="material-symbols-outlined text-4xl text-purple-400">description</span>
                    </div>
                    <h3 className="text-white text-xl font-bold tracking-wide">Processing {fileName}...</h3>
                    <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full animate-pulse" style={{ width: "60%" }}></div>
                    </div>
                    <p className="text-purple-300 text-sm">{uploadMessage}</p>
                  </>
                )}

                {uploadState === "success" && (
                  <>
                    <div className="size-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mb-2 border border-green-500/40">
                      <span className="material-symbols-outlined text-4xl">check_circle</span>
                    </div>
                    <h3 className="text-white text-xl font-bold tracking-wide">{fileName} uploaded</h3>
                    <p className="text-green-400 text-sm">{uploadMessage}</p>
                    <button onClick={(e) => { e.stopPropagation(); setUploadState("idle"); setUploadMessage(""); }} className="mt-2 text-sm text-purple-300 hover:text-white transition-colors">Upload another file</button>
                  </>
                )}

                {uploadState === "error" && (
                  <>
                    <div className="size-20 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 mb-2 border border-red-500/40">
                      <span className="material-symbols-outlined text-4xl">error</span>
                    </div>
                    <h3 className="text-white text-xl font-bold tracking-wide">Upload failed</h3>
                    <p className="text-red-400 text-sm max-w-md">{uploadMessage}</p>
                    <p className="text-slate-400 text-xs mt-1">Supported formats: PDF, DOCX</p>
                    <button onClick={(e) => { e.stopPropagation(); setUploadState("idle"); }} className="mt-3 flex items-center justify-center rounded-lg h-10 px-8 bg-white/10 hover:bg-primary hover:text-white text-slate-200 text-sm font-bold transition-all border border-white/10">Try Again</button>
                  </>
                )}
              </div>
            </div>

            <div className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8 relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                <h2 className="text-white text-2xl font-bold flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary-dark">person_search</span>
                  Profile Summary
                </h2>
                <button className="text-primary-dark text-sm font-medium hover:text-purple-300 transition-colors">Edit Profile</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-8">
                  <div className="flex items-start gap-5">
                    <div className="size-20 rounded-full bg-slate-800 flex-shrink-0 overflow-hidden ring-2 ring-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)] bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                      {profileData.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-wide">{profileData.name}</h3>
                      <p className="text-primary-dark font-medium">{profileData.title}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-slate-400">
                        <span className="material-symbols-outlined text-[18px]">location_on</span>
                        {profileData.location}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Experience</h4>
                    <div className="pl-4 border-l-2 border-white/10 space-y-8 ml-2">
                      {profileData.experience.map((exp, i) => (
                        <div key={i} className="relative group">
                          <div className={`absolute -left-[23px] top-1.5 size-3.5 rounded-full ${i === 0 ? "bg-purple-600 ring-4 ring-[#1e1430] shadow-[0_0_10px_rgba(147,51,234,0.5)] group-hover:bg-primary-dark" : "bg-slate-600 ring-4 ring-[#1e1430] group-hover:bg-slate-500"} transition-colors`}></div>
                          <h5 className={`text-base font-bold text-white ${i === 0 ? "group-hover:text-primary-dark" : "group-hover:text-slate-300"} transition-colors`}>{exp.role}</h5>
                          <p className="text-sm text-slate-300">{exp.company}</p>
                          <p className="text-xs text-slate-500 mt-1">{exp.period}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Key Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {profileData.skills.map((skill, i) => (
                        <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium text-purple-200 glass-tag cursor-pointer transition-all duration-300">
                          {skill}
                          <span className="material-symbols-outlined text-[16px] ml-2 text-primary-dark">check_circle</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 rounded-xl p-5 border border-purple-500/20 shadow-inner mt-4">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary-dark mt-0.5 animate-pulse">auto_awesome</span>
                      <div>
                        <p className="text-sm font-bold text-white mb-1">AI Suggestion</p>
                        <p className="text-sm text-slate-300 leading-relaxed font-light">Your profile is strong in visual design. Adding quantitative results to your experience descriptions could increase match rates by <span className="text-primary-dark font-bold">15%</span>.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-panel rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden sticky top-28 border border-white/10">
              <div className="p-5 border-b border-white/10 bg-white/5 flex items-center gap-3">
                <div className="size-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_10px_rgba(147,51,234,0.4)]">
                  <span className="material-symbols-outlined text-lg">psychology</span>
                </div>
                <h2 className="text-white text-lg font-bold tracking-wide">AI Career Insights</h2>
              </div>
              <div className="p-5 flex flex-col gap-8">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium text-slate-400">Profile Strength</span>
                    <span className="text-xl font-bold text-primary-dark drop-shadow-[0_0_5px_rgba(192,132,252,0.8)]">{profileData.profileStrength}%</span>
                  </div>
                  <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-500 h-2 rounded-full shadow-[0_0_10px_rgba(147,51,234,0.6)] relative" style={{ width: `${profileData.profileStrength}%` }}>
                      <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-500 text-lg drop-shadow-sm">warning</span>
                    Missing Skills
                  </h3>
                  <p className="text-xs text-slate-400 mb-3">Based on your target role "Product Lead", you might want to add:</p>
                  <div className="flex flex-col gap-2">
                    {profileData.missingSkills.map((skill, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-primary-dark/40 hover:bg-white/10 transition-all group cursor-pointer">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-slate-500 group-hover:text-primary-dark transition-colors">add_circle</span>
                          <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{skill}</span>
                        </div>
                        <span className="text-xs text-slate-400 bg-black/20 px-2 py-1 rounded border border-white/5 group-hover:text-white group-hover:bg-purple-600 group-hover:border-purple-500 transition-colors">+ Add</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-dark text-lg drop-shadow-[0_0_5px_rgba(192,132,252,0.6)]">work</span>
                    Recommended Roles
                  </h3>
                  <div className="space-y-3">
                    {profileData.recommendedRoles.map((role, i) => (
                      <a key={i} className="block p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.08] hover:border-primary-dark/30 transition-all group" href="/">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-sm font-bold text-slate-200 group-hover:text-primary-dark transition-colors">{role.title}</span>
                          <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20 shadow-[0_0_8px_rgba(74,222,128,0.1)]">{role.match}% Match</span>
                        </div>
                        <p className="text-xs text-slate-500">{role.company} • {role.location}</p>
                      </a>
                    ))}
                  </div>
                  <a href="/" className="block w-full mt-4 text-center text-sm text-primary-dark font-medium hover:text-white hover:drop-shadow-[0_0_5px_rgba(192,132,252,0.8)] py-2 transition-all">View All Matches →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
