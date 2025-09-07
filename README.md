# Full-Stack AI Resume Analyzer
This is a full-stack web application designed to help users improve their resumes. It allows users to upload a PDF resume, receive a detailed analysis powered by the Google Gemini LLM, and view a history of all past analyses.

## Features
. Live AI-Powered Analysis: Upload a PDF resume and get instant, structured feedback.
. Detailed Data Extraction: Parses and categorizes information into Personal Details, Work Experience, Education, Projects, and Skills.
. Actionable Feedback: Provides a 1-10 rating, highlights specific areas for improvement, and suggests relevant skills to learn.
. Historical Viewer: Browse, search, and view all previously analyzed resumes in a clean, sortable table.
. Reusable UI Components: A modal view in the history tab reuses the analysis report component for a consistent user experience.

## Screenshots
The application interface is clean, intuitive, and user-friendly.
1. Resume Upload & Analysis Tab
2. Analysis Report View
3. History Tab with All Records
4. Details Modal

## Tech Stack
. Frontend: React.js
. Backend: Node.js, Express.js
. Database: PostgreSQL
. ORM: Prisma
. AI / LLM: Google Gemini
. File Handling: Multer (for uploads), pdf-parse (for text extraction)

## Local Setup and Installation
Follow these instructions to get the project running on your local machine.

Prerequisites
. Node.js (v18 or later)
. npm or yarn
. A running PostgreSQL database instance

## 1.Clone the Repository
```bash
git clone https://github.com/kesava049/Resume_Analyzer.git
cd resume-analyzer
```
## 2.Backend Setup
Navigate to the backend directory and follow these steps:
```bash
cd backend
```
## a.Install Dependencies
```bash
npm install
```
## b. Set Up Environment Variables
Create a .env file in the /backend directory. This file is crucial for storing your database connection string and API key.
```bash
# .env

# Your PostgreSQL connection string
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Your Google Gemini API Key
GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
```
## c. Run Database Migrations
Use Prisma to sync your database schema with the model defined in the project.
```bash
npx prisma migrate dev
```
## d. Start the Backend Server
```bash
node server.js
```
The backend server will be running on http://localhost:4000.
## 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and follow these steps:
```bash
cd frontend
```
## a.Install Dependencies
```bash
npm install
```
## b.Start the Frontend Development Server
```bash
npm run dev
```
The frontend application will be accessible at http://localhost:5173.

# Project Structure
The project is organized into separate frontend and backend directories to maintain a clean separation of concerns.
```bash
/resume-analyzer
|
|-- /backend
|   |-- /api                 # Controllers and Routers
|   |-- /prisma              # Database schema and migrations
|   |-- /src                 # Gemini LLM service
|   |-- .env                 # Environment variables (MUST BE CREATED)
|   |-- server.js            # Main Express server file
|   |-- package.json
|
|-- /frontend
|   |-- /src
|   |   |-- /components      # Reusable React components
|   |   |-- App.js
|   |   |-- index.js
|   |-- package.json
|
|-- /sample_data             # Sample PDFs for testing
|-- /screenshots             # UI screenshots
```
## Testing
The /sample_data directory contains several resume PDFs that can be used to test the application's upload and analysis functionality.
