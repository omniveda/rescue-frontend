import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/ui/navbar";
import PrivateRoute from "@/components/PrivateRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import IncidentReportPage from "./pages/IncidentReportPage";
import MissingPersonPage from "./pages/MissingPersonPage";
import DamageReportPage from "./pages/DamageReportPage";
import ResourceRequestPage from "./pages/ResourceRequestPage";
import VolunteerPage from "./pages/VolunteerPage";
import SupportPage from "./pages/SupportPage";
import DonatePage from "./pages/DonatePage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/report"
              element={
                <PrivateRoute>
                  <IncidentReportPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/missing"
              element={
                <PrivateRoute>
                  <MissingPersonPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/damage"
              element={
                <PrivateRoute>
                  <DamageReportPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/resources"
              element={
                <PrivateRoute>
                  <ResourceRequestPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/volunteer"
              element={
                <PrivateRoute>
                  <VolunteerPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/support"
              element={
                <PrivateRoute>
                  <SupportPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/donate"
              element={
                <PrivateRoute>
                  <DonatePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute adminOnly>
                  <AdminPage />
                </PrivateRoute>
              }
            />
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
