import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, CheckCircle, TrendingUp, BarChart3 } from 'lucide-react';

const RiskScoring = () => {
  const riskData = {
    overall: 65,
    categories: [
      { name: 'Termination Clauses', risk: 85, level: 'high' },
      { name: 'Liability Limitations', risk: 70, level: 'medium' },
      { name: 'Payment Terms', risk: 45, level: 'medium' },
      { name: 'Intellectual Property', risk: 25, level: 'low' },
      { name: 'Confidentiality', risk: 15, level: 'low' },
    ]
  };

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
    <Card className="bg-gradient-card border-legal-gray shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-legal-text">
          <Shield className="h-5 w-5 text-legal-gold" />
          <span>Risk Assessment Dashboard</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Risk Score */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-primary shadow-glow">
            <span className="text-2xl font-bold text-legal-navy">{riskData.overall}%</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-legal-text">Overall Risk Level</h3>
            <Badge variant="secondary" className="bg-risk-medium text-white">
              MEDIUM RISK
            </Badge>
          </div>
        </div>

        {/* Risk Categories */}
        <div className="space-y-4">
          <h4 className="font-medium text-legal-text flex items-center space-x-2">
            <BarChart3 className="h-4 w-4 text-legal-gold" />
            <span>Risk Breakdown by Category</span>
          </h4>
          
          {riskData.categories.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-legal-text text-sm font-medium">{category.name}</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${getRiskColor(category.level)}`}>
                    {category.risk}%
                  </span>
                  <Badge variant={getRiskBadgeVariant(category.level)} className="text-xs">
                    {category.level.toUpperCase()}
                  </Badge>
                </div>
              </div>
              <Progress 
                value={category.risk} 
                className={`h-2 ${
                  category.level === 'high' ? '[&>div]:bg-risk-high' :
                  category.level === 'medium' ? '[&>div]:bg-risk-medium' :
                  '[&>div]:bg-risk-low'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Risk Indicators */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-legal-gray">
          <div className="text-center">
            <CheckCircle className="h-6 w-6 text-risk-low mx-auto mb-1" />
            <div className="text-xs text-legal-text-muted">Low Risk</div>
            <div className="text-sm font-medium text-legal-text">2 Areas</div>
          </div>
          <div className="text-center">
            <AlertTriangle className="h-6 w-6 text-risk-medium mx-auto mb-1" />
            <div className="text-xs text-legal-text-muted">Medium Risk</div>
            <div className="text-sm font-medium text-legal-text">2 Areas</div>
          </div>
          <div className="text-center">
            <Shield className="h-6 w-6 text-risk-high mx-auto mb-1" />
            <div className="text-xs text-legal-text-muted">High Risk</div>
            <div className="text-sm font-medium text-legal-text">1 Area</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-3 pt-4">
          <Button className="bg-legal-gold hover:bg-legal-gold/90 text-legal-navy font-medium">
            <TrendingUp className="h-4 w-4 mr-2" />
            View Detailed Analysis
          </Button>
          <Button variant="outline" className="border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy">
            Download Risk Report
          </Button>
        </div>

        {/* Risk Trend */}
        <div className="pt-4 border-t border-legal-gray">
          <h5 className="text-sm font-medium text-legal-text mb-2">Risk Trend (Last 30 days)</h5>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-status-success" />
            <span className="text-status-success text-sm">Risk decreased by 12%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskScoring;