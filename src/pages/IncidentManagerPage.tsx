import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import {
  AlertTriangle,
  Users,
  CheckCircle,
  Clock,
  Plus,
  Search,
  Filter,
  FileText,
  Eye,
  Download,
  Check,
  XCircle,
  Calendar,
  MapPin,
  Camera,
  Video,
  File,
  UserCheck
} from 'lucide-react';

const IncidentManagerPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const incidentStats = [
    {
      title: 'Active Incidents',
      value: '12',
      icon: AlertTriangle,
      color: 'text-emergency',
      change: '+2 since yesterday'
    },
    {
      title: 'Teams Assigned',
      value: '8',
      icon: Users,
      color: 'text-primary',
      change: 'Stable'
    },
    {
      title: 'Resolved Today',
      value: '5',
      icon: CheckCircle,
      color: 'text-success',
      change: '+1 since yesterday'
    },
    {
      title: 'Avg Response Time',
      value: '18m',
      icon: Clock,
      color: 'text-warning',
      change: '-2m since last week'
    }
  ];

  const incidents = [
    {
      id: 'INC-001',
      title: 'Flood in Downtown',
      status: 'Active',
      priority: 'High',
      assignedVolunteers: 5,
      reportedAt: '2024-01-15 08:30',
      location: 'Downtown City',
      media: ['photo1.jpg', 'video1.mp4'],
      description: 'Severe flooding due to heavy rains affecting multiple blocks.'
    },
    {
      id: 'INC-002',
      title: 'Fire at Warehouse',
      status: 'Resolved',
      priority: 'Critical',
      assignedVolunteers: 8,
      reportedAt: '2024-01-14 14:00',
      location: 'Industrial Area',
      media: ['photo2.jpg'],
      description: 'Fire outbreak contained, no casualties reported.'
    },
    {
      id: 'INC-003',
      title: 'Road Blockage',
      status: 'Pending',
      priority: 'Medium',
      assignedVolunteers: 2,
      reportedAt: '2024-01-15 10:15',
      location: 'Highway 5',
      media: [],
      description: 'Fallen tree blocking the highway, awaiting clearance.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emergency text-emergency-foreground';
      case 'Resolved':
        return 'bg-success text-success-foreground';
      case 'Pending':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-danger text-danger-foreground';
      case 'High':
        return 'bg-emergency text-emergency-foreground';
      case 'Medium':
        return 'bg-warning text-warning-foreground';
      case 'Low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          incident.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || incident.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="container mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Incident Manager Dashboard</h1>
          <p className="text-muted-foreground">Oversee incident management from reporting to closure</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {incidentStats.map((stat, index) => (
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
            <TabsTrigger value="media">Incident Media</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full h-12 flex-col gap-2" onClick={() => setActiveTab('incidents')}>
                  <Plus className="h-5 w-5" />
                  <span className="text-sm">Report New Incident</span>
                </Button>
                <Button variant="outline" className="w-full h-12 flex-col gap-2">
                  <Users className="h-5 w-5" />
                  <span className="text-sm">Assign Volunteers</span>
                </Button>
                <Button variant="outline" className="w-full h-12 flex-col gap-2">
                  <Check className="h-4 w-4" />
                  <span className="text-sm">Verify Responses</span>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Incidents Tab */}
          <TabsContent value="incidents">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Incident List</CardTitle>
                <div className="flex gap-4 mt-2">
                  <Input
                    placeholder="Search incidents by title, location, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredIncidents.map((incident) => (
                  <div key={incident.id} className="p-4 border border-border rounded-lg bg-background">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">{incident.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>{incident.reportedAt}</span>
                          <span>•</span>
                          <span>{incident.location}</span>
                          <span>•</span>
                          <span>{incident.assignedVolunteers} Volunteers</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(incident.priority)}>
                          {incident.priority}
                        </Badge>
                        <Badge className={getStatusColor(incident.status)}>
                          {incident.status}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{incident.description}</p>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Users className="h-4 w-4 mr-2" />
                        Assign Volunteers
                      </Button>
                      <Button size="sm" variant="outline">
                        <Check className="h-4 w-4 mr-2" />
                        Verify Response
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Incident Media Tab */}
          <TabsContent value="media">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Incident Media</CardTitle>
                <p className="text-sm text-muted-foreground">Photos and videos related to incidents</p>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {incidents.flatMap(incident =>
                  incident.media.map((mediaItem, index) => (
                    <div key={`${incident.id}-${index}`} className="border border-border rounded-lg overflow-hidden">
                      {mediaItem.endsWith('.mp4') ? (
                        <video controls className="w-full h-auto">
                          <source src={`/media/${mediaItem}`} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img src={`/media/${mediaItem}`} alt={`Media for ${incident.title}`} className="w-full h-auto" />
                      )}
                      <div className="p-2 bg-background text-sm text-muted-foreground">
                        {incident.title} - {mediaItem}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IncidentManagerPage;
