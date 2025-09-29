import React, { useState, useEffect } from 'react';
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
  DollarSign,
  Bell,
  FileText,
  Key,
  ShieldCheck,
  Activity,
  Database,
  Lock,
  Globe
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AdminPanel = () => {
  const { user, token } = useAuth();
  const [activeModule, setActiveModule] = useState('overview');
  const [systemStats, setSystemStats] = useState([
    {
      title: 'Active Users',
      value: '0',
      change: '0',
      trend: 'stable',
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Open Incidents',
      value: '0',
      change: '0',
      trend: 'stable',
      icon: AlertTriangle,
      color: 'text-emergency'
    },
    {
      title: 'Resources Managed',
      value: '0',
      change: '0',
      trend: 'stable',
      icon: Package,
      color: 'text-success'
    },
    {
      title: 'Messages Processed',
      value: '0',
      change: '0',
      trend: 'stable',
      icon: MessageSquare,
      color: 'text-warning'
    }
  ]);
  const [recentIncidents, setRecentIncidents] = useState([]);
  const [userManagement, setUserManagement] = useState([]);
  const [resourceInventory, setResourceInventory] = useState([]);

  useEffect(() => {
    if (user?.role === 'admin' && token) {
      // Fetch stats
      fetch('https://rescue-backend-67i2.onrender.com/api/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setSystemStats([
            {
              title: 'Active Users',
              value: data.totalUsers.toString(),
              change: '0',
              trend: 'stable',
              icon: Users,
              color: 'text-primary'
            },
            {
              title: 'Open Incidents',
              value: data.activeIncidents.toString(),
              change: '0',
              trend: 'stable',
              icon: AlertTriangle,
              color: 'text-emergency'
            },
            {
              title: 'Resources Managed',
              value: data.totalResources.toString(),
              change: '0',
              trend: 'stable',
              icon: Package,
              color: 'text-success'
            },
            {
              title: 'Messages Processed',
              value: '0', // Not available in backend
              change: '0',
              trend: 'stable',
              icon: MessageSquare,
              color: 'text-warning'
            }
          ]);
        })
        .catch(err => console.error('Error fetching stats:', err));

      // Fetch incidents
      fetch('https://rescue-backend-67i2.onrender.com/api/dashboard/incidents', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setRecentIncidents(data.map(incident => ({
            id: incident._id,
            type: incident.type,
            location: incident.location,
            priority: incident.severity,
            status: incident.status,
            assignedTeam: incident.assignedTo ? 'Assigned' : 'Unassigned',
            reportedAt: new Date(incident.createdAt).toLocaleString()
          })));
        })
        .catch(err => console.error('Error fetching incidents:', err));

      // Fetch users
      fetch('https://rescue-backend-67i2.onrender.com/api/dashboard/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setUserManagement(data.map(user => ({
            id: user._id,
            name: user.username,
            email: user.email,
            role: user.role,
            status: 'Active', // Simplified
            lastActive: new Date(user.createdAt).toLocaleString(),
            permissions: [user.role]
          })));
        })
        .catch(err => console.error('Error fetching users:', err));

      // Fetch resources
      fetch('https://rescue-backend-67i2.onrender.com/api/dashboard/resources', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setResourceInventory(data.map(resource => ({
            category: resource.resourceType,
            items: parseInt(resource.quantity) || 1,
            critical: resource.urgency === 'Critical - Life threatening' ? 1 : 0,
            lowStock: resource.urgency === 'High - Within 4 hours' ? 1 : 0,
            status: resource.status === 'pending' ? 'Critical' : resource.status === 'approved' ? 'Good' : 'Adequate'
          })));
        })
        .catch(err => console.error('Error fetching resources:', err));
    }
  }, [user, token]);

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
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-11">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="shelters">Shelters</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Overview Dashboard */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database Status</span>
                    <Badge className="bg-success text-success-foreground">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Response Time</span>
                    <Badge className="bg-success text-success-foreground">45ms</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Server Load</span>
                    <Badge className="bg-warning text-warning-foreground">67%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Backup</span>
                    <Badge className="bg-success text-success-foreground">2 hours ago</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Sessions</span>
                    <span className="font-medium">127</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Failed Login Attempts</span>
                    <span className="font-medium text-warning">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Security Alerts</span>
                    <span className="font-medium text-emergency">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SSL Certificate</span>
                    <Badge className="bg-success text-success-foreground">Valid</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

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
              {recentIncidents.length === 0 ? (
                <div className="text-center py-8">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No incidents found</p>
                  <p className="text-sm text-muted-foreground">Incidents will appear here when reported</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentIncidents.map((incident) => (
                    <div key={incident.id} className="p-4 border border-border rounded-lg bg-background">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-foreground">{incident.type}</h4>
                            <Badge className={getPriorityColor(incident.priority)}>
                              {incident.priority}
                            </Badge>
                            <Badge className={getStatusColor(incident.status)}>
                              {incident.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            <strong>Location:</strong> {incident.location}
                          </p>
                          <p className="text-sm text-muted-foreground mb-1">
                            <strong>Assigned Team:</strong> {incident.assignedTeam}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <strong>Reported:</strong> {incident.reportedAt}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">View Details</Button>
                          <Button size="sm" variant="outline">Assign Team</Button>
                          <Button size="sm" variant="outline">Update Status</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* User & Role Management */}
        <TabsContent value="users">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                User & Role Management
              </CardTitle>
              <p className="text-sm text-muted-foreground">Manage user accounts, roles, and permissions</p>
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

        {/* Alert & Notification Control */}
        <TabsContent value="alerts">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-warning" />
                Alert & Notification Control
              </CardTitle>
              <p className="text-sm text-muted-foreground">Manage system alerts, emergency notifications, and communication channels</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Emergency Alerts</h4>
                      <Badge className="bg-emergency text-emergency-foreground">5 Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Critical incident notifications</p>
                    <Button size="sm" className="mt-2 w-full">Manage Alerts</Button>
                  </CardContent>
                </Card>

                <Card className="border border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">System Notifications</h4>
                      <Badge className="bg-warning text-warning-foreground">12 Pending</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Maintenance and updates</p>
                    <Button size="sm" className="mt-2 w-full">Configure</Button>
                  </CardContent>
                </Card>

                <Card className="border border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">User Communications</h4>
                      <Badge className="bg-success text-success-foreground">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Broadcast messages</p>
                    <Button size="sm" className="mt-2 w-full">Send Message</Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Recent Alerts</h4>
                <div className="space-y-2">
                  <div className="p-3 border border-border rounded-lg bg-background">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Server Maintenance Scheduled</p>
                        <p className="text-sm text-muted-foreground">System will be down for 2 hours tonight</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-warning text-warning-foreground">Scheduled</Badge>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border border-border rounded-lg bg-background">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">High CPU Usage Alert</p>
                        <p className="text-sm text-muted-foreground">Server load exceeded 90%</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-emergency text-emergency-foreground">Critical</Badge>
                        <Button size="sm" variant="outline">Acknowledge</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
              <p className="text-sm text-muted-foreground">Review system performance, user activity, and generate reports</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Performance Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Average Response Time</span>
                      <span className="font-medium">245ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Uptime (30 days)</span>
                      <span className="font-medium text-success">99.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Error Rate</span>
                      <span className="font-medium text-success">0.02%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">User Activity</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Active Users (24h)</span>
                      <span className="font-medium">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">New Registrations</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Reports Submitted</span>
                      <span className="font-medium">156</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button>Generate Full Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Logs & Compliance Monitoring */}
        <TabsContent value="audit">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Audit Logs & Compliance Monitoring
              </CardTitle>
              <p className="text-sm text-muted-foreground">Monitor system activities, security events, and compliance status</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border border-border">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">1,247</div>
                    <p className="text-sm text-muted-foreground">Total Events</p>
                  </CardContent>
                </Card>

                <Card className="border border-border">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-warning mb-1">23</div>
                    <p className="text-sm text-muted-foreground">Security Events</p>
                  </CardContent>
                </Card>

                <Card className="border border-border">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-success mb-1">98.5%</div>
                    <p className="text-sm text-muted-foreground">Compliance Score</p>
                  </CardContent>
                </Card>

                <Card className="border border-border">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-emergency mb-1">3</div>
                    <p className="text-sm text-muted-foreground">Critical Issues</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Recent Audit Events</h4>
                <div className="space-y-2">
                  <div className="p-3 border border-border rounded-lg bg-background">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">User Login</p>
                        <p className="text-sm text-muted-foreground">admin@example.com logged in from 192.168.1.100</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Badge className="bg-success text-success-foreground">Success</Badge>
                        <span className="text-xs text-muted-foreground">2 min ago</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border border-border rounded-lg bg-background">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Failed Login Attempt</p>
                        <p className="text-sm text-muted-foreground">unknown@external.com from 203.0.113.1</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Badge className="bg-emergency text-emergency-foreground">Failed</Badge>
                        <span className="text-xs text-muted-foreground">5 min ago</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border border-border rounded-lg bg-background">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Role Permission Changed</p>
                        <p className="text-sm text-muted-foreground">volunteer role permissions updated by admin</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Badge className="bg-warning text-warning-foreground">Modified</Badge>
                        <span className="text-xs text-muted-foreground">1 hour ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys & Access Management */}
        <TabsContent value="api">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                API Keys & Access Management
              </CardTitle>
              <p className="text-sm text-muted-foreground">Manage API keys, access tokens, and third-party integrations</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Active API Keys</h4>
                <Button>Create New Key</Button>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg bg-background">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h5 className="font-medium">Mobile App API Key</h5>
                      <p className="text-sm text-muted-foreground">rk_live_****************************a1b2</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className="bg-success text-success-foreground">Active</Badge>
                      <Button size="sm" variant="outline">Regenerate</Button>
                      <Button size="sm" variant="outline">Revoke</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Created:</span>
                      <span className="ml-2">Jan 15, 2024</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Used:</span>
                      <span className="ml-2">2 hours ago</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Requests (24h):</span>
                      <span className="ml-2">1,247</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Rate Limit:</span>
                      <span className="ml-2">1000/min</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-border rounded-lg bg-background">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h5 className="font-medium">Partner Integration Key</h5>
                      <p className="text-sm text-muted-foreground">rk_live_****************************c3d4</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className="bg-success text-success-foreground">Active</Badge>
                      <Button size="sm" variant="outline">Regenerate</Button>
                      <Button size="sm" variant="outline">Revoke</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Created:</span>
                      <span className="ml-2">Dec 3, 2023</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Used:</span>
                      <span className="ml-2">1 day ago</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Requests (24h):</span>
                      <span className="ml-2">89</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Rate Limit:</span>
                      <span className="ml-2">500/min</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">API Usage Statistics</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">15,432</div>
                    <p className="text-sm text-muted-foreground">Total Requests (24h)</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">99.8%</div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">42ms</div>
                    <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                System Configuration & Settings
              </CardTitle>
              <p className="text-sm text-muted-foreground">Configure system settings, security policies, and operational parameters</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Security Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Two-Factor Authentication</span>
                      <Badge className="bg-success text-success-foreground">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Session Timeout</span>
                      <span className="text-sm">30 minutes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Password Policy</span>
                      <span className="text-sm">Strong</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">IP Whitelisting</span>
                      <Badge className="bg-warning text-warning-foreground">Partial</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">System Parameters</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Max File Upload Size</span>
                      <span className="text-sm">50MB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">API Rate Limit</span>
                      <span className="text-sm">1000/min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Log Retention</span>
                      <span className="text-sm">90 days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Backup Frequency</span>
                      <span className="text-sm">Daily</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-4">Quick Actions</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Database className="h-6 w-6 mb-2" />
                    <span className="text-sm">Run Backup</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Globe className="h-6 w-6 mb-2" />
                    <span className="text-sm">Update DNS</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Lock className="h-6 w-6 mb-2" />
                    <span className="text-sm">Security Scan</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Activity className="h-6 w-6 mb-2" />
                    <span className="text-sm">System Test</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;