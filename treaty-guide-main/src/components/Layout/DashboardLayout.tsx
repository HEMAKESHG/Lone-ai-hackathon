import { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Shield, 
  MessageSquare, 
  Users, 
  Bell, 
  Search, 
  Settings, 
  User,
  Menu,
  X,
  Scale,
  BarChart3,
  Calendar,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface DashboardLayoutProps {
  userType: 'client' | 'admin';
}

const DashboardLayout = ({ userType }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const clientNavItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/documents', icon: FileText, label: 'Documents' },
    { path: '/risk', icon: Shield, label: 'Risk Assessment' },
    { path: '/chat', icon: MessageSquare, label: 'AI Assistant' },
    { path: '/lawyers', icon: Users, label: 'Find Lawyers' },
    { path: '/alerts', icon: Bell, label: 'Alerts' },
    { path: '/calendar', icon: Calendar, label: 'Timeline' },
  ];

  const adminNavItems = [
    { path: '/admin', icon: Home, label: 'Admin Dashboard' },
    { path: '/admin/clients', icon: Users, label: 'Client Management' },
    { path: '/admin/documents', icon: FileText, label: 'Document Review' },
    { path: '/admin/risk-monitoring', icon: Shield, label: 'Risk Monitoring' },
    { path: '/admin/consultations', icon: MessageSquare, label: 'Consultations' },
    { path: '/admin/knowledge-base', icon: BookOpen, label: 'Knowledge Base' },
    { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  ];

  const navItems = userType === 'admin' ? adminNavItems : clientNavItems;

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-legal-navy-light flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-legal-navy border-r border-legal-gray flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-legal-gray">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-2">
                <Scale className="h-6 w-6 text-legal-gold" />
                <span className="text-legal-text font-bold">Legal AI</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-legal-text hover:bg-legal-gray"
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-legal-gold text-legal-navy font-medium'
                  : 'text-legal-text hover:bg-legal-gray'
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-legal-gray">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start text-legal-text hover:bg-legal-gray">
                <User className="h-5 w-5 mr-3" />
                {sidebarOpen && <span>Profile</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="h-16 bg-legal-navy border-b border-legal-gray flex items-center justify-between px-6">
          <div className="flex items-center space-x-4 flex-1 max-w-md">
            <Search className="h-4 w-4 text-legal-text-muted" />
            <Input
              placeholder="Search contracts, lawyers, or ask AI..."
              className="border-legal-gray bg-legal-gray text-legal-text placeholder:text-legal-text-muted"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-legal-gold text-legal-gold">
              {userType === 'admin' ? 'Admin' : 'Pro Plan'}
            </Badge>
            
            <Button variant="ghost" size="sm" className="text-legal-text hover:bg-legal-gray">
              <Bell className="h-4 w-4" />
            </Button>

            <Button className="bg-legal-gold hover:bg-legal-gold/90 text-legal-navy">
              Upload Document
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;