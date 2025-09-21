import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Bot, User, FileText, AlertTriangle } from 'lucide-react';

interface ChatMessage {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
  relatedDocument?: string;
  riskLevel?: 'low' | 'medium' | 'high';
}

const ContractChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your Legal AI Assistant. I can help you understand your contracts, identify risks, and answer questions about legal clauses. What would you like to know?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const suggestedQuestions = [
    "Which clauses are risky in my contract?",
    "What happens if I miss a deadline?",
    "Can you explain the termination clause?",
    "What are my liability limits?",
    "How can I negotiate better terms?"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: generateBotResponse(inputMessage),
        timestamp: new Date().toLocaleTimeString(),
        relatedDocument: "Service Agreement.pdf",
        riskLevel: inputMessage.toLowerCase().includes('risk') ? 'high' : 'medium'
      };

      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage('');
  };

  const generateBotResponse = (question: string): string => {
    if (question.toLowerCase().includes('risky') || question.toLowerCase().includes('risk')) {
      return "I've identified 3 high-risk clauses in your Service Agreement: 1) The termination clause allows immediate cancellation without cause, 2) Liability cap is set too low at $1,000, 3) Intellectual property rights are not clearly defined. I recommend reviewing these with a legal professional.";
    }
    if (question.toLowerCase().includes('deadline') || question.toLowerCase().includes('miss')) {
      return "According to your contract, missing deadlines can result in: 1) Late fees of 1.5% per month, 2) Possible contract termination after 30 days, 3) Loss of milestone payments. The contract has a 15-day cure period for most breaches.";
    }
    if (question.toLowerCase().includes('termination')) {
      return "The termination clause in Section 8.2 allows either party to terminate with 30 days written notice. However, there's an 'at-will' provision that's concerning - it allows immediate termination without cause, which puts you at risk. Consider negotiating for a 'for-cause' only termination clause.";
    }
    return "I've analyzed your question and found relevant information in your uploaded contracts. Based on the clauses I've reviewed, I recommend consulting with a legal professional for specific advice tailored to your situation.";
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Chat Interface */}
      <Card className="lg:col-span-2 bg-gradient-card border-legal-gray shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-legal-text">
            <MessageSquare className="h-5 w-5 text-legal-gold" />
            <span>AI Legal Assistant</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Chat Messages */}
          <ScrollArea className="h-96 w-full rounded-md border border-legal-gray p-4 bg-legal-navy">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user' 
                      ? 'bg-legal-gold text-legal-navy' 
                      : 'bg-legal-gray text-legal-text'
                  }`}>
                    <div className="flex items-start space-x-2">
                      {message.type === 'bot' && <Bot className="h-4 w-4 mt-0.5 text-legal-gold" />}
                      {message.type === 'user' && <User className="h-4 w-4 mt-0.5" />}
                      <div className="space-y-2">
                        <p className="text-sm">{message.content}</p>
                        {message.relatedDocument && (
                          <div className="flex items-center space-x-2 mt-2">
                            <FileText className="h-3 w-3" />
                            <span className="text-xs">{message.relatedDocument}</span>
                            {message.riskLevel && (
                              <Badge variant={message.riskLevel === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                                {message.riskLevel.toUpperCase()} RISK
                              </Badge>
                            )}
                          </div>
                        )}
                        <span className="text-xs opacity-70">{message.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about your contracts..."
              className="flex-1 bg-legal-gray border-legal-gray text-legal-text"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button 
              onClick={handleSendMessage}
              className="bg-legal-gold hover:bg-legal-gold/90 text-legal-navy"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sidebar with Suggestions and Quick Actions */}
      <div className="space-y-6">
        {/* Suggested Questions */}
        <Card className="bg-gradient-card border-legal-gray shadow-card">
          <CardHeader>
            <CardTitle className="text-legal-text text-sm">Suggested Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="w-full text-left justify-start h-auto p-3 border-legal-gray text-legal-text hover:bg-legal-gold hover:text-legal-navy text-xs"
                onClick={() => handleSuggestedQuestion(question)}
              >
                {question}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Quick Contract Insights */}
        <Card className="bg-gradient-card border-legal-gray shadow-card">
          <CardHeader>
            <CardTitle className="text-legal-text text-sm">Active Contracts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Service Agreement.pdf", risk: "high", issues: 3 },
              { name: "NDA Template.docx", risk: "low", issues: 0 },
              { name: "Partnership Contract.pdf", risk: "medium", issues: 1 }
            ].map((contract, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded bg-legal-gray">
                <div className="flex items-center space-x-2">
                  <FileText className="h-3 w-3 text-legal-gold" />
                  <span className="text-legal-text text-xs font-medium truncate">{contract.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {contract.issues > 0 && (
                    <AlertTriangle className="h-3 w-3 text-risk-high" />
                  )}
                  <Badge variant={contract.risk === 'high' ? 'destructive' : contract.risk === 'medium' ? 'secondary' : 'outline'} className="text-xs">
                    {contract.risk.toUpperCase()}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-card border-legal-gray shadow-card">
          <CardHeader>
            <CardTitle className="text-legal-text text-sm">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy">
              Generate Summary
            </Button>
            <Button variant="outline" size="sm" className="w-full border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy">
              Risk Report
            </Button>
            <Button variant="outline" size="sm" className="w-full border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy">
              Find Similar Cases
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContractChatbot;