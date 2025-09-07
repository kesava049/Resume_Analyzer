// Load environment variables from a .env file
require('dotenv').config();

// Corrected: Use require for CommonJS and the correct package name and class
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Corrected: The constructor takes the API key string directly
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// The prompt is well-defined and remains the same.
const RESUME_PROMPT = (resumeText) => `
You are an expert resume analyzer. Analyze the following resume text and extract the requested information.
Also, provide a rating and actionable feedback.

Resume Text:
"""
${resumeText}
"""

Please return a JSON object with the following structure:
{
  "personalDetails": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "linkedinUrl": "string or null",
    "portfolioUrl": "string or null"
  },
  "resumeContent": {
    "summaryObjective": "string",
    "workExperience": [
      {
        "title": "string",
        "company": "string",
        "dates": "string",
        "description": "string"
      }
    ],
    "education": [
      {
        "degree": "string",
        "institution": "string",
        "dates": "string"
      }
    ],
    "projects": [
      {
        "name": "string",
        "description": "string",
        "technologies": "string"
      }
    ],
    "certifications": ["string"]
  },
  "skills": {
    "technicalSkills": ["string"],
    "softSkills": ["string"]
  },
  "aiFeedback": {
    "rating": "number (1-10)",
    "improvementAreas": ["string"],
    "suggestedSkillsToLearn": ["string"]
  }
}
Ensure all array fields are arrays, even if empty. If a field cannot be found, use an appropriate empty value (e.g., "", [], or null).
`;

// This is the single, corrected function for analyzing the resume.
async function GeminiLLMresponse(resumeText) {
    try {
        // Step 1: Get the model instance
        // - Using "gemini-1.5-flash", a valid and fast model.
        // - Enabling JSON mode for reliable, structured output.
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
            },
        });

        // Step 2: Call the model with the prompt
        const result = await model.generateContent(RESUME_PROMPT(resumeText));
        const response = result.response;
        const text = response.text();
        
        // Step 3: Parse the clean JSON response
        // No need for manual string cleaning with JSON mode enabled.
        return JSON.parse(text);

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        throw new Error('Failed to analyze resume with AI.');
    }
}

// Export the function for use in your server file
module.exports = { GeminiLLMresponse };