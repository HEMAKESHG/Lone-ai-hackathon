import React, { useState } from 'react';
import { useToast } from './components/ui/use-toast';
import { Toaster } from './components/ui/toaster';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Progress } from "./components/ui/progress";
import { Badge } from "./components/ui/badge";
import { Upload, FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const API_KEY = "YOUR_API_KEY";

const App = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { toast } = useToast();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAnalysis(null);
      setError(null);
      setUploadedFiles(prev => [...prev, { name: selectedFile.name, status: 'analyzing' }]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to analyze.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setAnalysis(null);
    setError(null);

    // Simulate upload progress
    setIsUploading(true);
    setUploadProgress(0);
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setIsUploading(false);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Step 1: Submit the file for analysis
      const response = await fetch('http://localhost:3000/analyze', {
        method: 'POST',
        headers: {
          'x-api-key': API_KEY,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to analyze the file.');
      }

      const analysisId = result.analysisId;

      // Step 2: Fetch the analysis results using the ID
      const analysisResponse = await fetch(`http://localhost:3000/analysis/${analysisId}`);
      const analysisData = await analysisResponse.json();

      if (!analysisResponse.ok) {
        throw new Error(analysisData.error || 'Failed to retrieve analysis.');
      }

      setAnalysis(analysisData);
      setUploadedFiles(current =>
        current.map(f =>
          f.name === file.name
            ? {
                ...f,
                status: analysisData.risk?.level === 'High' ? 'risk-detected' : 'complete',
                riskLevel: analysisData.risk?.level.toLowerCase(),
              }
            : f
        )
      );
      
      if (analysisData.risk?.level === 'High') {
        toast({
          title: "High Risk Detected!",
          description: "This document has high-risk clauses.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Analysis Complete",
          description: "The document has been successfully analyzed.",
        });
      }

    } catch (err) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred.');
      toast({
        title: "Analysis Failed",
        description: err.message || 'An unexpected error occurred.',
        variant: "destructive",
      });
      setUploadedFiles(current =>
        current.map(f =>
          f.name === file.name
            ? { ...f, status: 'error' }
            : f
        )
      );
    } finally {
      setLoading(false);
      setIsUploading(false);
      clearInterval(progressInterval);
      setUploadProgress(100);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'analyzing':
        return <Clock className="h-4 w-4 text-legal-gold animate-spin" />;
      case 'complete':
        return <CheckCircle className="h-4 w-4 text-status-success" />;
      case 'risk-detected':
        return <AlertTriangle className="h-4 w-4 text-risk-high" />;
      default:
        return <FileText className="h-4 w-4 text-legal-gold" />;
    }
  };

  const getRiskBadge = (level) => {
    const variants = {
      high: 'destructive',
      medium: 'secondary',
      low: 'outline',
    };
    return variants[level] || 'outline';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center font-sans">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Contract Analyzer</h1>
        <p className="text-center text-gray-600 mb-8">
          Upload a contract file (DOCX, TXT, or Image) to get a risk analysis from LegalAI.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
          <label className="w-full cursor-pointer bg-gray-200 hover:bg-gray-300 transition-colors p-4 rounded-xl text-center text-gray-700">
            <span className="font-medium">{file ? file.name : 'Click to select a file'}</span>
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
          <button
            type="submit"
            className="w-full max-w-sm px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!file || loading}
          >
            {loading ? 'Analyzing...' : 'Analyze Contract'}
          </button>
        </form>

        {error && (
          <div className="mt-8 p-4 bg-red-100 text-red-700 border border-red-200 rounded-xl">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {isUploading && (
          <div className="mt-8 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Analyzing document...</span>
              <span className="text-sm text-gray-700">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}
        
        {uploadedFiles.length > 0 && (
          <div className="mt-8 space-y-3">
            <h4 className="font-medium text-gray-800">Recent Uploads</h4>
            {uploadedFiles.map((uploadedFile, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(uploadedFile.status)}
                  <span className="text-gray-700 text-sm font-medium">{uploadedFile.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {uploadedFile.status === 'analyzing' && (
                    <Badge variant="outline" className="border-legal-gold text-legal-gold">
                      Analyzing
                    </Badge>
                  )}
                  {(uploadedFile.status === 'complete' || uploadedFile.status === 'risk-detected') && (
                    <Badge variant={getRiskBadge(uploadedFile.riskLevel)}>
                      {uploadedFile.riskLevel?.toUpperCase()} RISK
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}


        {analysis && (
          <div className="mt-8 space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Analysis Results</h2>

              {/* Risk Summary */}
              <div className="flex items-center space-x-4 mb-6">
                <span className={`px-4 py-2 rounded-full text-white font-bold ${getRiskColor(analysis.risk?.level)}`}>
                  Risk: {analysis.risk?.level} ({analysis.risk?.score})
                </span>
              </div>
              
              {/* Summary Bullets */}
              {analysis.summary_bullets?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-medium mb-2 text-gray-700">Summary</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {analysis.summary_bullets.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Red Flags */}
              {analysis.red_flags?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-medium mb-2 text-red-600">🚩 Red Flags</h3>
                  <ul className="list-disc list-inside space-y-1 text-red-700">
                    {analysis.red_flags.map((flag, index) => (
                      <li key={index}>{flag}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Negotiation Suggestions */}
              {analysis.negotiation_suggestions?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-medium mb-2 text-green-700">Negotiation Suggestions</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {analysis.negotiation_suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What If Scenario */}
              {analysis.what_if?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-medium mb-2 text-gray-700">What If Scenario</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {analysis.what_if.map((scenario, index) => (
                      <li key={index}>{scenario}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Other sections like key dates, jurisdiction, and lawyer suggestions can be displayed here */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {analysis.key_dates?.length > 0 && (
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-gray-700">Key Dates</h3>
                    <ul className="space-y-1 text-gray-600">
                      {analysis.key_dates.map((item, index) => (
                        <li key={index}>
                          <span className="font-semibold">{item.event}:</span> {item.date}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {analysis.jurisdiction && (
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-gray-700">Jurisdiction</h3>
                    <p className="text-gray-600">{analysis.jurisdiction}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Lawyer Suggestions */}
            {analysis.lawyer_suggestions?.length > 0 && (
              <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                <h3 className="text-xl font-medium mb-4 text-gray-700">Lawyer Suggestions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analysis.lawyer_suggestions.map((lawyer, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800">{lawyer.name}</h4>
                      <p className="text-sm text-gray-600">Location: {lawyer.location}</p>
                      <p className="text-sm text-gray-600">Expertise: {lawyer.expertise}</p>
                      <p className="text-sm text-gray-600">Success Rate: {lawyer.success_rate}</p>
                      <p className="text-sm text-gray-600">Fees: {lawyer.fees}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Snapshot */}
            {analysis.snapshot && (
              <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                <h3 className="text-xl font-medium mb-4 text-gray-700">Snapshot</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{analysis.snapshot.contracts_reviewed}</div>
                    <div className="text-sm text-gray-600">Contracts Reviewed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-500">{analysis.snapshot.high_risk_contracts}</div>
                    <div className="text-sm text-gray-600">High Risk Contracts</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-500">{analysis.snapshot.pending_reviews}</div>
                    <div className="text-sm text-gray-600">Pending Reviews</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{analysis.snapshot.avg_analysis_time}</div>
                    <div className="text-sm text-gray-600">Avg. Analysis Time</div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Charts (Placeholder) */}
            {analysis.charts && (
              <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                <h3 className="text-xl font-medium mb-4 text-gray-700">Charts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium mb-2 text-gray-700">Risk Distribution</h4>
                    <p className="text-sm text-gray-600">Low: {analysis.charts.risk_distribution.low}</p>
                    <p className="text-sm text-gray-600">Medium: {analysis.charts.risk_distribution.medium}</p>
                    <p className="text-sm text-gray-600">High: {analysis.charts.risk_distribution.high}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2 text-gray-700">Risk Trend</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {analysis.charts.risk_trend.map((trend, index) => (
                        <li key={index}>{trend.date}: {trend.score}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default App;
