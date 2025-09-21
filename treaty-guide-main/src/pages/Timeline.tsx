import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  DollarSign,
  Scale,
  RefreshCw
} from 'lucide-react';

const Timeline = () => {
  const timelineEvents = [
    {
      id: 1,
      date: "2024-01-15",
      title: "Contract Signing",
      description: "Service Agreement executed",
      type: "milestone",
      contract: "Service Agreement.pdf",
      status: "completed"
    },
    {
      id: 2,
      date: "2024-01-18",
      title: "Payment Due",
      description: "Monthly service fee payment ($2,500)",
      type: "payment",
      contract: "Service Agreement.pdf",
      status: "upcoming"
    },
    {
      id: 3,
      date: "2024-01-22",
      title: "Review Period Ends",
      description: "Partnership Agreement review window closes",
      type: "deadline",
      contract: "Partnership Agreement.docx",
      status: "upcoming"
    },
    {
      id: 4,
      date: "2024-01-30",
      title: "Renewal Deadline",
      description: "Office Lease Agreement renewal decision required",
      type: "renewal",
      contract: "Office Lease Agreement.pdf",
      status: "critical"
    },
    {
      id: 5,
      date: "2024-02-15",
      title: "Contract Expiration",
      description: "NDA Template expires unless renewed",
      type: "expiration",
      contract: "NDA Template.pdf",
      status: "upcoming"
    },
    {
      id: 6,
      date: "2024-03-01",
      title: "Performance Review",
      description: "Quarterly performance assessment due",
      type: "review",
      contract: "Service Agreement.pdf",
      status: "upcoming"
    }
  ];

  const scenarioSimulations = [
    {
      title: "Early Termination Analysis",
      description: "What happens if we terminate the service agreement early?",
      impact: "High",
      details: [
        "Termination penalty: $15,000",
        "Notice period: 90 days",
        "Data return obligations",
        "IP reversion clauses apply"
      ]
    },
    {
      title: "Payment Default Scenario",
      description: "Potential consequences of missing payment deadlines",
      impact: "Medium",
      details: [
        "Late fees: 1.5% per month",
        "Service suspension after 30 days",
        "Credit rating impact",
        "Potential contract acceleration"
      ]
    },
    {
      title: "Renewal Optimization",
      description: "Best timing and terms for contract renewals",
      impact: "Low",
      details: [
        "Negotiate 60 days before expiration",
        "Market rate adjustment available",
        "Volume discount eligible",
        "Multi-year option reduces rates by 12%"
      ]
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'milestone': return <CheckCircle className="h-4 w-4" />;
      case 'payment': return <DollarSign className="h-4 w-4" />;
      case 'deadline': return <AlertTriangle className="h-4 w-4" />;
      case 'renewal': return <RefreshCw className="h-4 w-4" />;
      case 'expiration': return <Clock className="h-4 w-4" />;
      case 'review': return <Scale className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-status-success';
      case 'critical': return 'text-risk-high';
      case 'upcoming': return 'text-legal-gold';
      default: return 'text-legal-text-muted';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'critical': return 'destructive';
      case 'upcoming': return 'secondary';
      default: return 'outline';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-risk-high';
      case 'Medium': return 'text-risk-medium';
      case 'Low': return 'text-risk-low';
      default: return 'text-legal-text-muted';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-legal-text">Contract Timeline</h1>
          <p className="text-legal-text-muted">Track obligations, deadlines, and future scenarios</p>
        </div>
        <Button className="bg-legal-gold hover:bg-legal-gold/90 text-legal-navy">
          <Calendar className="h-4 w-4 mr-2" />
          Export Calendar
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline Events */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-card border-legal-gray shadow-card">
            <CardHeader>
              <CardTitle className="text-legal-text">Upcoming Events & Obligations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timelineEvents.map((event, index) => (
                  <div key={event.id} className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div className={`p-2 rounded-full bg-legal-gray ${getStatusColor(event.status)}`}>
                        {getEventIcon(event.type)}
                      </div>
                      {index < timelineEvents.length - 1 && (
                        <div className="w-px h-12 bg-legal-gray mt-2"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-legal-text font-medium">{event.title}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant={getStatusBadge(event.status)} className="text-xs">
                            {event.status.toUpperCase()}
                          </Badge>
                          <span className="text-legal-text-muted text-sm">{event.date}</span>
                        </div>
                      </div>
                      
                      <p className="text-legal-text-muted text-sm mb-2">{event.description}</p>
                      <p className="text-legal-text-muted text-xs">
                        <FileText className="h-3 w-3 inline mr-1" />
                        {event.contract}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <Card className="bg-gradient-card border-legal-gray shadow-card">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-risk-high">2</div>
                <div className="text-legal-text-muted text-sm">Critical Deadlines</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-legal-gray shadow-card">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-legal-gold">5</div>
                <div className="text-legal-text-muted text-sm">This Month</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-legal-gray shadow-card">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-status-success">12</div>
                <div className="text-legal-text-muted text-sm">Completed</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Scenario Simulations */}
      <Card className="bg-gradient-card border-legal-gray shadow-card">
        <CardHeader>
          <CardTitle className="text-legal-text">What-If Scenario Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scenarioSimulations.map((scenario, index) => (
              <div key={index} className="p-4 rounded-lg bg-legal-gray space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="text-legal-text font-medium">{scenario.title}</h4>
                  <Badge 
                    variant={scenario.impact === 'High' ? 'destructive' : scenario.impact === 'Medium' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {scenario.impact} Impact
                  </Badge>
                </div>
                
                <p className="text-legal-text-muted text-sm">{scenario.description}</p>
                
                <div className="space-y-2">
                  <p className="text-legal-text text-xs font-medium">Key Consequences:</p>
                  <ul className="space-y-1">
                    {scenario.details.map((detail, i) => (
                      <li key={i} className="text-legal-text-muted text-xs flex items-start space-x-1">
                        <span>•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy"
                >
                  Run Full Analysis
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Calendar Integration */}
      <Card className="bg-gradient-card border-legal-gray shadow-card">
        <CardHeader>
          <CardTitle className="text-legal-text">Calendar Integration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-legal-text-muted">
            Automatically sync contract deadlines and obligations with your calendar applications.
          </p>
          
          <div className="flex space-x-3">
            <Button className="bg-legal-gold hover:bg-legal-gold/90 text-legal-navy">
              Export to Google Calendar
            </Button>
            <Button variant="outline" className="border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy">
              Export to Outlook
            </Button>
            <Button variant="outline" className="border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy">
              Export to iCal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Timeline;