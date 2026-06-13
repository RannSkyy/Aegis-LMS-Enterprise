/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Video, Calendar, Users, Mic, MicOff, Camera, CameraOff, Volume2, Plus, LogIn, MonitorUp, Send, CheckSquare } from "lucide-react";
import { LiveSession } from "../types";
import { mockLiveSessions } from "../data";

export default function LiveClasses() {
  const [sessions, setSessions] = React.useState<LiveSession[]>(mockLiveSessions);
  const [activeSession, setActiveSession] = React.useState<LiveSession | null>(null);

  // Classroom simulations states
  const [micMuted, setMicMuted] = React.useState(false);
  const [camOff, setCamOff] = React.useState(false);
  const [whiteboardMemo, setWhiteboardMemo] = React.useState("");
  const [whiteboardMemos, setWhiteboardMemos] = React.useState<string[]>([
    "Dr Marcus Thorne: Remember, we use Metadata tenant isolation rules to optimize partitions.",
    "System: All attendees synced safely on institutional Cloud Run nodes."
  ]);

  // Attendance lists
  const [attendance, setAttendance] = React.useState([
    { name: "Julian Sterling", present: true, role: "Student" },
    { name: "Maya Lin", present: true, role: "Student" },
    { name: "Suresh Patel", present: true, role: "Student" },
    { name: "Aria Thorne", present: false, role: "Student" },
    { name: "Derek Meyer", present: true, role: "Student" }
  ]);

  const handleToggleAttendance = (name: string) => {
    setAttendance((prev) =>
      prev.map((a) => (a.name === name ? { ...a, present: !a.present } : a))
    );
  };

  const handlePostMemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whiteboardMemo.trim()) return;
    setWhiteboardMemos((prev) => [...prev, `Student Julian: ${whiteboardMemo}`]);
    setWhiteboardMemo("");
  };

  const activeLive = sessions.find((s) => s.status === "live") || null;

  return (
    <div id="live-classroom-grid" className="grid grid-cols-1 xl:grid-cols-12 gap-6 transition-all duration-200">
      
      {/* Sessions catalogs list */}
      <div className="xl:col-span-4 space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Video size={18} className="text-rose-500 animate-pulse" />
              Institutes Seminar schedule
            </h3>
            <span className="text-[10px] bg-rose-500 text-white font-mono py-0.5 px-2.5 rounded-full animate-pulse font-bold">
              LIVE
            </span>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
            {sessions.map((ses) => {
              const isLive = ses.status === "live";
              return (
                <div
                  key={ses.id}
                  className={`p-3 rounded-xl border relative transition ${
                    isLive 
                      ? "bg-rose-50/15 border-rose-450 text-rose-950 dark:bg-rose-950/10 dark:border-rose-900 dark:text-rose-100" 
                      : "border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  }`}
                >
                  <div className="pr-20">
                    <span className="text-[8px] font-mono font-bold tracking-wider uppercase opacity-70 block mb-1">
                      {ses.courseName}
                    </span>
                    <h4 className="text-xs font-bold leading-normal mb-1">{ses.title}</h4>
                    
                    <div className="flex flex-wrap items-center gap-2 mt-2 font-mono text-[9px] text-slate-400">
                      <span>{ses.duration}</span>
                      <span>•</span>
                      <span>By {ses.instructorName}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveSession(ses)}
                    className={`absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold py-1.5 px-3 rounded-lg border transition cursor-pointer flex items-center gap-1 shrink-0 ${
                      isLive 
                        ? "bg-rose-600 border-rose-600 text-white hover:bg-rose-700" 
                        : "bg-slate-900 border-slate-900 text-white hover:bg-slate-800 dark:bg-slate-800"
                    }`}
                  >
                    <LogIn size={11} /> {isLive ? "Join live" : "Review info"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Attendance Monitor Panel */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
          <h3 className="font-sans font-semibold text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-3">
            <CheckSquare size={13} className="text-indigo-600" />
            Active Presence Log ({attendance.filter((a) => a.present).length})
          </h3>
          <div className="space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar">
            {attendance.map((att, idx) => (
              <div
                key={idx}
                onClick={() => handleToggleAttendance(att.name)}
                className="p-2 border-b border-slate-50 dark:border-slate-850 flex justify-between items-center text-xs last:border-b-0 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/20"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${att.present ? "bg-emerald-500" : "bg-slate-350"}`} />
                  <span className="font-medium text-slate-700 dark:text-slate-200">{att.name}</span>
                </div>
                <span className={`text-[9px] font-mono py-0.5 px-2 rounded-full font-bold uppercase ${
                  att.present
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                    : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
                }`}>
                  {att.present ? "Present synced" : "Offline / absent"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Classroom Simulation Screen Area */}
      <div className="xl:col-span-8 space-y-6">
        {activeSession ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between h-full min-h-[480px]">
            {/* Webinar Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-950/30 flex justify-between items-center">
              <div>
                <span className="text-[9px] font-mono font-bold tracking-widest text-rose-600 dark:text-rose-400 uppercase flex items-center gap-1">
                  <Volume2 size={10} className="animate-ping" fill="currentColor" /> Live Broadcasting System
                </span>
                <h3 className="text-sm font-bold text-slate-950 dark:text-white mt-1 leading-none">
                  {activeSession.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveSession(null)}
                className="bg-slate-900 dark:bg-slate-800 hover:bg-slate-850 text-white text-xs py-1.5 px-4 rounded-xl cursor-pointer"
              >
                Exit Classroom
              </button>
            </div>

            {/* Simulated Stream Screen container */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-slate-950 min-h-[280px]">
              {/* blackboard screen section */}
              <div className="md:col-span-8 rounded-xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-3.5 right-3.5 bg-rose-600 text-white text-[9px] font-mono px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  REC ACTIVE
                </div>

                {/* Simulated Instructor camera */}
                <div className="flex-1 flex flex-col items-center justify-center text-center py-6 mt-4">
                  {!camOff ? (
                    <div className="w-16 h-16 rounded-full bg-indigo-600 text-white font-bold text-lg border-2 border-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-600/30 animate-pulse">
                      MT
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-slate-850 text-slate-400 border border-slate-750 flex items-center justify-center text-sm">
                      <CameraOff size={18} />
                    </div>
                  )}
                  <h4 className="text-xs font-bold text-slate-100 mt-3">{activeSession.instructorName} (Host)</h4>
                  <p className="text-[10px] text-slate-400 mt-1 font-mono">Audio connection: SECURE PCM (24kHz)</p>
                </div>

                {/* Whiteboard Memos stream */}
                <div className="h-28 bg-slate-950 border border-slate-850 p-2.5 rounded-xl flex flex-col justify-between overflow-y-auto custom-scrollbar">
                  <div className="space-y-1.5">
                    {whiteboardMemos.map((memo, idx) => (
                      <span key={idx} className="block text-[10px] font-mono text-emerald-400 leading-snug">
                        &gt; {memo}
                      </span>
                    ))}
                  </div>

                  {/* Input memo */}
                  <form onSubmit={handlePostMemo} className="flex gap-2 border-t border-slate-850 pt-1.5 mt-2">
                    <input
                      required
                      type="text"
                      placeholder="Post brief memo to blackboard..."
                      value={whiteboardMemo}
                      onChange={(e) => setWhiteboardMemo(e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-800 text-[10px] px-2.5 py-1 text-emerald-300 font-mono rounded"
                    />
                    <button
                      type="submit"
                      className="bg-emerald-600 text-white text-[10px] font-mono px-2.5 rounded cursor-pointer"
                    >
                      SEND
                    </button>
                  </form>
                </div>
              </div>

              {/* Webinar control tools sidebar */}
              <div className="md:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-slate-400 font-bold block uppercase mb-3">
                    CLASS COMPANION TILES
                  </span>
                  <div className="space-y-2">
                    {[
                      { name: "Suresh Patel", speaking: false, camera: true },
                      { name: "Maya Lin", speaking: true, camera: true },
                      { name: "Julian Sterling (You)", speaking: false, camera: !camOff }
                    ].map((comp, idx) => (
                      <div key={idx} className="p-2 border border-slate-800 rounded-lg text-xs bg-slate-950 flex justify-between items-center text-slate-300">
                        <span className="font-semibold">{comp.name}</span>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          {comp.speaking ? <Volume2 size={11} className="text-indigo-400 animate-bounce" /> : <Mic size={11} />}
                          {comp.camera ? <Camera size={11} className="text-emerald-400" /> : <CameraOff size={11} />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modulable button actions */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => setMicMuted(!micMuted)}
                    className={`p-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition ${
                      micMuted 
                        ? "bg-rose-600/30 border border-rose-500/40 text-rose-500 hover:bg-rose-600/50" 
                        : "bg-slate-800 border border-slate-750 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {micMuted ? <MicOff size={12} /> : <Mic size={12} />} {micMuted ? "Muted" : "Active mic"}
                  </button>
                  <button
                    onClick={() => setCamOff(!camOff)}
                    className={`p-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition ${
                      camOff 
                        ? "bg-rose-600/30 border border-rose-500/40 text-rose-500 hover:bg-rose-600/50" 
                        : "bg-slate-800 border border-slate-750 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {camOff ? <CameraOff size={11} /> : <Camera size={11} />} {camOff ? "Camera Off" : "Cam Active"}
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Webinar disclaimer guidelines */}
            <div className="p-3 bg-slate-50 dark:bg-slate-950/20 text-[10px] font-mono text-center text-slate-400">
              Broadcasting encrypted on institutional ports — Powered by Aegis E-learning Core
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center">
            <Video size={44} className="text-rose-500 animate-pulse mb-3" />
            <h3 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-100">
              Interactive Webinar Screen Center
            </h3>
            <p className="text-xs text-slate-400 mt-1.5 max-w-sm">
              Select one of our live seminars or schedules in the catalog schedule to join active video links, view classmates, and write chalkboard notes.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
