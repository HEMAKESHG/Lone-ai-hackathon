import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserDashboard from '@/components/Dashboard/UserDashboard';
import AdminDashboard from '@/components/Dashboard/AdminDashboard';

const Dashboard = () => {
  const [userType, setUserType] = useState<'client' | 'admin'>('client');

  return (
    <div className="space-y-6">
      {/* User Type Switcher (for demo purposes) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-legal-text-muted">View as:</span>
          <Button
            variant={userType === 'client' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setUserType('client')}
            className={userType === 'client' ? 'bg-legal-gold text-legal-navy' : 'border-legal-gold text-legal-gold'}
          >
            Client
          </Button>
          <Button
            variant={userType === 'admin' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setUserType('admin')}
            className={userType === 'admin' ? 'bg-legal-gold text-legal-navy' : 'border-legal-gold text-legal-gold'}
          >
            Admin
          </Button>
        </div>
        <Badge variant="outline" className="border-legal-gold text-legal-gold">
          Demo Mode
        </Badge>
      </div>

      {/* Dashboard Content */}
      {userType === 'client' ? <UserDashboard /> : <AdminDashboard />}
    </div>
  );
};

export default Dashboard;