import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  FileText,
  Upload,
  Search,
  Filter,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FileUploadZone from '@/components/FileUploadZone';

const Documents = () => {
  const [showUpload, setShowUpload] = useState(false);

  const documents = [
    {
      id: 1,
      name: "Service Agreement 2024",
      type: "PDF",
      uploadDate: "2024-01-15",
      status: "reviewed",
      riskLevel: "medium",
      size: "2.4 MB"
    },
    {
      id: 2,
      name: "Partnership Contract",
      type: "DOCX",
      uploadDate: "2024-01-14",
      status: "high-risk",
      riskLevel: "high",
      size: "1.8 MB"
    },
    {
      id: 3,
      name: "NDA Template",
      type: "PDF",
      uploadDate: "2024-01-13",
      status: "approved",
      riskLevel: "low",
      size: "856 KB"
    },
    {
      id: 4,
      name: "Employment Agreement",
      type: "DOCX",
      uploadDate: "2024-01-12",
      status: "pending",
      riskLevel: "medium",
      size: "1.2 MB"
    },
    {
      id: 5,
      name: "Office Lease Contract",
      type: "PDF",
      uploadDate: "2024-01-10",
      status: "reviewed",
      riskLevel: "low",
      size: "3.1 MB"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-status-success" />;
      case 'high-risk':
        return <AlertTriangle className="h-4 w-4 text-risk-high" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-legal-gold" />;
      default:
        return <CheckCircle className="h-4 w-4 text-status-success" />;
    }
  };

  const getRiskBadge = (level: string) => {
    const variants = {
      high: 'destructive',
      medium: 'secondary',
      low: 'outline'
    } as const;
    return variants[level as keyof typeof variants] || 'outline';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-legal-text">Document Library</h1>
          <p className="text-legal-text-muted">Manage and analyze your legal documents</p>
        </div>
        <Button 
          onClick={() => setShowUpload(!showUpload)}
          className="bg-legal-gold hover:bg-legal-gold/90 text-legal-navy"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Upload Zone */}
      {showUpload && (
        <Card className="bg-gradient-card border-legal-gray shadow-card">
          <CardContent className="p-6">
            <FileUploadZone />
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card className="bg-gradient-card border-legal-gray shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 flex-1">
              <Search className="h-4 w-4 text-legal-text-muted" />
              <Input
                placeholder="Search documents..."
                className="border-legal-gray bg-legal-gray text-legal-text placeholder:text-legal-text-muted"
              />
            </div>
            <Button variant="outline" className="border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card className="bg-gradient-card border-legal-gray shadow-card">
        <CardHeader>
          <CardTitle className="text-legal-text flex items-center space-x-2">
            <FileText className="h-5 w-5 text-legal-gold" />
            <span>Recent Documents</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-legal-text">Document Name</TableHead>
                <TableHead className="text-legal-text">Type</TableHead>
                <TableHead className="text-legal-text">Upload Date</TableHead>
                <TableHead className="text-legal-text">Status</TableHead>
                <TableHead className="text-legal-text">Risk Level</TableHead>
                <TableHead className="text-legal-text">Size</TableHead>
                <TableHead className="text-legal-text w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id} className="border-legal-gray hover:bg-legal-gray/50">
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-legal-gold" />
                      <span className="text-legal-text font-medium">{doc.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-legal-gold text-legal-gold">
                      {doc.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-legal-text-muted">{doc.uploadDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(doc.status)}
                      <span className="text-legal-text capitalize">{doc.status.replace('-', ' ')}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRiskBadge(doc.riskLevel)}>
                      {doc.riskLevel.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-legal-text-muted">{doc.size}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Document
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Risk Analysis
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-legal-gray shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-legal-text">{documents.length}</div>
            <div className="text-legal-text-muted text-sm">Total Documents</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-legal-gray shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-risk-high">
              {documents.filter(d => d.riskLevel === 'high').length}
            </div>
            <div className="text-legal-text-muted text-sm">High Risk</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-legal-gray shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-legal-gold">
              {documents.filter(d => d.status === 'pending').length}
            </div>
            <div className="text-legal-text-muted text-sm">Pending Review</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-legal-gray shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-status-success">
              {documents.filter(d => d.status === 'approved').length}
            </div>
            <div className="text-legal-text-muted text-sm">Approved</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Documents;