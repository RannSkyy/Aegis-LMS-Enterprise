/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  Users, 
  Award, 
  Calendar, 
  Activity, 
  BookOpen, 
  Sparkles, 
  Play, 
  HelpCircle, 
  Star, 
  Bookmark, 
  Heart, 
  Share2, 
  Flame, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Trophy, 
  Plus, 
  ExternalLink,
  ChevronRight,
  Shield,
  LayoutDashboard
} from "lucide-react";

import { UserRole, Course, Badge } from "./types";
import { mockUsers, mockCourses, mockLeaderboard, mockLearningPath } from "./data";

// Submodules imports
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import AIStudyAssistant from "./components/AIStudyAssistant";
import CurriculumBuilder from "./components/CurriculumBuilder";
import ExaminationSystem from "./components/ExaminationSystem";
import AnalyticsCenter from "./components/AnalyticsCenter";
import CommunicationCenter from "./components/CommunicationCenter";
import AssignmentManagement from "./components/AssignmentManagement";
import LiveClasses from "./components/LiveClasses";
import BillingCenter from "./components/BillingCenter";
import SystemSettings from "./components/SystemSettings";

export default function App() {
  const [currentRole, setCurrentRole] = React.useState<UserRole>(UserRole.STUDENT);
  const [activeTab, setActiveTab] = React.useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [theme, setTheme] = React.useState<"light" | "dark">("dark");
  const [language, setLanguage] = React.useState("en");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Floating AI coaching drawer toggle state
  const [aiDrawerOpen, setAiDrawerOpen] = React.useState(false);

  // Gamification interaction states
  const [userPoints, setUserPoints] = React.useState(2450);
  const [userLevel, setUserLevel] = React.useState(18);
  const [wishlist, setWishlist] = React.useState<string[]>([]);
  const [bookmarks, setBookmarks] = React.useState<string[]>(["l-web-1-2"]);

  // Certification Generator modal states
  const [certModalOpen, setCertModalOpen] = React.useState(false);
  const [certStudentName, setCertStudentName] = React.useState("Julian Sterling");
  const [certCourseName, setCertCourseName] = React.useState("Enterprise Full-Stack Architecture");
  const [generatedCert, setGeneratedCert] = React.useState<{ name: string; course: string; hash: string } | null>(null);

  // Calendar event selection
  const [selectedDay, setSelectedDay] = React.useState<number>(13);
  const calendarEvents: Record<number, string> = {
    10: "Academic Platform Migration Complete",
    13: "Webinar: Enterprise Multi-Tenancy Review (Dr. Thorne)",
    14: "Homework Deadline: row-level isolation scripts",
    15: "Live session: RAG Pipelines Integration (Dr. Thorne)",
    18: "Regression Strategy Office Hours (Elena Rostova)",
    19: "Homework Deadline: RAG query parsing",
  };

  const handleToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Bind theme to body element
  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleToggleWishlist = (courseId: string) => {
    setWishlist((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  };

  const handleGenerateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneratedCert({
      name: certStudentName,
      course: certCourseName,
      hash: "AEGIS-CERT-" + Math.floor(100000 + Math.random() * 900000)
    });
  };

  // Filter courses on marketplaces
  const filteredCourses = mockCourses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen bg-slate-55 dark:bg-slate-950 font-sans flex text-slate-900 dark:text-slate-100 transition-colors duration-200`}>
      
      {/* Sidebar Navigation */}
      <Sidebar
        currentRole={currentRole}
        onChangeRole={(role) => {
          setCurrentRole(role);
          // Set sensible active tab for swapped role
          if (role === UserRole.PARENT) {
            setActiveTab("student-progress");
          } else if (role === UserRole.SUPER_ADMIN) {
            setActiveTab("system-admin");
          } else {
            setActiveTab("dashboard");
          }
        }}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main app panel wrapper */}
      <div className={`flex-1 flex flex-col transition-all duration-305 ${sidebarCollapsed ? "md:pl-20" : "md:pl-64"}`}>
        
        {/* Navigation utility bar */}
        <Navbar
          currentRole={currentRole}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          language={language}
          onChangeLanguage={setLanguage}
          onSearch={setSearchQuery}
          activeNotificationsCount={2}
        />

        {/* Content canvas container */}
        <main className="p-6 md:p-8 flex-1 max-w-7xl w-full mx-auto space-y-6">
          
          {/* Dashboard Route Router */}
          {activeTab === "dashboard" && (
            <div id="lms-dashboard" className="space-y-6 animate-fade-in">
              {/* Introduction Greeting Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="z-10">
                  <span className="text-[11px] font-mono tracking-widest text-indigo-400 font-bold bg-indigo-950/80 px-2.5 py-1 rounded-full border border-indigo-900">
                    ACADEMY PORTAL DIRECTORY
                  </span>
                  <h1 className="text-xl md:text-2xl font-black text-white mt-3.5 tracking-tight">
                    Welcome back, {currentRole === UserRole.STUDENT ? "Julian Sterling" : currentRole === UserRole.TEACHER ? "Dr. Marcus Thorne" : "Academy Member"}!
                  </h1>
                  <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
                    Aegis Enterprise isolates multi-role schemas on Cloud Run. Browse curriculum builds, grade papers, and consult LLM advisors.
                  </p>
                </div>
                <div className="flex gap-3 text-xs font-semibold z-10">
                  <button
                    onClick={() => setAiDrawerOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-indigo-600/20 cursor-pointer"
                  >
                    <Sparkles size={14} className="text-indigo-200" /> Consult AI Coach
                  </button>
                </div>
                {/* Visual background noise */}
                <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
              </div>

              {/* Student Role Dashboard Grid */}
              {currentRole === UserRole.STUDENT && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column (Continue Learning & Path) */}
                  <div className="lg:col-span-8 space-y-6">
                    {/* Continue Learning Feature Box */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold block uppercase mb-4">
                        Continue Learning Flow
                      </span>
                      <div className="bg-slate-50 dark:bg-slate-950/30 border border-slate-150 dark:border-slate-850 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="overflow-hidden">
                          <span className="text-[9px] font-mono bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 py-0.5 px-2.5 rounded font-bold uppercase">
                            Software Engineering
                          </span>
                          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-2 leading-snug">
                            Enterprise Full-Stack Architecture
                          </h3>
                          <p className="text-xs text-slate-400 mt-1">
                            Chapter: Zustand & Context Integration Mechanics (Module 2)
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setActiveTab("live-classes");
                          }}
                          className="bg-indigo-605 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2 px-4 rounded-xl transition flex items-center gap-1.5 cursor-pointer shrink-0"
                        >
                          <Play size={11} fill="white" /> Begin Lesson
                        </button>
                      </div>
                    </div>

                    {/* Integrated Personalized Learning Path map */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-100">
                            Personal Study Roadmap Node
                          </h3>
                          <p className="text-[11px] text-slate-450 text-slate-400">Your core milestones to software engineering mastery.</p>
                        </div>
                        <span className="text-[10px] bg-slate-100 dark:bg-slate-850 text-slate-500 py-1 px-2.5 rounded-full font-mono">
                          Level {userLevel}
                        </span>
                      </div>

                      {/* Path nodes list */}
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        {mockLearningPath.map((pathNode) => (
                          <div
                            key={pathNode.id}
                            className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                              pathNode.status === "completed"
                                ? "bg-emerald-500/5 border-emerald-500/30"
                                : pathNode.status === "active"
                                ? "bg-indigo-500/5 border-indigo-505 border-indigo-500/50 ring-1 ring-indigo-500/20"
                                : "bg-slate-50 dark:bg-slate-950/20 border-slate-200/50 dark:border-slate-850/50 opacity-60"
                            }`}
                          >
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <span className={`text-[8px] font-mono tracking-wider uppercase font-bold py-0.5 px-2 rounded ${
                                  pathNode.status === "completed"
                                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400"
                                    : pathNode.status === "active"
                                    ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/20 dark:text-indigo-400"
                                    : "bg-slate-100 text-slate-405 text-slate-400"
                                }`}>
                                  {pathNode.status}
                                </span>
                              </div>
                              <h4 className="text-xs font-bold text-slate-850 dark:text-slate-200 leading-snug">
                                {pathNode.title}
                              </h4>
                              <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                                {pathNode.description}
                              </p>
                            </div>
                            <span className="text-[10px] font-mono text-indigo-400 mt-3 hover:underline cursor-pointer block">
                              View materials &gt;
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Gamification scoreboard & calendar widget) */}
                  <div className="lg:col-span-4 space-y-6">
                    {/* Common Calendar planner widget */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
                      <div className="flex justify-between items-center mb-3 text-xs">
                        <h4 className="font-sans font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest text-[10px]">
                          Academic Scheduler Date Map
                        </h4>
                        <span className="font-mono text-slate-400 font-bold">June 2026</span>
                      </div>
                      
                      {/* Grid representation */}
                      <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-slate-400 font-mono mt-2">
                        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                          <div key={i} className="font-bold">{d}</div>
                        ))}
                        {Array.from({ length: 30 }).map((_, i) => {
                          const day = i + 1;
                          const hasEvent = calendarEvents[day];
                          const isActive = selectedDay === day;
                          return (
                            <div
                              key={i}
                              onClick={() => {
                                if (hasEvent) setSelectedDay(day);
                              }}
                              className={`p-1.5 rounded-lg font-bold transition cursor-pointer relative ${
                                isActive
                                  ? "bg-indigo-600 text-white font-black"
                                  : hasEvent
                                  ? "bg-indigo-100/40 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400 border border-indigo-200/50"
                                  : "hover:bg-slate-50 dark:hover:bg-slate-850"
                              }`}
                            >
                              {day}
                              {hasEvent && !isActive && (
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500" />
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Display event briefs */}
                      <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-950/10 border border-slate-150 dark:border-slate-850 rounded-xl">
                        <span className="text-[9px] font-mono tracking-widest text-indigo-600 dark:text-indigo-400 font-bold uppercase block">
                          EVENT BRIEF (June {selectedDay})
                        </span>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1 leading-normal">
                          {calendarEvents[selectedDay] || "No designated lectures scheduled."}
                        </p>
                      </div>
                    </div>

                    {/* Gamification Points & Badges Board */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
                      <h3 className="font-sans font-bold text-[10px] text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 dark:border-slate-800 pb-1.5">
                        Gamified Milestone Log
                      </h3>
                      <div className="flex gap-4 items-center mb-4 bg-slate-50 dark:bg-slate-950/20 p-2.5 rounded-xl border border-slate-150 dark:border-add-border">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-lg shadow-indigo-600/20">
                          LVL {userLevel}
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-slate-400">STUDY XP ACCUMULATIONS</span>
                          <h4 className="text-sm font-black text-slate-850 dark:text-white mt-0.5">{userPoints} XP Point</h4>
                        </div>
                      </div>

                      {/* Badges unlocked */}
                      <span className="text-[9px] font-mono tracking-wider font-bold text-slate-400 block uppercase mb-2">
                        Unlocked badging credentials (3)
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { name: "Fast Tracker", icon: <Flame size={12} />, desc: "Fast lesson submissions" },
                          { name: "Quiz Conqueror", icon: <Trophy size={11} />, desc: "Auto graded 100%" },
                          { name: "Knowledge Seeker", icon: <Sparkles size={11} />, desc: "Unlocked catalog" }
                        ].map((bdg, i) => (
                          <div key={i} className="p-2 border border-slate-100 dark:border-slate-820 rounded-xl bg-slate-50/50 dark:bg-slate-950/15 text-center flex flex-col items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 shrink-0 flex items-center justify-center mb-1">
                              {bdg.icon}
                            </div>
                            <span className="text-[9px] font-bold text-slate-800 dark:text-slate-350 line-clamp-1">{bdg.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Teacher/Admin Role Dashboard Grid */}
              {(currentRole === UserRole.TEACHER || currentRole === UserRole.SCHOOL_ADMIN || currentRole === UserRole.SUPER_ADMIN) && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
                    <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold block uppercase mb-4">
                      LMS Analytics overview & load metrics
                    </span>
                    <AnalyticsCenter />
                  </div>
                  <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="font-sans font-bold text-xs text-slate-400 uppercase tracking-widest mb-3">
                        Gamification Leaderboard
                      </h3>
                      <div className="space-y-2.5">
                        {mockLeaderboard.map((lb) => (
                          <div key={lb.rank} className="flex justify-between items-center text-xs p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/30 rounded-xl">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] font-bold text-slate-400">#{lb.rank}</span>
                              <img src={lb.avatar} alt="lead avatar" className="w-7 h-7 rounded-full object-cover shrink-0" />
                              <span className="font-semibold text-slate-800 dark:text-slate-100">{lb.name}</span>
                            </div>
                            <span className="font-mono font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20 py-0.5 px-2 rounded">
                              {lb.points} XP
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Catalog / Course Builder / Learning Lab Router */}
          {activeTab === "courses" && (
            <div className="space-y-6 animate-fade-in" id="courses-route-wrapper">
              <CurriculumBuilder />
            </div>
          )}

          {/* Course Marketplace Shop Router */}
          {activeTab === "marketplace" && (
            <div className="space-y-6 animate-fade-in" id="marketplace-route-wrapper">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-full uppercase">
                    Discovery Portal
                  </span>
                  <h2 className="text-base font-extrabold text-slate-900 dark:text-white mt-2">
                    LMS Course Marketplace
                  </h2>
                </div>
              </div>

              {/* Catalog list card grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCourses.map((c) => {
                  const isWish = wishlist.includes(c.id);
                  return (
                    <div key={c.id} className="bg-white dark:bg-slate-900 border border-slate-202 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                      <img src={c.thumbnail} alt="thumb" className="h-44 w-full object-cover border-b border-slate-150 dark:border-slate-800" />
                      
                      <div className="p-4 space-y-3.5">
                        <div className="flex justify-between items-center text-[10px] font-mono">
                          <span className="bg-indigo-100 text-indigo-700 py-0.5 px-2.5 rounded font-bold uppercase dark:bg-indigo-950/30 dark:text-indigo-400">
                            {c.category}
                          </span>
                          <span className="text-slate-400">{c.level}</span>
                        </div>

                        <h4 className="text-xs font-bold text-slate-950 dark:text-white leading-snug line-clamp-1">
                          {c.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                          {c.description}
                        </p>

                        <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
                          <div className="flex items-center gap-1">
                            <span className="text-base font-black text-slate-800 dark:text-white">${c.price}</span>
                          </div>
                          
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => handleToggleWishlist(c.id)}
                              className={`p-1.5 rounded-lg border transition ${
                                isWish 
                                  ? "bg-rose-50 text-rose-500 border-rose-350 dark:bg-rose-955/20" 
                                  : "border-slate-200 dark:border-slate-800 text-slate-400 hover:bg-slate-50"
                              }`}
                              title={isWish ? "Remove from wishlist" : "Wishlist Course"}
                            >
                              <Heart size={13} fill={isWish ? "currentColor" : "none"} />
                            </button>
                            <button
                              onClick={() => {
                                setUserPoints((p) => p + 100);
                                alert(`Course Registration Success! Bound directly to student Julian's learning calendars.`);
                              }}
                              className="bg-indigo-650 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[10px] py-1.5 px-3 rounded-lg transition"
                            >
                              Unlock Course
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Assignments Router */}
          {activeTab === "assignments" && (
            <div className="space-y-6 animate-fade-in" id="assignments-route-wrapper">
              <AssignmentManagement />
            </div>
          )}

          {/* Examination/Quizzes Router */}
          {activeTab === "exams" && (
            <div className="space-y-6 animate-fade-in" id="exams-route-wrapper">
              <ExaminationSystem />
            </div>
          )}

          {/* Certificate Generator Router */}
          {activeTab === "certificate-generator" && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm max-w-xl mx-auto space-y-6 animate-fade-in" id="cert-wrapper">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-full uppercase">
                  Digital Credentials
                </span>
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white mt-2">
                  LMS Certificate Generator
                </h2>
                <p className="text-xs text-slate-400 mt-1 leading-normal">
                  Test and authorize high-fidelity completion credentials for academic syllabi instantly.
                </p>
              </div>

              <form onSubmit={handleGenerateCertificate} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase font-mono mb-1 text-slate-400">Graduate Name</label>
                  <input
                    required
                    type="text"
                    value={certStudentName}
                    onChange={(e) => setCertStudentName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 text-xs border border-slate-205 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase font-mono mb-1 text-slate-400">Subject syllabus</label>
                  <select
                    value={certCourseName}
                    onChange={(e) => setCertCourseName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 text-xs border border-slate-205 dark:border-slate-800 rounded-lg cursor-pointer text-slate-800 dark:text-slate-100"
                  >
                    <option value="Enterprise Full-Stack Architecture">Enterprise Full-Stack Architecture</option>
                    <option value="Applied Generative AI & Large Language Models">Applied Generative AI & Large Language Models</option>
                    <option value="Data Visualization & Predictive Insights">Data Visualization & Predictive Insights</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2.5 rounded-xl transition shadow shadow-indigo-600/10 cursor-pointer"
                >
                  Compile digital Badge & Certificate
                </button>
              </form>

              {/* Render dynamic certificate certificate frames */}
              {generatedCert && (
                <div className="border-4 border-double border-indigo-500/50 p-6 bg-slate-50 dark:bg-slate-950 rounded-xl text-center relative overflow-hidden flex flex-col justify-center items-center">
                  <div className="absolute top-2 left-2 text-[8px] font-mono text-indigo-400 font-semibold">{generatedCert.hash}</div>
                  
                  {/* Branding shield */}
                  <ShieldCheck size={32} className="text-indigo-500 shrink-0 mb-3 animate-pulse" />
                  <h3 className="font-serif font-extrabold text-slate-900 dark:text-white text-lg tracking-wide">
                    Certificate of Academic Accomplishment
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono mt-1 italic block uppercase">
                    DISBURSED BY AEGIS LMS INSTITUTES
                  </span>

                  <p className="text-xs text-slate-500 max-w-sm mt-4 leading-relaxed">
                    This document certifies that graduate **{generatedCert.name}** has successfully completed and passed All auto-graded workloads under the syllabus:
                  </p>

                  <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-sans mt-3">
                    {generatedCert.course}
                  </h4>

                  <span className="text-[9px] font-mono text-slate-400 block mt-6">
                    Authorized: Dr. Marcus Thorne, Academic Supervisor.
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Webinars live screen Router */}
          {activeTab === "live-classes" && (
            <div className="space-y-6 animate-fade-in" id="live-classes-route-wrapper">
              <LiveClasses />
            </div>
          )}

          {/* Communications Router */}
          {activeTab === "communications" && (
            <div className="space-y-6 animate-fade-in" id="communications-route-wrapper">
              <CommunicationCenter />
            </div>
          )}

          {/* Calendar Planner Router */}
          {activeTab === "calendar" && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm max-w-2xl mx-auto text-center space-y-6 animate-fade-in" id="calendar-wrapper">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-indigo-600 datk:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-full uppercase">
                  Schedule Registry
                </span>
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white mt-2">
                  Academic Calendar Deadlines
                </h2>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-950/30 rounded-xl text-xs space-y-3.5 text-left border border-slate-100 dark:border-slate-850">
                {Object.entries(calendarEvents).map(([day, text]) => (
                  <div key={day} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-850 last:border-b-0">
                    <span className="font-mono bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 py-1 px-3 rounded font-bold">
                      June {day}, 2026
                    </span>
                    <span className="font-semibold text-slate-700 dark:text-slate-350">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Billing Router */}
          {activeTab === "billing" && (
            <div className="space-y-6 animate-fade-in" id="billing-route-wrapper">
              <BillingCenter />
            </div>
          )}

          {/* System Config Router */}
          {activeTab === "system-admin" && (
            <div className="space-y-6 animate-fade-in" id="system-admin-route-wrapper">
              <SystemSettings />
            </div>
          )}

        </main>
      </div>

      {/* Floating Sparkle AI Coordinator slider Drawer */}
      {aiDrawerOpen && (
        <div id="ai-drawer-overlay" className="fixed inset-0 z-50 flex justify-end">
          {/* backdrop */}
          <div
            onClick={() => setAiDrawerOpen(false)}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-200"
          />
          {/* Main card */}
          <div className="relative w-full max-w-md h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col justify-between shrink-0 animate-slide-in-right border-l border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setAiDrawerOpen(false)}
              className="absolute top-4 left-4 z-53 bg-slate-900 text-white p-1 rounded hover:bg-slate-800 font-bold transition text-xs cursor-pointer"
            >
              CLOSE
            </button>
            <div className="flex-1 h-full pt-12">
              <AIStudyAssistant />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
