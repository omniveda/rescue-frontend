import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import {
  Shield,
  FileText,
  AlertTriangle,
  Activity,
  Users,
  Lock,
  Eye,
  Download,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Server,
  Database,
  Globe,
  Key,
  UserCheck,
  ShieldCheck,
  ShieldX
} from 'lucide-react';

const AuditorPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const auditorStats = [
    {
      title: 'Total Audit Logs',
      value: '12,847',
      icon: FileText,
      color: 'text-primary',
      change: '+12% from last week'
    },
    {
      title: 'Security Alerts',
      value: '7',
      icon: AlertTriangle,
      color: 'text-warning',
      change: '3 critical, 4 medium'
    },
    {
      title: 'API Usage',
      value: '94.2%',
      icon: Activity,
      color: 'text-success',
      change: 'Normal activity'
    },
    {
      title: 'Compliance Score',
      value: '98.5%',
      icon: Shield,
      color: 'text-primary',
      change: 'Above threshold'
    }
  ];

  const auditLogs = [
    {
      id: 'AUD-2024-001',
      timestamp: '2024-01-15 14:30:25',
      user: 'admin@rescueconnect.com',
      action: 'User Login',
      resource: 'Authentication System',
      ipAddress: '192.168.1.100',
      status: 'Success',
      severity: 'Low',
      details: 'Successful login from trusted IP'
    },
    {
      id: 'AUD-2024-002',
      timestamp: '2024-01-15 14:25:10',
      user: 'volunteer@rescueconnect.com',
      action: 'Data Access',
      resource: 'Incident Reports',
      ipAddress: '192.168.1.150',
      status: 'Success',
      severity: 'Medium',
      details: 'Accessed incident report #INC-2024-045'
    },
    {
      id: 'AUD-2024-003',
      timestamp: '2024-01-15 14:20:45',
      user: 'unknown@external.com',
      action: 'Failed Login',
      resource: 'Authentication System',
      ipAddress: '203.0.113.45',
      status: 'Failed',
      severity: 'High',
      details: 'Multiple failed login attempts detected'
    },
    {
      id: 'AUD-2024-004',
      timestamp: '2024-01-15 14:15:30',
      user: 'counselor@rescueconnect.com',
      action: 'Data Modification',
      resource: 'Counseling Records',
      ipAddress: '192.168.1.200',
      status: 'Success',
      severity: 'Medium',
      details: 'Updated patient record for Sarah Johnson'
    },
    {
      id: 'AUD-2024-005',
      timestamp: '2024-01-15 14:10:15',
      user: 'system@rescueconnect.com',
      action: 'System Backup',
      resource: 'Database',
      ipAddress: '192.168.1.10',
      status: 'Success',
      severity: 'Low',
      details: 'Automated daily backup completed successfully'
    }
  ];

  const accessRecords = [
    {
      id: 'ACC-2024-001',
      user: 'admin@rescueconnect.com',
      role: 'Administrator',
      resource: 'Admin Panel',
      permission: 'Full Access',
      lastAccess: '2024-01-15 14:30:25',
      status: 'Active',
      compliance: 'Compliant'
    },
    {
      id: 'ACC-2024-002',
      user: 'volunteer@rescueconnect.com',
      role: 'Volunteer',
      resource: 'Incident Reports',
      permission: 'Read/Write',
      lastAccess: '2024-01-15 14:25:10',
      status: 'Active',
      compliance: 'Compliant'
    },
    {
      id: 'ACC-2024-003',
      user: 'counselor@rescueconnect.com',
      role: 'Mental Health Counselor',
      resource: 'Counseling Records',
      permission: 'Read/Write',
      lastAccess: '2024-01-15 14:15:30',
      status: 'Active',
      compliance: 'Compliant'
    },
    {
      id: 'ACC-2024-004',
      user: 'donor@rescueconnect.com',
      role: 'Donor',
      resource: 'Donation Portal',
      permission: 'Read Only',
      lastAccess: '2024-01-15 13:45:20',
      status: 'Active',
      compliance: 'Compliant'
    }
  ];

  const apiUsage = [
    {
      endpoint: '/api/incidents',
      method: 'GET',
      requests: 1247,
      avgResponseTime: '245ms',
      errorRate: '0.1%',
      lastUsed: '2024-01-15 14:35:00',
      status: 'Healthy'
    },
    {
      endpoint: '/api/auth/login',
      method: 'POST',
      requests: 89,
      avgResponseTime: '180ms',
      errorRate: '2.3%',
      lastUsed: '2024-01-15 14:30:25',
      status: 'Warning'
    },
    {
      endpoint: '/api/resources',
      method: 'GET',
      requests: 567,
      avgResponseTime: '320ms',
      errorRate: '0.0%',
      lastUsed: '2024-01-15 14:28:15',
      status: 'Healthy'
    },
    {
      endpoint: '/api/reports/damage',
      method: 'POST',
      requests: 234,
      avgResponseTime: '450ms',
      errorRate: '1.2%',
      lastUsed: '2024-01-15 14:20:30',
      status: 'Healthy'
    }
  ];

  const securityReports = [
    {
      id: 'SEC-2024-001',
      title: 'Weekly Security Summary',
      type: 'Summary',
      severity: 'Medium',
      generatedAt: '2024-01-15 08:00:00',
      findings: 12,
      status: 'Reviewed',
      recommendations: 'Implement additional monitoring for login attempts'
    },
    {
      id: 'SEC-2024-002',
      title: 'API Security Assessment',
      type: 'Assessment',
      severity: 'Low',
      generatedAt: '2024-01-14 16:30:00',
      findings: 3,
      status: 'Pending Review',
      recommendations: 'Update API rate limiting policies'
    },
    {
      id: 'SEC-2024-003',
      title: 'Access Control Audit',
      type: 'Audit',
      severity: 'High',
      generatedAt: '2024-01-13 10:15:00',
      findings: 8,
      status: 'Action Required',
      recommendations: 'Review and update role permissions for volunteer accounts'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-emergency text-emergency-foreground';
      case 'high':
        return 'bg-danger text-danger-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
      case 'healthy':
      case 'active':
      case 'compliant':
        return 'bg-success text-success-foreground';
      case 'failed':
      case 'error':
        return 'bg-danger text-danger-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'pending':
      case 'pending review':
        return 'bg-primary text-primary-foreground';
      case 'action required':
        return 'bg-emergency text-emergency-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
      case 'healthy':
      case 'active':
      case 'compliant':
        return <CheckCircle className="h-4 w-4" />;
      case 'failed':
      case 'error':
        return <XCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || log.severity.toLowerCase() === filterSeverity.toLowerCase();
    const matchesType = filterType === 'all' || log.action.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesSeverity && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="container mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">System Auditor Dashboard</h1>
          <p className="text-muted-foreground">Monitor system logs, audit trails, and security compliance</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {auditorStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-card-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-primary/10`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="audit-logs">Audit Logs</TabsTrigger>
            <TabsTrigger value="access-control">Access Control</TabsTrigger>
            <TabsTrigger value="api-monitoring">API Monitoring</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Health */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    System Health Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span className="font-medium">Authentication System</span>
                      </div>
                      <Badge className="bg-success text-success-foreground">Healthy</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span className="font-medium">Database</span>
                      </div>
                      <Badge className="bg-success text-success-foreground">Healthy</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-warning" />
                        <span className="font-medium">API Gateway</span>
                      </div>
                      <Badge className="bg-warning text-warning-foreground">Warning</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span className="font-medium">File Storage</span>
                      </div>
                      <Badge className="bg-success text-success-foreground">Healthy</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full h-12 flex-col gap-2" onClick={() => setActiveTab('audit-logs')}>
                    <FileText className="h-5 w-5" />
                    <span className="text-sm">View Audit Logs</span>
                  </Button>
                  <Button variant="outline" className="w-full h-12 flex-col gap-2" onClick={() => setActiveTab('access-control')}>
                    <Lock className="h-5 w-5" />
                    <span className="text-sm">Access Control Review</span>
                  </Button>
                  <Button variant="outline" className="w-full h-12 flex-col gap-2" onClick={() => setActiveTab('api-monitoring')}>
                    <Activity className="h-5 w-5" />
                    <span className="text-sm">API Monitoring</span>
                  </Button>
                  <Button variant="outline" className="w-full h-12 flex-col gap-2">
                    <Download className="h-5 w-5" />
                    <span className="text-sm">Generate Report</span>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Security Events */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Recent Security Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-danger/10 rounded-lg">
                    <XCircle className="h-5 w-5 text-danger" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Failed login attempts from external IP</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                    <Badge className="bg-danger text-danger-foreground">Critical</Badge>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Unusual API usage pattern detected</p>
                      <p className="text-xs text-muted-foreground">15 minutes ago</p>
                    </div>
                    <Badge className="bg-warning text-warning-foreground">Medium</Badge>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Security compliance check passed</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                    <Badge className="bg-success text-success-foreground">Low</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Logs Tab */}
          <TabsContent value="audit-logs">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  System Audit Logs
                </CardTitle>
                <p className="text-sm text-muted-foreground">Monitor system logs and audit trails</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search and Filter */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search logs by user, action, or resource..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                    <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  </div>
                  <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severity</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Actions</SelectItem>
                      <SelectItem value="login">Login</SelectItem>
                      <SelectItem value="access">Access</SelectItem>
                      <SelectItem value="modification">Modification</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Logs List */}
                <div className="space-y-4">
                  {filteredLogs.map((log) => (
                    <div key={log.id} className="p-4 border border-border rounded-lg bg-background">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground text-lg">{log.action}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>{log.timestamp}</span>
                            <span>•</span>
                            <span>{log.user}</span>
                            <span>•</span>
                            <span>{log.resource}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getSeverityColor(log.severity)}>
                            {log.severity}
                          </Badge>
                          <Badge className={getStatusColor(log.status)}>
                            {log.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">IP Address</p>
                          <p className="font-medium">{log.ipAddress}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Details</p>
                          <p className="font-medium">{log.details}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Export Log
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Access Control Tab */}
          <TabsContent value="access-control">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Role-Based Access Control
                </CardTitle>
                <p className="text-sm text-muted-foreground">Review role-based access and security compliance</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {accessRecords.map((record) => (
                  <div key={record.id} className="p-4 border border-border rounded-lg bg-background">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">{record.user}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>{record.role}</span>
                          <span>•</span>
                          <span>{record.resource}</span>
                          <span>•</span>
                          <span>Last Access: {record.lastAccess}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                        <Badge className={record.compliance === 'Compliant' ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'}>
                          {record.compliance}
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground">Permissions</p>
                      <p className="font-medium">{record.permission}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <UserCheck className="h-4 w-4 mr-2" />
                        Review Access
                      </Button>
                      <Button size="sm" variant="outline">
                        <ShieldCheck className="h-4 w-4 mr-2" />
                        Audit Trail
                      </Button>
                      {record.compliance !== 'Compliant' && (
                        <Button size="sm" className="bg-warning">
                          <ShieldX className="h-4 w-4 mr-2" />
                          Flag for Review
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Monitoring Tab */}
          <TabsContent value="api-monitoring">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  API Usage & Threat Monitoring
                </CardTitle>
                <p className="text-sm text-muted-foreground">Evaluate API usage and threat reports</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {apiUsage.map((api, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg bg-background">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">{api.endpoint}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>{api.method}</span>
                          <span>•</span>
                          <span>{api.requests} requests</span>
                          <span>•</span>
                          <span>Last Used: {api.lastUsed}</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(api.status)}>
                        {api.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Response Time</p>
                        <p className="font-medium">{api.avgResponseTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Error Rate</p>
                        <p className="font-medium">{api.errorRate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(api.status)}
                          <span className="font-medium">{api.status}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        View Analytics
                      </Button>
                      <Button size="sm" variant="outline">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Threat Analysis
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuditorPage;
