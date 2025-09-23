import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Search, Settings, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const DashboardHeader = () => {
  const { user } = useAuth();

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-success rounded-lg"></div>
            <h1 className="text-2xl font-bold text-foreground">RescueConnect</h1>
          </div>
          <Badge variant="outline" className="border-success text-success">
            Active Response
          </Badge>
          {user?.role && (
            <Badge variant="secondary" className="ml-2">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Badge>
          )}
        </div>

        {/* Search and Actions */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search incidents, people, resources..."
              className="pl-10 pr-4 py-2 w-80 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                3
              </Badge>
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;