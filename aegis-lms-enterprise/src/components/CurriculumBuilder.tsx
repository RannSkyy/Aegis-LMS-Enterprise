/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BookOpen, Plus, Trash2, Edit2, CheckCircle, Eye, EyeOff, Tag, RefreshCw, Layers } from "lucide-react";
import { Course, CourseModule, Lesson } from "../types";
import { mockCourses } from "../data";

export default function CurriculumBuilder() {
  const [courses, setCourses] = React.useState<Course[]>(mockCourses);
  const [selectedCourse, setSelectedCourse] = React.useState<Course>(mockCourses[0]);

  // Course Creation States
  const [newTitle, setNewTitle] = React.useState("");
  const [newDesc, setNewDesc] = React.useState("");
  const [newCategory, setNewCategory] = React.useState("Software Engineering");
  const [newLevel, setNewLevel] = React.useState<"Beginner" | "Intermediate" | "Advanced">("Advanced");
  const [newPrice, setNewPrice] = React.useState("299");

  // Module addition States
  const [moduleTitle, setModuleTitle] = React.useState("");
  // Lesson addition state
  const [lessonTitle, setLessonTitle] = React.useState("");
  const [lessonType, setLessonType] = React.useState<"video" | "document" | "interactive">("video");
  const [lessonDur, setLessonDur] = React.useState("15:00");
  const [activeModuleId, setActiveModuleId] = React.useState("");

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const courseObj: Course = {
      id: `course-${Date.now()}`,
      title: newTitle,
      description: newDesc,
      category: newCategory,
      instructorId: "user-teacher-1",
      instructorName: "Dr. Marcus Thorne",
      instructorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600",
      level: newLevel,
      rating: 5.0,
      duration: "0 hours",
      enrollmentsCount: 0,
      price: parseFloat(newPrice) || 0,
      published: false,
      modules: []
    };

    setCourses((prev) => [...prev, courseObj]);
    setSelectedCourse(courseObj);
    setNewTitle("");
    setNewDesc("");
    setNewPrice("299");
  };

  const handleTogglePublish = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const updated = { ...c, published: !c.published };
          if (selectedCourse.id === courseId) setSelectedCourse(updated);
          return updated;
        }
        return c;
      })
    );
  };

  const handleAddModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!moduleTitle.trim()) return;

    const newModule: CourseModule = {
      id: `mod-${Date.now()}`,
      title: moduleTitle,
      lessons: []
    };

    const updatedCourse = {
      ...selectedCourse,
      modules: [...selectedCourse.modules, newModule]
    };

    setCourses((prev) => prev.map((c) => (c.id === selectedCourse.id ? updatedCourse : c)));
    setSelectedCourse(updatedCourse);
    setModuleTitle("");
  };

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitle.trim() || !activeModuleId) return;

    const newLesson: Lesson = {
      id: `les-${Date.now()}`,
      title: lessonTitle,
      type: lessonType,
      duration: lessonDur,
      completed: false
    };

    const updatedCourse = {
      ...selectedCourse,
      modules: selectedCourse.modules.map((m) => {
        if (m.id === activeModuleId) {
          return {
            ...m,
            lessons: [...m.lessons, newLesson]
          };
        }
        return m;
      })
    };

    setCourses((prev) => prev.map((c) => (c.id === selectedCourse.id ? updatedCourse : c)));
    setSelectedCourse(updatedCourse);
    setLessonTitle("");
    setLessonDur("15:00");
  };

  const handleDeleteModule = (modId: string) => {
    const updated = {
      ...selectedCourse,
      modules: selectedCourse.modules.filter((m) => m.id !== modId)
    };
    setCourses((prev) => prev.map((c) => (c.id === selectedCourse.id ? updated : c)));
    setSelectedCourse(updated);
  };

  return (
    <div id="curriculum-builder-container" className="grid grid-cols-1 xl:grid-cols-12 gap-6 transition-all duration-200">
      {/* List of courses Panel */}
      <div className="xl:col-span-4 space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Layers size={16} className="text-indigo-600" />
              Academic Portfolios
            </h3>
            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono py-1 px-2.5 rounded-full">
              {courses.length} courses
            </span>
          </div>

          <div className="space-y-2 mt-4 max-h-[300px] overflow-y-auto custom-scrollbar">
            {courses.map((c) => {
              const isSel = selectedCourse.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCourse(c)}
                  className={`p-3 rounded-xl border transition cursor-pointer flex justify-between items-center ${
                    isSel
                      ? "bg-indigo-50 border-indigo-400 dark:bg-indigo-950/30 dark:border-indigo-800 text-indigo-900 dark:text-indigo-100"
                      : "border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <div className="overflow-hidden pr-3">
                    <h4 className="text-xs font-semibold line-clamp-1">{c.title}</h4>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400 font-mono">
                      <span>{c.level}</span>
                      <span>•</span>
                      <span>{c.category}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTogglePublish(c.id);
                    }}
                    className={`p-1.5 rounded-lg border transition ${
                      c.published
                        ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border-emerald-200"
                        : "bg-amber-50 dark:bg-amber-950/20 text-amber-600 border-amber-200"
                    }`}
                    title={c.published ? "Click to draft" : "Click to publish"}
                  >
                    {c.published ? <Eye size={12} /> : <EyeOff size={12} />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Create Course Form Capsule */}
        <form onSubmit={handleCreateCourse} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm space-y-4">
          <h3 className="font-sans font-bold text-xs text-slate-800 dark:text-slate-100 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">
            Establish New Course
          </h3>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Course Title</label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g., Cryptographic Kernels"
              className="w-full bg-slate-50 dark:bg-slate-950 p-2 text-xs border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Syllabus Overview</label>
            <textarea
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Provide a comprehensive academic agenda..."
              rows={2}
              className="w-full bg-slate-50 dark:bg-slate-950 p-2 text-xs border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Market Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2 text-xs border border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer text-slate-800 dark:text-slate-100"
              >
                <option value="Software Engineering">Software Engineering</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Academic Grade</label>
              <select
                value={newLevel}
                onChange={(e) => setNewLevel(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2 text-xs border border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer text-slate-800 dark:text-slate-100"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Pricing Access ($)</label>
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 p-2 text-xs border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2 rounded-xl transition shadow shadow-indigo-600/20 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Plus size={14} /> Add to Catalog List
          </button>
        </form>
      </div>

      {/* Editor Panel */}
      <div className="xl:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
          <div>
            <span className="text-[9px] font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 py-1 px-3 rounded-full">
              {selectedCourse.category}
            </span>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white mt-2">
              {selectedCourse.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2 max-w-xl">
              {selectedCourse.description}
            </p>
          </div>
          <div className="mt-3 md:mt-0 flex gap-2 shrink-0">
            <span className={`text-xs px-3.5 py-1.5 rounded-xl font-bold font-mono border ${
              selectedCourse.published 
                ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 border-emerald-200" 
                : "bg-amber-50 dark:bg-amber-950/20 text-amber-700 border-amber-200"
            }`}>
              {selectedCourse.published ? "Active Catalog" : "Draft Workspace"}
            </span>
          </div>
        </div>

        {/* Modules Builder Canvas */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold font-mono tracking-widest text-slate-400 uppercase">
              Curriculum Sections ({selectedCourse.modules.length})
            </h3>
            <form onSubmit={handleAddModule} className="flex gap-2">
              <input
                required
                type="text"
                placeholder="New Section Name..."
                value={moduleTitle}
                onChange={(e) => setModuleTitle(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs px-3 py-1.5 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-slate-900 dark:bg-slate-800 text-white text-xs px-3.5 py-1.5 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-700 cursor-pointer"
              >
                Add Link
              </button>
            </form>
          </div>

          <div className="space-y-4">
            {selectedCourse.modules.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 dark:bg-slate-950/30 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center">
                <BookOpen size={24} className="text-slate-300 mb-2" />
                <h4 className="text-xs font-bold text-slate-500">No Syllabus Modules Integrated</h4>
                <p className="text-[10px] text-slate-400 mt-1">Submit a section title above to customize course materials.</p>
              </div>
            ) : (
              selectedCourse.modules.map((mod) => (
                <div key={mod.id} className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/20 dark:bg-slate-950/10">
                  <div className="p-3 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {mod.title}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setActiveModuleId(mod.id);
                        }}
                        className={`text-[10px] font-semibold py-1 px-2.5 rounded-lg border text-indigo-600 dark:text-indigo-400 border-indigo-200/50 hover:bg-indigo-50/50 transition cursor-pointer ${
                          activeModuleId === mod.id ? "bg-indigo-100/50 border-indigo-500" : ""
                        }`}
                      >
                        {activeModuleId === mod.id ? "Selected for lesson" : "Select to add lesson"}
                      </button>
                      <button
                        onClick={() => handleDeleteModule(mod.id)}
                        className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-rose-500 rounded"
                        title="Delete Module"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Lessons in module */}
                  <div className="p-3 divide-y divide-slate-100 dark:divide-slate-800">
                    {mod.lessons.length === 0 ? (
                      <span className="text-[10px] font-semibold text-slate-400 block text-center py-2">
                        No instructional chapters loaded.
                      </span>
                    ) : (
                      mod.lessons.map((les) => (
                        <div key={les.id} className="py-2.5 flex justify-between items-center text-xs">
                          <div className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              les.type === "video" ? "bg-blue-500" : les.type === "document" ? "bg-emerald-500" : "bg-purple-500"
                            }`} />
                            <span className="font-medium text-slate-700 dark:text-slate-200">{les.title}</span>
                          </div>
                          <div className="flex items-center gap-3 font-mono text-[10px] text-slate-400">
                            <span className="capitalize">{les.type}</span>
                            <span>{les.duration}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Form to append lessons inside the activated syllabus module */}
          {activeModuleId && (
            <form onSubmit={handleAddLesson} className="p-4 bg-slate-50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3 mt-4">
              <h4 className="text-[10px] font-bold font-mono tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                LOAD LESSON TO INTEGRATED MODULE
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Chapter Name</label>
                  <input
                    required
                    type="text"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    placeholder="e.g., Cosine regressive isolation"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs p-2 rounded-lg text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Instruction Channel</label>
                  <select
                    value={lessonType}
                    onChange={(e) => setLessonType(e.target.value as any)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs p-2 rounded-lg cursor-pointer text-slate-800 dark:text-slate-100"
                  >
                    <option value="video">🎥 Streaming Video</option>
                    <option value="document">📄 Technical File Doc</option>
                    <option value="interactive">💻 Embedded sandbox/interactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Allocated Duration</label>
                  <input
                    type="text"
                    required
                    value={lessonDur}
                    onChange={(e) => setLessonDur(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs p-2 rounded-lg text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModuleId("")}
                  className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs py-1.5 px-3.5 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-1.5 px-4 rounded-lg transition shadow shadow-indigo-600/10 cursor-pointer"
                >
                  Append Lesson
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
