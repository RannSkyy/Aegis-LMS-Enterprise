/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  Bell, 
  Search, 
  Globe, 
  Sun, 
  Moon, 
  HelpCircle, 
  User, 
  LogOut, 
  Sparkles, 
  MessageSquare,
  BookmarkCheck,
  Award
} from "lucide-react";
import { UserRole } from "../types";

interface NavbarProps {
  currentRole: UserRole;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  language: string;
  onChangeLanguage: (lang: string) => void;
  onSearch: (query: string) => void;
  activeNotificationsCount: number;
}

export default function Navbar({
  currentRole,
  theme,
  onToggleTheme,
  language,
  onChangeLanguage,
  onSearch,
  activeNotificationsCount
}: NavbarProps) {
  const [bellOpen, setBellOpen] = React.useState(false);
  const [langOpen, setLangOpen] = React.useState(false);
  const [searchVal, setSearchVal] = React.useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    onSearch(e.target.value);
  };

  const handleLangSelect = (lang: string) => {
    onChangeLanguage(lang);
    setLangOpen(false);
  };

  // Preset alerts to interact with
  const notifications = [
    { id: 1, title: "Dr. Marcus Thorne is LIVE", desc: "Enterprise Full-Stack Architecture webinar session is starting now.", time: "Just now", unread: true },
    { id: 2, title: "Homework Graded!", desc: "Task 1 submission scored 98/100 with active instructor feedback.", time: "1 hour ago", unread: true },
    { id: 3, title: "System Database upgrade done", desc: "Aegis Enterprise isolates tenant namespaces automatically.", time: "1 day ago", unread: false }
  ];

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-30 px-6 flex items-center justify-between shadow-sm shadow-slate-100 dark:shadow-none transition-colors duration-200">
      {/* Search Input Everywhere */}
      <div className="flex-1 max-w-md relative hidden sm:block md:ml-0 ml-12">
        <span className="absolute left-3 top-2.5 text-slate-400">
          <Search size={18} />
        </span>
        <input
          id="global-search-input"
          type="text"
          placeholder="Search courses, users, materials, or files..."
          value={searchVal}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500 transition shadow-inner dark:text-slate-100 text-slate-900 placeholder-slate-400"
        />
      </div>

      {/* Utilities Center */}
      <div className="flex items-center gap-1.5 sm:gap-3 ml-auto">
        {/* Quick Help Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs text-slate-500 dark:text-slate-400 border border-slate-200/40 dark:border-slate-700/40">
          <Sparkles size={13} className="text-indigo-500 animate-pulse" />
          <span className="font-mono">{currentRole.replace("_", " ")} Workspace</span>
        </div>

        {/* Global Dark Mode Switcher */}
        <button
          id="theme-toggle-button"
          onClick={onToggleTheme}
          className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
          title="Toggle Canvas Theme"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* Active Multi-Language Swapper */}
        <div className="relative">
          <button
            id="lang-selector-toggle"
            onClick={() => setLangOpen(!langOpen)}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition flex items-center gap-1"
            title="Switch Language"
          >
            <Globe size={20} />
            <span className="text-[10px] uppercase font-bold font-mono text-slate-500 hidden sm:inline">
              {language}
            </span>
          </button>
          
          {langOpen && (
            <div 
              id="lang-dropdown" 
              className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-1 z-50 text-xs text-slate-700 dark:text-slate-300 transform origin-top-right transition duration-200"
            >
              {[
                { code: "en", label: "🇺🇸 English" },
                { code: "es", label: "🇪🇸 Español" },
                { code: "fr", label: "🇫🇷 Français" }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLangSelect(lang.code)}
                  className={`w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 ${
                    language === lang.code ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 font-semibold" : ""
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Alerts Notification Center */}
        <div className="relative">
          <button
            id="notifications-bell-btn"
            onClick={() => setBellOpen(!bellOpen)}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition relative"
            title="Notification Center"
          >
            <Bell size={20} />
            {activeNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-600 text-[9px] font-bold text-white flex items-center justify-center rounded-full ring-2 ring-white dark:ring-slate-900">
                {activeNotificationsCount}
              </span>
            )}
          </button>

          {bellOpen && (
            <div
              id="notifications-dropdown-menu"
              className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-2 z-50 transform origin-top-right transition duration-150"
            >
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/55 dark:bg-slate-900/35 rounded-t-2xl">
                <span className="font-semibold text-xs text-slate-800 dark:text-slate-100">
                  LMS Activity Stream
                </span>
                <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`px-4 py-3 border-b border-slate-50 dark:border-slate-900/80 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition cursor-pointer flex gap-2.5 ${
                      notif.unread ? "bg-indigo-50/15 dark:bg-indigo-950/10" : ""
                    }`}
                  >
                    <div className="mt-0.5">
                      {notif.id === 1 ? (
                        <div className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center text-rose-500">
                          <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                        </div>
                      ) : notif.id === 2 ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-500">
                          <Award size={11} />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center text-blue-500">
                          <BookmarkCheck size={11} />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-100 line-clamp-1 leading-tight">
                        {notif.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                        {notif.desc}
                      </p>
                      <span className="text-[9px] font-mono text-slate-400 block mt-1">
                        {notif.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
