
const express = require("express");
const multer = require("multer");
const fs = require("fs/promises");
const pdf = require("pdf-parse");
const cors = require('cors')
const fetch = require("node-fetch");
const path = require("path");
const { GeminiLLMresponse } = require("./src/geminiLLM");
const { PrismaClient } = require("./generated/prisma");

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

// Multer config
const upload = multer({ dest: "uploads/" , limits: { fileSize: 10 * 1024 * 1024 }});

// 1) Upload route
app.post("/api/resume/upload", upload.single("resume"), async (req, res) => {
  try {
    console.log("--- Upload request received ---"); // Checkpoint 1

    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    if (path.extname(req.file.originalname).toLowerCase() !== ".pdf") {
      await fs.unlink(req.file.path);
      return res.status(400).json({ error: "Only PDF files allowed" });
    }

    const dataBuffer = await fs.readFile(req.file.path);
    const parsed = await pdf(dataBuffer);
    const resumeText = parsed.text ?? "";
    console.log("PDF parsed successfully."); // Checkpoint 2

    const llmResponse = await GeminiLLMresponse(resumeText);
    console.log("Gemini response received."); // Checkpoint 3
    
    // Log the actual response to see its structure
    console.log("Gemini Response Structure:", JSON.stringify(llmResponse, null, 2));

    console.log("Attempting to write to database..."); // Checkpoint 4
    const record = await prisma.resume.create({
      data: {
        filename: req.file.originalname,
        rawText: resumeText,
        analysis: llmResponse, // This MUST be a valid JSON object
        rating: llmResponse?.aiFeedback?.rating ?? null,
      },
    });
    console.log("Database write successful. Record ID:", record.id); // Checkpoint 5

    await fs.unlink(req.file.path);
    console.log("Local file cleaned up."); // Checkpoint 6

    return res.json({ id: record.id, analysis: llmResponse });

  } catch (err) {
    // This will now print the detailed error that was causing the 500 status
    console.error("AN ERROR OCCURRED", err); 
    return res.status(500).json({ error: "Server error", details: err.message });
  }
});


// 2) List
app.get("/api/resume", async (req, res) => {
  const rows = await prisma.resume.findMany({
    select: { id: true, filename: true, createdAt: true, analysis: true },
    orderBy: { createdAt: "desc" }
  });
  res.json(rows);
});

app.listen(4000, () => console.log("Server listening on :4000"));





