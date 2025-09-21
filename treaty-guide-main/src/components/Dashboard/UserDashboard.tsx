import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  AlertTriangle,
  Shield,
  Clock,
  Target,
  TrendingUp,
  CheckCircle,
  XCircle,
  Calendar,
  MessageSquare,
  Users
} from 'lucide-react';
import { Line, LineChart, Pie, PieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const UserDashboard = () => {
  const dashboardStats = {
    contractsReviewed: 147,
    highRiskContracts: 12,
    pendingReviews: 5,
    avgAnalysisTime: "2.3 min"
  };

  const riskData = [
    { name: 'Low Risk', value: 65, color: 'hsl(var(--risk-low))' },
    { name: 'Medium Risk', value: 25, color: 'hsl(var(--risk-medium))' },
    { name: 'High Risk', value: 10, color: 'hsl(var(--risk-high))' }
  ];

  const trendData = [
    { month: 'Jan', risk: 68 },
    { month: 'Feb', risk: 72 },
    { month: 'Mar', risk: 65 },
    { month: 'Apr', risk: 58 },
    { month: 'May', risk: 62 },
    { month: 'Jun', risk: 55 }
  ];

  const recentAlerts = [
    { id: 1, type: "high", message: "Unfavorable termination clause detected", contract: "Service Agreement.pdf" },
    { id: 2, type: "medium", message: "Missing liability cap", contract: "Partnership Contract.docx" },
    { id: 3, type: "low", message: "Standard review complete", contract: "NDA Template.pdf" }
  ];

  const upcomingDeadlines = [
    { date: "2024-01-15", event: "Contract renewal deadline", contract: "Office Lease Agreement" },
    { date: "2024-01-20", event: "Payment due", contract: "Service Contract" },
    { date: "2024-01-25", event: "Review period ends", contract: "Partnership Agreement" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-legal-text">Good morning, John!</h1>
          <p className="text-legal-text-muted">Here's what's happening with your contracts today.</p>
        </div>
        <Button className="bg-legal-gold hover:bg-legal-gold/90 text-legal-navy">
          <FileText className="h-4 w-4 mr-2" />
          Upload New Contract
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-legal-gray shadow-card hover:shadow-elevated transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-legal-text-muted text-sm">Contracts Reviewed</p>
                <p className="text-3xl font-bold text-legal-text">{dashboardStats.contractsReviewed}</p>
                <p className="text-status-success text-xs mt-1">+12% from last month</p>
              </div>
              <FileText className="h-8 w-8 text-legal-gold" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-legal-gray shadow-card hover:shadow-elevated transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-legal-text-muted text-sm">High Risk</p>
                <p className="text-3xl font-bold text-risk-high">{dashboardStats.highRiskContracts}</p>
                <p className="text-risk-high text-xs mt-1">-3 from last week</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-risk-high" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-legal-gray shadow-card hover:shadow-elevated transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-legal-text-muted text-sm">Pending Reviews</p>
                <p className="text-3xl font-bold text-legal-gold">{dashboardStats.pendingReviews}</p>
                <p className="text-legal-text-muted text-xs mt-1">2 urgent</p>
              </div>
              <Clock className="h-8 w-8 text-legal-gold" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-legal-gray shadow-card hover:shadow-elevated transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-legal-text-muted text-sm">Avg Analysis Time</p>
                <p className="text-3xl font-bold text-status-success">{dashboardStats.avgAnalysisTime}</p>
                <p className="text-status-success text-xs mt-1">30s faster</p>
              </div>
              <Target className="h-8 w-8 text-status-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Distribution Chart */}
        <Card className="bg-gradient-card border-legal-gray shadow-card">
          <CardHeader>
            <CardTitle className="text-legal-text">Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {riskData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-legal-text text-sm">{item.name}</span>
                  </div>
                  <span className="text-legal-text text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Trend Chart */}
        <Card className="bg-gradient-card border-legal-gray shadow-card">
          <CardHeader>
            <CardTitle className="text-legal-text flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-status-success" />
              <span>Risk Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--legal-gray))" />
                <XAxis dataKey="month" stroke="hsl(var(--legal-text-muted))" />
                <YAxis stroke="hsl(var(--legal-text-muted))" />
                <Tooltip />
                <Line type="monotone" dataKey="risk" stroke="hsl(var(--legal-gold))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-status-success text-sm mt-2">Risk decreased by 13% over 6 months</p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-card border-legal-gray shadow-card">
          <CardHeader>
            <CardTitle className="text-legal-text">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-legal-gold hover:bg-legal-gold/90 text-legal-navy">
              <MessageSquare className="h-4 w-4 mr-2" />
              Ask AI Assistant
            </Button>
            <Button variant="outline" className="w-full justify-start border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy">
              <Shield className="h-4 w-4 mr-2" />
              Run Risk Analysis
            </Button>
            <Button variant="outline" className="w-full justify-start border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy">
              <Users className="h-4 w-4 mr-2" />
              Find Lawyer
            </Button>
            <Button variant="outline" className="w-full justify-start border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy">
              <Calendar className="h-4 w-4 mr-2" />
              View Timeline
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <Card className="bg-gradient-card border-legal-gray shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-legal-text">Recent Alerts</CardTitle>
            <Button variant="ghost" size="sm" className="text-legal-gold">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-legal-gray">
                  {alert.type === 'high' && <XCircle className="h-5 w-5 text-risk-high mt-0.5" />}
                  {alert.type === 'medium' && <AlertTriangle className="h-5 w-5 text-risk-medium mt-0.5" />}
                  {alert.type === 'low' && <CheckCircle className="h-5 w-5 text-risk-low mt-0.5" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-legal-text text-sm font-medium">{alert.message}</p>
                    <p className="text-legal-text-muted text-xs truncate">{alert.contract}</p>
                  </div>
                  <Badge variant={alert.type === 'high' ? 'destructive' : alert.type === 'medium' ? 'secondary' : 'outline'} className="text-xs">
                    {alert.type.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="bg-gradient-card border-legal-gray shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-legal-text">Upcoming Deadlines</CardTitle>
            <Button variant="ghost" size="sm" className="text-legal-gold">View Calendar</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-legal-gray">
                  <Calendar className="h-5 w-5 text-legal-gold mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-legal-text text-sm font-medium">{deadline.event}</p>
                    <p className="text-legal-text-muted text-xs truncate">{deadline.contract}</p>
                  </div>
                  <Badge variant="outline" className="border-legal-gold text-legal-gold text-xs">
                    {deadline.date}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;