import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const FileUploadZone = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    name: string;
    status: 'analyzing' | 'complete' | 'risk-detected';
    riskLevel?: 'low' | 'medium' | 'high';
  }>>([]);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    files.forEach((file) => {
      // Simulate upload progress
      setIsUploading(true);
      setUploadProgress(0);
      
      const fileName = file.name;
      setUploadedFiles(prev => [...prev, { name: fileName, status: 'analyzing' }]);
      
      // Simulate analysis process
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            
            // Simulate risk assessment result
            const riskLevels = ['low', 'medium', 'high'] as const;
            const randomRisk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
            
            setUploadedFiles(current => 
              current.map(f => 
                f.name === fileName 
                  ? { ...f, status: randomRisk === 'high' ? 'risk-detected' : 'complete', riskLevel: randomRisk }
                  : f
              )
            );
            
            if (randomRisk === 'high') {
              toast({
                title: "Risk Alert!",
                description: `High-risk clauses detected in ${fileName}`,
                variant: "destructive",
              });
            }
            
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    });
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
            <Button className="bg-legal-gold hover:bg-legal-gold/90 text-legal-navy" asChild>
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
              <span className="text-sm text-legal-text">Analyzing document...</span>
              <span className="text-sm text-legal-text">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
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
                  {file.status === 'complete' && (
                    <>
                      <CheckCircle className="h-4 w-4 text-status-success" />
                      <Badge className={`${
                        file.riskLevel === 'low' ? 'bg-risk-low' :
                        file.riskLevel === 'medium' ? 'bg-risk-medium' :
                        'bg-risk-high'
                      } text-white`}>
                        {file.riskLevel?.toUpperCase()} RISK
                      </Badge>
                    </>
                  )}
                  {file.status === 'risk-detected' && (
                    <>
                      <AlertTriangle className="h-4 w-4 text-risk-high" />
                      <Badge variant="destructive">
                        RISK DETECTED
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