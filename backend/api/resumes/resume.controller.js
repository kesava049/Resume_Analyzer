const fs = require("fs/promises");
const pdf = require("pdf-parse");
const path = require("path");
const { GeminiLLMresponse } = require("../../services/geminiLLM"); 
const { PrismaClient } = require("../../generated/prisma"); 
const prisma = new PrismaClient();


// Handles resume upload, parsing, analysis, and saving.
async function uploadAndAnalyze(req, res) {
  try {
    console.log("--- Upload request received ---");

    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    if (path.extname(req.file.originalname).toLowerCase() !== ".pdf") {
      await fs.unlink(req.file.path);
      return res.status(400).json({ error: "Only PDF files allowed" });
    }

    const dataBuffer = await fs.readFile(req.file.path);
    const parsed = await pdf(dataBuffer);
    const resumeText = parsed.text ?? "";
    console.log("PDF parsed successfully.");

    const llmResponse = await GeminiLLMresponse(resumeText);
    console.log("Gemini response received.");

    const record = await prisma.resume.create({
      data: {
        filename: req.file.originalname,
        rawText: resumeText,
        analysis: llmResponse,
        rating: llmResponse?.aiFeedback?.rating ?? null,
      },
    });
    console.log("Database write successful. Record ID:", record.id);

    await fs.unlink(req.file.path);
    console.log("Local file cleaned up.");

    return res.json({ id: record.id, analysis: llmResponse });
  } catch (err) {
    console.error("AN ERROR OCCURRED", err);
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}


// Fetches all previously analyzed resumes.
async function listAllResumes(req, res) {
  const rows = await prisma.resume.findMany({
    select: { id: true, filename: true, createdAt: true, analysis: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(rows);
}

module.exports = {
  uploadAndAnalyze,
  listAllResumes,
};