import React, { useState } from 'react';
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

const VolunteerDashboard = () => {
  const volunteerTasks = [
    {
      id: 'VT-001',
      title: 'Search & Rescue Support',
      location: 'Downtown District - Sector 3',
      priority: 'High',
      status: 'Assigned',
      startTime: '09:00 AM',
      estimatedDuration: '4 hours',
      teamLead: 'Sarah Johnson',
      teamSize: 8,
      skills: ['First Aid', 'Navigation']
    },
    {
      id: 'VT-002',
      title: 'Supply Distribution',
      location: 'Community Center - West Side',
      priority: 'Medium',
      status: 'In Progress',
      startTime: '02:00 PM',
      estimatedDuration: '3 hours',
      teamLead: 'Mike Rodriguez',
      teamSize: 6,
      skills: ['Logistics', 'Communication']
    },
    {
      id: 'VT-003',
      title: 'Medical Assistance',
      location: 'Emergency Shelter A',
      priority: 'Critical',
      status: 'Pending',
      startTime: '06:00 PM',
      estimatedDuration: '6 hours',
      teamLead: 'Dr. Emily Chen',
      teamSize: 4,
      skills: ['Medical Training', 'CPR']
    }
  ];

  const volunteerStats = [
    {
      title: 'Active Tasks',
      value: '2',
      icon: Clock,
      color: 'text-warning'
    },
    {
      title: 'Completed Today',
      value: '1',
      icon: CheckCircle,
      color: 'text-success'
    },
    {
      title: 'Hours Contributed',
      value: '12',
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Team Members',
      value: '18',
      icon: Users,
      color: 'text-primary'
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
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    phone: '+1-555-0123',
    email: 'john.doe@example.com',
    skills: ['First Aid', 'Communication', 'Logistics'],
    availability: 'Full Time',
    emergencyContact: '+1-555-0987'
  });

  const [incidentReport, setIncidentReport] = useState({
    type: '',
    location: '',
    description: '',
    severity: '',
    mediaFiles: []
  });

  const [shelterData, setShelterData] = useState({
    shelterId: '',
    currentOccupancy: 0,
    maxCapacity: 100,
    notes: ''
  });

  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'Admin Team',
      subject: 'Task Assignment Update',
      message: 'Your medical assistance task has been confirmed for tonight.',
      timestamp: '2 hours ago',
      read: false
    },
    {
      id: 2,
      from: 'Sarah Johnson (Team Lead)',
      subject: 'Equipment Check',
      message: 'Please ensure you have all required medical supplies before shift.',
      timestamp: '4 hours ago',
      read: true
    }
  ]);

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
                Shelter Occupancy Management
              </CardTitle>
              <p className="text-sm text-muted-foreground">Update and monitor shelter capacity and occupancy</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="shelterId">Shelter Location</Label>
                    <Select value={shelterData.shelterId} onValueChange={(value) => setShelterData({...shelterData, shelterId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select shelter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="shelter-a">Emergency Shelter A</SelectItem>
                        <SelectItem value="shelter-b">Community Center B</SelectItem>
                        <SelectItem value="shelter-c">School Gym C</SelectItem>
                        <SelectItem value="shelter-d">Church Hall D</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="currentOccupancy">Current Occupancy</Label>
                    <Input
                      id="currentOccupancy"
                      type="number"
                      value={shelterData.currentOccupancy}
                      onChange={(e) => setShelterData({...shelterData, currentOccupancy: parseInt(e.target.value)})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="maxCapacity">Maximum Capacity</Label>
                    <Input
                      id="maxCapacity"
                      type="number"
                      value={shelterData.maxCapacity}
                      onChange={(e) => setShelterData({...shelterData, maxCapacity: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Occupancy Status</Label>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Current Usage</span>
                        <span className="text-sm">{Math.round((shelterData.currentOccupancy / shelterData.maxCapacity) * 100)}%</span>
                      </div>
                      <div className="w-full bg-background rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${Math.min((shelterData.currentOccupancy / shelterData.maxCapacity) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {shelterData.currentOccupancy} / {shelterData.maxCapacity} people
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special conditions or updates..."
                      rows={3}
                      value={shelterData.notes}
                      onChange={(e) => setShelterData({...shelterData, notes: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Update Occupancy
                </Button>
              </div>
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