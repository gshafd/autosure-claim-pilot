import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ReportClaim from "./pages/ReportClaim";
import TrackClaim from "./pages/TrackClaim";
import HelpCenter from "./pages/HelpCenter";
import Dashboard from "./pages/Dashboard";
import ClaimDetails from "./pages/ClaimDetails";
import WorkflowVisualization from "./pages/WorkflowVisualization";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/report-claim" element={<ReportClaim />} />
          <Route path="/track-claim" element={<TrackClaim />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/claim/:id" element={<ClaimDetails />} />
          <Route path="/workflow" element={<WorkflowVisualization />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
