import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Navigation from '@/components/ui/navigation';
import StatsOverview from '@/components/dashboard/StatsOverview';
import IncidentMap from '@/components/dashboard/IncidentMap';
import IncidentReport from '@/components/forms/IncidentReport';
import MissingPersonReport from '@/components/forms/MissingPersonReport';
import ResourceRequest from '@/components/forms/ResourceRequest';
import DamageReport from '@/components/forms/DamageReport';
import VolunteerDashboard from '@/components/volunteer/VolunteerDashboard';
import MentalHealthSupport from '@/components/support/MentalHealthSupport';
import DonationPortal from '@/components/donation/DonationPortal';
import AdminPanel from '@/components/admin/AdminPanel';
import LoginForm from '@/components/auth/LoginForm';
import { 
  Home, 
  AlertTriangle, 
  BarChart3, 
  Users, 
  Package, 
  Heart,
  DollarSign,
  Shield,
  LogIn
} from 'lucide-react';

const Index = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveView('landing');
  };

  if (activeView === 'login') {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (activeView === 'landing') {
    return (
      <div className="min-h-screen bg-background">
        <Hero />
        <Features />
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8 opacity-90">
              Experience the power of integrated disaster management
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => setActiveView('login')}
                className="h-12 px-8"
              >
                <LogIn className="mr-2 h-5 w-5" />
                Sign In / Register
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setActiveView('report')}
                className="h-12 px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <AlertTriangle className="mr-2 h-5 w-5" />
                Report Emergency
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setActiveView('donate')}
                className="h-12 px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Heart className="mr-2 h-5 w-5" />
                Donate Now
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (activeView === 'dashboard') {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-card border-r border-border p-6">
            <Navigation />
            <div className="mt-8 space-y-2">
              <Button 
                variant="ghost" 
                onClick={() => setActiveView('missing')}
                className="w-full justify-start"
              >
                <Users className="mr-2 h-4 w-4" />
                Missing Persons
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setActiveView('resources')}
                className="w-full justify-start"
              >
                <Package className="mr-2 h-4 w-4" />
                Resource Requests
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setActiveView('volunteer')}
                className="w-full justify-start"
              >
                <Users className="mr-2 h-4 w-4" />
                Volunteer Tasks
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setActiveView('support')}
                className="w-full justify-start"
              >
                <Heart className="mr-2 h-4 w-4" />
                Mental Health
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setActiveView('donate')}
                className="w-full justify-start"
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Donations
              </Button>
              {currentUser?.role === 'admin' && (
                <Button 
                  variant="ghost" 
                  onClick={() => setActiveView('admin')}
                  className="w-full justify-start"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Admin Panel
                </Button>
              )}
              <div className="pt-4 border-t">
                <Button 
                  variant="ghost" 
                  onClick={() => setActiveView('landing')}
                  className="w-full justify-start"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="w-full justify-start text-muted-foreground"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1 p-6">
            {currentUser?.role === 'volunteer' ? (
              <VolunteerDashboard />
            ) : currentUser?.role === 'admin' ? (
              <AdminPanel />
            ) : (
              <>
                <StatsOverview />
                <IncidentMap />
              </>
            )}
          </main>
        </div>
      </div>
    );
  }

  // Report Forms and Other Views
  const commonFormLayout = (component: React.ReactNode, title: string) => (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6">
        <div className="mb-8 text-center">
          <Button 
            variant="outline" 
            onClick={() => currentUser ? setActiveView('dashboard') : setActiveView('landing')}
            className="mb-4"
          >
            <Home className="mr-2 h-4 w-4" />
            {currentUser ? 'Back to Dashboard' : 'Back to Home'}
          </Button>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        </div>
        {component}
      </div>
    </div>
  );

  if (activeView === 'report') {
    return commonFormLayout(<IncidentReport />, 'Emergency Incident Report');
  }

  if (activeView === 'missing') {
    return commonFormLayout(<MissingPersonReport />, 'Report Missing Person');
  }

  if (activeView === 'damage') {
    return commonFormLayout(<DamageReport />, 'Property Damage Report');
  }

  if (activeView === 'resources') {
    return commonFormLayout(<ResourceRequest />, 'Request Resources');
  }

  if (activeView === 'volunteer') {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <div className="container mx-auto px-6 py-6">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setActiveView('dashboard')}
              className="mb-4"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
          <VolunteerDashboard />
        </div>
      </div>
    );
  }

  if (activeView === 'support') {
    return commonFormLayout(<MentalHealthSupport />, 'Mental Health Support');
  }

  if (activeView === 'donate') {
    return commonFormLayout(<DonationPortal />, 'Support Disaster Relief');
  }

  if (activeView === 'admin') {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <div className="container mx-auto px-6 py-6">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setActiveView('dashboard')}
              className="mb-4"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
          <AdminPanel />
        </div>
      </div>
    );
  }

  return null;
};

export default Index;
