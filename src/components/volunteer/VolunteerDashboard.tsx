import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Clock, 
  MapPin, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  Phone,
  MessageSquare
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

  return (
    <div className="space-y-6">
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

      {/* Assigned Tasks */}
      <Card className="border-0 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Your Assigned Tasks
          </CardTitle>
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

      {/* Schedule */}
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

            <div className="flex items-center gap-4 p-3 bg-warning/10 rounded-lg border-l-4 border-warning">
              <div className="text-sm font-medium">06:00 PM - 12:00 AM</div>
              <div className="flex-1">
                <div className="font-medium">Medical Assistance</div>
                <div className="text-sm text-muted-foreground">Emergency Shelter A</div>
              </div>
              <Badge className="bg-warning text-warning-foreground">Pending</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VolunteerDashboard;