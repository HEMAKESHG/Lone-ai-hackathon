import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  BarChart3,
  FileText,
  Eye,
  Download
} from 'lucide-react';
import RiskScoring from '@/components/RiskScoring';

const RiskAssessment = () => {
  const riskBreakdown = [
    {
      category: "Termination Clauses",
      score: 85,
      level: "high",
      description: "Unfavorable termination terms detected",
      recommendations: ["Negotiate better termination notice", "Add reciprocal termination rights"]
    },
    {
      category: "Liability Limitations",
      score: 70,
      level: "medium", 
      description: "Limited liability caps may not provide adequate protection",
      recommendations: ["Increase liability caps", "Add mutual indemnification clause"]
    },
    {
      category: "Payment Terms",
      score: 45,
      level: "medium",
      description: "Extended payment terms with limited recourse",
      recommendations: ["Shorten payment terms", "Add late payment penalties"]
    },
    {
      category: "Intellectual Property",
      score: 25,
      level: "low",
      description: "Well-defined IP ownership and protection",
      recommendations: ["Maintain current IP clauses"]
    },
    {
      category: "Confidentiality",
      score: 15,
      level: "low",
      description: "Strong confidentiality provisions in place",
      recommendations: ["No changes needed"]
    }
  ];

  const contractAnalysis = [
    {
      name: "Service Agreement 2024.pdf",
      overallRisk: 68,
      highRiskClauses: 3,
      mediumRiskClauses: 5,
      lowRiskClauses: 12,
      status: "analyzed"
    },
    {
      name: "Partnership Contract.docx", 
      overallRisk: 82,
      highRiskClauses: 5,
      mediumRiskClauses: 4,
      lowRiskClauses: 8,
      status: "needs-review"
    },
    {
      name: "NDA Template.pdf",
      overallRisk: 22,
      highRiskClauses: 0,
      mediumRiskClauses: 2,
      lowRiskClauses: 15,
      status: "approved"
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-risk-high';
      case 'medium': return 'text-risk-medium';
      case 'low': return 'text-risk-low';
      default: return 'text-legal-text-muted';
    }
  };

  const getRiskBadgeVariant = (level: string) => {
    switch (level) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-legal-text">Risk Assessment</h1>
          <p className="text-legal-text-muted">Comprehensive risk analysis of your legal documents</p>
        </div>
        <Button className="bg-legal-gold hover:bg-legal-gold/90 text-legal-navy">
          <FileText className="h-4 w-4 mr-2" />
          Analyze New Document
        </Button>
      </div>

      {/* Overall Risk Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RiskScoring />
        
        {/* Risk Trend Chart */}
        <Card className="bg-gradient-card border-legal-gray shadow-card">
          <CardHeader>
            <CardTitle className="text-legal-text flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-legal-gold" />
              <span>Risk Improvement Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-legal-text text-sm">January 2024</span>
                <span className="text-legal-text text-sm">Risk Score: 78%</span>
              </div>
              <Progress value={78} className="h-2 [&>div]:bg-risk-high" />
              
              <div className="flex items-center justify-between">
                <span className="text-legal-text text-sm">March 2024</span>
                <span className="text-legal-text text-sm">Risk Score: 65%</span>
              </div>
              <Progress value={65} className="h-2 [&>div]:bg-risk-medium" />
              
              <div className="flex items-center justify-between">
                <span className="text-legal-text text-sm">Current</span>
                <span className="text-legal-text text-sm">Risk Score: 52%</span>
              </div>
              <Progress value={52} className="h-2 [&>div]:bg-risk-medium" />
            </div>
            
            <div className="pt-4 border-t border-legal-gray">
              <p className="text-status-success text-sm flex items-center space-x-1">
                <TrendingUp className="h-4 w-4" />
                <span>26% improvement over 3 months</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Risk Breakdown */}
      <Card className="bg-gradient-card border-legal-gray shadow-card">
        <CardHeader>
          <CardTitle className="text-legal-text flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-legal-gold" />
            <span>Detailed Risk Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {riskBreakdown.map((risk, index) => (
              <div key={index} className="p-4 rounded-lg bg-legal-gray space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-legal-text font-medium">{risk.category}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${getRiskColor(risk.level)}`}>
                      {risk.score}%
                    </span>
                    <Badge variant={getRiskBadgeVariant(risk.level)} className="text-xs">
                      {risk.level.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                <Progress 
                  value={risk.score} 
                  className={`h-2 ${
                    risk.level === 'high' ? '[&>div]:bg-risk-high' :
                    risk.level === 'medium' ? '[&>div]:bg-risk-medium' :
                    '[&>div]:bg-risk-low'
                  }`}
                />
                
                <p className="text-legal-text-muted text-sm">{risk.description}</p>
                
                <div className="space-y-1">
                  <p className="text-legal-text text-xs font-medium">Recommendations:</p>
                  <ul className="text-legal-text-muted text-xs space-y-1">
                    {risk.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start space-x-1">
                        <span>•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contract Analysis Results */}
      <Card className="bg-gradient-card border-legal-gray shadow-card">
        <CardHeader>
          <CardTitle className="text-legal-text">Contract Analysis Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contractAnalysis.map((contract, index) => (
              <div key={index} className="p-4 rounded-lg bg-legal-gray">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-legal-gold" />
                    <div>
                      <p className="text-legal-text font-medium">{contract.name}</p>
                      <p className="text-legal-text-muted text-xs">Overall Risk: {contract.overallRisk}%</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={
                        contract.status === 'approved' ? 'default' :
                        contract.status === 'needs-review' ? 'destructive' : 'secondary'
                      }
                      className="text-xs"
                    >
                      {contract.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-legal-gold">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <p className="text-risk-high text-lg font-bold">{contract.highRiskClauses}</p>
                    <p className="text-legal-text-muted text-xs">High Risk</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-risk-medium text-lg font-bold">{contract.mediumRiskClauses}</p>
                    <p className="text-legal-text-muted text-xs">Medium Risk</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-status-success text-lg font-bold">{contract.lowRiskClauses}</p>
                    <p className="text-legal-text-muted text-xs">Low Risk</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          variant="outline" 
          className="h-24 border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy"
        >
          <div className="text-center">
            <Download className="h-6 w-6 mx-auto mb-2" />
            <span>Download Risk Report</span>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-24 border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy"
        >
          <div className="text-center">
            <Shield className="h-6 w-6 mx-auto mb-2" />
            <span>Schedule Review</span>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-24 border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy"
        >
          <div className="text-center">
            <AlertTriangle className="h-6 w-6 mx-auto mb-2" />
            <span>Get Legal Advice</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default RiskAssessment;