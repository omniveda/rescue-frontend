import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Users, 
  AlertTriangle, 
  Package, 
  MessageSquare,
  BarChart3,
  Settings,
  Home,
  Heart,
  DollarSign
} from 'lucide-react';

const AdminPanel = () => {
  const [activeModule, setActiveModule] = useState('overview');

  const systemStats = [
    {
      title: 'Active Users',
      value: '2,847',
      change: '+156',
      trend: 'up',
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Open Incidents',
      value: '23',
      change: '+5',
      trend: 'up',
      icon: AlertTriangle,
      color: 'text-emergency'
    },
    {
      title: 'Resources Managed',
      value: '1,234',
      change: '+89',
      trend: 'up',
      icon: Package,
      color: 'text-success'
    },
    {
      title: 'Messages Processed',
      value: '5,678',
      change: '+234',
      trend: 'up',
      icon: MessageSquare,
      color: 'text-warning'
    }
  ];

  const recentIncidents = [
    {
      id: 'INC-024',
      type: 'Building Collapse',
      location: 'Industrial District',
      priority: 'Critical',
      status: 'Active',
      assignedTeam: 'Rescue Team Alpha',
      reportedAt: '2 hours ago'
    },
    {
      id: 'INC-023',
      type: 'Flood Warning',
      location: 'Riverside Area',
      priority: 'High',
      status: 'Monitoring',
      assignedTeam: 'Emergency Response Unit 2',
      reportedAt: '4 hours ago'
    },
    {
      id: 'INC-022',
      type: 'Power Outage',
      location: 'Downtown Core',
      priority: 'Medium',
      status: 'Resolved',
      assignedTeam: 'Utility Coordination Team',
      reportedAt: '6 hours ago'
    }
  ];

  const userManagement = [
    {
      id: 'U-001',
      name: 'Sarah Johnson',
      email: 'sarah.j@rescue.gov',
      role: 'Emergency Responder',
      status: 'Active',
      lastActive: '5 min ago',
      permissions: ['Incident Management', 'Resource Allocation']
    },
    {
      id: 'U-002',
      name: 'Mike Rodriguez',
      email: 'mike.r@volunteer.org',
      role: 'Volunteer Coordinator',
      status: 'Active',
      lastActive: '12 min ago',
      permissions: ['Volunteer Management', 'Task Assignment']
    },
    {
      id: 'U-003',
      name: 'Dr. Emily Chen',
      email: 'emily.c@medical.center',
      role: 'Medical Staff',
      status: 'Offline',
      lastActive: '2 hours ago',
      permissions: ['Medical Response', 'Health Records']
    }
  ];

  const resourceInventory = [
    {
      category: 'Medical Supplies',
      items: 145,
      critical: 12,
      lowStock: 23,
      status: 'Adequate'
    },
    {
      category: 'Emergency Food',
      items: 890,
      critical: 45,
      lowStock: 78,
      status: 'Critical'
    },
    {
      category: 'Shelter Materials',
      items: 234,
      critical: 8,
      lowStock: 15,
      status: 'Good'
    },
    {
      category: 'Communication Equipment',
      items: 67,
      critical: 3,
      lowStock: 8,
      status: 'Adequate'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-emergency text-emergency-foreground';
      case 'High':
        return 'bg-warning text-warning-foreground';
      case 'Medium':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-success text-success-foreground';
      case 'Critical':
        return 'bg-emergency text-emergency-foreground';
      case 'Good':
        return 'bg-success text-success-foreground';
      case 'Adequate':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Admin Navigation */}
      <Card className="border-0 shadow-soft">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold">Admin Control Panel</h1>
              </div>
              <Badge variant="outline" className="border-success text-success">
                System Operational
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                System Settings
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {systemStats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-card-foreground">{stat.value}</p>
                  <p className="text-sm text-success">{stat.change} from yesterday</p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Admin Modules */}
      <Tabs defaultValue="incidents" className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="shelters">Shelters</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {/* Incident Management */}
        <TabsContent value="incidents">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-emergency" />
                Incident Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* TODO: Fetch and display incident reports from backend */}
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management */}
        <TabsContent value="users">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                User & Role Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userManagement.map((user) => (
                <div key={user.id} className="p-4 border border-border rounded-lg bg-background">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground">{user.name}</h4>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{user.role}</Badge>
                      <Badge className={user.status === 'Active' ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}>
                        {user.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Active: {user.lastActive}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">Permissions</Button>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {user.permissions.map((permission, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resource Management */}
        <TabsContent value="resources">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-success" />
                Resource & Supply Chain Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resourceInventory.map((resource, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg bg-background">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-foreground">{resource.category}</h4>
                      <Badge className={getStatusColor(resource.status)}>
                        {resource.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Items:</span>
                        <span className="font-medium">{resource.items}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Critical Level:</span>
                        <span className="font-medium text-emergency">{resource.critical}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Low Stock:</span>
                        <span className="font-medium text-warning">{resource.lowStock}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">Restock</Button>
                      <Button size="sm" variant="outline">Allocate</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Additional tabs would be implemented similarly */}
        <TabsContent value="shelters">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5 text-primary" />
                Shelter & Evacuation Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Shelter management interface coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Analytics & Reporting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">System configuration panel coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;