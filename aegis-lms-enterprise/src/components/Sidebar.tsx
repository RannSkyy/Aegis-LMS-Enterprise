/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Activity, 
  Video, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Award, 
  CreditCard, 
  Settings, 
  Sparkles, 
  Shield, 
  Key,
  Menu,
  X,
  User,
  GraduationCap
} from "lucide-react";
import { UserRole } from "../types";

interface SidebarProps {
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  activeTab: string;
  onChangeTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({
  currentRole,
  onChangeRole,
  activeTab,
  onChangeTab,
  collapsed,
  setCollapsed
}: SidebarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Group paths per role
  const getNavItems = () => {
    const common = [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "calendar", label: "Calendar & Schedule", icon: Calendar }
    ];

    switch (currentRole) {
      case UserRole.SUPER_ADMIN:
        return [
          ...common,
          { id: "system-admin", label: "System Config", icon: Settings },
          { id: "user-directory", label: "Manage Users", icon: Users },
          { id: "audit-logs", label: "Security & Audit", icon: Shield },
          { id: "billing", label: "Global Subscriptions", icon: CreditCard }
        ];

      case UserRole.SCHOOL_ADMIN:
        return [
          ...common,
          { id: "courses", label: "Academy Courses", icon: BookOpen },
          { id: "student-management", label: "Student Directory", icon: Users },
          { id: "instructor-management", label: "Instructors load", icon: GraduationCap },
          { id: "analytics", label: "School Metrics", icon: Activity },
          { id: "billing", label: "License & Plan", icon: CreditCard }
        ];

      case UserRole.TEACHER:
        return [
          ...common,
          { id: "courses", label: "Course Builder", icon: BookOpen },
          { id: "live-classes", label: "Virtual Classroom", icon: Video },
          { id: "assignments", label: "Submission Reviews", icon: FileText },
          { id: "exams", label: "Examination Center", icon: Award },
          { id: "communications", label: "Forums & Chat", icon: MessageSquare }
        ];

      case UserRole.STUDENT:
        return [
          ...common,
          { id: "courses", label: "My Learning Lab", icon: BookOpen },
          { id: "marketplace", label: "Course Marketplace", icon: Sparkles },
          { id: "assignments", label: "My Homework", icon: FileText },
          { id: "exams", label: "Skill Quizzes", icon: Award },
          { id: "certificate-generator", label: "My Credentials", icon: Award },
          { id: "live-classes", label: "Join Live Session", icon: Video },
          { id: "communications", label: "Discussions", icon: MessageSquare }
        ];

      case UserRole.PARENT:
        return [
          ...common,
          { id: "student-progress", label: "Student Progress", icon: Activity },
          { id: "communications", label: "Teacher Advisory Chat", icon: MessageSquare },
          { id: "billing", label: "Invoice Records", icon: CreditCard }
        ];

      default:
        return common;
    }
  };

  const navItems = getNavItems();

  const handleNavClick = (id: string) => {
    onChangeTab(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          id="mobile-sidebar-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 bg-slate-900 border border-slate-700/50 text-slate-100 rounded-lg hover:bg-slate-800 transition shadow-lg transition-all duration-200"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar background overlay for mobile */}
      {mobileOpen && (
        <div
          id="mobile-overlay"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="aegis-sidebar"
        className={`fixed top-0 left-0 h-full bg-slate-900 border-r border-slate-800 text-slate-200 z-45 transition-all duration-300 transform md:translate-x-0 ${
          mobileOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0"
        } ${collapsed ? "md:w-20" : "md:w-64"}`}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* Platform Brand Logo Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80 bg-slate-950/20">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center border-2 border-indigo-400 font-bold text-white shadow-md shadow-indigo-600/30">
                  Æ
                </div>
                {!collapsed && (
                  <span className="font-sans font-bold text-md tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent transform transition-all duration-200">
                    Aegis LMS
                  </span>
                )}
              </div>
              <button
                id="sidebar-collapse-button"
                onClick={() => setCollapsed(!collapsed)}
                className="hidden md:flex p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition"
              >
                {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </button>
            </div>

            {/* Impersonation switcher tool */}
            <div className="p-3 border-b border-slate-800/80 bg-slate-950/15">
              {!collapsed ? (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase font-semibold block px-1">
                    ACTIVE LMS PERSONA
                  </span>
                  <select
                    id="role-switch-selector"
                    value={currentRole}
                    onChange={(e) => onChangeRole(e.target.value as UserRole)}
                    className="w-full text-xs bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-indigo-500 font-medium cursor-pointer"
                  >
                    <option value={UserRole.STUDENT}>🎓 Student: Julian</option>
                    <option value={UserRole.TEACHER}>👨‍🏫 Teacher: Dr. Thorne</option>
                    <option value={UserRole.SCHOOL_ADMIN}>🏫 School Admin: Sar Jenkins</option>
                    <option value={UserRole.SUPER_ADMIN}>🛡️ Super Admin: Alex Vance</option>
                    <option value={UserRole.PARENT}>👪 Parent: Robert</option>
                  </select>
                </div>
              ) : (
                <div className="flex justify-center group relative cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <User size={15} />
                  </div>
                  {/* Tooltip */}
                  <div className="absolute left-14 top-1 scale-0 group-hover:scale-100 transition duration-150 bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded py-1 px-2.5 whitespace-nowrap shadow-xl z-50">
                    Active role: {currentRole}
                  </div>
                </div>
              )}
            </div>

            {/* Route Lists */}
            <nav className="p-3 space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`sidebar-item-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium transition duration-200 ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15 border-l-4 border-indigo-400"
                        : "hover:bg-slate-800/60 text-slate-400 hover:text-slate-100"
                    }`}
                  >
                    <IconComponent size={18} className="flex-shrink-0" />
                    {(!collapsed || mobileOpen) && <span className="truncate">{item.label}</span>}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* User Section Bottom */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/20">
            <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
              <img
                src={
                  currentRole === UserRole.STUDENT
                    ? "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150"
                    : currentRole === UserRole.TEACHER
                    ? "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150"
                    : currentRole === UserRole.SCHOOL_ADMIN
                    ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
                    : currentRole === UserRole.SUPER_ADMIN
                    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                    : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
                }
                alt="Active Avatar"
                className="w-9 h-9 rounded-full object-cover border border-slate-700 flex-shrink-0"
              />
              {!collapsed && (
                <div className="overflow-hidden">
                  <h4 className="text-xs font-semibold text-white whitespace-nowrap truncate leading-none mb-1">
                    {currentRole === UserRole.STUDENT
                      ? "Julian Sterling"
                      : currentRole === UserRole.TEACHER
                      ? "Dr. Thorne"
                      : currentRole === UserRole.SCHOOL_ADMIN
                      ? "Sarah Jenkins"
                      : currentRole === UserRole.SUPER_ADMIN
                      ? "Alex Vance"
                      : "Robert Sterling"}
                  </h4>
                  <p className="text-[10px] font-mono text-slate-500 leading-none uppercase truncate">
                    {currentRole.replace("_", " ")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function ChevronLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  );
}
