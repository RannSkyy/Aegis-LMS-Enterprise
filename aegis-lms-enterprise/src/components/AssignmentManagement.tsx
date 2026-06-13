/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { FileText, Calendar, Plus, PenTool, CheckCircle, Clock, Trash, Tag } from "lucide-react";
import { Assignment, Submission } from "../types";
import { mockAssignments } from "../data";

export default function AssignmentManagement() {
  const [assignments, setAssignments] = React.useState<Assignment[]>(mockAssignments);
  const [selectedAsg, setSelectedAsg] = React.useState<Assignment>(mockAssignments[0]);

  // Selected Submission to Grade
  const [activeSub, setActiveSub] = React.useState<Submission | null>(
    mockAssignments[0].submissions[0] || null
  );

  // Grading states
  const [gradeInput, setGradeInput] = React.useState("95");
  const [feedbackInput, setFeedbackInput] = React.useState("");

  // Create Assignment states
  const [asgTitle, setAsgTitle] = React.useState("");
  const [asgCourse, setAsgCourse] = React.useState("Enterprise Full-Stack Architecture");
  const [asgDueDate, setAsgDueDate] = React.useState("2026-06-25");
  const [asgPoints, setAsgPoints] = React.useState("100");
  const [asgInstructions, setAsgInstructions] = React.useState("");

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!asgTitle.trim() || !asgInstructions.trim()) return;

    const newAsg: Assignment = {
      id: `asg-${Date.now()}`,
      title: asgTitle,
      courseId: "course-web-dev",
      courseName: asgCourse,
      dueDate: asgDueDate,
      points: parseInt(asgPoints) || 100,
      instructions: asgInstructions,
      submissions: [] // Empty list of submissions initially
    };

    setAssignments((prev) => [...prev, newAsg]);
    setAsgTitle("");
    setAsgInstructions("");
    alert("New Academy Task published and synched!");
  };

  const handleGradeSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSub || !selectedAsg) return;

    const updatedSubmissions = selectedAsg.submissions.map((sub) => {
      if (sub.id === activeSub.id) {
        return {
          ...sub,
          status: "graded" as const,
          grade: parseFloat(gradeInput) || 0,
          feedback: feedbackInput
        };
      }
      return sub;
    });

    const updatedAsg = {
      ...selectedAsg,
      submissions: updatedSubmissions
    };

    setAssignments((prev) => prev.map((a) => (a.id === selectedAsg.id ? updatedAsg : a)));
    setSelectedAsg(updatedAsg);
    
    // Find the graded submission in active selections to update local states
    const matched = updatedSubmissions.find((s) => s.id === activeSub.id) || null;
    setActiveSub(matched);

    alert(`Auto-grading successfully dispatched! ${activeSub.studentName} is awarded score ${gradeInput}/${selectedAsg.points}.`);
  };

  return (
    <div id="assignment-review-matrix" className="grid grid-cols-1 xl:grid-cols-12 gap-6 transition-all duration-200">
      {/* Homework Catalog list */}
      <div className="xl:col-span-4 space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
          <h3 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
            <FileText size={18} className="text-indigo-600" />
            LMS Assignments Registry
          </h3>

          <div className="space-y-2 max-h-[240px] overflow-y-auto custom-scrollbar">
            {assignments.map((asg) => {
              const isSel = selectedAsg.id === asg.id;
              return (
                <div
                  key={asg.id}
                  onClick={() => {
                    setSelectedAsg(asg);
                    setActiveSub(asg.submissions[0] || null);
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition ${
                    isSel
                      ? "bg-indigo-50 border-indigo-400 dark:bg-indigo-950/30 dark:border-indigo-810 text-indigo-900 dark:text-indigo-100"
                      : "border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  }`}
                >
                  <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase truncate">
                    {asg.courseName}
                  </span>
                  <h4 className="text-xs font-bold leading-snug mt-1.5 line-clamp-1">{asg.title}</h4>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-3">
                    <span className="flex items-center gap-1">
                      <Clock size={10} /> {asg.dueDate}
                    </span>
                    <span className="bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 py-0.5 px-2 rounded-md font-bold">
                      {asg.submissions.length} subs
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Create Assignment Form */}
        <form onSubmit={handleCreateAssignment} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm space-y-4">
          <h3 className="font-sans font-bold text-xs text-slate-800 dark:text-slate-100 uppercase tracking-widest border-b border-indigo-50 dark:border-slate-800 pb-2">
            Establish New HW task
          </h3>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Homework Title</label>
            <input
              required
              type="text"
              value={asgTitle}
              onChange={(e) => setAsgTitle(e.target.value)}
              placeholder="e.g., Row Level isolation scripts"
              className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 text-xs border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Due Deadline</label>
              <input
                type="date"
                required
                value={asgDueDate}
                onChange={(e) => setAsgDueDate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2 text-xs border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Max Score</label>
              <input
                type="number"
                required
                value={asgPoints}
                onChange={(e) => setAsgPoints(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2 text-xs border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-2">Instructions Statement</label>
            <textarea
              required
              placeholder="Provide a detailed instructions set for task deliverables..."
              value={asgInstructions}
              onChange={(e) => setAsgInstructions(e.target.value)}
              rows={3}
              className="w-full bg-slate-50 dark:bg-slate-950 p-2 text-xs border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2 rounded-xl transition shadow shadow-indigo-600/15 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Plus size={14} /> Publish Deliverable Task
          </button>
        </form>
      </div>

      {/* Interactive Review Workspace Column */}
      <div className="xl:col-span-8 space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
            <span className="text-[9px] font-mono font-bold tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-full uppercase">
              ACTIVE TASK BRIEFING
            </span>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white mt-2">
              {selectedAsg.title}
            </h2>
            <p className="text-xs text-slate-500 font-medium leading-relaxed mt-2 p-3.5 bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850/50 rounded-xl">
              **Goal**: {selectedAsg.instructions}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Submissions of standard students lists */}
            <div className="md:col-span-4 border-r border-slate-100 dark:border-slate-800 pr-4">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold block uppercase mb-3">
                Submissions BOARD ({selectedAsg.submissions.length})
              </span>
              {selectedAsg.submissions.length === 0 ? (
                <div className="text-center py-6 text-slate-400 bg-slate-50 dark:bg-slate-950/30 rounded-xl">
                  <span className="text-[10px] font-semibold">No homework submitted yet.</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedAsg.submissions.map((sub) => {
                    const isSel = activeSub?.id === sub.id;
                    return (
                      <div
                        key={sub.id}
                        onClick={() => {
                          setActiveSub(sub);
                          setGradeInput(String(sub.grade || 85));
                          setFeedbackInput(sub.feedback || "");
                        }}
                        className={`p-2.5 rounded-xl border cursor-pointer transition flex items-center gap-2 ${
                          isSel
                            ? "bg-indigo-50 border-indigo-400 dark:bg-indigo-950/20 dark:border-indigo-805"
                            : "border-slate-50 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                        }`}
                      >
                        <img src={sub.studentAvatar} alt="sub ava" className="w-6 h-6 rounded-full object-cover" />
                        <div className="overflow-hidden">
                          <h4 className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 truncate">{sub.studentName}</h4>
                          <span className={`text-[8px] font-mono uppercase font-bold py-0.5 px-2 rounded-full mt-1 inline-block ${
                            sub.status === "graded" 
                              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400" 
                              : "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400"
                          }`}>
                            {sub.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Editing grading results card detail */}
            <div className="md:col-span-8">
              {activeSub ? (
                <div className="space-y-5">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-slate-400 block uppercase">
                      DELIVERABLE SUBMISSION CONTENTS
                    </span>
                    <p className="text-xs p-3.5 bg-slate-950 text-indigo-200 font-mono rounded-xl border border-slate-850 my-2 select-all whitespace-pre-wrap leading-relaxed">
                      {activeSub.content}
                    </p>
                    <span className="text-[10px] font-mono text-slate-400 block mt-1">
                      Submitted on desk: {activeSub.submittedAt}
                    </span>
                  </div>

                  {/* Submission grader detail form fields */}
                  <form onSubmit={handleGradeSubmission} className="p-4 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
                    <h4 className="text-[10px] font-bold font-mono tracking-wider text-indigo-600 dark:text-indigo-400 uppercase flex items-center gap-1 bg-indigo-50/10 py-1 rounded">
                      <PenTool size={11} className="text-indigo-500" />
                      SUBMIT TO GRADING REGISTER
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">
                          Score Allocation (Max {selectedAsg.points})
                        </label>
                        <input
                          required
                          type="number"
                          max={selectedAsg.points}
                          value={gradeInput}
                          onChange={(e) => setGradeInput(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-805 text-xs p-2 rounded-lg text-slate-800 dark:text-slate-100"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Current Registry State</span>
                        <span className={`text-xs font-semibold py-1.5 px-3 rounded-lg border inline-block mt-0.5 uppercase ${
                          activeSub.status === "graded" 
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400" 
                            : "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400"
                        }`}>
                          {activeSub.status === "graded" ? `Graded: ${activeSub.grade}/${selectedAsg.points} XP` : "Pending Assessment review"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Grade Feedback Notes</label>
                      <textarea
                        placeholder="State feedback parameters, index optimizations or compliance advice..."
                        required
                        value={feedbackInput}
                        onChange={(e) => setFeedbackInput(e.target.value)}
                        rows={2}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-805 text-xs p-2 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 resize-none/none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-1.5 px-4 rounded-lg cursor-pointer transition shadow"
                    >
                      Save and Disburse Grade
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-10 bg-slate-50 dark:bg-slate-950/20 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center">
                  <CheckCircle size={28} className="text-slate-300 mb-2" />
                  <h4 className="text-xs font-bold text-slate-500">No Submission reviews focused</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Select an active Student paper in the panel to review code submissions.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
