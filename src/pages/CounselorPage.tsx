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
  Heart,
  Users,
  MessageSquare,
  Calendar,
  User,
  FileText,
  Phone,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Edit
} from 'lucide-react';

const CounselorPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const counselorStats = [
    {
      title: 'Active Sessions',
      value: '12',
      icon: Heart,
      color: 'text-primary'
    },
    {
      title: 'Pending Requests',
      value: '8',
      icon: MessageSquare,
      color: 'text-warning'
    },
    {
      title: 'Total Contacts',
      value: '156',
      icon: Users,
      color: 'text-success'
    },
    {
      title: 'Today\'s Sessions',
      value: '5',
      icon: Calendar,
      color: 'text-primary'
    }
  ];

  const counselingContacts = [
    {
      id: 'C-001',
      name: 'Sarah Johnson',
      age: 34,
      contact: '+1-555-0123',
      lastSession: '2024-01-15',
      nextSession: '2024-01-22',
      status: 'Active',
      priority: 'High',
      condition: 'PTSD',
      sessionsCount: 8
    },
    {
      id: 'C-002',
      name: 'Michael Chen',
      age: 28,
      contact: '+1-555-0456',
      lastSession: '2024-01-10',
      nextSession: '2024-01-25',
      status: 'Active',
      priority: 'Medium',
      condition: 'Anxiety',
      sessionsCount: 5
    },
    {
      id: 'C-003',
      name: 'Emma Rodriguez',
      age: 42,
      contact: '+1-555-0789',
      lastSession: '2024-01-08',
      nextSession: null,
      status: 'Pending',
      priority: 'High',
      condition: 'Depression',
      sessionsCount: 3
    }
  ];

  const supportRequests = [
    {
      id: 'SR-001',
      requester: 'John Smith',
      type: 'Crisis Intervention',
      urgency: 'Critical',
      description: 'Immediate suicidal thoughts reported',
      submittedAt: '2024-01-15 14:30',
      status: 'In Progress',
      assignedTo: 'Current Counselor'
    },
    {
      id: 'SR-002',
      requester: 'Maria Garcia',
      type: 'General Support',
      urgency: 'Medium',
      description: 'Anxiety and stress management support needed',
      submittedAt: '2024-01-15 11:15',
      status: 'Pending',
      assignedTo: null
    },
    {
      id: 'SR-003',
      requester: 'David Wilson',
      type: 'Follow-up',
      urgency: 'Low',
      description: 'Check-in after recent traumatic event',
      submittedAt: '2024-01-14 16:45',
      status: 'Scheduled',
      assignedTo: 'Current Counselor'
    }
  ];

  const supportLogs = [
    {
      id: 'L-001',
      contactId: 'C-001',
      contactName: 'Sarah Johnson',
      sessionDate: '2024-01-15',
      duration: '50 min',
      type: 'Individual Therapy',
      notes: 'Patient showing improvement in coping mechanisms. Discussed trauma triggers and developed action plan.',
      followUp: 'Continue weekly sessions, assign homework on breathing exercises',
      outcome: 'Positive'
    },
    {
      id: 'L-002',
      contactId: 'C-002',
      contactName: 'Michael Chen',
      sessionDate: '2024-01-10',
      duration: '45 min',
      type: 'Cognitive Behavioral Therapy',
      notes: 'Worked on challenging negative thought patterns. Patient demonstrated good engagement.',
      followUp: 'Practice thought records daily, schedule next session in 2 weeks',
      outcome: 'Positive'
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
      case 'Pending':
        return 'bg-warning text-warning-foreground';
      case 'Scheduled':
        return 'bg-primary text-primary-foreground';
      case 'In Progress':
        return 'bg-info text-info-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const filteredContacts = counselingContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || contact.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="container mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Mental Health Counselor Dashboard</h1>
          <p className="text-muted-foreground">Manage counseling contacts and mental health support requests</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {counselorStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-card-foreground">{stat.value}</p>
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
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="requests">Support Requests</TabsTrigger>
            <TabsTrigger value="logs">Session Logs</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Today's Schedule */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Today's Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-3 bg-success/10 rounded-lg border-l-4 border-success">
                      <div className="text-sm font-medium">09:00 AM</div>
                      <div className="flex-1">
                        <div className="font-medium">Sarah Johnson</div>
                        <div className="text-sm text-muted-foreground">Individual Therapy Session</div>
                      </div>
                      <Badge className="bg-success text-success-foreground">Active</Badge>
                    </div>

                    <div className="flex items-center gap-4 p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
                      <div className="text-sm font-medium">11:00 AM</div>
                      <div className="flex-1">
                        <div className="font-medium">Michael Chen</div>
                        <div className="text-sm text-muted-foreground">CBT Session</div>
                      </div>
                      <Badge className="bg-primary text-primary-foreground">Upcoming</Badge>
                    </div>

                    <div className="flex items-center gap-4 p-3 bg-warning/10 rounded-lg border-l-4 border-warning">
                      <div className="text-sm font-medium">02:00 PM</div>
                      <div className="flex-1">
                        <div className="font-medium">Emma Rodriguez</div>
                        <div className="text-sm text-muted-foreground">Initial Assessment</div>
                      </div>
                      <Badge className="bg-warning text-warning-foreground">Pending</Badge>
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
                  <Button className="w-full h-12 flex-col gap-2">
                    <Plus className="h-5 w-5" />
                    <span className="text-sm">New Contact</span>
                  </Button>
                  <Button variant="outline" className="w-full h-12 flex-col gap-2">
                    <Phone className="h-5 w-5" />
                    <span className="text-sm">Emergency Hotline</span>
                  </Button>
                  <Button variant="outline" className="w-full h-12 flex-col gap-2">
                    <FileText className="h-5 w-5" />
                    <span className="text-sm">Crisis Resources</span>
                  </Button>
                  <Button variant="outline" className="w-full h-12 flex-col gap-2">
                    <Users className="h-5 w-5" />
                    <span className="text-sm">Team Consultation</span>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Session completed with Sarah Johnson</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">New support request from Maria Garcia</p>
                      <p className="text-xs text-muted-foreground">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <User className="h-5 w-5 text-warning" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Follow-up scheduled for Michael Chen</p>
                      <p className="text-xs text-muted-foreground">6 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Counseling Contacts
                </CardTitle>
                <p className="text-sm text-muted-foreground">Manage and track all counseling contacts</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search and Filter */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search contacts by name or condition..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                    <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Contacts List */}
                <div className="space-y-4">
                  {filteredContacts.map((contact) => (
                    <div key={contact.id} className="p-4 border border-border rounded-lg bg-background">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground text-lg">{contact.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>Age: {contact.age}</span>
                            <span>Contact: {contact.contact}</span>
                            <span>Sessions: {contact.sessionsCount}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getPriorityColor(contact.priority)}>
                            {contact.priority}
                          </Badge>
                          <Badge className={getStatusColor(contact.status)}>
                            {contact.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Condition</p>
                          <p className="font-medium">{contact.condition}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Last Session</p>
                          <p className="font-medium">{contact.lastSession}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Next Session</p>
                          <p className="font-medium">{contact.nextSession || 'Not scheduled'}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          View History
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Requests Tab */}
          <TabsContent value="requests">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Mental Health Support Requests
                </CardTitle>
                <p className="text-sm text-muted-foreground">Handle incoming mental health support requests</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportRequests.map((request) => (
                  <div key={request.id} className="p-4 border border-border rounded-lg bg-background">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">{request.requester}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <span>{request.type}</span>
                          <span>•</span>
                          <span>{request.submittedAt}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(request.urgency)}>
                          {request.urgency}
                        </Badge>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{request.description}</p>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Assigned to: <span className="text-foreground font-medium">{request.assignedTo || 'Unassigned'}</span>
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {request.status === 'Pending' && (
                          <Button size="sm" className="bg-primary">
                            Assign to Me
                          </Button>
                        )}
                        {request.status === 'In Progress' && (
                          <Button size="sm" variant="outline">
                            Update Status
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Session Logs Tab */}
          <TabsContent value="logs">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Session Logs & Follow-ups
                </CardTitle>
                <p className="text-sm text-muted-foreground">Track counseling sessions and follow-up actions</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportLogs.map((log) => (
                  <div key={log.id} className="p-4 border border-border rounded-lg bg-background">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">{log.contactName}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>{log.sessionDate}</span>
                          <span>•</span>
                          <span>{log.duration}</span>
                          <span>•</span>
                          <span>{log.type}</span>
                        </div>
                      </div>
                      <Badge className={log.outcome === 'Positive' ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'}>
                        {log.outcome}
                      </Badge>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Session Notes:</p>
                        <p className="text-sm">{log.notes}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Follow-up Actions:</p>
                        <p className="text-sm">{log.followUp}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Log
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        View Full Record
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

export default CounselorPage;
