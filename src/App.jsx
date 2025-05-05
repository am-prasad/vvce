import './index.css';  // This imports Tailwind styles
import './App.css';     // This imports your custom styles

import React from 'react';

import { Toaster } from "@/components/ui/toaster"; // Check if Toaster and Sonner are different components
import { Toaster as Sonner } from "@/components/ui/sonner"; // Maybe remove if redundant
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";

import AppLayout from "./components/Layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import AmbulancesPage from "./pages/AmbulancesPage";
import TrafficSignalsPage from "./pages/TrafficSignalsPage";
import RouteOptimizationPage from "./pages/RouteOptimizationPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster /> {/* Display toaster notifications */}
      <Sonner /> {/* Display sonner notifications (remove if redundant) */}
      
     

      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ambulances" element={<AmbulancesPage />} />
            <Route path="/traffic-signals" element={<TrafficSignalsPage />} />
            <Route path="/route-optimization" element={<RouteOptimizationPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} /> {/* Handle 404 route */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
