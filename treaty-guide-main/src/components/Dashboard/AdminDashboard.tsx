import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  FileText,
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle,
  DollarSign,
  Calendar,
  MessageSquare,
  Shield
} from 'lucide-react';
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const adminStats = {
    totalClients: 234,
    activeConsultations: 18,
    contractsReviewed: 1247,
    monthlyRevenue: "$24,580"
  };

  const clientActivityData = [
    { day: 'Mon', uploads: 12, consultations: 8 },
    { day: 'Tue', uploads: 19, consultations: 12 },
    { day: 'Wed', uploads: 15, consultations: 6 },
    { day: 'Thu', uploads: 22, consultations: 15 },
    { day: 'Fri', uploads: 28, consultations: 18 },
    { day: 'Sat', uploads: 8, consultations: 4 },
    { day: 'Sun', uploads: 5, consultations: 2 }
  ];

  const riskTrendData = [
    { month: 'Jan', high: 45, medium: 78, low: 112 },
    { month: 'Feb', high: 52, medium: 85, low: 98 },
    { month: 'Mar', high: 38, medium: 92, low: 125 },
    { month: 'Apr', high: 41, medium: 88, low: 140 },
    { month: 'May', high: 35, medium: 95, low: 155 },
    { month: 'Jun', high: 29, medium: 102, low: 168 }
  ];

  const highRiskClients = [
    { name: "ABC Corporation", contracts: 8, riskScore: 85, lastReview: "2 days ago" },
    { name: "XYZ Holdings", contracts: 12, riskScore: 78, lastReview: "1 week ago" },
    { name: "Global Industries", contracts: 6, riskScore: 72, lastReview: "3 days ago" }
  ];

  const recentConsultations = [
    { client: "John Smith", type: "Contract Review", status: "scheduled", time: "2:00 PM" },
    { client: "Sarah Johnson", type: "Risk Assessment", status: "in-progress", time: "3:30 PM" },
    { client: "Mike Davis", type: "Legal Advisory", status: "completed", time: "1:00 PM" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-legal-text">Admin Dashboard</h1>
          <p className="text-legal-text-muted">Monitor client activity, risk trends, and consultation management.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy">
            Generate Report
          </Button>
          <Button className="bg-legal-gold hover:bg-legal-gold/90 text-legal-navy">
            Client Overview
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-legal-gray shadow-card hover:shadow-elevated transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-legal-text-muted text-sm">Total Clients</p>
                <p className="text-3xl font-bold text-legal-text">{adminStats.totalClients}</p>
                <p className="text-status-success text-xs mt-1">+18 this month</p>
              </div>
              <Users className="h-8 w-8 text-legal-gold" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-legal-gray shadow-card hover:shadow-elevated transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-legal-text-muted text-sm">Active Consultations</p>
                <p className="text-3xl font-bold text-legal-gold">{adminStats.activeConsultations}</p>
                <p className="text-legal-text-muted text-xs mt-1">6 scheduled today</p>
              </div>
              <MessageSquare className="h-8 w-8 text-legal-gold" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-legal-gray shadow-card hover:shadow-elevated transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-legal-text-muted text-sm">Contracts Reviewed</p>
                <p className="text-3xl font-bold text-legal-text">{adminStats.contractsReviewed}</p>
                <p className="text-status-success text-xs mt-1">+127 this week</p>
              </div>
              <FileText className="h-8 w-8 text-status-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-legal-gray shadow-card hover:shadow-elevated transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-legal-text-muted text-sm">Monthly Revenue</p>
                <p className="text-3xl font-bold text-status-success">{adminStats.monthlyRevenue}</p>
                <p className="text-status-success text-xs mt-1">+12% from last month</p>
              </div>
              <DollarSign className="h-8 w-8 text-status-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Activity Chart */}
        <Card className="bg-gradient-card border-legal-gray shadow-card">
          <CardHeader>
            <CardTitle className="text-legal-text">Weekly Client Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={clientActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--legal-gray))" />
                <XAxis dataKey="day" stroke="hsl(var(--legal-text-muted))" />
                <YAxis stroke="hsl(var(--legal-text-muted))" />
                <Tooltip />
                <Bar dataKey="uploads" fill="hsl(var(--legal-gold))" name="Document Uploads" />
                <Bar dataKey="consultations" fill="hsl(var(--status-success))" name="Consultations" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Trend Analysis */}
        <Card className="bg-gradient-card border-legal-gray shadow-card">
          <CardHeader>
            <CardTitle className="text-legal-text">Risk Distribution Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={riskTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--legal-gray))" />
                <XAxis dataKey="month" stroke="hsl(var(--legal-text-muted))" />
                <YAxis stroke="hsl(var(--legal-text-muted))" />
                <Tooltip />
                <Line type="monotone" dataKey="high" stroke="hsl(var(--risk-high))" strokeWidth={2} name="High Risk" />
                <Line type="monotone" dataKey="medium" stroke="hsl(var(--risk-medium))" strokeWidth={2} name="Medium Risk" />
                <Line type="monotone" dataKey="low" stroke="hsl(var(--status-success))" strokeWidth={2} name="Low Risk" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* High Risk Clients */}
        <Card className="bg-gradient-card border-legal-gray shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-legal-text flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-risk-high" />
              <span>High Risk Clients</span>
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-legal-gold">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {highRiskClients.map((client, index) => (
                <div key={index} className="p-3 rounded-lg bg-legal-gray">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-legal-text font-medium text-sm">{client.name}</p>
                    <Badge variant="destructive" className="text-xs">
                      Risk: {client.riskScore}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-legal-text-muted">
                    <span>{client.contracts} contracts</span>
                    <span>Last review: {client.lastReview}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Consultations */}
        <Card className="bg-gradient-card border-legal-gray shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-legal-text">Today's Consultations</CardTitle>
            <Button variant="ghost" size="sm" className="text-legal-gold">
              <Calendar className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentConsultations.map((consultation, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-legal-gray">
                  <div className="flex-1 min-w-0">
                    <p className="text-legal-text text-sm font-medium">{consultation.client}</p>
                    <p className="text-legal-text-muted text-xs">{consultation.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-legal-text text-xs font-medium">{consultation.time}</p>
                    <Badge 
                      variant={
                        consultation.status === 'completed' ? 'default' : 
                        consultation.status === 'in-progress' ? 'secondary' : 'outline'
                      }
                      className="text-xs"
                    >
                      {consultation.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-card border-legal-gray shadow-card">
          <CardHeader>
            <CardTitle className="text-legal-text">Admin Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-legal-gold hover:bg-legal-gold/90 text-legal-navy">
              <Users className="h-4 w-4 mr-2" />
              Manage Clients
            </Button>
            <Button variant="outline" className="w-full justify-start border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy">
              <Shield className="h-4 w-4 mr-2" />
              Risk Monitoring
            </Button>
            <Button variant="outline" className="w-full justify-start border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy">
              <FileText className="h-4 w-4 mr-2" />
              Review Queue
            </Button>
            <Button variant="outline" className="w-full justify-start border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy">
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;