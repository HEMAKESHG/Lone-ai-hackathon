import express from "express";
import multer from "multer";
import mammoth from "mammoth";
import Tesseract from "tesseract.js";
import dotenv from "dotenv";
import fetch from "node-fetch";
import cors from "cors";
import pdf from "pdf-parse"; // <-- Add this import

dotenv.config();

const app = express();
app.use(cors());

const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB
const inMemoryAnalyses = {};

// -------------------- File Text Extraction --------------------
async function extractText(file) {
  if (file.mimetype === "application/pdf") {
    const data = await pdf(file.buffer);
    return data.text;
  } else if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const r = await mammoth.extractRawText({ buffer: file.buffer });
    return r.value;
  } else if (
    file.mimetype === "text/plain" ||
    file.mimetype === "application/msword"
  ) {
    return file.buffer.toString();
  } else if (file.mimetype.startsWith("image/")) {
    const {
      data: { text },
    } = await Tesseract.recognize(file.buffer, "eng");
    return text;
  } else {
    throw new Error("Unsupported file type");
  }
}

// -------------------- Analyze Endpoint --------------------
app.post("/analyze", upload.single("file"), async (req, res) => {
  try {
    if (req.headers["x-api-key"] !== process.env.MY_API_KEY) {
      return res.status(403).json({ error: "Forbidden" });
    }
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const text = await extractText(req.file);

    const prompt = `
You are LegalAI. Analyze the following contract text and respond ONLY with JSON covering these fields:

{
  "summary_bullets": [ "bullet point summary..." ],
  "risk": { "score": 0-100, "level": "Low|Medium|High", "color": "green|yellow|red" },
  "red_flags": [ "list of problematic clauses" ],
  "negotiation_suggestions": [ "safe clause suggestions" ],
  "what_if": [ "explain what happens if signed" ],
  "key_dates": [ { "event": "Renewal", "date": "YYYY-MM-DD" } ],
  "jurisdiction": "applicable laws / regions",
  "lawyer_suggestions": [
    { "name": "string", "location": "string", "expertise": "string", "success_rate": "85%", "fees": "$200/hr" }
  ],
  "snapshot": {
    "contracts_reviewed": 0,
    "high_risk_contracts": 0,
    "pending_reviews": 0,
    "avg_analysis_time": "X sec"
  },
  "charts": {
    "risk_distribution": { "low": 0, "medium": 0, "high": 0 },
    "risk_trend": [ { "date": "YYYY-MM-DD", "score": 50 } ]
  }
}

Contract text:
"""${text}"""
`;

    // Call Gemini API (Google Generative Language API)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 2000,
          },
        }),
      }
    );

    const data = await response.json();

    const rawOutput =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      data?.candidates?.[0]?.output ||
      "{}";

    let analysis;
    try {
      analysis = JSON.parse(rawOutput);
    } catch {
      analysis = { error: "Invalid JSON from Gemini", raw: rawOutput };
    }

    const id = Date.now().toString();
    inMemoryAnalyses[id] = analysis;

    res.json({ analysisId: id, analysis });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Analysis failed", details: err.message });
  }
});

// -------------------- Fetch by ID --------------------
app.get("/analysis/:id", (req, res) => {
  const analysis = inMemoryAnalyses[req.params.id];
  if (!analysis) return res.status(404).json({ error: "Not found" });
  res.json(analysis);
});

// -------------------- Server --------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
