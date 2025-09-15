import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import IncidentReport from '@/components/forms/IncidentReport';
import { Home } from 'lucide-react';

const IncidentReportPage = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6">
        <div className="mb-8 text-center">
          <Button
            variant="outline"
            asChild
            className="mb-4"
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Emergency Incident Report</h1>
        </div>
        <IncidentReport />
      </div>
    </div>
  );
};

export default IncidentReportPage;
