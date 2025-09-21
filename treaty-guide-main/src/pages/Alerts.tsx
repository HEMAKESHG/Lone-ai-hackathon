import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Mail,
  MessageSquare,
  Smartphone,
  Settings
} from 'lucide-react';

const Alerts = () => {
  const activeAlerts = [
    {
      id: 1,
      type: "deadline",
      title: "Contract Renewal Due",
      description: "Office Lease Agreement renewal deadline in 15 days",
      dueDate: "2024-01-30",
      priority: "high",
      contract: "Office Lease Agreement.pdf"
    },
    {
      id: 2,
      type: "payment",
      title: "Payment Due Reminder",
      description: "Monthly service fee payment due in 3 days",
      dueDate: "2024-01-18",
      priority: "medium",
      contract: "Service Agreement.pdf"
    },
    {
      id: 3,
      type: "review",
      title: "Contract Review Period Ending",
      description: "Review period for Partnership Agreement ends in 7 days",
      dueDate: "2024-01-22",
      priority: "medium",
      contract: "Partnership Agreement.docx"
    },
    {
      id: 4,
      type: "risk",
      title: "High Risk Clause Detected",
      description: "New contract uploaded contains potentially problematic termination clause",
      dueDate: "2024-01-15",
      priority: "high",
      contract: "New Service Contract.pdf"
    }
  ];

  const notificationSettings = [
    {
      category: "Contract Deadlines",
      email: true,
      push: true,
      sms: false,
      description: "Notifications for contract renewals, expirations, and important deadlines"
    },
    {
      category: "Risk Alerts",
      email: true,
      push: true,
      sms: true,
      description: "Immediate alerts when high-risk clauses or issues are detected"
    },
    {
      category: "Payment Reminders",
      email: true,
      push: false,
      sms: false,
      description: "Reminders for upcoming payments and financial obligations"
    },
    {
      category: "Review Periods",
      email: false,
      push: true,
      sms: false,
      description: "Alerts for contract review periods and negotiation windows"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-risk-high';
      case 'medium': return 'text-risk-medium';
      case 'low': return 'text-risk-low';
      default: return 'text-legal-text-muted';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'deadline': return <Calendar className="h-4 w-4" />;
      case 'payment': return <Clock className="h-4 w-4" />;
      case 'review': return <CheckCircle className="h-4 w-4" />;
      case 'risk': return <AlertTriangle className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-legal-text">Smart Alerts</h1>
          <p className="text-legal-text-muted">Manage your contract deadlines and important notifications</p>
        </div>
        <Button className="bg-legal-gold hover:bg-legal-gold/90 text-legal-navy">
          <Settings className="h-4 w-4 mr-2" />
          Alert Settings
        </Button>
      </div>

      {/* Active Alerts */}
      <Card className="bg-gradient-card border-legal-gray shadow-card">
        <CardHeader>
          <CardTitle className="text-legal-text flex items-center space-x-2">
            <Bell className="h-5 w-5 text-legal-gold" />
            <span>Active Alerts ({activeAlerts.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeAlerts.map((alert) => (
              <div key={alert.id} className="p-4 rounded-lg bg-legal-gray border-l-4 border-legal-gold">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`mt-1 ${getPriorityColor(alert.priority)}`}>
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-legal-text font-medium">{alert.title}</h4>
                      <p className="text-legal-text-muted text-sm mt-1">{alert.description}</p>
                      <p className="text-legal-text-muted text-xs mt-2">
                        Contract: {alert.contract}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getPriorityBadge(alert.priority)} className="text-xs">
                      {alert.priority.toUpperCase()}
                    </Badge>
                    <span className="text-legal-text-muted text-sm">{alert.dueDate}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <Button size="sm" className="bg-legal-gold hover:bg-legal-gold/90 text-legal-navy">
                    View Contract
                  </Button>
                  <Button variant="outline" size="sm" className="border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy">
                    Dismiss
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      <Card className="bg-gradient-card border-legal-gray shadow-card">
        <CardHeader>
          <CardTitle className="text-legal-text flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-legal-gold" />
            <span>Upcoming Deadlines</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
            {/* Mock calendar dates */}
            {Array.from({ length: 31 }, (_, i) => {
              const day = i + 1;
              const hasAlert = [15, 18, 22, 30].includes(day);
              return (
                <div 
                  key={day}
                  className={`p-2 text-center rounded-lg border transition-colors ${
                    hasAlert 
                      ? 'bg-legal-gold text-legal-navy border-legal-gold' 
                      : 'border-legal-gray text-legal-text hover:bg-legal-gray'
                  }`}
                >
                  <div className="text-sm font-medium">{day}</div>
                  {hasAlert && <div className="text-xs mt-1">Alert</div>}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-gradient-card border-legal-gray shadow-card">
        <CardHeader>
          <CardTitle className="text-legal-text">Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {notificationSettings.map((setting, index) => (
              <div key={index} className="p-4 rounded-lg bg-legal-gray">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-legal-text font-medium">{setting.category}</h4>
                    <p className="text-legal-text-muted text-sm mt-1">{setting.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-legal-gold" />
                    <span className="text-legal-text text-sm">Email</span>
                    <Switch checked={setting.email} />
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Bell className="h-4 w-4 text-legal-gold" />
                    <span className="text-legal-text text-sm">Push</span>
                    <Switch checked={setting.push} />
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-4 w-4 text-legal-gold" />
                    <span className="text-legal-text text-sm">SMS</span>
                    <Switch checked={setting.sms} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-legal-gray shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-legal-text">{activeAlerts.length}</div>
            <div className="text-legal-text-muted text-sm">Active Alerts</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-legal-gray shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-risk-high">
              {activeAlerts.filter(a => a.priority === 'high').length}
            </div>
            <div className="text-legal-text-muted text-sm">High Priority</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-legal-gray shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-legal-gold">7</div>
            <div className="text-legal-text-muted text-sm">This Week</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-legal-gray shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-status-success">23</div>
            <div className="text-legal-text-muted text-sm">Resolved</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Alerts;