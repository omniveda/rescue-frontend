import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Users,
  Clock,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Phone,
  MessageSquare,
  User,
  FileText,
  Camera,
  Home,
  Send,
  Upload,
  Edit,
  Plus
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const VolunteerDashboard = () => {
  const { user, token } = useAuth();
  const [volunteerTasks, setVolunteerTasks] = useState([]);
  const [volunteerStats, setVolunteerStats] = useState([
    {
      title: 'Active Tasks',
      value: '0',
      icon: Clock,
      color: 'text-warning'
    },
    {
      title: 'Completed Today',
      value: '0',
      icon: CheckCircle,
      color: 'text-success'
    },
    {
      title: 'Hours Contributed',
      value: '0',
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Team Members',
      value: '0',
      icon: Users,
      color: 'text-primary'
    }
  ]);
  const [profileData, setProfileData] = useState({
    fullName: '',
    phone: '',
    email: '',
    skills: [],
    availability: '',
    emergencyContact: ''
  });
  const [shelterData, setShelterData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    if (user?.role === 'volunteer' && token) {
      fetchData();
    }
  }, [user, token]);

  const fetchData = async () => {
    try {
      const [tasksRes, statsRes, profileRes, shelterRes, messagesRes, incidentsRes] = await Promise.all([
        fetch('https://rescue-backend-67i2.onrender.com/api/volunteer/tasks', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('https://rescue-backend-67i2.onrender.com/api/volunteer/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('https://rescue-backend-67i2.onrender.com/api/volunteer/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('https://rescue-backend-67i2.onrender.com/api/volunteer/shelter', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('https://rescue-backend-67i2.onrender.com/api/volunteer/messages', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('https://rescue-backend-67i2.onrender.com/api/dashboard/incidents', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      const tasks = await tasksRes.json();
      const stats = await statsRes.json();
      const profile = await profileRes.json();
      const shelter = await shelterRes.json();
      const msgs = await messagesRes.json();
      const incidents = await incidentsRes.json();
      console.log('Fetched incidents:', incidents);

      setVolunteerTasks(tasks);
      setVolunteerStats([
        {
          title: 'Active Tasks',
          value: stats.activeTasks.toString(),
          icon: Clock,
          color: 'text-warning'
        },
        {
          title: 'Completed Today',
          value: stats.completedToday.toString(),
          icon: CheckCircle,
          color: 'text-success'
        },
        {
          title: 'Hours Contributed',
          value: stats.hoursContributed.toString(),
          icon: Users,
          color: 'text-primary'
        },
        {
          title: 'Team Members',
          value: stats.teamMembers.toString(),
          icon: Users,
          color: 'text-primary'
        }
      ]);
      setProfileData({
        fullName: profile.username || '',
        phone: profile.phone || '',
        email: profile.email || '',
        skills: profile.skills || [],
        availability: profile.availability || '',
        emergencyContact: profile.emergencyContact || ''
      });
      setShelterData(shelter);
      setMessages(msgs);
      setIncidents(incidents);
    } catch (err) {
      console.error('Error fetching volunteer data:', err);
    } finally {
      setLoading(false);
    }
  };



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
      case 'In Progress':
        return 'bg-success text-success-foreground';
      case 'Assigned':
        return 'bg-primary text-primary-foreground';
      case 'Pending':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const [activeTab, setActiveTab] = useState('overview');
  const [incidentReport, setIncidentReport] = useState({
    type: '',
    location: '',
    description: '',
    severity: '',
    mediaFiles: []
  });

  return (
    <div className="space-y-6">
      {/* Volunteer Header */}
      <Card className="border-0 shadow-soft">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold">Volunteer Dashboard</h1>
              </div>
              <Badge variant="outline" className="border-success text-success">
                Active Volunteer
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <CheckCircle className="h-4 w-4 mr-2" />
                Check In
              </Button>
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Emergency
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="incidents">Report Incident</TabsTrigger>
          <TabsTrigger value="shelter">Shelter</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {volunteerStats.map((stat, index) => (
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

      {/* Quick Actions */}
      <Card className="border-0 shadow-soft">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-16 flex-col gap-2">
              <CheckCircle className="h-5 w-5" />
              Check In
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <MessageSquare className="h-5 w-5" />
              Team Chat
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Phone className="h-5 w-5" />
              Emergency Contact
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <MapPin className="h-5 w-5" />
              Navigation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Incidents Section */}
      <Card className="border-0 shadow-soft">
        <CardHeader>
          <CardTitle>Recent Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          {incidents.length === 0 ? (
            <p className="text-muted-foreground">No recent incidents.</p>
          ) : (
            incidents.map((incident) => (
              <div key={incident._id} className="p-4 border border-border rounded-lg bg-background mb-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-foreground">{incident.type}</h4>
                    <p className="text-sm text-muted-foreground">{incident.location}</p>
                  </div>
                  <Badge className={getPriorityColor(incident.severity)}>
                    {incident.severity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{incident.assignedTo ? incident.assignedTo.length : 0} responders</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    <span>{incident.affected || 0} affected</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

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
                  <div className="text-sm font-medium">09:00 AM - 01:00 PM</div>
                  <div className="flex-1">
                    <div className="font-medium">Search & Rescue Support</div>
                    <div className="text-sm text-muted-foreground">Downtown District - Sector 3</div>
                  </div>
                  <Badge className="bg-success text-success-foreground">Active</Badge>
                </div>

                <div className="flex items-center gap-4 p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
                  <div className="text-sm font-medium">02:00 PM - 05:00 PM</div>
                  <div className="flex-1">
                    <div className="font-medium">Supply Distribution</div>
                    <div className="text-sm text-muted-foreground">Community Center - West Side</div>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">Upcoming</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Volunteer Profile
              </CardTitle>
              <p className="text-sm text-muted-foreground">Manage your volunteer information and skills</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="availability">Availability</Label>
                    <Select value={profileData.availability} onValueChange={(value) => setProfileData({...profileData, availability: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full Time">Full Time</SelectItem>
                        <SelectItem value="Part Time">Part Time</SelectItem>
                        <SelectItem value="Weekends Only">Weekends Only</SelectItem>
                        <SelectItem value="On Call">On Call</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      value={profileData.emergencyContact}
                      onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Skills & Certifications</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profileData.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">{skill}</Badge>
                      ))}
                      <Button size="sm" variant="outline">
                        <Plus className="h-3 w-3 mr-1" />
                        Add Skill
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Profile</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Task Management
              </CardTitle>
              <p className="text-sm text-muted-foreground">Accept, execute, and track your assigned tasks</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {volunteerTasks.map((task) => (
                <div key={task.id} className="p-4 border border-border rounded-lg bg-background">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground text-lg">{task.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" />
                        <span>{task.location}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Start: {task.startTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Duration: {task.estimatedDuration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>Team Size: {task.teamSize}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Team Lead: <span className="text-foreground font-medium">{task.teamLead}</span>
                      </p>
                      <div className="flex gap-1 mt-2">
                        {task.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {task.status === 'Assigned' && (
                        <Button size="sm" className="bg-primary">
                          Accept Task
                        </Button>
                      )}
                      {task.status === 'In Progress' && (
                        <Button size="sm" variant="outline">
                          Update Status
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        Contact Team
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Incident Reporting Tab */}
        <TabsContent value="incidents">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-emergency" />
                Report Incident
              </CardTitle>
              <p className="text-sm text-muted-foreground">Report incidents and upload supporting media</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="incidentType">Incident Type</Label>
                    <Select value={incidentReport.type} onValueChange={(value) => setIncidentReport({...incidentReport, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select incident type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medical">Medical Emergency</SelectItem>
                        <SelectItem value="fire">Fire</SelectItem>
                        <SelectItem value="accident">Traffic Accident</SelectItem>
                        <SelectItem value="structural">Structural Damage</SelectItem>
                        <SelectItem value="environmental">Environmental Hazard</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Enter incident location"
                      value={incidentReport.location}
                      onChange={(e) => setIncidentReport({...incidentReport, location: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="severity">Severity Level</Label>
                    <Select value={incidentReport.severity} onValueChange={(value) => setIncidentReport({...incidentReport, severity: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the incident in detail..."
                      rows={4}
                      value={incidentReport.description}
                      onChange={(e) => setIncidentReport({...incidentReport, description: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label>Media Upload</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                      <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Upload photos or videos</p>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Files
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-emergency hover:bg-emergency/90">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Submit Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shelter Management Tab */}
        <TabsContent value="shelter">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5 text-primary" />
                Shelter Information
              </CardTitle>
              <p className="text-sm text-muted-foreground">View available shelters and their details</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {shelterData.length > 0 ? (
                shelterData.map((shelter, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg bg-background">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{shelter.type || 'Shelter'}</h4>
                        <p className="text-sm text-muted-foreground">{shelter.description || 'Shelter facility'}</p>
                      </div>
                      <Badge variant="outline">
                        {shelter.status || 'Available'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{shelter.location || 'Location not specified'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{shelter.quantity || 'Capacity not specified'}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No shelter information available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Communications
              </CardTitle>
              <p className="text-sm text-muted-foreground">Communicate with administrators, team members, and affected citizens</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Messages</h4>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Message
                </Button>
              </div>

              <div className="space-y-3">
                {messages.map((message) => (
                  <div key={message.id} className={`p-4 border border-border rounded-lg bg-background ${!message.read ? 'border-primary' : ''}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-medium">{message.from}</h5>
                          {!message.read && <Badge className="bg-primary text-primary-foreground text-xs">New</Badge>}
                        </div>
                        <h6 className="font-medium text-sm">{message.subject}</h6>
                      </div>
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{message.message}</p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">Reply</Button>
                      <Button size="sm" variant="outline">Mark as Read</Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Communication Options */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Quick Contacts</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-16 flex-col gap-2">
                    <Users className="h-5 w-5" />
                    <span className="text-sm">Team Chat</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="text-sm">Emergency Line</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2">
                    <Send className="h-5 w-5" />
                    <span className="text-sm">Admin Contact</span>
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

export default VolunteerDashboard;