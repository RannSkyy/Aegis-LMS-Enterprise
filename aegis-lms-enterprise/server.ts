/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for the AI Study Assistant
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message content cannot be blank." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
        // Return structured graceful message informing how to setup API secret safely
        return res.json({
          text: `⚠️ **Gemini API integration requires configurations.**

To activate real-time LLM feedback:
1. Open the **Secrets / Settings** panel in Google AI Studio.
2. Bind \`GEMINI_API_KEY\` to your active Gemini credentials key.
3. Reload or trigger this study loop again!

*Currently simulating study assistance with local heuristics:*

**Your Question:** "${message}"

**Study Insight:** The key to mastering enterprise engineering starts with disciplined data separations, state isolation mechanics, and robust schema validation patterns. Remember to test your container instances with realistic bandwidth throttle loops, and utilize clean modular files in React rather than single large files to circumvent context size limits.`
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: message,
        config: {
          systemInstruction: `You are the Aegis Enterprise Study Advisor, a world-class AI learning coach integrated into the Aegis Learning Management System (LMS). Provide highly instructional, structured, and insightful feedback. 
Use markdown tables, ordered points, bullet systems, and syntax-highlighted code blocks where appropriate. Focus on explaining core principles clearly. Highlight how they apply to practical engineering or enterprise tasks.`,
        }
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error("AI Advisor generation failure:", err);
      res.status(500).json({ error: "Failed to fetch response: " + err.message });
    }
  });

  // System health diagnostic endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", service: "Aegis LMS Core Engine", time: new Date() });
  });

  // Vite connection layers
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Aegis LMS Core] Web Server active at http://0.0.0.0:${PORT}`);
  });
}

startServer();
