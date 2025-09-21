import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/Layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import RiskAssessment from "./pages/RiskAssessment";
import AIChat from "./pages/AIChat";
import LawyersPage from "./pages/LawyersPage";
import Alerts from "./pages/Alerts";
import Timeline from "./pages/Timeline";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout userType="client" />}>
            <Route index element={<Dashboard />} />
            <Route path="documents" element={<Documents />} />
            <Route path="risk" element={<RiskAssessment />} />
            <Route path="chat" element={<AIChat />} />
            <Route path="lawyers" element={<LawyersPage />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="calendar" element={<Timeline />} />
          </Route>
          <Route path="/admin" element={<DashboardLayout userType="admin" />}>
            <Route index element={<Dashboard />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
