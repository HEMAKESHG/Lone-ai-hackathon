import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const API_KEY = "YOUR_API_KEY"; // <-- Replace with your actual API key

const FileUploadZone = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    name: string;
    status: 'analyzing' | 'complete' | 'risk-detected';
    riskLevel?: 'low' | 'medium' | 'high';
  }>>([]);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (files.length === 0) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    // Process each file
    for (const file of files) {
      const fileName = file.name;
      setUploadedFiles(prev => [...prev, { name: fileName, status: 'analyzing' }]);
      setIsUploading(true);

      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const response = await fetch('http://localhost:3000/analyze', {
          method: 'POST',
          headers: {
            'x-api-key': API_KEY,
          },
          body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || `Failed to analyze file: ${fileName}`);
        }

        // Update the file status based on the backend response
        const newAnalysis = result.analysis;
        const riskLevel = newAnalysis?.risk?.level?.toLowerCase() || 'low';
        
        setUploadedFiles(prev => 
          prev.map(f => 
            f.name === fileName 
              ? { 
                  ...f, 
                  status: riskLevel === 'high' ? 'risk-detected' : 'complete', 
                  riskLevel: riskLevel as 'low' | 'medium' | 'high'
                }
              : f
          )
        );

        if (riskLevel === 'high') {
          toast({
            title: "Risk Alert!",
            description: `High-risk clauses detected in ${fileName}`,
            variant: "destructive",
          });
        }

      } catch (err) {
        console.error(err);
        toast({
          title: "Analysis Failed",
          description: `Failed to analyze ${fileName}. Please check the console for details.`,
          variant: "destructive",
        });
        setUploadedFiles(prev => 
          prev.map(f => f.name === fileName ? { ...f, status: 'complete', riskLevel: 'low' } : f)
        );
      }
    }
    setIsUploading(false);
  };

  const supportedFormats = ['PDF', 'DOCX', 'TXT', 'JPG', 'PNG'];

  return (
    <Card className="bg-gradient-card border-legal-gray shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-legal-text">
          <Upload className="h-5 w-5 text-legal-gold" />
          <span>Document Upload & Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Zone */}
        <div className="border-2 border-dashed border-legal-gold/50 rounded-lg p-8 text-center hover:border-legal-gold transition-colors">
          <Upload className="h-12 w-12 text-legal-gold mx-auto mb-4" />
          <h3 className="text-lg font-medium text-legal-text mb-2">
            Drop your legal documents here
          </h3>
          <p className="text-legal-text-muted text-sm mb-4">
            Or click to browse your files
          </p>
          
          <input
            type="file"
            multiple
            accept=".pdf,.docx,.txt,.jpg,.png"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button className="bg-legal-gold hover:bg-legal-gold/90 text-legal-navy" disabled={isUploading} asChild>
              <span className="cursor-pointer">Select Files</span>
            </Button>
          </label>
          
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {supportedFormats.map((format) => (
              <Badge key={format} variant="outline" className="border-legal-gold/50 text-legal-gold">
                {format}
              </Badge>
            ))}
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-legal-text">Analyzing documents...</span>
              <span className="text-sm text-legal-text">
                {uploadedFiles.filter(f => f.status === 'analyzing').length} pending
              </span>
            </div>
            <Progress value={uploadedFiles.filter(f => f.status === 'analyzing').length > 0 ? 50 : 100} className="h-2" />
          </div>
        )}

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-legal-text">Recent Uploads</h4>
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-legal-gray rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4 text-legal-gold" />
                  <span className="text-legal-text text-sm font-medium">{file.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {file.status === 'analyzing' && (
                    <>
                      <Clock className="h-4 w-4 text-legal-gold animate-spin" />
                      <Badge variant="outline" className="border-legal-gold text-legal-gold">
                        Analyzing
                      </Badge>
                    </>
                  )}
                  {file.status !== 'analyzing' && (
                    <>
                      {file.riskLevel === 'high' ? (
                        <AlertTriangle className="h-4 w-4 text-risk-high" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-status-success" />
                      )}
                      <Badge className={`${
                        file.riskLevel === 'low' ? 'bg-risk-low' :
                        file.riskLevel === 'medium' ? 'bg-risk-medium' :
                        'bg-risk-high'
                      } text-white`}>
                        {file.riskLevel?.toUpperCase()} RISK
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy">
            View Summary
          </Button>
          <Button variant="outline" className="border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy">
            Risk Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUploadZone;
