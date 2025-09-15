import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AdminPanel from '@/components/admin/AdminPanel';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Home, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AdminPage = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="container mx-auto px-6 py-6">
        <div className="mb-6 flex justify-between items-center">
          <Button
            variant="outline"
            asChild
            className="mb-4"
          >
            <Link to="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <Button variant="outline" onClick={logout} className="mb-4 flex items-center space-x-2">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
        <AdminPanel />
      </div>
    </div>
  );
};

export default AdminPage;
