/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { MessageSquare, Bell, Plus, Users, Send, Check, MessageCircle, Pin } from "lucide-react";
import { DiscussionThread, Announcement, Message, UserRole } from "../types";
import { mockDiscussions, mockAnnouncements } from "../data";

export default function CommunicationCenter() {
  const [threads, setThreads] = React.useState<DiscussionThread[]>(mockDiscussions);
  const [announcements, setAnnouncements] = React.useState<Announcement[]>(mockAnnouncements);

  const [activeThread, setActiveThread] = React.useState<DiscussionThread | null>(mockDiscussions[0]);
  const [forumReply, setForumReply] = React.useState("");
  const [forumReplies, setForumReplies] = React.useState<Record<string, Array<{ author: string, text: string, time: string }>>>({
    "disc-1": [
      { author: "Dr. Marcus Thorne", text: "I suggest extracting heavy objects outside state bounds. Alternatively, try useDeferredValue in React 19.", time: "2 hours ago" },
      { author: "Maya Lin", text: "Splitting context providers is super critical too. One provider for static and one for dynamic handles it perfectly.", time: "1 hour ago" }
    ]
  });

  // Direct messenger states
  const [contacts] = React.useState([
    { id: "c1", name: "Dr. Marcus Thorne (Teacher)", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150" },
    { id: "c2", name: "Sarah Jenkins (School Admin)", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150" },
    { id: "c3", name: "Robert Sterling (Parent)", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" }
  ]);
  const [selectedContact, setSelectedContact] = React.useState(contacts[0]);
  const [messages, setMessages] = React.useState<Record<string, Message[]>>({
    "c1": [
      { id: "m1", senderId: "user-teacher-1", senderName: "Dr. Thorne", senderAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150", senderRole: UserRole.TEACHER, content: "Hello Julian! I looked over your row-level partitioning schemas. Exceptionally well crafted.", timestamp: "Yesterday" }
    ]
  });
  const [chatInput, setChatInput] = React.useState("");

  // Create forum thread states
  const [threadTitle, setThreadTitle] = React.useState("");
  const [threadText, setThreadText] = React.useState("");
  const [threadCategory, setThreadCategory] = React.useState("Software Engineering");

  // Post Announcement states
  const [annTitle, setAnnTitle] = React.useState("");
  const [annContent, setAnnContent] = React.useState("");

  const handlePostThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!threadTitle.trim() || !threadText.trim()) return;

    const newThread: DiscussionThread = {
      id: `disc-${Date.now()}`,
      title: threadTitle,
      content: threadText,
      authorName: "Julian Sterling",
      authorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
      repliesCount: 0,
      category: threadCategory,
      createdAt: "Just now"
    };

    setThreads((prev) => [newThread, ...prev]);
    setActiveThread(newThread);
    setThreadTitle("");
    setThreadText("");
  };

  const handleForumReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeThread || !forumReply.trim()) return;

    const replyObj = {
      author: "Julian Sterling",
      text: forumReply,
      time: "Just now"
    };

    setForumReplies((prev) => ({
      ...prev,
      [activeThread.id]: [...(prev[activeThread.id] || []), replyObj]
    }));

    setThreads((prev) =>
      prev.map((t) => (t.id === activeThread.id ? { ...t, repliesCount: t.repliesCount + 1 } : t))
    );

    // Sync active thread metadata
    if (activeThread) {
      setActiveThread((prev) => prev ? { ...prev, repliesCount: prev.repliesCount + 1 } : null);
    }
    setForumReply("");
  };

  const handleSendChatMes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: "user-student-1",
      senderName: "Julian Sterling",
      senderAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
      senderRole: UserRole.STUDENT,
      content: chatInput,
      timestamp: "Just now"
    };

    setMessages((prev) => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMsg]
    }));

    setChatInput("");
  };

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;

    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title: annTitle,
      content: annContent,
      createdBy: "Julian Sterling",
      role: "Student President",
      createdAt: "Just now"
    };

    setAnnouncements((prev) => [newAnn, ...prev]);
    setAnnTitle("");
    setAnnContent("");
  };

  return (
    <div id="communications-grid" className="grid grid-cols-1 xl:grid-cols-12 gap-6 transition-all duration-200">
      
      {/* Announcements dashboard */}
      <div className="xl:col-span-4 space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
          <h3 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
            <Bell size={18} className="text-orange-500" />
            LMS Notices & Updates
          </h3>
          <div className="space-y-3 max-h-[320px] overflow-y-auto custom-scrollbar pr-1">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="p-3 bg-amber-50/20 dark:bg-amber-950/15 border border-amber-100 dark:border-amber-950/30 rounded-xl relative"
              >
                <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold mb-1">
                  <Pin size={10} className="rotate-45" />
                  <span className="text-[9px] font-mono tracking-wide uppercase">
                    {ann.role} Update
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-amber-100 leading-snug">
                  {ann.title}
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                  {ann.content}
                </p>
                <div className="flex justify-between mt-3 text-[9px] font-mono text-slate-400">
                  <span>Author: {ann.createdBy}</span>
                  <span>{ann.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Post announcement form */}
        <form onSubmit={handlePostAnnouncement} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm space-y-3">
          <h4 className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase">
            POST NEW INSTRUCTIONAL WRIT
          </h4>
          <input
            required
            type="text"
            placeholder="Alert Scope Title..."
            value={annTitle}
            onChange={(e) => setAnnTitle(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 p-2 text-xs border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          <textarea
            required
            placeholder="Describe policy updates or structural alerts..."
            value={annContent}
            onChange={(e) => setAnnContent(e.target.value)}
            rows={2}
            className="w-full bg-slate-50 dark:bg-slate-950 p-2 text-xs border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none resize-none"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold py-1.5 rounded-lg cursor-pointer"
          >
            Post Notice
          </button>
        </form>
      </div>

      {/* Messaging / Forums core */}
      <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Contact Messenger Columns */}
        <div className="md:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-sans font-bold text-xs text-slate-400 uppercase tracking-widest mb-4">
              Direct Channels
            </h3>
            <div className="space-y-2 max-h-[160px] overflow-y-auto custom-scrollbar mb-4">
              {contacts.map((ct) => {
                const isSel = selectedContact.id === ct.id;
                return (
                  <div
                    key={ct.id}
                    onClick={() => setSelectedContact(ct)}
                    className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition ${
                      isSel
                        ? "bg-indigo-50 border-indigo-400 dark:bg-indigo-950/30 dark:border-indigo-805"
                        : "border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    }`}
                  >
                    <img src={ct.avatar} alt="contact avatar" className="w-7 h-7 rounded-full object-cover shrink-0" />
                    <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 truncate pr-1">
                      {ct.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inbox messages */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex-1 flex flex-col justify-end">
            <div className="space-y-2.5 max-h-[220px] overflow-y-auto custom-scrollbar p-1 mb-3">
              {(messages[selectedContact.id] || []).map((msg, i) => {
                const isSelf = msg.senderId === "user-student-1";
                return (
                  <div key={i} className={`flex max-w-[85%] flex-col ${isSelf ? "ml-auto" : "mr-auto"}`}>
                    <div className={`p-2.5 rounded-xl text-[11px] leading-relaxed ${
                      isSelf ? "bg-indigo-600 text-white rounded-tr-none" : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none"
                    }`}>
                      {msg.content}
                    </div>
                    <span className="text-[8px] font-mono text-slate-400 mt-0.5 text-right font-semibold">
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Post Chat Form */}
            <form onSubmit={handleSendChatMes} className="flex gap-2">
              <input
                required
                type="text"
                placeholder="Message contact..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-slate-50 dark:bg-slate-950 p-2 text-xs border border-slate-200 dark:border-slate-850 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs p-2 rounded-lg cursor-pointer flex items-center justify-center shrink-0"
              >
                <Send size={12} />
              </button>
            </form>
          </div>
        </div>

        {/* Public forums columns */}
        <div className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-sans font-bold text-xs text-slate-400 uppercase tracking-widest">
                Academic Forum Boards
              </h3>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-850 text-slate-500 py-0.5 px-2.5 rounded-full font-mono">
                {threads.length} threads
              </span>
            </div>

            {/* Specific Thread listing selection */}
            <div className="space-y-2 mb-4 max-h-[140px] overflow-y-auto custom-scrollbar">
              {threads.map((th) => {
                const isActive = activeThread?.id === th.id;
                return (
                  <div
                    key={th.id}
                    onClick={() => setActiveThread(th)}
                    className={`p-2.5 rounded-xl border cursor-pointer transition ${
                      isActive
                        ? "bg-indigo-50 border-indigo-400 dark:bg-indigo-950/20 dark:border-indigo-805"
                        : "border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono bg-slate-100 dark:bg-slate-800 text-indigo-600 py-0.5 px-2 rounded">
                        {th.category}
                      </span>
                      <span className="text-[9px] text-slate-400">{th.createdAt}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white mt-1.5 truncate">
                      {th.title}
                    </h4>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active thread message board replies */}
          {activeThread && (
            <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex-1 flex flex-col justify-between">
              <div className="bg-slate-50 dark:bg-slate-950/30 p-2.5 rounded-xl border border-slate-100 dark:border-slate-850/60 mb-3 overflow-y-auto max-h-[160px] custom-scrollbar">
                <span className="text-[8px] font-bold text-slate-400 block uppercase font-mono">OP TITLE</span>
                <h4 className="text-xs font-extrabold text-slate-950 dark:text-white mt-1">
                  {activeThread.title}
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                  {activeThread.content}
                </p>

                {/* Replies container */}
                <div className="mt-4 space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                  {(forumReplies[activeThread.id] || []).map((repl, rIdx) => (
                    <div key={rIdx} className="p-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-xl text-[11px] leading-relaxed relative">
                      <h5 className="font-bold text-indigo-500 text-[9px] mb-0.5">{repl.author}</h5>
                      <p className="text-slate-700 dark:text-slate-300">{repl.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form to submit reply */}
              <form onSubmit={handleForumReply} className="flex gap-2">
                <input
                  required
                  type="text"
                  placeholder="Type reply to debate thread..."
                  value={forumReply}
                  onChange={(e) => setForumReply(e.target.value)}
                  className="flex-1 bg-slate-50 dark:bg-slate-950 p-2 text-xs border border-slate-200 dark:border-slate-850 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs py-2 px-3 rounded-lg cursor-pointer flex gap-1 items-center shrink-0"
                >
                  <MessageCircle size={12} /> Post
                </button>
              </form>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
