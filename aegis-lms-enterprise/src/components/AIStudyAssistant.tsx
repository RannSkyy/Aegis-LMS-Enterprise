/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles, Send, Bot, User, RefreshCw, Layers } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function AIStudyAssistant() {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! I am your **Aegis AI Study Coordinator**. I am powered by **Gemini 3.5 Flash** server-side.\n\nAsk me any questions on:\n- **Advanced database partitions**\n- **Solving state replication delays**\n- **Writing scalable schema rules**\n- **Creating custom multi-role portals**"
    }
  ]);
  const [inputVal, setInputVal] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || loading) return;

    const userText = inputVal;
    setInputVal("");
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.text || "I was unable to formulate a response at this time." }]);
    } catch (err: any) {
      console.error("AI error:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `⚠️ **An error occurred contact system administrators.**\n\nDetails: ${err.message}`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (qn: string) => {
    setInputVal(qn);
  };

  // Bespoke inline markdown/code block parser for professional style
  const parseMarkdown = (text: string) => {
    const lines = text.split("\n");
    let inCodeBlock = false;
    let codeStr = "";

    return lines.map((line, i) => {
      // Toggle Code Blocks
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          inCodeBlock = false;
          const temp = codeStr;
          codeStr = "";
          return (
            <pre key={i} className="bg-slate-950 text-emerald-400 font-mono text-xs p-3.5 rounded-xl border border-slate-800 my-2.5 overflow-x-auto select-all">
              <code>{temp}</code>
            </pre>
          );
        } else {
          inCodeBlock = true;
          return null;
        }
      }

      if (inCodeBlock) {
        codeStr += line + "\n";
        return null;
      }

      // Headers Parser (e.g. ### Header or ## Header)
      if (line.startsWith("### ")) {
        return (
          <h4 key={i} className="text-sm font-bold text-slate-900 dark:text-white mt-3 mb-1 font-sans">
            {line.replace("### ", "")}
          </h4>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h3 key={i} className="text-md font-bold text-indigo-600 dark:text-indigo-400 mt-4 mb-2 font-sans border-b border-slate-100 dark:border-slate-800 pb-1">
            {line.replace("## ", "")}
          </h3>
        );
      }
      if (line.startsWith("# ")) {
        return (
          <h2 key={i} className="text-lg font-extrabold text-indigo-700 dark:text-indigo-300 mt-5 mb-3 font-sans">
            {line.replace("# ", "")}
          </h2>
        );
      }

      // Check bullet items (* item or - item)
      if (line.startsWith("* ") || line.startsWith("- ")) {
        const cleaned = line.replace(/^[\*\-]\s+/, "");
        return (
          <li key={i} className="ml-4 list-disc text-xs text-slate-700 dark:text-slate-300 mb-1 leading-relaxed">
            {parseInlineMarkup(cleaned)}
          </li>
        );
      }

      return (
        <p key={i} className="text-xs text-slate-700 dark:text-slate-300 mb-2 leading-relaxed">
          {parseInlineMarkup(line)}
        </p>
      );
    }).filter(item => item !== null);
  };

  // Decoders for bolding and italics inline **bold**
  const parseInlineMarkup = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-bold text-slate-900 dark:text-white font-sans bg-indigo-50/40 dark:bg-indigo-950/20 px-1 rounded">
            {part.slice(2, -2)}
          </strong>
        );
      }
      // Inline backticks `code`
      const inlineCodeParts = part.split(/(`.*?`)/g);
      return inlineCodeParts.map((subPart, subIdx) => {
        if (subPart.startsWith("`") && subPart.endsWith("`")) {
          return (
            <code key={subIdx} className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-1 py-0.5 rounded font-mono text-[11px] text-pink-600 dark:text-pink-400">
              {subPart.slice(1, -1)}
            </code>
          );
        }
        return subPart;
      });
    });
  };

  return (
    <div id="ai-study-assistant-wrapper" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl flex flex-col h-full overflow-hidden transition-colors duration-200">
      {/* Bot branding Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-indigo-500 to-violet-600 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center animate-pulse">
            <Sparkles size={16} />
          </div>
          <div>
            <h3 className="font-sans font-bold text-sm tracking-tight leading-none mb-1">
              Aegis Study AI Advisor
            </h3>
            <p className="text-[10px] text-indigo-100 font-mono">
              MODEL: GEMINI-3.5-FLASH
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-white/10 px-2 py-1 rounded-full text-[10px] font-semibold border border-white/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Server active</span>
        </div>
      </div>

      {/* Suggest questions */}
      <div className="p-3 bg-slate-50 dark:bg-slate-950/20 border-b border-slate-200/50 dark:border-slate-800">
        <span className="text-[9px] font-mono font-bold tracking-widest block text-slate-500 uppercase mb-2">
          COMPLEX TOPICAL HOTLINKS
        </span>
        <div className="flex flex-wrap gap-1.5">
          {[
            "Explain row-level isolation rules",
            "Explain re-render triggers in React 19",
            "What is Cosine vector similarity?"
          ].map((qn, i) => (
            <button
              key={i}
              onClick={() => handleQuickQuestion(qn)}
              className="text-[10px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 hover:bg-indigo-50/20 p-2 rounded-lg text-slate-600 dark:text-slate-400 transition cursor-pointer text-left line-clamp-1 truncate"
            >
              {qn}
            </button>
          ))}
        </div>
      </div>

      {/* Message listing */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar bg-slate-50/50 dark:bg-slate-950/10 min-h-[300px]">
        {messages.map((msg, i) => {
          const isBot = msg.sender === "bot";
          return (
            <div key={i} className={`flex gap-3 max-w-[85%] ${isBot ? "mr-auto" : "ml-auto flex-row-reverse"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border shrink-0 ${
                isBot 
                  ? "bg-indigo-50 border-indigo-200 dark:bg-indigo-950/50 dark:border-indigo-800 text-indigo-600" 
                  : "bg-slate-100 border-slate-300 dark:bg-slate-800 dark:border-slate-700 text-slate-700"
              }`}>
                {isBot ? <Bot size={14} /> : <User size={14} />}
              </div>
              <div className={`p-3.5 rounded-2xl text-xs space-y-1.5 ${
                isBot 
                  ? "bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-slate-100 shadow-md shadow-slate-100/30" 
                  : "bg-indigo-600 text-white shadow-md shadow-indigo-600/10 rounded-tr-none"
              }`}>
                {isBot ? parseMarkdown(msg.text) : <p className="leading-relaxed">{msg.text}</p>}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 max-w-[80%] mr-auto items-center">
            <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-200 dark:bg-indigo-950/50 dark:border-indigo-800 text-indigo-600 flex items-center justify-center animate-spin">
              <RefreshCw size={13} />
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-xs text-slate-500 animate-pulse">
              Formulating vector response...
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Chat bottom prompt form bar */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-2">
        <input
          id="ai-user-prompt-input"
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Query study patterns or server paradigms here..."
          className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs px-3.5 py-2.5 rounded-xl dark:text-slate-100 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <button
          id="ai-submit-prompt-btn"
          type="submit"
          className="p-2.5 bg-indigo-600 border border-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition flex items-center justify-center shadow-lg shadow-indigo-600/10 cursor-pointer"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
