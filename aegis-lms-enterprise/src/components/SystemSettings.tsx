/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Settings, Shield, Key, Eye, HelpCircle, Check, Database, RefreshCw, AlertTriangle } from "lucide-react";
import { UserRole } from "../types";

export default function SystemSettings() {
  const [maintenanceMode, setMaintenanceMode] = React.useState(false);
  const [tenantIsolation, setTenantIsolation] = React.useState(true);
  
  // Roles permissions array
  const [permissions, setPermissions] = React.useState([
    { action: "Publish Courses to Catalog", Super: true, School: true, Teacher: true, Student: false, Parent: false },
    { action: "Grade Student Submissions", Super: true, School: false, Teacher: true, Student: false, Parent: false },
    { action: "Generate Certificates", Super: true, School: true, Teacher: true, Student: false, Parent: false },
    { action: "Modify Global System Variables", Super: true, School: false, Teacher: false, Student: false, Parent: false },
    { action: "Manage Payment Plans", Super: true, School: true, Teacher: false, Student: false, Parent: false }
  ]);

  const togglePermission = (idx: number, role: string) => {
    setPermissions((prev) =>
      prev.map((p, i) => {
        if (i === idx) {
          return {
            ...p,
            [role]: !p[role as keyof typeof p]
          };
        }
        return p;
      })
    );
  };

  return (
    <div id="system-settings-wrapper" className="space-y-6 transition-all duration-200">
      
      {/* System configuration parameters toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
          <h3 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Settings size={18} className="text-indigo-600" />
            Core School Configurations
          </h3>

          <div className="space-y-4 text-xs font-medium text-slate-650 dark:text-slate-350">
            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950/20 p-3 rounded-xl border border-slate-100 dark:border-slate-850">
              <div>
                <h4 className="font-semibold text-slate-800 dark:text-white">Tenant Isolated Databases</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Enforce strict isolated queries for corporate users.</p>
              </div>
              <input
                type="checkbox"
                checked={tenantIsolation}
                onChange={() => setTenantIsolation(!tenantIsolation)}
                className="w-4 h-4 text-indigo-600 accent-indigo-500 rounded cursor-pointer"
              />
            </div>

            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950/20 p-3 rounded-xl border border-slate-100 dark:border-slate-855">
              <div>
                <h4 className="font-semibold text-slate-800 dark:text-white">Academic Maintenance Interval</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Set the container server to read-only status for safety.</p>
              </div>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={() => setMaintenanceMode(!maintenanceMode)}
                className="w-4 h-4 text-indigo-600 accent-indigo-500 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Database statistics details */}
        <div className="bg-white dark:bg-slate-900 border border-slate-202 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-1">
              <Database size={18} className="text-indigo-600" />
              LMS Database Integration Indicators
            </h3>
            <p className="text-[11px] text-slate-400">Manage API pipelines linked to this academic system.</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 rounded-xl space-y-3.5 my-3">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-420">Active Schema Version</span>
              <span className="font-mono text-indigo-500">v4.14-AegisStable</span>
            </div>
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-420">Container Node Status</span>
              <span className="text-emerald-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Online (Express)
              </span>
            </div>
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-420">LLM Study Key Integration</span>
              <span className="text-indigo-500 font-bold uppercase font-mono">
                {process.env.GEMINI_API_KEY ? "Live Key Configured" : "Simulated Key Active"}
              </span>
            </div>
          </div>

          <div className="flex gap-2 text-[10px] font-semibold text-slate-400 items-start leading-snug">
            <AlertTriangle size={15} className="text-amber-500 shrink-0 mt-0.5" />
            <span>Altering core databases directly will clear active dashboards of stored session records. Maintain appropriate backups.</span>
          </div>
        </div>
      </div>

      {/* Role list and permissions table matrix toggle */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
        <h3 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Shield size={18} className="text-indigo-600" />
          Enterprise Role Permission Matrix Settings
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-slate-100 dark:divide-slate-800">
            <thead>
              <tr className="text-slate-400 uppercase font-mono tracking-wider">
                <th className="pb-3 font-bold">LMS System Actions</th>
                <th className="pb-3 font-bold text-center">Super Admin</th>
                <th className="pb-3 font-bold text-center">School Admin</th>
                <th className="pb-3 font-bold text-center">Instructor</th>
                <th className="pb-3 font-bold text-center">Student</th>
                <th className="pb-3 font-bold text-center">Parent observer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-850">
              {permissions.map((perm, idx) => (
                <tr key={idx} className="text-slate-650 dark:text-slate-350">
                  <td className="py-3 font-semibold text-slate-800 dark:text-white">{perm.action}</td>
                  
                  {/* Super */}
                  <td className="py-3 text-center">
                    <input
                      type="checkbox"
                      checked={perm.Super}
                      onChange={() => togglePermission(idx, "Super")}
                      className="w-3.5 h-3.5 text-indigo-600 accent-indigo-500 cursor-pointer"
                    />
                  </td>
                  
                  {/* School */}
                  <td className="py-3 text-center">
                    <input
                      type="checkbox"
                      checked={perm.School}
                      onChange={() => togglePermission(idx, "School")}
                      className="w-3.5 h-3.5 text-indigo-650 accent-indigo-500 cursor-pointer"
                    />
                  </td>

                  {/* Teacher */}
                  <td className="py-3 text-center">
                    <input
                      type="checkbox"
                      checked={perm.Teacher}
                      onChange={() => togglePermission(idx, "Teacher")}
                      className="w-3.5 h-3.5 text-indigo-600 accent-indigo-500 cursor-pointer"
                    />
                  </td>

                  {/* Student */}
                  <td className="py-3 text-center">
                    <input
                      type="checkbox"
                      checked={perm.Student}
                      onChange={() => togglePermission(idx, "Student")}
                      className="w-3.5 h-3.5 text-indigo-600 accent-indigo-500 cursor-pointer"
                    />
                  </td>

                  {/* Parent */}
                  <td className="py-3 text-center">
                    <input
                      type="checkbox"
                      checked={perm.Parent}
                      onChange={() => togglePermission(idx, "Parent")}
                      className="w-3.5 h-3.5 text-indigo-600 accent-indigo-500 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
