/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Award, CheckCircle2, AlertTriangle, Play, HelpCircle, Plus, Send, RefreshCw, Star } from "lucide-react";
import { Exam, Question } from "../types";
import { mockExams } from "../data";

export default function ExaminationSystem() {
  const [exams, setExams] = React.useState<Exam[]>(mockExams);
  const [activeExam, setActiveExam] = React.useState<Exam | null>(null);

  // Take test state
  const [answers, setAnswers] = React.useState<Record<string, number>>({});
  const [submittedResult, setSubmittedResult] = React.useState<{
    score: number;
    total: number;
    passed: boolean;
  } | null>(null);

  // Build Quiz state
  const [newQuizTitle, setNewQuizTitle] = React.useState("");
  const [newQuizCourse, setNewQuizCourse] = React.useState("Enterprise Full-Stack Architecture");
  const [questions, setQuestions] = React.useState<Question[]>([
    {
      id: "q-new-1",
      text: "What represents the main hazard of ignoring React dependency arrays?",
      options: [
        "Component infinite render loop triggers",
        "Slow network requests",
        "Server code compilation crashes",
        "Operating system hardware thermal flags"
      ],
      correctOptionIndex: 0
    }
  ]);

  // Builders states for adding a question
  const [qText, setQText] = React.useState("");
  const [opt0, setOpt0] = React.useState("");
  const [opt1, setOpt1] = React.useState("");
  const [opt2, setOpt2] = React.useState("");
  const [opt3, setOpt3] = React.useState("");
  const [correctIdx, setCorrectIdx] = React.useState("0");

  const handleStartExam = (exam: Exam) => {
    setActiveExam(exam);
    setAnswers({});
    setSubmittedResult(null);
  };

  const handleSelectOption = (qId: string, idx: number) => {
    if (submittedResult) return; // Prevent change after grading
    setAnswers((prev) => ({
      ...prev,
      [qId]: idx
    }));
  };

  const handleSubmitExam = () => {
    if (!activeExam) return;

    let correctScore = 0;
    activeExam.questions.forEach((q) => {
      const studentAns = answers[q.id];
      if (studentAns === q.correctOptionIndex) {
        correctScore++;
      }
    });

    const isPassed = correctScore / activeExam.questions.length >= 0.7;

    setSubmittedResult({
      score: correctScore,
      total: activeExam.questions.length,
      passed: isPassed
    });
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText.trim() || !opt0.trim() || !opt1.trim()) return;

    const newQ: Question = {
      id: `q-gen-${Date.now()}`,
      text: qText,
      options: [opt0, opt1, opt2 || "Not provided", opt3 || "Not provided"].filter(Boolean),
      correctOptionIndex: parseInt(correctIdx)
    };

    setQuestions((prev) => [...prev, newQ]);
    setQText("");
    setOpt0("");
    setOpt1("");
    setOpt2("");
    setOpt3("");
  };

  const handleSaveExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuizTitle.trim()) return;

    const builtExam: Exam = {
      id: `exam-${Date.now()}`,
      title: newQuizTitle,
      courseId: "course-web-dev",
      courseName: newQuizCourse,
      durationMinutes: 30,
      questions: questions,
      results: []
    };

    setExams((prev) => [...prev, builtExam]);
    setNewQuizTitle("");
    setQuestions([]);
    alert("Enterprise Quiz generated successfully and appended to Course schedules!");
  };

  return (
    <div id="examination-system-wrapper" className="grid grid-cols-1 xl:grid-cols-12 gap-6 transition-all duration-200">
      {/* Quiz Catalog & Results Panel */}
      <div className="xl:col-span-4 space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
          <h3 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
            <Award size={18} className="text-indigo-600" />
            LMS Assessment Matrix
          </h3>
          <div className="space-y-3">
            {exams.map((ex) => (
              <div
                key={ex.id}
                className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 relative"
              >
                <div className="pr-16">
                  <span className="text-[9px] font-mono font-bold text-slate-400 capitalize block truncate">
                    {ex.courseName}
                  </span>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-1 line-clamp-1">
                    {ex.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-2">
                    <span>{ex.questions.length} Questions</span>
                    <span>•</span>
                    <span>{ex.durationMinutes} mins</span>
                  </div>
                </div>
                <button
                  onClick={() => handleStartExam(ex)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-xl transition shadow shadow-indigo-600/10 cursor-pointer"
                  title="Begin Assessment"
                >
                  <Play size={12} fill="white" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic score board */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
          <h3 className="font-sans font-semibold text-xs text-slate-400 uppercase tracking-widest mb-3">
            ACADEMIC RESULTS SCREEN
          </h3>
          <div className="space-y-2.5">
            {[
              { name: "Julian Sterling", exam: "Neural Alignments Midterm", score: "3/3 answers correct", xp: "+150 XP achieved", badge: "Quiz Conqueror", state: "Perfect score" },
              { name: "Maya Lin", exam: "Neural Alignments Midterm", score: "2/3 answers correct", xp: "+100 XP achieved", badge: "N/A", state: "Passing score" }
            ].map((usr, i) => (
              <div key={i} className="text-xs flex gap-3 p-2.5 border-b border-slate-50 dark:border-slate-800 last:border-b-0 items-center">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-indigo-600">
                  {usr.name[0]}
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-100 truncate">{usr.name}</h4>
                  <p className="text-[10px] text-slate-500 truncate leading-tight mt-0.5">{usr.exam}</p>
                  <div className="flex items-center gap-1.5 mt-1 font-mono text-[9px] text-emerald-500">
                    <span>{usr.score}</span>
                    <span>•</span>
                    <span>{usr.xp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Workspaces */}
      <div className="xl:col-span-8 space-y-6">
        {activeExam ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm relative overflow-hidden transition-all duration-200">
            {/* Header branding */}
            <div className="border-b border-indigo-100 dark:border-indigo-950/40 pb-4 mb-6">
              <span className="text-[9px] font-mono tracking-widest text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-full uppercase">
                Active Assessment Loop
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white mt-1.5">
                {activeExam.title}
              </h2>
              <p className="text-[10px] text-slate-400 mt-0.5 italic">
                Course: {activeExam.courseName}
              </p>
            </div>

            {/* Questions lists */}
            <div className="space-y-6">
              {activeExam.questions.map((q, idx) => {
                const selectedIdx = answers[q.id];
                return (
                  <div key={q.id} className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-start gap-1.5 leading-snug">
                      <span className="text-indigo-600 font-mono">Q{idx + 1}.</span>
                      {q.text}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 ml-5">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedIdx === optIdx;
                        let optStyle = "border-slate-200 dark:border-slate-800 bg-white hover:bg-slate-50 dark:bg-slate-900";
                        if (isSelected) {
                          optStyle = "border-indigo-500 bg-indigo-50/25 text-indigo-900 dark:bg-indigo-950/20 dark:text-indigo-100 ring-1 ring-indigo-500";
                        }

                        // Style post-submission checks
                        if (submittedResult) {
                          const isCorrect = optIdx === q.correctOptionIndex;
                          if (isCorrect) {
                            optStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:bg-emerald-950/20 dark:text-emerald-300 font-semibold ring-1 ring-emerald-500";
                          } else if (isSelected && !isCorrect) {
                            optStyle = "border-rose-500 bg-rose-500/10 text-rose-900 dark:bg-rose-950/20 dark:text-rose-300 ring-1 ring-rose-500";
                          }
                        }

                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`p-3 text-xs rounded-xl border transition cursor-pointer select-none ${optStyle}`}
                          >
                            <span className="font-mono text-[10px] text-slate-400 mr-2 uppercase">
                              {String.fromCharCode(65 + optIdx)})
                            </span>
                            {opt}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Results Alert Screen */}
            {submittedResult && (
              <div className="mt-8 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-4 animate-fade-in">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border ${
                  submittedResult.passed 
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600" 
                    : "bg-rose-50 border-rose-200 text-rose-600"
                }`}>
                  {submittedResult.passed ? <CheckCircle2 size={24} /> : <AlertTriangle size={24} />}
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {submittedResult.passed 
                      ? "🎉 Assessment Success! Auto Grader calculation done." 
                      : "⚠️ Passing Minimum not met."}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Your final assessment score: **{submittedResult.score}/{submittedResult.total} answers correct** ({Math.round((submittedResult.score / submittedResult.total) * 100)}%).
                  </p>
                  {submittedResult.passed && (
                    <div className="mt-2.5 flex flex-wrap gap-2 items-center">
                      <span className="text-[9px] font-mono bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 py-0.5 px-2.5 rounded-full font-bold">
                        🏆 +150 Points Reward
                      </span>
                      <span className="text-[9px] font-mono bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 py-0.5 px-2.5 rounded-full font-bold flex items-center gap-0.5">
                        <Star size={8} fill="currentColor" /> Unlocked Quiz Conqueror Badge
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    setActiveExam(null);
                    setSubmittedResult(null);
                  }}
                  className="bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white text-xs font-semibold py-1.5 px-4 rounded-lg cursor-pointer"
                >
                  Close Loop
                </button>
              </div>
            )}

            {/* Actions Bar */}
            {!submittedResult && (
              <div className="flex justify-end gap-2.5 border-t border-slate-100 dark:border-slate-800 mt-8 pt-4">
                <button
                  onClick={() => setActiveExam(null)}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs py-2 px-4 rounded-xl hover:bg-slate-200"
                >
                  Give Up
                </button>
                <button
                  onClick={handleSubmitExam}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2 px-5 rounded-xl transition shadow shadow-indigo-600/10 cursor-pointer flex items-center gap-1.5"
                >
                  <Send size={12} /> Submit to Autograder
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Quiz Architect Form Capsule */
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
              <Plus size={16} className="text-indigo-600" />
              LMS Quiz Architect Workspace
            </h2>

            <form onSubmit={handleSaveExam} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Assessment Name</label>
                  <input
                    required
                    type="text"
                    value={newQuizTitle}
                    onChange={(e) => setNewQuizTitle(e.target.value)}
                    placeholder="e.g., Cryptographic Keys Final"
                    className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 text-xs border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Affiliated syllabus</label>
                  <select
                    value={newQuizCourse}
                    onChange={(e) => setNewQuizCourse(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 text-xs border border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer text-slate-800 dark:text-slate-100"
                  >
                    <option value="Enterprise Full-Stack Architecture">Enterprise Full-Stack Architecture</option>
                    <option value="Applied Generative AI & Large Language Models">Applied Generative AI & Large Language Models</option>
                    <option value="Data Visualization & Predictive Insights">Data Visualization & Predictive Insights</option>
                  </select>
                </div>
              </div>

              {/* Added Question Listing */}
              <div className="space-y-2 mt-4">
                <span className="text-[10px] font-mono tracking-wider font-bold text-slate-400 block uppercase">
                  Questions Board ({questions.length})
                </span>
                {questions.map((q, idx) => (
                  <div key={idx} className="p-3 bg-slate-50/50 dark:bg-slate-950/25 border border-slate-100 dark:border-slate-850 rounded-xl text-xs flex justify-between items-start">
                    <div>
                      <h5 className="font-semibold text-slate-800 dark:text-slate-200">
                        {idx + 1}. {q.text}
                      </h5>
                      <span className="text-[10px] text-emerald-600 block mt-1 font-mono">
                        Correct Option: {q.options[q.correctOptionIndex]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Question Section */}
              <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
                <h4 className="text-[9px] font-bold font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                  APPEND QUESTION FIELD
                </h4>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Question Description String</label>
                  <input
                    type="text"
                    value={qText}
                    onChange={(e) => setQText(e.target.value)}
                    placeholder="Describe the conceptual problem to be evaluated..."
                    className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs p-2 rounded-lg text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={opt0}
                    onChange={(e) => setOpt0(e.target.value)}
                    placeholder="Option A (Required)"
                    className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs p-2 rounded-lg text-slate-800 dark:text-slate-100"
                  />
                  <input
                    type="text"
                    value={opt1}
                    onChange={(e) => setOpt1(e.target.value)}
                    placeholder="Option B (Required)"
                    className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs p-2 rounded-lg text-slate-800 dark:text-slate-100"
                  />
                  <input
                    type="text"
                    value={opt2}
                    onChange={(e) => setOpt2(e.target.value)}
                    placeholder="Option C"
                    className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs p-2 rounded-lg text-slate-800 dark:text-slate-100"
                  />
                  <input
                    type="text"
                    value={opt3}
                    onChange={(e) => setOpt3(e.target.value)}
                    placeholder="Option D"
                    className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs p-2 rounded-lg text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Isolate Correct Option</label>
                  <select
                    value={correctIdx}
                    onChange={(e) => setCorrectIdx(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs p-2 rounded-lg cursor-pointer text-slate-800 dark:text-slate-100"
                  >
                    <option value="0">Option A</option>
                    <option value="1">Option B</option>
                    <option value="2">Option C</option>
                    <option value="3">Option D</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={handleCreateQuestion}
                  className="bg-indigo-600/10 text-indigo-600 hover:bg-indigo-600 hover:text-white font-semibold text-xs py-1.5 px-4 rounded-xl border border-indigo-200 transition"
                >
                  Append This Question
                </button>
              </div>

              {/* Submit Final Exam Configuration */}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2.5 rounded-xl transition shadow shadow-indigo-600/10 cursor-pointer"
              >
                Compile and Publish Assessment
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
