import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AnalysisReport } from './AnalysisReport';


export default function History() {
  // ... (All the state and useEffect logic remains the same)
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await axios.get('http://localhost:4000/api/resume');
        setHistory(res.data);
      } catch (err) {
        const errorMessage =
          err?.response?.data?.error ||
          err.message ||
          'An unknown error occurred.';
        setError(`Failed to fetch history: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleDetailsClick = (analysis) => {
    setSelectedAnalysis(analysis);
  };

  const closeModal = () => {
    setSelectedAnalysis(null);
  };

  // ... (The loading, error, and empty state returns remain the same)
  if (loading) {
    return (
      <div className="text-center p-10">
        <p className="text-lg font-semibold text-gray-600">Loading history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10">
        <p className="text-lg font-semibold text-red-600">{error}</p>
      </div>
    );
  }
  
  if (history.length === 0) {
    return (
      <div className="text-center p-10">
        <p className="text-lg font-semibold text-gray-500">No analysis history found.</p>
        <p className="text-gray-400">Upload a resume on the 'Resume Analysis' tab to get started.</p>
      </div>
    );
  }


  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
      {/* ... (The table remains the same) */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Analysis History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 uppercase">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 uppercase">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 uppercase">Filename</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 uppercase">Date Analyzed</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {history.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-4">{item.analysis?.personalDetails?.name || 'N/A'}</td>
                <td className="py-3 px-4">{item.analysis?.personalDetails?.email || 'N/A'}</td>
                <td className="py-3 px-4">{item.filename}</td>
                <td className="py-3 px-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDetailsClick(item.analysis)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedAnalysis && (
        <AnalysisDetailModal
          analysis={selectedAnalysis}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

// --- Modal Component (Now much simpler) ---
const AnalysisDetailModal = ({ analysis, closeModal }) => {
  // Add an effect to handle the 'Escape' key for better accessibility
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [closeModal]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-fade-in">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-bold"
        >
          &times;
        </button>
        {/* We just render the reusable report component here! */}
        <AnalysisReport analysis={analysis} />
      </div>
    </div>
  );
};