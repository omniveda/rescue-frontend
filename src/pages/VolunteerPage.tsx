import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import VolunteerDashboard from '@/components/volunteer/VolunteerDashboard';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Home } from 'lucide-react';

const VolunteerPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="container mx-auto px-6 py-6">
        <div className="mb-6">
          <Button variant="outline" asChild className="mb-4">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
        <VolunteerDashboard />
      </div>
    </div>
  );
};

export default VolunteerPage;
