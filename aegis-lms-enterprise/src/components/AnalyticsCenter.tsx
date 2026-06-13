/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from "react";
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { Activity, Clock, LogIn, Award, TrendingUp, HelpCircle } from "lucide-react";

// Mock Analytical Data arrays
const dailyStudyData = [
  { day: "Mon", WebHours: 2.5, AIHours: 1.2 },
  { day: "Tue", WebHours: 3.2, AIHours: 2.0 },
  { day: "Wed", WebHours: 1.8, AIHours: 3.5 },
  { day: "Thu", WebHours: 4.0, AIHours: 4.1 },
  { day: "Fri", WebHours: 2.9, AIHours: 1.5 },
  { day: "Sat", WebHours: 5.2, AIHours: 2.8 },
  { day: "Sun", WebHours: 3.8, AIHours: 4.8 }
];

const categoryDistribution = [
  { name: "Software Engineering", value: 45 },
  { name: "Artificial Intelligence", value: 30 },
  { name: "Cyber Security", value: 15 },
  { name: "Data Science", value: 10 }
];

const facultyLoadingData = [
  { name: "Dr. Marcus Thorne", courses: 2, classes: 12 },
  { name: "Elena Rostova", courses: 1, classes: 8 },
  { name: "Sarah Jenkins", courses: 0, classes: 4 },
  { name: "Alexander Vance", courses: 1, classes: 5 }
];

const COLORS = ["#4338ca", "#06b6d4", "#a855f7", "#ec4899"];

export default function AnalyticsCenter() {
  return (
    <div id="analytics-center-container" className="space-y-6 transition-all duration-200">
      {/* Metric Cards Banner Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Weekly Active Study Hours", val: "24.2 hrs", trend: "+3.5% vs last week", desc: "Combined across full-stack & AI catalogs", icon: Clock, color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40" },
          { title: "Assignments Completed", val: "14 papers", trend: "100% on-time submission rate", desc: "No overdue deliverables pending", icon: Activity, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40" },
          { title: "Engagement Index score", val: "94.8%", trend: "+1.2% platform status gain", desc: "Video interaction and sandbox usage", icon: TrendingUp, color: "text-cyan-600 bg-cyan-50 dark:bg-cyan-950/40" },
          { title: "Accumulated Gamified Reward", val: "2,450 XP", trend: "Level 18 fast track achiever", desc: "3 badges unlocked this quarter", icon: Award, color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40" }
        ].map((met, i) => {
          const IconComp = met.icon;
          return (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm flex items-center justify-between">
              <div className="overflow-hidden pr-2">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block tracking-wider">
                  {met.title}
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  {met.val}
                </h3>
                <span className="text-[10px] text-emerald-500 font-semibold block mt-1">
                  {met.trend}
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5 whitespace-nowrap truncate">{met.desc}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${met.color}`}>
                <IconComp size={18} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recharts Grid container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Activities Area chart */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-100">
                Active Weekly Session Vectors
              </h3>
              <p className="text-[11px] text-slate-400">Track hours spent on specific course branches daily.</p>
            </div>
            <div className="flex gap-3 text-[10px] font-semibold font-mono">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" /> Full-Stack</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" /> Applied AI</span>
            </div>
          </div>
          <div className="h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyStudyData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWeb" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4338ca" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4338ca" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis dataKey="day" tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#0f172a", border: "none", borderRadius: "10px", fontSize: "11px", color: "#f8fafc" }} />
                <Area type="monotone" dataKey="WebHours" stroke="#4338ca" strokeWidth={2.5} fillOpacity={1} fill="url(#colorWeb)" />
                <Area type="monotone" dataKey="AIHours" stroke="#06b6d4" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAI)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Pie Chart Distribution */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-100 mb-0.5">
              Subject Focus Division
            </h3>
            <p className="text-[11px] text-slate-400">Percentage distribution of course enrollments.</p>
          </div>
          <div className="h-44 relative mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#0f172a", border: "none", borderRadius: "10px", fontSize: "10px", color: "#f8fafc" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col mt-2">
              <span className="text-xs font-black text-slate-800 dark:text-white">Active</span>
              <span className="text-[10px] text-slate-400 font-mono">Curriculums</span>
            </div>
          </div>
          <div className="space-y-1.5 mt-2">
            {categoryDistribution.map((item, i) => (
              <div key={i} className="flex justify-between text-[11px] font-medium text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: COLORS[i] }} />
                  {item.name}
                </span>
                <span className="font-mono text-slate-400">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Faculty Load Bar charts */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
          <div>
            <h3 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-100">
              Instructor load & Webinar schedules
            </h3>
            <p className="text-[11px] text-slate-400">Schedules and course allotments sorted per staff member.</p>
          </div>
          <div className="h-56 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={facultyLoadingData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#0f172a", border: "none", borderRadius: "10px", fontSize: "11px", color: "#f8fafc" }} />
                <Bar dataKey="classes" fill="#4338ca" radius={[4, 4, 0, 0]} barSize={25} />
                <Bar dataKey="courses" fill="#06b6d4" radius={[4, 4, 0, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent logs */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-100">
              LMS Audit logs & Activities
            </h3>
            <p className="text-[11px] text-slate-400">Real-time terminal audit for core school directories.</p>
          </div>
          <div className="space-y-3 mt-4 flex-1">
            {[
              { text: "Autograder successfully processed final submissions for Julian Sterling.", auth: "System Agent", time: "5 mins ago" },
              { text: "Dr. Marcus Thorne altered curriculum model 2: Zustand state controls.", auth: "Teacher Marcus", time: "25 mins ago" },
              { text: "License purchase invoice compiled as outstanding status.", auth: "Invoice Service", time: "1 hour ago" },
              { text: "Sarah Jenkins modified system global permissions table.", auth: "Admin Sarah", time: "5 hours ago" }
            ].map((log, i) => (
              <div key={i} className="text-xs p-2.5 bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 rounded-xl flex justify-between items-start">
                <div className="pr-4">
                  <p className="text-slate-700 dark:text-slate-300 leading-normal">{log.text}</p>
                  <span className="text-[9px] font-mono font-bold text-indigo-500 block mt-1">{log.auth}</span>
                </div>
                <span className="text-[9px] font-mono text-slate-400 whitespace-nowrap shrink-0">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
