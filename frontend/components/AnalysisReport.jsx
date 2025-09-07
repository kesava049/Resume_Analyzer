import React from 'react';

// Reusable Section component for consistent styling
const Section = ({ title, children }) => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
      {title}
    </h3>
    {children}
  </div>
);

export const AnalysisReport = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        Analysis Report
      </h2>

      {/* --- RATING --- */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg text-center">
        <h3 className="text-lg font-semibold text-blue-800">Overall Rating</h3>
        <p className="text-4xl font-bold text-blue-600">
          {analysis.aiFeedback?.rating ?? 'N/A'}/10
        </p>
      </div>

      {/* --- PERSONAL & SKILLS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Personal Information
          </h3>
          <div className="text-sm space-y-1">
            <p><strong>Name:</strong> {analysis.personalDetails?.name ?? 'N/A'}</p>
            <p><strong>Email:</strong> {analysis.personalDetails?.email ?? 'N/A'}</p>
            <p><strong>Phone:</strong> {analysis.personalDetails?.phone ?? 'N/A'}</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Skills</h3>
          <div className="bg-gray-100 p-3 rounded-lg text-sm">
            <p className="font-semibold text-gray-600">Technical:</p>
            <p className="text-gray-800 break-words">
              {analysis.skills?.technicalSkills?.join(', ') || 'None listed'}
            </p>
            <p className="font-semibold text-gray-600 mt-2">Soft:</p>
            <p className="text-gray-800 break-words">
              {analysis.skills?.softSkills?.join(', ') || 'None listed'}
            </p>
          </div>
        </div>
      </div>

      {/* --- SUMMARY --- */}
      <Section title="Summary / Objective">
        <p className="text-gray-600 italic bg-gray-50 p-4 rounded-md">
          "{analysis.resumeContent?.summaryObjective ?? 'No summary found.'}"
        </p>
      </Section>
      
      {/* --- AI FEEDBACK --- */}
      <Section title="💡 AI Feedback & Suggestions">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">Areas for Improvement</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-orange-700">
                    {analysis.aiFeedback?.improvementAreas?.length > 0 ? (
                        analysis.aiFeedback.improvementAreas.map((item, i) => <li key={i}>{item}</li>)
                    ) : <li>None</li>}
                </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Suggested Skills to Learn</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                    {analysis.aiFeedback?.suggestedSkillsToLearn?.length > 0 ? (
                        analysis.aiFeedback.suggestedSkillsToLearn.map((item, i) => <li key={i}>{item}</li>)
                    ) : <li>None</li>}
                </ul>
            </div>
        </div>
      </Section>

      {/* --- PROJECTS --- */}
      <Section title="Projects">
        <div className="space-y-4">
          {analysis.resumeContent?.projects?.length > 0 ? (
            analysis.resumeContent.projects.map((proj, index) => (
              <div key={index} className="p-4 border rounded-md bg-gray-50">
                <p className="font-bold text-gray-800">{proj.name}</p>
                <p className="text-sm text-gray-600 my-1">{proj.description}</p>
                <p className="text-xs text-blue-700 font-mono bg-blue-100 p-1 rounded-md">
                  <strong>Tech:</strong> {proj.technologies}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No projects listed.</p>
          )}
        </div>
      </Section>

      {/* --- EXPERIENCE --- */}
      <Section title="Work Experience">
        <div className="space-y-3">
          {analysis.resumeContent?.workExperience?.length > 0 ? (
            analysis.resumeContent.workExperience.map((job, index) => (
              <div key={index} className="p-3 border rounded-md bg-gray-50">
                <p className="font-bold">{job.title} at {job.company}</p>
                <p className="text-sm text-gray-500">{job.dates}</p>
                <p className="text-sm text-gray-600 mt-1">{job.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No work experience listed.</p>
          )}
        </div>
      </Section>

      {/* --- EDUCATION --- */}
      <Section title="Education">
        <div className="space-y-3">
          {analysis.resumeContent?.education?.length > 0 ? (
            analysis.resumeContent.education.map((edu, index) => (
              <div key={index} className="p-3 border rounded-md bg-gray-50">
                <p className="font-bold">{edu.degree}</p>
                <p className="text-sm text-gray-600">{edu.institution}</p>
                <p className="text-sm text-gray-500">{edu.dates}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No education listed.</p>
          )}
        </div>
      </Section>
    </div>
  );
};