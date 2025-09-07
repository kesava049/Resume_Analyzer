import { useState } from 'react';
import  History  from '../components/History';
import ResumeAnalyzing from '../components/ResumeAnalyzing';

const App = () => {
  const [activeTab, setActiveTab] = useState('resume-analysis');

  const getTabClass = (tabName) => {
    return `
      px-6 py-3 font-semibold text-gray-800 border-b-4 border-transparent 
      transition-all duration-300 hover:text-blue-600 hover:border-blue-400
      ${activeTab === tabName ? 'text-blue-600 !border-blue-600' : ''}
    `;
  };

  return (
    // We adjust the layout here for a full-page feel
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Resume Analyzer</h1>
        
        {/* The main content container no longer has a max-width */}
        <div className="w-full bg-white rounded-lg shadow-xl p-4 md:p-8">
          <nav className="flex justify-center items-center mb-6 border-b-2 border-gray-200">
            <a
              href="#"
              onClick={() => setActiveTab('resume-analysis')}
              className={getTabClass('resume-analysis')}
            >
              Resume Analysis
            </a>
            <a
              href="#"
              onClick={() => setActiveTab('history')}
              className={getTabClass('history')}
            >
              History
            </a>
          </nav>

          {activeTab === 'resume-analysis' && <ResumeAnalyzing />}
          {activeTab === 'history' && <History />}
        </div>
      </div>
    </div>
  );
};

export default App;