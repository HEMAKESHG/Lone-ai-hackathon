import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  AlertTriangle,
  Shield,
  MessageSquare,
  Calendar,
  Bell,
  MapPin,
  Users,
  Upload,
  BarChart3,
  PieChart,
  TrendingUp,
  Scale,
  Gavel,
  BookOpen,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Target
} from 'lucide-react';
import FileUploadZone from '@/components/FileUploadZone';
import RiskScoring from '@/components/RiskScoring';
import ContractChatbot from '@/components/ContractChatbot';
import LawyerFinder from '@/components/LawyerFinder';
import legalBg from '@/assets/legal-bg.jpg';

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const dashboardStats = {
    contractsReviewed: 147,
    highRiskContracts: 12,
    pendingReviews: 5,
    avgAnalysisTime: "2.3 min"
  };

  const recentAlerts = [
    { id: 1, type: "high", message: "Unfavorable termination clause detected", contract: "Service Agreement.pdf" },
    { id: 2, type: "medium", message: "Missing liability cap", contract: "Partnership Contract.docx" },
    { id: 3, type: "low", message: "Standard review complete", contract: "NDA Template.pdf" }
  ];

  return (
    <div className="min-h-screen bg-legal-navy-light relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${legalBg})` }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-legal-gray bg-legal-navy/95 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Scale className="h-8 w-8 text-legal-gold" />
                <h1 className="text-2xl font-bold text-legal-text">Legal AI</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="border-legal-gold text-legal-gold">
                  Pro Plan
                </Badge>
                <Button variant="outline" size="sm" className="border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy">
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-legal-gray">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="analyze">Analyze</TabsTrigger>
              <TabsTrigger value="chat">AI Assistant</TabsTrigger>
              <TabsTrigger value="lawyers">Find Lawyers</TabsTrigger>
              <TabsTrigger value="alerts">Smart Alerts</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-card border-legal-gray shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-legal-text-muted text-sm">Contracts Reviewed</p>
                        <p className="text-2xl font-bold text-legal-text">{dashboardStats.contractsReviewed}</p>
                      </div>
                      <FileText className="h-8 w-8 text-legal-gold" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-legal-gray shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-legal-text-muted text-sm">High Risk</p>
                        <p className="text-2xl font-bold text-risk-high">{dashboardStats.highRiskContracts}</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-risk-high" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-legal-gray shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-legal-text-muted text-sm">Pending Reviews</p>
                        <p className="text-2xl font-bold text-legal-gold">{dashboardStats.pendingReviews}</p>
                      </div>
                      <Clock className="h-8 w-8 text-legal-gold" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-legal-gray shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-legal-text-muted text-sm">Avg Analysis Time</p>
                        <p className="text-2xl font-bold text-status-success">{dashboardStats.avgAnalysisTime}</p>
                      </div>
                      <Target className="h-8 w-8 text-status-success" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* AI Summary */}
                <Card className="bg-gradient-card border-legal-gray shadow-card hover:shadow-elevated transition-all duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-legal-text">
                      <FileText className="h-5 w-5 text-legal-gold" />
                      <span>AI Summary</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-legal-text-muted text-sm mb-4">
                      Convert complex legal documents into easy-to-understand summaries with key obligations and deadlines highlighted.
                    </p>
                    <Button className="w-full bg-legal-gold hover:bg-legal-gold/90 text-legal-navy font-medium">
                      Summarize Document
                    </Button>
                  </CardContent>
                </Card>

                {/* Risk Scoring */}
                <Card className="bg-gradient-card border-legal-gray shadow-card hover:shadow-elevated transition-all duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-legal-text">
                      <Shield className="h-5 w-5 text-legal-gold" />
                      <span>Risk Scoring</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-legal-text-muted text-sm mb-4">
                      Get instant risk assessment with color-coded charts showing Low, Medium, and High risk levels.
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy"
                      onClick={() => setActiveTab("analyze")}
                    >
                      View Risk Analysis
                    </Button>
                  </CardContent>
                </Card>

                {/* Contract Chatbot */}
                <Card className="bg-gradient-card border-legal-gray shadow-card hover:shadow-elevated transition-all duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-legal-text">
                      <MessageSquare className="h-5 w-5 text-legal-gold" />
                      <span>AI Assistant</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-legal-text-muted text-sm mb-4">
                      Ask questions about your contracts. "Which clauses are risky?" or "What happens if I miss a deadline?"
                    </p>
                    <Button 
                      variant="outline"
                      className="w-full border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy"
                      onClick={() => setActiveTab("chat")}
                    >
                      Start Conversation
                    </Button>
                  </CardContent>
                </Card>

                {/* Lawyer Finder */}
                <Card className="bg-gradient-card border-legal-gray shadow-card hover:shadow-elevated transition-all duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-legal-text">
                      <Users className="h-5 w-5 text-legal-gold" />
                      <span>Lawyer Finder</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-legal-text-muted text-sm mb-4">
                      Find qualified lawyers ranked by location, expertise, success rate, and fees with direct contact options.
                    </p>
                    <Button 
                      variant="outline"
                      className="w-full border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy"
                      onClick={() => setActiveTab("lawyers")}
                    >
                      Find Lawyers
                    </Button>
                  </CardContent>
                </Card>

                {/* Smart Alerts */}
                <Card className="bg-gradient-card border-legal-gray shadow-card hover:shadow-elevated transition-all duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-legal-text">
                      <Bell className="h-5 w-5 text-legal-gold" />
                      <span>Smart Alerts</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-legal-text-muted text-sm mb-4">
                      Automatic deadline tracking and reminders for contract obligations, renewals, and important dates.
                    </p>
                    <Button 
                      variant="outline"
                      className="w-full border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy"
                      onClick={() => setActiveTab("alerts")}
                    >
                      Manage Alerts
                    </Button>
                  </CardContent>
                </Card>

                {/* Jurisdiction Map */}
                <Card className="bg-gradient-card border-legal-gray shadow-card hover:shadow-elevated transition-all duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-legal-text">
                      <MapPin className="h-5 w-5 text-legal-gold" />
                      <span>Jurisdiction Map</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-legal-text-muted text-sm mb-4">
                      Identify applicable laws and regulations based on contract location and jurisdiction requirements.
                    </p>
                    <Button variant="outline" className="w-full border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy">
                      View Jurisdiction
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Alerts */}
              <Card className="bg-gradient-card border-legal-gray shadow-card">
                <CardHeader>
                  <CardTitle className="text-legal-text">Recent Risk Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-center space-x-3 p-3 rounded-lg bg-legal-gray">
                        {alert.type === 'high' && <XCircle className="h-4 w-4 text-risk-high" />}
                        {alert.type === 'medium' && <AlertTriangle className="h-4 w-4 text-risk-medium" />}
                        {alert.type === 'low' && <CheckCircle className="h-4 w-4 text-risk-low" />}
                        <div className="flex-1">
                          <p className="text-legal-text text-sm font-medium">{alert.message}</p>
                          <p className="text-legal-text-muted text-xs">{alert.contract}</p>
                        </div>
                        <Badge variant={alert.type === 'high' ? 'destructive' : alert.type === 'medium' ? 'secondary' : 'outline'}>
                          {alert.type.toUpperCase()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analyze">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FileUploadZone />
                <RiskScoring />
              </div>
            </TabsContent>

            <TabsContent value="chat">
              <ContractChatbot />
            </TabsContent>

            <TabsContent value="lawyers">
              <LawyerFinder />
            </TabsContent>

            <TabsContent value="alerts">
              <Card className="bg-gradient-card border-legal-gray shadow-card">
                <CardHeader>
                  <CardTitle className="text-legal-text">Smart Alert Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-legal-text-muted">
                    Configure automatic alerts and reminders for your contract deadlines and obligations.
                  </p>
                  <Button className="bg-legal-gold hover:bg-legal-gold/90 text-legal-navy">
                    Set Up Alerts
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;